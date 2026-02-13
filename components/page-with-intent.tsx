"use client"

import { useIntentLanding } from "@/components/intent-landing-context"

interface PageWithIntentProps {
  children: React.ReactNode
}

export function PageWithIntent({ children }: PageWithIntentProps) {
  const { hasSelected } = useIntentLanding()

  if (!hasSelected) return null

  return <div className="min-h-screen relative">{children}</div>
}
