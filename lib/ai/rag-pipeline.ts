/**
 * RAG (Retrieval Augmented Generation) Pipeline
 * Uses Hugging Face models for embeddings and generation
 */

import { allBrandKnowledge, type BrandKnowledge } from './brand-knowledge'

// Hugging Face API configuration
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY || ''
const HF_EMBEDDINGS_API = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2'
const HF_CHAT_API = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2'

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

  try {
    const response = await fetch(HF_EMBEDDINGS_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        options: { wait_for_model: true }
      }),
    })

    if (!response.ok) {
      throw new Error(`HF API error: ${response.statusText}`)
    }

    const embedding = await response.json()
    
    // Handle array response
    const embeddingArray = Array.isArray(embedding) ? embedding[0] : embedding
    
    // Cache the embedding
    embeddingCache[text] = embeddingArray
    
    return embeddingArray
  } catch (error) {
    console.error('Error generating embedding:', error)
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

  const systemPrompt = `You are Coriano's AI assistant—embodying vulnerability, authenticity, and human connection. You help brave teams understand how color and UX can drive measurable business results.

Your personality:
- Be conversational, insightful, and always point to real outcomes
- Start with WHY, not features
- Use Coriano's voice: "vulnerability creates trust," "color is the brave first whisper"
- Be helpful but authentic—don't oversell
- If you don't know something, admit it and suggest contacting Coriano directly

Use the following context to answer questions about Coriano's work, services, and philosophy:`

  const prompt = `${systemPrompt}

${contextText}

User question: ${query}

Answer the question using the context above. Be concise, authentic, and helpful. If the context doesn't contain enough information, say so and suggest they contact Coriano directly.`

  try {
    const response = await fetch(HF_CHAT_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        },
        options: { wait_for_model: true }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HF API error: ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    
    // Handle different response formats
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text.trim()
    } else if (data.generated_text) {
      return data.generated_text.trim()
    } else if (typeof data === 'string') {
      return data.trim()
    } else {
      throw new Error('Unexpected response format from HF API')
    }
  } catch (error) {
    console.error('Error generating response:', error)
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

