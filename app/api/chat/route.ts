/**
 * API Route for AI Chat
 * Handles chat requests using RAG pipeline
 * 
 * Performance Note: Currently returns full response at once.
 * For slower connections, consider implementing streaming responses
 * using Hugging Face's streaming API to improve perceived performance.
 */

import { NextRequest, NextResponse } from 'next/server'
import { ragQuery } from '@/lib/ai/rag-pipeline'

// Using Node.js runtime for better compatibility with Hugging Face API
// export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, intent } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const result = await ragQuery(message, intent)

    return NextResponse.json({
      response: result.response,
      sources: result.sources.map(s => ({
        id: s.id,
        title: s.metadata.title || s.source,
        source: s.source,
        url: s.metadata.url
      }))
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return a helpful error message
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please try again or contact Coriano directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

