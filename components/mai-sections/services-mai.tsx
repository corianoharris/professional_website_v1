"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

interface Tier {
  name: string
  tagline: string
  price?: string
  priceNote?: string
  description: string
  features: string[]
}

const tiers: Tier[] = [
  {
    name: "15-min Color ROI Call",
    tagline: "Start free",
    price: "Free",
    description: "15 minutes. No pitch. The truth about what color is costing you.",
    features: ["Cost-of-confusion snapshot", "Your biggest color risk identified", "Next-step recommendations"],
  },
  {
    name: "Screen Analysis Audit",
    tagline: "Free audit",
    price: "Free",
    priceNote: "first page · $299 per additional page",
    description: "Share any screen. Get a full color intent breakdown — what each color is communicating, what it should be communicating, and the gap between the two.",
    features: ["Color intent mapping per screen", "Cost-of-confusion score", "Prioritized fix recommendations"],
  },
  {
    name: "Color Blindness Audit",
    tagline: "Accessibility",
    price: "$3,499",
    priceNote: "flat fee per product module",
    description: "Protect against lost contracts and legal liability. Know exactly what 8% of your users — including enterprise decision-makers — actually see.",
    features: ["WCAG compliance analysis", "8% user experience recovery", "Remediation report with intent mapping"],
  },
  {
    name: "Strategy & Design Systems",
    tagline: "Primary",
    price: "From $14,999",
    description: "One system. Everyone trusts it. Design and engineering aligned.",
    features: ["Intent mapping", "Token architecture", "Design system build"],
  },
  {
    name: "Implementation & Enterprise",
    tagline: "Scale",
    price: "Custom",
    description: "Scale without the chaos. Validation. Implementation. Ongoing alignment.",
    features: ["Product validation", "Code/token support", "Ongoing alignment"],
  },
]

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function ServicesMai() {
  return (
    <MaiScrollSection
      id="services"
      title="How we work together"
      subtitle="Start free. No commitment. Just clarity."
    >
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl border p-6 flex flex-col ${
              t.tagline === "Start free" || t.tagline === "Free audit"
                ? "border-[#06b6d4] bg-[#06b6d4]/5 dark:bg-[#06b6d4]/10"
                : t.tagline === "Accessibility"
                  ? "border-[#7c3aed]/40 bg-[#7c3aed]/5 dark:bg-[#7c3aed]/10 hover:border-[#7c3aed]/50"
                  : "border-border bg-card hover:border-[#14b8a6]/30"
            } transition-all`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                t.tagline === "Start free" || t.tagline === "Free audit" ? "text-[#06b6d4]"
                : t.tagline === "Accessibility" ? "text-[#7c3aed]"
                : t.tagline === "Primary" ? "text-[#14b8a6]"
                : "text-muted-foreground"
              }`}
            >
              {t.tagline}
            </span>
            <h3 className="text-xl font-semibold mt-2 mb-1">{t.name}</h3>
            {t.price && (
              <div className="mb-3">
                <span className={`text-2xl font-bold ${t.price === "Free" ? "text-[#06b6d4]" : "text-foreground"}`}>
                  {t.price}
                </span>
                {t.priceNote && (
                  <span className="text-xs text-muted-foreground ml-2">{t.priceNote}</span>
                )}
              </div>
            )}
            <p className="text-muted-foreground text-sm mb-4 flex-1">{t.description}</p>
            <ul className="space-y-2">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#14b8a6] shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
