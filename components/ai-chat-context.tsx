"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AIChatContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggleChat: () => void
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <AIChatContext.Provider value={{ isOpen, setIsOpen, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  )
}

export function useAIChat() {
  const context = useContext(AIChatContext)
  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider")
  }
  return context
}

