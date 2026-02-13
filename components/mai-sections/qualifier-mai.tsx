"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Check, X } from "lucide-react"

const benefits = [
  "You have a design system (but it's not working)",
  "You're scaling and don't have a design system yet",
  "Color confusion is costing $100K+/year",
  "Designers and engineers fight about every color choice",
  "You've failed accessibility audits or lost contracts",
]
const notFor = [
  "You just want a 'color refresh' or rebrand",
  "You think color is purely creative work",
  "You're looking for the cheapest option",
]

export function QualifierMai() {
  return (
    <MaiScrollSection
      id="qualifier"
      title="Is this for you?"
      subtitle="We're looking for people who get it. Everyone else? That's fine too."
    >
      <p className="text-center text-foreground font-medium mb-8 max-w-xl mx-auto">
        I write for the Head of Product at a 40-person SaaS who&apos;s lost two contracts to accessibility. She knows color is broken. She can&apos;t prove it yet.
      </p>
      <p className="text-center text-muted-foreground text-sm mb-10 max-w-lg mx-auto">
        If you want a quick rebrand or the cheapest option, this isn&apos;t for you. And that&apos;s fine.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" /> This is for you if:
          </h3>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
            <X className="w-5 h-5" /> Not for you if:
          </h3>
          <ul className="space-y-3">
            {notFor.map((b) => (
              <li key={b} className="flex gap-2">
                <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MaiScrollSection>
  )
}
