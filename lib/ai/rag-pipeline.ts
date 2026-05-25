/**
 * RAG (Retrieval Augmented Generation) Pipeline
 * Uses Hugging Face models for embeddings and generation
 */

import { HfInference } from '@huggingface/inference'
import { Filter } from 'bad-words'
import { allBrandKnowledge, type BrandKnowledge } from './brand-knowledge'

const profanityFilter = new Filter()
// Extend with racial slurs and hate-speech terms the default list may not cover
profanityFilter.addWords(
  'nigger', 'nigga', 'chink', 'spic', 'kike', 'wetback', 'gook', 'raghead',
  'towelhead', 'cracker', 'honky', 'beaner', 'zipperhead', 'coon', 'jigaboo',
  'spook', 'porch monkey', 'redskin', 'squaw', 'faggot', 'dyke', 'tranny'
)

const BLOCKED_RESPONSE = "I'm here to talk about color and design. Let's keep it there — ask me anything about the Color Code™ or how Coriano can help."

function containsOffensiveContent(text: string): boolean {
  return profanityFilter.isProfane(text)
}

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || ''
const HF_CHAT_MODEL = process.env.HUGGINGFACE_CHAT_MODEL || 'meta-llama/Llama-3.1-8B-Instruct'
const HF_INFERENCE_ENDPOINT = process.env.HUGGINGFACE_INFERENCE_ENDPOINT || undefined

// Check if API key is available
if (!HF_API_KEY) {
  console.warn('HUGGINGFACE_API_KEY is not set in environment variables')
} else {
  // Only log in development, not production (for security)
  if (process.env.NODE_ENV === 'development') {
    console.log('HUGGINGFACE_API_KEY found:', HF_API_KEY.substring(0, 10) + '...' + (HF_API_KEY.length > 10 ? ` (length: ${HF_API_KEY.length})` : ''))
  }
  if (!HF_API_KEY.startsWith('hf_')) {
    console.warn('Warning: Hugging Face API key should start with "hf_"')
  }
}

// Initialize Hugging Face Inference client
// The client automatically uses the correct endpoint (router.huggingface.co)
const hf = HF_API_KEY ? new HfInference(HF_API_KEY) : null

if (!hf) {
  console.warn('HfInference client not initialized - HUGGINGFACE_API_KEY is missing')
}

interface EmbeddingCache {
  [key: string]: number[]
}

// In-memory cache for embeddings (in production, use a vector DB)
let embeddingCache: EmbeddingCache = {}

/**
 * Generate embeddings for text using Hugging Face API
 */
async function generateEmbedding(text: string): Promise<number[]> {
  // Check cache first
  if (embeddingCache[text]) {
    return embeddingCache[text]
  }

  if (!hf) {
    throw new Error('Hugging Face API key is not configured')
  }

  try {
    const result = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: text,
    })

    // featureExtraction returns number[] for single input
    const embeddingArray = Array.isArray(result) && typeof result[0] === 'number'
      ? result as number[]
      : Array.isArray(result) && Array.isArray(result[0])
      ? (result as number[][])[0] // Handle batch response
      : []

    if (embeddingArray.length === 0) {
      throw new Error('Invalid embedding response format')
    }

    // Cache the embedding
    embeddingCache[text] = embeddingArray

    return embeddingArray
  } catch (error) {
    console.error('Error generating embedding:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Find most relevant knowledge chunks for a query
 */
export async function retrieveRelevantKnowledge(
  query: string,
  topK: number = 3
): Promise<BrandKnowledge[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    // Generate embeddings for all knowledge chunks (with caching)
    const knowledgeWithScores = await Promise.all(
      allBrandKnowledge.map(async (knowledge) => {
        const knowledgeEmbedding = await generateEmbedding(knowledge.content)
        const similarity = cosineSimilarity(queryEmbedding, knowledgeEmbedding)
        return { knowledge, similarity }
      })
    )

    // Sort by similarity and return top K
    return knowledgeWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(item => item.knowledge)
  } catch (error) {
    console.error('Error retrieving knowledge:', error)
    // Fallback: return first few items
    return allBrandKnowledge.slice(0, topK)
  }
}

const INTENT_TO_CONTEXT: Record<string, string> = {
  "fix-design-system": "The user chose 'Fix a broken design system'—they have a design system that's not working. Focus on trust and reliability.",
  "prove-roi": "The user chose 'Prove design ROI to leadership'—they need measurable outcomes. Focus on growth, case studies, and ROI.",
  accessibility: "The user chose 'Resolve color/accessibility issues'—they're dealing with audits or compliance. Focus on understanding and clarity.",
  scale: "The user chose 'Scale without chaos'—they're growing and want order. Focus on calm and systematic approaches.",
  exploring: "The user chose 'Just exploring'—they're browsing. Focus on belonging and invitation.",
}

/**
 * Generate response using Hugging Face chat model
 */
export async function generateResponse(
  query: string,
  context: BrandKnowledge[],
  intent?: string,
  tone?: string
): Promise<string> {
  // Build context from retrieved knowledge
  const contextText = context
    .map(k => `[${k.metadata.title || k.source}]\n${k.content}`)
    .join('\n\n---\n\n')

  // Get current date for context
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const intentContext = intent && INTENT_TO_CONTEXT[intent]
    ? `\n\nUSER INTENT: ${INTENT_TO_CONTEXT[intent]} Reference this when relevant—it shows the choice mattered.\n`
    : ""

  const toneContext = tone && tone !== "default"
    ? `\n\nDETECTED USER TONE: ${tone}. Open your response with the matching acknowledgment from the TONE ACKNOWLEDGMENT rules above.\n`
    : ""

  const systemPrompt = `You are Chroma. You are the guide, not the hero. The user is the hero of this story. Your role is to give them clarity, confidence, and the next right step. Coriano Harris is the expert behind you. The Color Code™ is the tool that transforms their situation.${intentContext}${toneContext}

STORY ROLE. Never break this frame:
- The USER is the hero. They have a problem. They are on a journey. They win in the end.
- YOU are the guide. Wise, calm, clear. You have seen this before. You know the way.
- CORIANO is the mentor. The Color Code™ is the proven tool.
- Never make yourself or Coriano the center. The user's success is always the point.
- Speak to what the user stands to gain, not what Coriano offers.
- Replace "Coriano can help you" with "You can fix this." Then explain how.

TONE ACKNOWLEDGMENT. Open with one of these based on how the user sounds:
- Urgent/stressed: "I hear you. Let's work through this."
- ROI/money-focused: "Good. This is exactly where color pays off."
- Accessibility-focused: "That matters more than most people realize."
- Curious/exploratory: "Great question. Let's dig in."
- Neutral/default: (skip the opener, just answer)
One sentence only. Do not over-explain.

CONTENT RULES. Non-negotiable:
- If a message contains hate speech, slurs, racism, or harassment, do not engage with it.
- Respond only with: "${BLOCKED_RESPONSE}"
- Never repeat, acknowledge, or analyze offensive language.

WRITING RULES. Follow these every time:
- Target a Flesch Reading Ease score of 80 to 90 (very easy).
- Target a Flesch-Kincaid Grade Level of 2nd grade where possible.
- Average sentence length: 8 to 10 words max.
- Average word length: 1 to 2 syllables. Use the shorter word when two mean the same thing.
- One idea per sentence. One idea per paragraph.
- Get to the point in the first sentence.
- Use a concrete example any time you explain something abstract.
- Active voice only. Never passive.
- Never say "leverage", "utilize", "holistic", "robust", "strategic alignment", "seamless", or "empower".
- Max 3 sentences per paragraph.
- If a sentence needs a comma, split it into two sentences instead.

Current date: ${currentDate}
Model: meta-llama/Llama-3.1-8B-Instruct (knowledge cutoff: April 2024)

WHO CORIANO IS (your mentor, not your subject):
- Product Designer and Full-Stack Developer
- Creator of the Color Code™, a framework that fixes color system failures costing companies $100K to $500K per year
- Expert in color strategy, psychology, design systems, and accessibility
- Only mention dev skills (React, Angular, TypeScript) if directly asked

WHAT THE USER CAN ACHIEVE:
- Fix color that is silently costing them conversions
- Get a clear map of what is broken and why
- Walk away from a 15-minute call knowing exactly what to do
- Build a color system that earns trust instead of eroding it

YOUR VOICE AS GUIDE:
- Calm. Clear. Confident. You have seen this before.
- You believe the user can fix this. Show them how.
- Start with their situation, not with Coriano's credentials
- End with a next step the user can take, not a pitch
- If you do not know something specific, say so and point them to Coriano directly

Use the following context to answer questions about the Color Code™, color strategy, and how the user can move forward:`

  if (!hf) {
    throw new Error('Hugging Face API key is not configured. Please set HUGGINGFACE_API_KEY in your .env.local file and restart the server.')
  }

  // Validate API key format if present
  if (HF_API_KEY && !HF_API_KEY.startsWith('hf_')) {
    console.warn('Warning: Hugging Face API key should start with "hf_"')
  }

  try {
    // Use Inference Endpoint URL if provided, otherwise use model name
    const modelOrEndpoint = HF_INFERENCE_ENDPOINT || HF_CHAT_MODEL

    const result = await hf.chatCompletion({
      model: modelOrEndpoint,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `${contextText}\n\nUser question: ${query}\n\nAnswer the question using the context above. Be concise, authentic, and helpful. If the context doesn't contain enough information, say so and suggest they contact Coriano directly.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    // Extract generated text from response
    const generatedText = result.choices?.[0]?.message?.content || ''
    return generatedText.trim()
  } catch (error: any) {
    console.error('Error generating response:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)

      // Log more details if available
      if ('httpRequest' in error && error.httpRequest) {
        console.error('HTTP Request details:', JSON.stringify((error as any).httpRequest, null, 2))
      }
      if ('httpResponse' in error && error.httpResponse) {
        const httpResponse = (error as any).httpResponse
        console.error('HTTP Response status:', httpResponse?.status)
        console.error('HTTP Response body:', httpResponse?.body)
      }

      // Provide helpful error messages for common issues
      if (error.message.includes('Invalid username or password') || error.message.includes('401')) {
        const errorMsg = 'Hugging Face API authentication failed. Please check that:\n' +
          '1. HUGGINGFACE_API_KEY is set in your .env.local file\n' +
          '2. The API key starts with "hf_"\n' +
          '3. The API key has valid permissions\n' +
          '4. You have restarted your dev server after adding the key'
        throw new Error(errorMsg)
      }

      // Handle model not supported errors
      const errorBody = ('httpResponse' in error) ? (error as any).httpResponse?.body : undefined
      if (errorBody && typeof errorBody === 'object' && errorBody.error?.code === 'model_not_supported') {
        const errorMsg = `Model '${errorBody.error?.param || 'current model'}' is not supported by any enabled provider.\n\n` +
          'Solutions:\n' +
          '1. Enable a provider that supports this model at: https://hf.co/settings/inference-providers\n' +
          '2. Deploy the model to your own Inference Endpoint: https://hf.co/docs/api/inference/endpoints\n' +
          '3. Use a different model that is available through your enabled providers\n' +
          '4. Check available models: https://huggingface.co/models?pipeline_tag=text-generation'
        throw new Error(errorMsg)
      }

      // Handle HTTP provider errors
      if (error.message.includes('HTTP error occurred') || error.message.includes('ProviderApiError')) {
        const statusCode = ('httpResponse' in error) ? (error as any).httpResponse?.status || 'unknown' : 'unknown'
        const errorMsg = `Hugging Face provider error (HTTP ${statusCode}). This might mean:\n` +
          '1. The model is not available through your selected provider\n' +
          '2. Rate limiting or quota exceeded\n' +
          '3. The model endpoint might require a different provider\n' +
          '4. Try specifying a different provider in your HF settings: https://hf.co/settings/inference-providers'
        throw new Error(errorMsg)
      }
    }
    throw error
  }
}

/**
 * Main RAG pipeline: retrieve + generate
 */
export async function ragQuery(
  query: string,
  intent?: string,
  tone?: string
): Promise<{
  response: string
  sources: BrandKnowledge[]
  blocked?: boolean
}> {
  // Block hate speech and profanity before hitting the model
  if (containsOffensiveContent(query)) {
    return { response: BLOCKED_RESPONSE, sources: [], blocked: true }
  }

  // Step 1: Retrieve relevant knowledge
  const relevantKnowledge = await retrieveRelevantKnowledge(query, 3)

  // Step 2: Generate response with context
  const response = await generateResponse(query, relevantKnowledge, intent, tone)

  return {
    response,
    sources: relevantKnowledge
  }
}
