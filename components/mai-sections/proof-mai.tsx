"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const scenarios = [
  {
    before: "Blues scattered across Figma and code. No single source of truth. Releases stalled.",
    after: "One system. Design and engineering aligned. Revision cycles cut.",
  },
  {
    before: "Color Accessibility audits kept failing. We were about to lose a big contract.",
    after: "Passed. Contract secured. Costs recovered.",
  },
  {
    before: "Checkout was failing. Users couldn't tell errors from success. Conversion was a guess.",
    after: "Intent-driven palette. Clear feedback. Conversions improved.",
  },
]

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function ProofMai() {
  return (
    <MaiScrollSection
      id="proof"
      title="Here's what changes."
      subtitle="The same problems. Solved."
      variant="muted"
    >
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {scenarios.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-background p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Before</p>
            <p className="text-sm text-muted-foreground italic mb-4">&quot;{s.before}&quot;</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#14b8a6] mb-1">After</p>
            <p className="text-lg font-bold text-[#14b8a6]">{s.after}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        The teams who act before the next deadline are the ones who find out what&apos;s possible.
      </p>
      <div className="flex justify-center">
        <Button
          onClick={scrollToContact}
          className="bg-[#f97316] hover:bg-[#ea580c] text-white"
        >
          Book the 15-min Audit
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </MaiScrollSection>
  )
}
