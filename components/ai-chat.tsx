"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { X, Send, Loader2, RefreshCw, Smile, Settings, Type, Contrast, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAIChat } from "@/components/ai-chat-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "@/components/theme-provider"
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

export function AIChat() {
  const { isOpen, setIsOpen } = useAIChat()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [typingMessage, setTypingMessage] = useState<string | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [smallModalOpen, setSmallModalOpen] = useState(false)
  const smallModalRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  // Chat-specific accessibility settings (all settings are chat-only)
  const [chatFontSize, setChatFontSize] = useState<ChatFontSize>("normal")
  const [chatHighContrast, setChatHighContrast] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef(0)
  const triggerButtonRef = useRef<HTMLElement | null>(null)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)

  // Load chat-specific settings from localStorage
  useEffect(() => {
    const savedChatFontSize = localStorage.getItem("chatFontSize") as ChatFontSize | null
    const savedChatHighContrast = localStorage.getItem("chatHighContrast")
    
    if (savedChatFontSize) setChatFontSize(savedChatFontSize)
    if (savedChatHighContrast !== null) setChatHighContrast(savedChatHighContrast === "true")
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
    
    // Add welcome message after chat opens
    setTimeout(() => {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: "Hi! I'm Chroma, Coriano's supportive AI assistant. I'm here to help answer questions about Coriano's work, services, and expertise—or just chat about colors, design, UX, and development.\n\nEnjoy your experience exploring the site, and Coriano would love to hear from you!"
      }
      setMessages([welcomeMessage])
    }, 300)
  }

  // Apply chat-specific font size
  useEffect(() => {
    if (!chatContainerRef.current) return
    
    const container = chatContainerRef.current
    container.classList.remove("chat-font-normal", "chat-font-large", "chat-font-extra-large")
    container.classList.add(`chat-font-${chatFontSize}`)
    localStorage.setItem("chatFontSize", chatFontSize)
  }, [chatFontSize])

  // Apply chat-specific high contrast
  useEffect(() => {
    if (!chatContainerRef.current) return
    
    const container = chatContainerRef.current
    if (chatHighContrast) {
      container.classList.add("chat-high-contrast")
    } else {
      container.classList.remove("chat-high-contrast")
    }
    localStorage.setItem("chatHighContrast", String(chatHighContrast))
  }, [chatHighContrast])

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
      // Focus input after a short delay
      setTimeout(() => inputRef.current?.focus(), 100)
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
        // Close popovers first if open
        if (emojiPickerOpen) {
          setEmojiPickerOpen(false)
          inputRef.current?.focus()
          return
        }
        if (accessibilityOpen) {
          setAccessibilityOpen(false)
          return
        }
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
  }, [isOpen, setIsOpen, emojiPickerOpen, accessibilityOpen])

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

      // Add typing animation for better perceived performance
      // This helps users feel like the response is coming faster, especially on slower connections
      const fullResponse = data.response
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
      {/* Chroma Button with Small Modal - Bottom Left */}
      {!isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50">
          <div className="relative">
            {/* Small Modal - positioned above the button */}
            <div
              ref={smallModalRef}
              className={`absolute bottom-full left-0 mb-3 bg-card border-2 border-[var(--color-brand-purple)]/20 rounded-xl shadow-xl p-4 transition-all duration-300 ${
                smallModalOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
              role="dialog"
              aria-label="Chroma greeting"
              aria-hidden={!smallModalOpen}
            >
              <div className="space-y-4 min-w-[280px] max-w-xs">
                <div className="flex items-start gap-3">
                  <img 
                    src="/images/chroma-icon.png" 
                    alt="Chroma avatar" 
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                    style={{ objectPosition: "50% 30%" }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1">Hi! I'm Chroma 👋</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      I'm Coriano's supportive AI assistant. I can help answer questions about Coriano's work, services, and expertise.
                    </p>
                    <Button
                      onClick={handleOpenFullChat}
                      className="w-full bg-[var(--color-brand-purple)] text-white hover:bg-[var(--color-action-hover)]"
                      aria-label="Open full chat with Chroma"
                    >
                      Chat with Chroma
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <button
              ref={buttonRef}
              onClick={() => setSmallModalOpen(!smallModalOpen)}
              className="bg-[var(--color-brand-purple)] text-white rounded-full p-4 shadow-lg hover:bg-[var(--color-action-hover)] transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)] focus:ring-offset-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ring-2 ring-[var(--color-brand-purple)]/20"
              aria-label="Open Chroma menu"
              aria-expanded={smallModalOpen}
              aria-haspopup="dialog"
            >
              <MessageCircle className={`w-6 h-6 transition-transform duration-300 ${smallModalOpen ? "scale-110" : ""}`} aria-hidden="true" />
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
        className="fixed inset-0 z-[101] flex items-center justify-center p-0 sm:p-4 pointer-events-none"
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
          className="w-full h-full sm:h-[600px] sm:max-w-md md:max-w-2xl flex flex-col shadow-2xl border pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-200 bg-background overflow-hidden focus:outline-none rounded-none sm:rounded-lg"
          tabIndex={-1}
          style={{
            // Ensure modal stays in place on mobile and doesn't resize with keyboard
            maxHeight: '100dvh',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                <h2 id="ai-chat-title" className="text-lg font-semibold mb-1">Chat with Chroma</h2>
                <p id="ai-chat-description" className="text-xs text-muted-foreground">
                  • We're online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Popover open={accessibilityOpen} onOpenChange={setAccessibilityOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Accessibility settings"
                    aria-expanded={accessibilityOpen}
                    className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-64 p-4 z-[200] bg-background border shadow-lg" 
                  align="end" 
                  side="bottom"
                  sideOffset={8}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold mb-3">Chat Accessibility Settings</h3>
                    
                    {/* Font Size - Chat Only */}
                    <div>
                      <p className="text-xs font-medium mb-2">Font Size</p>
                      <div className="space-y-1.5">
                        <Button
                          onClick={() => setChatFontSize("normal")}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setChatFontSize("normal")
                            }
                          }}
                          variant={chatFontSize === "normal" ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-pressed={chatFontSize === "normal"}
                        >
                          <Type className="w-4 h-4 mr-2" />
                          Normal
                        </Button>
                        <Button
                          onClick={() => setChatFontSize("large")}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setChatFontSize("large")
                            }
                          }}
                          variant={chatFontSize === "large" ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-pressed={chatFontSize === "large"}
                        >
                          <Type className="w-5 h-5 mr-2" />
                          Large
                        </Button>
                        <Button
                          onClick={() => setChatFontSize("extra-large")}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setChatFontSize("extra-large")
                            }
                          }}
                          variant={chatFontSize === "extra-large" ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-pressed={chatFontSize === "extra-large"}
                        >
                          <Type className="w-6 h-6 mr-2" />
                          Extra Large
                        </Button>
                      </div>
                    </div>

                    {/* High Contrast - Chat Only */}
                    <div>
                      <p className="text-xs font-medium mb-2">High Contrast</p>
                      <Button 
                        onClick={() => setChatHighContrast(!chatHighContrast)} 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setChatHighContrast(!chatHighContrast)
                          }
                        }}
                        variant={chatHighContrast ? "default" : "outline"} 
                        size="sm"
                        className="w-full justify-start bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-pressed={chatHighContrast}
                      >
                        <Contrast className="w-4 h-4 mr-2" />
                        {chatHighContrast ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Blur input to dismiss keyboard on mobile
                  if (inputRef.current) {
                    inputRef.current.blur()
                  }
                  // Close modal
                  setIsOpen(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    // Blur input to dismiss keyboard on mobile
                    if (inputRef.current) {
                      inputRef.current.blur()
                    }
                    setIsOpen(false)
                  }
                }}
                aria-label="Close chat"
                className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                type="button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 overflow-y-auto overflow-x-visible px-0 py-4 space-y-4 bg-background"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8 px-4">
                <img 
                  src="/images/chroma-icon.png" 
                  alt="Chroma avatar" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
                <p className="font-semibold mb-2">Hi! I'm Chroma</p>
                <p className="text-sm mb-3">
                  I'm Coriano's supportive AI assistant. I'm here to help answer questions about Coriano's work, services, and expertise—or just chat about colors, design, UX, and development.
                </p>
                <p className="text-sm font-medium mb-4">
                  Enjoy your experience exploring the site, and Coriano would love to hear from you!
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
                    "rounded-lg px-4 py-2.5 shadow-md",
                    message.role === 'user'
                      ? "bg-[var(--color-brand-purple)] text-white max-w-[90%] ml-auto -mr-3"
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
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Chroma is thinking...</span>
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            insertEmoji(emoji)
                          }
                        }}
                        className="text-2xl hover:bg-muted rounded p-1.5 transition-colors cursor-pointer flex items-center justify-center aspect-square min-w-[2.5rem] min-h-[2.5rem] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label={`Insert ${emoji} emoji`}
                        title={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter message"
                disabled={isLoading}
                className="flex-1 min-h-[60px] max-h-[200px] resize-none"
                aria-label="Chat input"
                aria-describedby="input-instructions"
                aria-invalid="false"
                rows={1}
              />
              <span id="input-instructions" className="sr-only">
                Type your message and press Enter to send, or Shift+Enter for a new line
              </span>
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
                className="h-8 w-8 flex-shrink-0 text-[var(--color-brand-purple)] hover:text-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label={isLoading ? "Sending message" : "Send message"}
                aria-disabled={!input.trim() || isLoading}
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
      )}
    </>
  )
}

