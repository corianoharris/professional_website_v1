/**
 * API Route for AI Chat
 * Handles chat requests using RAG pipeline
 */

import { NextRequest, NextResponse } from 'next/server'
import { ragQuery } from '@/lib/ai/rag-pipeline'

export const runtime = 'edge' // Use Edge Runtime for faster responses

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // For now, we'll use just the current message
    // In the future, you could include conversation history for context
    const result = await ragQuery(message)

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

