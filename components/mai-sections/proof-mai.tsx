"use client"

import { ArrowDown } from "lucide-react"
import { MaiScrollSection } from "@/components/mai-scroll-section"

const display = { fontFamily: "var(--font-baloo2), sans-serif" }

/** What color confusion looks like from the inside. Each symptom wears the intent it breaks. */
const symptoms = [
  {
    where: "At the button",
    line: "Users pause before they click.",
    detail: "The main action looks like everything else, so they read instead of act.",
    swatch: "var(--intent-trust)",
  },
  {
    where: "In support",
    line: "The same question, every week.",
    detail: "Was that saved? Did it go through? Color was supposed to answer that.",
    swatch: "var(--intent-growth)",
  },
  {
    where: "In the audit",
    line: "The contrast check fails again.",
    detail: "Someone fixes one screen. The next release brings it back.",
    swatch: "var(--intent-energy)",
  },
]

export function ProofMai() {
  return (
    <MaiScrollSection id="proof" title="Sound familiar?" variant="muted">
      <div className="flex flex-col gap-8">
        <ul className="grid gap-4 md:grid-cols-3">
          {symptoms.map((s) => (
            <li key={s.where} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.swatch }} aria-hidden />
                {s.where}
              </span>
              <p className="text-2xl font-extrabold leading-tight" style={display}>{s.line}</p>
              <p className="text-sm text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg text-muted-foreground">
            That pause costs you. It shows up in support tickets, and in deals that quietly don&apos;t close.{" "}
            <span className="font-semibold text-foreground">I find where the color is broken. Then I fix it.</span>
          </p>
          <a
            href="#palette-read"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:border-trust hover:text-trust"
          >
            See it in your colors <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </MaiScrollSection>
  )
}
