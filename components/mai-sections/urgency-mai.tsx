"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

const triggers = [
  { quote: "We'll fix the colors after launch", cost: "Color debt costs 10x more to fix." },
  { quote: "Our designers can handle it", cost: "$180K/year in revision cycles." },
  { quote: "Users won't notice bad colors", cost: "67% abandon apps with confusing interfaces." },
  { quote: "This rebrand will be quick", cost: "Six months later, still updating hex values." },
]

export function UrgencyMai() {
  return (
    <MaiScrollSection
      id="urgency"
      title="The story you tell yourself"
      subtitle="Everyone says it. Then the board asks why."
      variant="muted"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {triggers.map((t) => (
          <div
            key={t.quote}
            className="rounded-xl border border-[#f97316]/20 bg-background p-6 hover:border-[#f97316]/40 transition-colors"
          >
            <p className="font-semibold text-foreground italic">&quot;{t.quote}&quot;</p>
            <p className="text-muted-foreground mt-2">{t.cost}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-lg font-semibold text-center">
        The people who win? They ship before they&apos;re ready. They <span className="highlighter">act now</span>.
      </p>
    </MaiScrollSection>
  )
}
