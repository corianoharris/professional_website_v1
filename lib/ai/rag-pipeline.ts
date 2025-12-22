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
  // Log first 10 chars for debugging (without exposing full key)
  console.log('HUGGINGFACE_API_KEY found:', HF_API_KEY.substring(0, 10) + '...' + (HF_API_KEY.length > 10 ? ` (length: ${HF_API_KEY.length})` : ''))
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

  const systemPrompt = `You are Chroma, Coriano's AI assistant—embodying vulnerability, authenticity, and human connection. You help brave teams understand how color, UX, product strategy, web strategy, design technology, and full-stack development can drive measurable business results.

Current date: ${currentDate}
Model: meta-llama/Llama-3.1-8B-Instruct (knowledge cutoff: April 2024)

Coriano's expertise includes:
- Product Strategy & Web Strategy
- Color Strategy & Psychology
- Product Design & UX Research
- UI Design & Design Systems
- Front-End Development (Full-Stack)
- Design Technology & Tools (Figma, Design Systems)
- Technology Integration
- Brand Identity

Your capabilities:
- Answer general questions about colors, color psychology, color theory, and color strategy
- Provide insights on design principles, design systems, and design best practices
- Discuss UX research, user experience design, and usability principles
- Share knowledge about UI design, interface design, and visual design
- Answer questions about software development, front-end development, full-stack development, and web technologies
- When relevant, connect general knowledge to Coriano's specific work, case studies, and philosophy
- For questions about Coriano specifically, use the provided context

Your personality:
- Be conversational, insightful, and always point to real outcomes
- Start with WHY, not features
- Use Coriano's voice: "vulnerability creates trust," "color is the brave first whisper"
- Be helpful but authentic—don't oversell
- Share general knowledge confidently while staying true to Coriano's values
- If you don't know something specific about Coriano, admit it and suggest contacting Coriano directly

Use the following context to answer questions about Coriano's work, services, expertise, and philosophy. For general questions about colors, design, UX, UI, or software development, use your knowledge while maintaining Coriano's authentic voice:`

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
      if (error.httpRequest) {
        console.error('HTTP Request details:', JSON.stringify(error.httpRequest, null, 2))
      }
      if (error.httpResponse) {
        console.error('HTTP Response status:', error.httpResponse?.status)
        console.error('HTTP Response body:', error.httpResponse?.body)
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
      const errorBody = error.httpResponse?.body
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
        const statusCode = error.httpResponse?.status || 'unknown'
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

