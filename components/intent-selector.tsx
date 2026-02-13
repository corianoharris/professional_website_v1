"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { intentOptions, type IntentId } from "@/lib/intent-landing"
import { useIntentLanding } from "@/components/intent-landing-context"
import { cn } from "@/lib/utils"

export function IntentSelector() {
  const { hasSelected, isReady, setIntent } = useIntentLanding()
  const [selected, setSelected] = useState<IntentId | "">("")

  const handleSelect = (value: string) => {
    const id = value as IntentId
    setSelected(id)
    setIntent(id)
  }

  const handleSkip = () => {
    setIntent("exploring")
  }

  if (!isReady || hasSelected) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 transition-opacity duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intent-heading"
      aria-describedby="intent-description"
    >
      {/* Frosted overlay - IntentBackground gradient shows through subtly */}
      <div className="absolute inset-0 bg-background/95 dark:bg-gray-950/95 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full animate-in fade-in duration-500">
        <h1
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-center text-foreground"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          What&apos;s driving your visit today?
        </h1>
        <p
          id="intent-description"
          className="text-muted-foreground text-center text-lg"
        >
          I&apos;ll tailor the experience to your intent.
        </p>

        <div className="w-full max-w-sm">
          <Select value={selected} onValueChange={handleSelect}>
            <SelectTrigger
              className={cn(
                "w-full h-12 text-base font-medium",
                "border-2 border-foreground/20 hover:border-foreground/40",
                "bg-background/95 dark:bg-background/95"
              )}
            >
              <SelectValue placeholder="Choose one..." />
            </SelectTrigger>
            <SelectContent className="z-[70]">
              {intentOptions.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip to site
        </Button>
      </div>
    </div>
  )
}
