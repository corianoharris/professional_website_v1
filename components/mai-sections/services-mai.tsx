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
  showTool?: boolean
}

const tiers: Tier[] = [
  {
    name: "15-min Color ROI Call",
    tagline: "Start free",
    price: "Free",
    description: "15 minutes. The truth about what color is costing you.",
    features: ["Cost-of-confusion snapshot", "Your biggest color risk identified", "Next-step recommendations"],
  },
  {
    name: "Screen Analysis Audit",
    tagline: "Free audit",
    price: "Free",
    priceNote: "first page · $299 per additional page",
    description: "Share any screen. Get a full color breakdown. See what each color says, what it should say, and the gap.",
    features: ["Color intent mapping per screen", "Cost-of-confusion score", "Prioritized fix recommendations"],
    showTool: true,
  },
  {
    name: "Color Blindness Audit",
    tagline: "Accessibility",
    price: "$3,500",
    priceNote: "flat fee per product module",
    description: "Protect against lost contracts and legal risk. Know exactly what 8% of your users see. Yes, that includes the buyers who matter most.",
    features: ["WCAG compliance analysis", "8% user experience recovery", "Remediation report with intent mapping"],
    showTool: true,
  },
  {
    name: "Strategy & Design Systems",
    tagline: "Primary",
    price: "From $15,000",
    description: "One system. Everyone trusts it. Design and engineering aligned.",
    features: ["Intent mapping", "Token architecture", "Design system build"],
    showTool: true,
  },
]

function ToolPreview() {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3 mb-4 text-xs font-mono">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="ml-2 text-muted-foreground text-[10px]">Color Code Studio™</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-red-500 shrink-0" />
          <div className="flex-1 h-1.5 rounded bg-red-200 dark:bg-red-900/40">
            <div className="h-full w-[72%] rounded bg-red-500" />
          </div>
          <span className="text-muted-foreground text-[10px]">Error · wrong intent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-yellow-400 shrink-0" />
          <div className="flex-1 h-1.5 rounded bg-yellow-100 dark:bg-yellow-900/40">
            <div className="h-full w-[45%] rounded bg-yellow-400" />
          </div>
          <span className="text-muted-foreground text-[10px]">Warning · ambiguous</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#14b8a6] shrink-0" />
          <div className="flex-1 h-1.5 rounded bg-teal-100 dark:bg-teal-900/40">
            <div className="h-full w-[91%] rounded bg-[#14b8a6]" />
          </div>
          <span className="text-muted-foreground text-[10px]">Success · clear</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-right">Cost-of-confusion score: 68 / 100</p>
    </div>
  )
}

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function ServicesMai() {
  return (
    <MaiScrollSection
      id="services"
      title="Choose where to start."
      subtitle="Start free. Just clarity."
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
            <p className="text-muted-foreground text-sm mb-4">{t.description}</p>
            {t.showTool && <ToolPreview />}
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
