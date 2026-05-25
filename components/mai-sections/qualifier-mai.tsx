"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Check } from "lucide-react"

const benefits = [
  "You own a product with a UI.",
  "You know color leaves the station with every single deploy.",
  "You believe accessibility is a promise, not a checklist.",
]

export function QualifierMai() {
  return (
    <MaiScrollSection
      id="qualifier"
      title="Is this for you?"
      subtitle="I work with people who refuse to ship sloppy work."
    >
      <ul className="space-y-3 max-w-sm mx-auto mb-8">
        {benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <Check className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </MaiScrollSection>
  )
}
