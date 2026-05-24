"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Check } from "lucide-react"

const benefits = [
  "Color is costing you customers",
  "Your team can't ship fast enough",
  "You've already lost a deal over it",
]

export function QualifierMai() {
  return (
    <MaiScrollSection
      id="qualifier"
      title="Is this for you?"
      subtitle="I work with people ready to fix it."
    >
      <p className="text-center text-foreground font-medium mb-8 max-w-xl mx-auto">
        Your color is broken. You know it. You just can&apos;t prove it yet.
      </p>
      <ul className="space-y-3 max-w-sm mx-auto mb-8">
        {benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="text-center text-muted-foreground text-sm max-w-lg mx-auto">
        If you want a quick fix or the cheapest option, I&apos;m not your person.
      </p>
    </MaiScrollSection>
  )
}
