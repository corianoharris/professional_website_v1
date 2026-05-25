"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

export function AboutMai() {
  return (
    <MaiScrollSection
      id="about"
      title="About."
      variant="muted"
    >
      <div className="max-w-xl mx-auto">
        <div className="space-y-5 text-left">
          <p className="text-foreground text-lg leading-relaxed">
            I study petals in botanical gardens. Not because they&apos;re pretty. Because they&apos;re precise.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Color is a signal. It&apos;s the first thing your brain notices. It decides: safe or risky, clear or not, trust or doubt.
          </p>
          <p className="text-foreground text-lg leading-relaxed font-medium">
            I build color systems that say the right thing. Every time.
          </p>
        </div>
      </div>
    </MaiScrollSection>
  )
}
