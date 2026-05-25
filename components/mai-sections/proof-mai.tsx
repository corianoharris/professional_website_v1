"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
const scenarios = [
  {
    label: "",
    paragraphs: [
      <>Something feels off. The colors don&apos;t match. Users hesitate. You see it.</>,
      <>That&apos;s not just a glitch. It&apos;s a broken promise to your user, and it is costing you deals before they even sign.</>,
      <>I point out where the work is broken. Then, I fix it.</>,
    ],
  },
]

export function ProofMai() {
  return (
    <MaiScrollSection
      id="proof"
      title="Sound familiar?"
      variant="muted"
    >
      <div className="max-w-xl mx-auto mb-10">
        {scenarios.map((s, i) => (
          <div key={i} className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            {s.paragraphs.map((p, j) => (
              <p
                key={j}
                className={
                  j === s.paragraphs.length - 1
                    ? "text-lg font-bold text-[#14b8a6] pt-2 border-t border-border"
                    : "text-lg text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </MaiScrollSection>
  )
}
