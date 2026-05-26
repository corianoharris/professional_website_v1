"use client"

import Image from "next/image"
import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Check } from "lucide-react"

interface Tier {
  name: string
  tagline: string
  price?: string
  priceNote?: string
  description: string
  features: string[]
  showTool?: boolean
  image?: string
  addon?: { label: string; price: string }
}

const entryTier: Tier = {
  name: "15-min Color Call",
  tagline: "Start here",
  price: "Free",
  description: "Talk to me for 15 minutes. I will tell you exactly where to start.",
  features: ["Any service, any question", "No commitment", "Walk away with a clear next step"],
}

const suiteTiers: Tier[] = [
  {
    name: "Screen Color Checker",
    tagline: "Color check",
    price: "$499",
    priceNote: "per page",
    description: "Share a link to your live page. I check what each color is communicating and test what colorblind users see. Fast. Clear. Done.",
    features: ["See what each color is saying", "Know what colorblind users see", "Get a clear fix list"],
    image: "/images/screen_analysis.png",
  },
  {
    name: "The Color Naming Cleaner",
    tagline: "Code cleanup",
    price: "$1,500",
    priceNote: "flat fee per repository",
    description: "Color names like Blue-500 and Gray-300 mean nothing to the computer. I scan your code, find every one, and rename them so your whole team knows exactly why each color is there.",
    features: ["See every color name in your code", "Know what needs to change", "Get a clear plan"],
    image: "/images/token_auditor.png",
  },
  {
    name: "The Color Mood Finder",
    tagline: "Color science",
    price: "$3,500",
    priceNote: "flat fee",
    description: "Colors talk to the brain. I test your full palette to see exactly what it makes people feel. Safe and ready to act. Or unsure and confused.",
    features: ["See if your colors work together", "Know how people feel when they look", "See what works and what does not"],
    image: "/images/colors_comparison.png",
  },
  {
    name: "The Color Code Book",
    tagline: "Guide",
    price: "Free",
    description: "A clear set of rules for picking colors that mean something. Pick it up and know exactly what to do.",
    features: ["A simple color naming system", "Rules your whole team can follow", "Ready to use on day one"],
    addon: { label: "Want me to set it up in your system for you?", price: "+ $1,800" },
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

function TierCard({ t }: { t: Tier }) {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col ${
        t.tagline === "Start here"
          ? "border-[#06b6d4] bg-[#06b6d4]/5 dark:bg-[#06b6d4]/10 hover:shadow-lg hover:shadow-[#06b6d4]/20"
          : t.tagline === "Color science"
            ? "border-[#7c3aed]/40 bg-[#7c3aed]/5 dark:bg-[#7c3aed]/10 hover:border-[#7c3aed]/50 hover:shadow-lg hover:shadow-[#7c3aed]/20"
            : t.tagline === "Guide"
              ? "border-amber-400/40 bg-amber-50/30 dark:bg-amber-900/10 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-400/20"
              : "border-border bg-card hover:border-[#14b8a6]/30 hover:shadow-lg hover:shadow-[#14b8a6]/20"
      } transition-all`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wider ${
          t.tagline === "Start here" ? "text-[#06b6d4]"
          : t.tagline === "Color science" ? "text-[#7c3aed]"
          : t.tagline === "Guide" ? "text-amber-500"
          : "text-[#14b8a6]"
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
      {t.image ? (
        <div className="relative w-full h-28 rounded-lg overflow-hidden mb-4">
          <Image src={t.image} alt={t.name} fill className="object-cover object-top" />
        </div>
      ) : t.showTool && <ToolPreview />}
      <ul className="space-y-2">
        {t.features.map((f: string) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-[#14b8a6] shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {t.addon && (
        <div className="mt-5 pt-4 border-t border-amber-300/40 flex items-start justify-between gap-3">
          <p className="text-xs text-muted-foreground">{t.addon.label}</p>
          <span className="text-xs font-bold text-amber-500 whitespace-nowrap">{t.addon.price}</span>
        </div>
      )}
    </div>
  )
}

export function ServicesMai() {
  return (
    <MaiScrollSection
      id="services"
      title="Where to start."
    >
      {/* Entry point */}
      <div className="mb-8">
        <TierCard t={entryTier} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {suiteTiers.map((t) => (
          <TierCard key={t.name} t={t} />
        ))}
      </div>

    </MaiScrollSection>
  )
}
