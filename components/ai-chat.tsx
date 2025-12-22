"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send, Loader2, RefreshCw, Smile } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIChat } from "@/components/ai-chat-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ReactMarkdown from "react-markdown"

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{
    id: string
    title: string
    source: string
    url?: string
  }>
}

export function AIChat() {
  const { isOpen, setIsOpen } = useAIChat()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Common emojis for quick selection
  const commonEmojis = [
    '😊', '😄', '😁', '😆', '😅', '😂', '🤣', '😃', 
    '😉', '😎', '🥳', '😍', '🤩', '😋', '😜', '🤪', 
    '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', 
    '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', 
    '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', 
    '🤢', '🤮', '🤧', '🥵', '🥶', '😵', '🤯', '🤠', 
    '😇', '🤓', '🧐', '👍', '👎', '👌', '✌️', '🤞', 
    '🤟', '🤘', '🤙', '👏', '🙌', '👐', '🤲', '🤝', 
    '🙏', '✍️', '💪', '👀', '❤️', '🧡', '💛', '💚', 
    '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', 
    '💞', '💓', '💗', '💖', '💘', '💝', '💟', '🔥', 
    '⭐', '✨', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', 
    '✅', '❌', '⚠️', '💡', '🚀', '💯', '🎯', '⚡'
  ]

  const insertEmoji = (emoji: string) => {
    setInput(prev => prev + emoji)
    setEmojiPickerOpen(false)
    inputRef.current?.focus()
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Close on Escape key and prevent body scroll when open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, setIsOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error response:', errorData)
        throw new Error(errorData.error || errorData.details || `Failed to get response (${response.status})`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        sources: data.sources
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or contact Coriano directly at me@corianoharris.com"
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Don't render if not open
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in-0"
        onClick={(e) => {
          // Only close if clicking directly on backdrop, not modal content
          if (e.target === e.currentTarget) {
            setIsOpen(false)
          }
        }}
        aria-hidden="true"
      />

      {/* Centered Modal */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-describedby="ai-chat-description"
      >
        <Card className="w-full max-w-md md:max-w-2xl h-[600px] flex flex-col shadow-2xl border pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200 bg-background overflow-visible">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                <p id="ai-chat-description" className="text-xs text-muted-foreground">
                  • We're online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMessages([])
                  setInput("")
                }}
                aria-label="Refresh chat"
                className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-visible px-0 py-4 space-y-4 bg-background">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8 px-4">
                <img 
                  src="/chroma_avatar.png" 
                  alt="Chroma" 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="font-semibold mb-2">Hi! I'm Chroma.</p>
                <p className="text-sm">
                  Ask me about services, case studies, methodology, philosophy, or general questions about colors, design, UX, UI, and software development.
                </p>
                <div className="mt-4 space-y-2 text-left">
                  <p className="text-xs font-medium">Try asking:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• "Tell me about your color strategy approach"</li>
                    <li>• "What case studies do you have?"</li>
                    <li>• "How do you help teams?"</li>
                    <li>• "What is color psychology?"</li>
                    <li>• "How do I improve UX?"</li>
                  </ul>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-2",
                  message.role === 'user' ? "justify-end pr-4" : "justify-start pl-2"
                )}
              >
                {message.role === 'assistant' && (
                  <img 
                    src="/chroma_avatar.png" 
                    alt="Chroma" 
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2.5 shadow-md",
                    message.role === 'user'
                      ? "bg-[#7c3aed] text-white max-w-[90%] ml-auto -mr-3"
                      : "bg-muted text-foreground max-w-[85%] -ml-3"
                  )}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="ml-2">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ children }) => <code className="bg-background/50 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0">{children}</h3>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2 justify-start pl-2">
                <img 
                  src="/chroma_avatar.png" 
                  alt="Chroma" 
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex items-center gap-2">
              <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    aria-label="Emoji"
                    onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                  >
                    <Smile className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-80 p-3 z-[200] bg-background border shadow-lg" 
                  align="start" 
                  side="top"
                  sideOffset={8}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
                    {commonEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-2xl hover:bg-muted rounded p-1.5 transition-colors cursor-pointer flex items-center justify-center aspect-square min-w-[2.5rem] min-h-[2.5rem]"
                        aria-label={`Insert ${emoji} emoji`}
                        title={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter message"
                disabled={isLoading}
                className="flex-1"
                aria-label="Chat input"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                variant="ghost"
                className="h-8 w-8 flex-shrink-0 text-[#7c3aed] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

