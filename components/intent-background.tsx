"use client"

import { useIntentLanding } from "@/components/intent-landing-context"
import { getIntentById } from "@/lib/intent-landing"
import { cn } from "@/lib/utils"

const DEFAULT_GRADIENT =
  "linear-gradient(45deg, #FFB3BA, #FFDFBA, #FFFFBA, #BAFFC9, #BAE1FF, #E1BAFF, #FFBAE1)"

export function IntentBackground() {
  const { intent, hasSelected } = useIntentLanding()

  const intentOption = intent ? getIntentById(intent) : null
  const gradient =
    hasSelected && intentOption
      ? `linear-gradient(135deg, ${intentOption.bgColor} 0%, ${intentOption.bgColorLight} 50%, ${intentOption.bgColor} 100%)`
      : DEFAULT_GRADIENT

  return (
    <div
      className="fixed inset-0 -z-10 transition-[background] duration-700 ease-out"
      style={{
        background: gradient,
        backgroundSize: hasSelected && intentOption ? "100% 100%" : "400% 400%",
        animation:
          hasSelected && intentOption ? "none" : "funGradient 15s ease infinite",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      aria-hidden="true"
    />
  )
}
