"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, Send, Loader2, RefreshCw, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIChat } from "@/components/ai-chat-context"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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

type ChatFontSize = "normal" | "large" | "extra-large"
type ChatTone = "default" | "urgent" | "roi" | "accessibility" | "exploratory"

const TONE_COLORS: Record<ChatTone, string> = {
  default:       "#7c3aed",
  urgent:        "#0369a1",
  roi:           "#0d9488",
  accessibility: "#0891b2",
  exploratory:   "#7c3aed",
}

const TONE_BG_PASTEL: Record<ChatTone, string> = {
  default:       "#ede9fe",  // soft lavender
  urgent:        "#dbeafe",  // soft sky blue
  roi:           "#ccfbf1",  // soft mint
  accessibility: "#e0f9ff",  // soft cyan
  exploratory:   "#ede9fe",  // soft lavender
}

// Soothing counterpart colors for Chroma's replies — calms the user's tone
const TONE_SOOTHING_BG: Record<ChatTone, string> = {
  default:       "#f0fdf4",  // soft sage — grounds neutral energy
  urgent:        "#fdf4ff",  // soft lavender — calms stress and urgency
  roi:           "#fff7ed",  // warm peach — reassuring, confident
  accessibility: "#f0fdf4",  // soft sage green — steady, inclusive
  exploratory:   "#fefce8",  // warm yellow — welcoming curiosity
}

const TONE_SOOTHING_BORDER: Record<ChatTone, string> = {
  default:       "#86efac",  // sage green
  urgent:        "#d8b4fe",  // soft purple
  roi:           "#fdba74",  // warm amber
  accessibility: "#86efac",  // sage green
  exploratory:   "#fde047",  // warm yellow
}

function detectTone(text: string): ChatTone {
  const t = text.toLowerCase()
  if (/failing audit|failed audit|lose.*contract|lost.*contract|legal|compli|lose|losing|risk|deadline/.test(t)) return "urgent"
  if (/cost|money|roi|revenue|budget|expensive|save|invest|price/.test(t)) return "roi"
  if (/accessibility|wcag|blind|contrast|inclusive|disabilit|508/.test(t)) return "accessibility"
  if (/what|how|tell|explain|curious|wonder|explore|learn|about/.test(t)) return "exploratory"
  return "default"
}

interface AIChatProps {
  hideFloatingButton?: boolean
}

export function AIChat({ hideFloatingButton = false }: AIChatProps) {
  const { isOpen, setIsOpen } = useAIChat()
  const intent = null
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [, setTypingMessage] = useState<string | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [smallModalOpen, setSmallModalOpen] = useState(false)
  const smallModalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [chatFontSize, setChatFontSize] = useState<ChatFontSize>("normal")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef(0)
  const triggerButtonRef = useRef<HTMLElement | null>(null)
  const [chatTone, setChatTone] = useState<ChatTone>("default")
  const toneColor = TONE_COLORS[chatTone]
  const toneBgPastel = TONE_BG_PASTEL[chatTone]
  const soothingBg = TONE_SOOTHING_BG[chatTone]
  const soothingBorder = TONE_SOOTHING_BORDER[chatTone]

  // Load chat-specific settings from localStorage
  useEffect(() => {
    const savedChatFontSize = localStorage.getItem("chatFontSize") as ChatFontSize | null

    if (savedChatFontSize) setChatFontSize(savedChatFontSize)
  }, [])

  // Handle Escape key to close small modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && smallModalOpen) {
        setSmallModalOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (smallModalOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [smallModalOpen])

  // Focus trap for small modal
  useEffect(() => {
    if (!smallModalOpen || !smallModalRef.current) return

    const modal = smallModalRef.current
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener("keydown", handleTabKey)
    firstElement?.focus()

    return () => {
      modal.removeEventListener("keydown", handleTabKey)
    }
  }, [smallModalOpen])

  // Close small modal when clicking outside
  useEffect(() => {
    if (!smallModalOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        smallModalRef.current &&
        !smallModalRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setSmallModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [smallModalOpen])

  // Handle opening full chat from small modal
  const handleOpenFullChat = () => {
    setSmallModalOpen(false)
    setIsOpen(true)
    // Don't add welcome message - let the empty state show instead
  }

  // Apply chat-specific font size
  useEffect(() => {
    if (!chatContainerRef.current) return

    const container = chatContainerRef.current
    container.classList.remove("chat-font-normal", "chat-font-large", "chat-font-extra-large")
    container.classList.add(`chat-font-${chatFontSize}`)
    localStorage.setItem("chatFontSize", chatFontSize)
  }, [chatFontSize])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    // Announce new messages to screen readers
    if (messages.length > previousMessageCountRef.current) {
      const newMessage = messages[messages.length - 1]
      const announcementEl = document.getElementById('chat-announcements')
      if (announcementEl) {
        if (newMessage.role === 'assistant') {
          announcementEl.textContent = `Chroma responded: ${newMessage.content.substring(0, 100)}${newMessage.content.length > 100 ? '...' : ''}`
        } else {
          announcementEl.textContent = 'Your message sent'
        }
        // Clear after announcement
        setTimeout(() => {
          announcementEl.textContent = ''
        }, 1000)
      }
    }
    previousMessageCountRef.current = messages.length
  }, [messages])

  // Store trigger button and focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element (should be the trigger button)
      triggerButtonRef.current = document.activeElement as HTMLElement
      // Prevent body scroll when modal is open (helps with mobile keyboard)
      document.body.style.overflow = 'hidden'
      // Only auto-focus input on desktop, not mobile (to prevent keyboard from pushing modal up)
      if (window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 100)
      }
    } else {
      // Blur input to dismiss keyboard on mobile when closing
      if (inputRef.current) {
        inputRef.current.blur()
      }
      // Restore body scroll
      document.body.style.overflow = ''
      // Return focus to trigger button when chat closes
      if (triggerButtonRef.current) {
        triggerButtonRef.current.focus()
        triggerButtonRef.current = null
      }
    }
  }, [isOpen])

  // Close on Escape key, prevent body scroll, and trap focus when open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        // Blur input to dismiss keyboard on mobile
        if (inputRef.current) {
          inputRef.current.blur()
        }
        // Close chat
        setIsOpen(false)
      }
    }

    if (isOpen) {
      // Prevent body scroll when modal is open (already handled in other useEffect, but keep for consistency)
      window.addEventListener('keydown', handleEscape)

      // Focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableElements = chatContainerRef.current?.querySelectorAll(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      chatContainerRef.current?.addEventListener('keydown', handleTab)

      return () => {
        window.removeEventListener('keydown', handleEscape)
        chatContainerRef.current?.removeEventListener('keydown', handleTab)
      }
    }
  }, [isOpen, setIsOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    const inputTone = detectTone(userMessage.content)
    setChatTone(prev => inputTone !== "default" ? inputTone : prev)
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
          conversationHistory: messages,
          intent: intent ?? undefined,
          tone: inputTone,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error response:', errorData)
        throw new Error(errorData.error || errorData.details || `Failed to get response (${response.status})`)
      }

      const data = await response.json()

      if (data.blocked) {
        setIsOpen(false)
        return
      }

      const fullResponse = data.response
      const responseTone = detectTone(fullResponse)
      setChatTone(prev => responseTone !== "default" ? responseTone : prev)
      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        sources: data.sources
      }

      setMessages(prev => [...prev, assistantMessage])
      setTypingMessage(fullResponse)

      // Animate typing effect - reveal text character by character
      // This improves perceived performance on slower connections
      // Note: For very slow connections, consider implementing true streaming from the API
      let currentIndex = 0
      const typingSpeed = 15 // milliseconds per character (adjust for faster/slower - lower = faster)

      // Clear any existing typing animation
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }

      const typingInterval = setInterval(() => {
        if (currentIndex < fullResponse.length) {
          const partialText = fullResponse.substring(0, currentIndex + 1)
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage.role === 'assistant') {
              lastMessage.content = partialText
            }
            return newMessages
          })
          currentIndex++
        } else {
          clearInterval(typingInterval)
          typingIntervalRef.current = null
          setTypingMessage(null)
        }
      }, typingSpeed)

      typingIntervalRef.current = typingInterval
    } catch (error) {
      console.error('Chat error:', error)
      // Clear typing animation if error occurs
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
      setTypingMessage(null)

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

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      // Reset height to auto to get the correct scrollHeight
      inputRef.current.style.height = 'auto'
      // Set height based on scrollHeight, but cap at max-h-[200px]
      const scrollHeight = inputRef.current.scrollHeight
      const maxHeight = 200 // matches max-h-[200px]
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }, [input])

  // Cleanup typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Chroma Button with Small Modal - Bottom Left (hidden when hideFloatingButton) */}
      {!isOpen && !hideFloatingButton && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50">
          <div className="relative">
            {/* Small Modal - positioned above the button */}
            <div
              ref={smallModalRef}
              className={`absolute bottom-full left-0 mb-3 bg-card rounded-xl shadow-xl transition-all duration-300 w-[calc(100vw-2rem)] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl sm:w-auto border-2 ${
                smallModalOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
              style={{ borderColor: `${toneColor}33` }}
              role="dialog"
              aria-label="Chroma greeting"
              aria-hidden={!smallModalOpen}
            >
              <div className="p-6 md:p-8 min-w-0">
                {/* Magazine Header */}
                <div className="mb-6 text-center">
                  <div className="mb-4">
                    <img
                      src="/images/chroma-icon.png"
                      alt="Chroma icon"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto object-cover"
                      style={{ objectPosition: "50% 30%" }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-3 flex items-center justify-center gap-2 flex-wrap">
                    <span
                      className="font-bold inline-block transition-colors duration-500"
                      style={{
                        fontFamily: 'var(--font-baloo2), sans-serif',
                        color: toneColor,
                        letterSpacing: '0.08em',
                        lineHeight: '1.2'
                      }}
                    >
                      Chroma
                    </span>
                    <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', lineHeight: '1.2' }}>knows color.</span>
                  </p>
                </div>

                {/* Magazine Divider */}
                <div className="my-6 border-t border-border/50"></div>

                {/* Magazine Content */}
                <div className="mb-6">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', lineHeight: '1.7' }}>
                    Ask about color. Audits. How it works. Or Coriano&apos;s story.
                  </p>
                </div>

                {/* Magazine CTA */}
                <Button
                  onClick={handleOpenFullChat}
                  className="w-full text-white text-base md:text-lg py-6 font-semibold transition-colors duration-500"
                  style={{ backgroundColor: toneColor, fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '0.05em' }}
                  aria-label="Open chat"
                >
                  Ask a question
                </Button>
              </div>
              {/* Tooltip arrow pointing down to button */}
              <div
                className="absolute -bottom-1.5 left-6 w-3 h-3 bg-card border-r border-b"
                style={{ borderColor: `${toneColor}33`, transform: 'translateX(-50%) rotate(45deg)' }}
              />
            </div>

            {/* Floating Action Button */}
            <button
              ref={buttonRef}
              onClick={() => setSmallModalOpen(!smallModalOpen)}
              className="text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
              style={{ backgroundColor: toneColor }}
              aria-label="Open Chroma menu"
              aria-expanded={smallModalOpen}
              aria-haspopup="dialog"
            >
              <MessageCircle className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${smallModalOpen ? "scale-110" : ""}`} aria-hidden="true" />
              <span className="sr-only">Chat with Chroma</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat Modal - Only render when open */}
      {isOpen && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in-0"
        onClick={(e) => {
          // Only close if clicking directly on backdrop, not modal content
          if (e.target === e.currentTarget) {
            // Blur input to dismiss keyboard on mobile
            if (inputRef.current) {
              inputRef.current.blur()
            }
            setIsOpen(false)
          }
        }}
        aria-hidden="true"
      />

      {/* ARIA live region for announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="chat-announcements"
      />

      {/* Centered Modal */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-chat-title"
        aria-describedby="ai-chat-description"
        style={{
          // Prevent keyboard from pushing modal up on mobile
          height: '100dvh', // Dynamic viewport height for mobile
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Card
          ref={chatContainerRef}
          className="w-full h-full sm:h-auto sm:max-h-[80vh] sm:min-h-[500px] sm:max-w-md md:max-w-2xl sm:mx-auto flex flex-col shadow-2xl border pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200 bg-background overflow-hidden focus:outline-none rounded-lg"
          tabIndex={-1}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-background">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                <h2 id="ai-chat-title" className="text-lg font-semibold mb-1">
                  Chat with <span
                    className="font-bold transition-colors duration-500"
                    style={{
                      fontFamily: 'var(--font-baloo2), sans-serif',
                      color: toneColor,
                      letterSpacing: '0.08em'
                    }}
                  >Chroma</span>
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMessages([])
                  setInput("")
                  inputRef.current?.focus()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setMessages([])
                    setInput("")
                    inputRef.current?.focus()
                  }
                }}
                aria-label="Refresh chat"
                className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8} className="!z-[300] !bg-gray-900 border-gray-700">
                  <span className="!text-white">Clear chat</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      // Blur input first to dismiss keyboard on mobile
                      if (inputRef.current) {
                        inputRef.current.blur()
                      }
                      // Close modal - use requestAnimationFrame to ensure blur happens first
                      requestAnimationFrame(() => {
                        setIsOpen(false)
                      })
                    }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                        e.stopPropagation()
                        // Blur input first to dismiss keyboard on mobile
                        if (inputRef.current) {
                          inputRef.current.blur()
                        }
                        // Close modal
                        requestAnimationFrame(() => {
                    setIsOpen(false)
                        })
                  }
                }}
                aria-label="Close chat"
                className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    type="button"
              >
                <X className="w-4 h-4" />
              </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8} className="!z-[300] !bg-gray-900 border-gray-700">
                  <span className="!text-white">Close chat</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`overflow-y-auto overflow-x-visible px-2 sm:px-0 py-2 sm:py-4 space-y-3 sm:space-y-4 bg-background flex-1 min-h-0`}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-4 px-3 sm:py-8 sm:px-4">
                <img
                  src="/images/chroma-icon.png"
                  alt="Chroma avatar"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 sm:mb-8 object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
                <h2
                  className="mb-3 text-2xl sm:text-3xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', letterSpacing: '0.05em' }}
                >
                  Ask anything.
                </h2>
                <p
                  className="text-sm sm:text-base mb-6 max-w-sm mx-auto text-muted-foreground"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  Color. Audits. How it works. Coriano&apos;s story.
                </p>
                <div className="mt-6 flex flex-col gap-2 max-w-sm mx-auto">
                  {[
                    "What does color do for a product?",
                    "What is a color audit?",
                    "Tell me about Coriano.",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => {
                        setInput(prompt)
                        setTimeout(() => inputRef.current?.focus(), 0)
                      }}
                      className="text-left text-sm px-4 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {prompt}
                    </button>
                  ))}
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
                role="article"
                aria-label={message.role === 'user' ? 'Your message' : 'Chroma response'}
              >
                {message.role === 'assistant' && (
                  <img
                    src="/images/chroma-icon.png"
                    alt="Chroma avatar"
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                    style={{ objectPosition: "50% 30%" }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm transition-all duration-500",
                    message.role === 'user'
                      ? "max-w-[90%] ml-auto"
                      : "text-foreground max-w-[85%] border-l-4"
                  )}
                  style={message.role === 'user'
                    ? { backgroundColor: toneBgPastel, color: toneColor }
                    : { backgroundColor: soothingBg, borderLeftColor: soothingBorder }
                  }
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
              <div
                className="flex items-start gap-2 justify-start pl-2"
                role="status"
                aria-live="polite"
                aria-label="Chroma is typing"
              >
                <img
                  src="/images/chroma-icon.png"
                  alt="Chroma avatar"
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                  style={{ objectPosition: "50% 30%" }}
                  aria-hidden="true"
                />
                <div className="bg-muted rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Chroma is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t bg-background">
            <div className="flex items-center gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter message"
                disabled={isLoading}
                className="flex-1 min-h-[60px] max-h-[200px] resize-y"
                aria-label="Chat input"
                aria-describedby="input-instructions"
                aria-invalid="false"
                rows={1}
              />
              <span id="input-instructions" className="sr-only">
                Type your message and press Enter to send, or Shift+Enter for a new line
              </span>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
              <Button
                onClick={handleSend}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && input.trim() && !isLoading) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                disabled={!input.trim() || isLoading}
                size="icon"
                variant="ghost"
                className="h-8 w-8 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors duration-500"
                style={{ color: toneColor }}
                aria-label={isLoading ? "Sending message" : "Send message"}
                aria-disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className="!z-[300] !bg-gray-900 !text-white border-gray-700 [&>*]:!text-white">
                  {isLoading ? "Sending..." : "Send message"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
        </>
      )}
    </>
  )
}
