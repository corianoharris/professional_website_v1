"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { IntentId } from "@/lib/intent-landing"
import { INTENT_STORAGE_KEY, getIntentById } from "@/lib/intent-landing"

interface IntentLandingContextType {
  intent: IntentId | null
  hasSelected: boolean
  isReady: boolean
  setIntent: (id: IntentId) => void
  clearIntent: () => void
}

const IntentLandingContext = createContext<IntentLandingContextType | undefined>(
  undefined
)

export function IntentLandingProvider({ children }: { children: ReactNode }) {
  const [intent, setIntentState] = useState<IntentId | null>(null)
  const [hasSelected, setHasSelected] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(INTENT_STORAGE_KEY) as IntentId | null
    if (stored && getIntentById(stored)) {
      setIntentState(stored)
      setHasSelected(true)
    }
    setIsReady(true)
  }, [])

  const setIntent = useCallback((id: IntentId) => {
    sessionStorage.setItem(INTENT_STORAGE_KEY, id)
    setIntentState(id)
    setHasSelected(true)
  }, [])

  const clearIntent = useCallback(() => {
    sessionStorage.removeItem(INTENT_STORAGE_KEY)
    setIntentState(null)
    setHasSelected(false)
  }, [])

  return (
    <IntentLandingContext.Provider
      value={{ intent, hasSelected, isReady, setIntent, clearIntent }}
    >
      {children}
    </IntentLandingContext.Provider>
  )
}

export function useIntentLanding() {
  const context = useContext(IntentLandingContext)
  if (context === undefined) {
    throw new Error("useIntentLanding must be used within IntentLandingProvider")
  }
  return context
}
