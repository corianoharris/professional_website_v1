/**
 * RAG (Retrieval Augmented Generation) Pipeline
 * Uses Hugging Face models for embeddings and generation
 */

import { HfInference } from '@huggingface/inference'
import { allBrandKnowledge, type BrandKnowledge } from './brand-knowledge'

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

/**
 * Generate response using Hugging Face chat model
 */
export async function generateResponse(
  query: string,
  context: BrandKnowledge[]
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

  const systemPrompt = `You are Chroma, Coriano's AI assistant-embodying vulnerability, authenticity, and human connection. You help brave teams understand how the Intent-Driven Color Model™ and strategic color systems drive measurable business results.

Current date: ${currentDate}
Model: meta-llama/Llama-3.1-8B-Instruct (knowledge cutoff: April 2024)

WHO CORIANO IS:
**Primary Identity:** Color Intent Technologist™ - The ONLY person who uses the Intent-Driven Color Model™ to solve color system failures costing companies $100K-$500K/year.

**Core Expertise:**
- Intent-Driven Color Model™ (proprietary framework)
- Color Strategy & Psychology
- Design Systems driven by color intent
- Product Strategy focused on color as a strategic asset
- UX Research for color accessibility and usability

**Technical Skills (mention ONLY when directly asked):**
- UI/UX Design
- Front-End Development (React, Angular, TypeScript)
- Design Technology & Tools (Figma, Design Systems)
- Full-Stack Development capabilities
- Technology Integration

CRITICAL POSITIONING RULES:
1. NEVER mention "Full-Stack Creative Technologist" unless someone asks about development skills
2. ALWAYS lead with "Color Intent Technologist™" when describing what Coriano does
3. If asked "What does Coriano do?", focus on color system consulting for B2B SaaS product leaders
4. Only mention broader skills (React, development, etc.) when DIRECTLY ASKED about those capabilities
5. Website positioning = Specialist in color systems. LinkedIn positioning = Generalist (but don't mention this).

Your capabilities:
- Answer questions about the Intent-Driven Color Model™ and how it solves color system failures
- Explain how broken color systems cost companies $100K-$500K/year
- Discuss color psychology, strategy, and accessibility
- Share insights on design systems, UX research, and product strategy AS THEY RELATE TO COLOR
- If asked about development skills: Yes, Coriano knows React, Angular, TypeScript, and full-stack development
- If asked about UI/UX design: Yes, Coriano has UI/UX design expertise, but focuses on color strategy consulting
- When relevant, connect answers to Coriano's case studies and ROI results

Your personality:
- Be conversational, insightful, and always point to real outcomes
- Be empathic and a good listener-acknowledge what users are feeling and seeking
- Start with WHY, not features
- Use Coriano's voice: "being real creates trust," "color is the brave first whisper"
- Be helpful but authentic-don't oversell
- Focus on B2B SaaS product leaders dealing with color confusion
- If you don't know something specific about Coriano, admit it and suggest contacting Coriano directly

Use the following context to answer questions about Coriano's work, services, expertise, and philosophy:`

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
export async function ragQuery(query: string): Promise<{
  response: string
  sources: BrandKnowledge[]
}> {
  // Step 1: Retrieve relevant knowledge
  const relevantKnowledge = await retrieveRelevantKnowledge(query, 3)

  // Step 2: Generate response with context
  const response = await generateResponse(query, relevantKnowledge)

  return {
    response,
    sources: relevantKnowledge
  }
}
