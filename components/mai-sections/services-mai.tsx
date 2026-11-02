"use client"

import { ArrowRight } from "lucide-react"
import { MaiScrollSection } from "@/components/mai-scroll-section"

interface Offer {
  name: string
  kind: string
  price: string
  priceNote: string
  description: string
  youGet: string
  /** Intent hue for the swatch strip and kind label */
  swatch: string
  labelClass: string
  /** Drop cap color, spelled out so Tailwind picks it up */
  dropCapClass: string
}

const reports: Offer[] = [
  {
    name: "Page check report",
    kind: "Report · Screen Color Checker",
    price: "$499",
    priceNote: "per page",
    description: "Send a live link. You see what each color tells your users, and what color-blind users actually see.",
    youGet: "A PDF for the page: its mood, every contrast failure, and the fix for each one.",
    swatch: "var(--intent-trust)",
    labelClass: "text-trust",
    dropCapClass: "first-letter:text-trust",
  },
  {
    name: "Palette mood report",
    kind: "Report · Color Mood Finder",
    price: "$499",
    priceNote: "per token file, up to 60 colors",
    description: "Upload a design token file. You see how much of your palette backs the feeling you want, and the colors that work against it.",
    youGet: "A PDF for the file: the mood of every color, the colors people see when they decide, and a suggested replacement for each one that needs work.",
    swatch: "var(--intent-energy)",
    labelClass: "text-energy",
    dropCapClass: "first-letter:text-energy",
  },
]

const services: Offer[] = [
  {
    name: "The Color Naming Cleaner",
    kind: "Code cleanup",
    price: "$1,500",
    priceNote: "per repository",
    description: "Fixes the colors you already have. Slate-200 tells your team nothing, so I rename every color in your code for the job it does.",
    youGet: "Renamed tokens in your repo, plus a before-and-after summary of your clarity rate.",
    swatch: "var(--intent-growth)",
    labelClass: "text-growth",
    dropCapClass: "first-letter:text-growth",
  },
  {
    name: "Palette mood testing",
    kind: "Color science",
    price: "$2,500",
    priceNote: "per repository",
    description: "Color changes how people feel at the moment they decide. I test your palette against your screens and your audience so users feel safe enough to act.",
    youGet: "Palette mood reports for every token file, plus my review of what to change and why.",
    swatch: "var(--intent-energy)",
    labelClass: "text-energy",
    dropCapClass: "first-letter:text-energy",
  },
]

const bundle = [
  { label: "Page check reports, 3 pages", price: "$1,497", swatch: "var(--intent-trust)" },
  { label: "Color naming cleanup", price: "$1,500", swatch: "var(--intent-growth)" },
  { label: "Palette mood testing", price: "$2,500", swatch: "var(--intent-energy)" },
]

const display = { fontFamily: "var(--font-baloo2), sans-serif" }

function OfferCard({ o }: { o: Offer }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl">
      <div className="h-1.5" style={{ background: o.swatch }} aria-hidden />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className={`text-xs font-semibold uppercase tracking-wider ${o.labelClass}`}>{o.kind}</span>
        <h3 className="text-xl font-bold leading-tight" style={display}>{o.name}</h3>
        <p
          className={`text-sm text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-[2.75rem] first-letter:font-extrabold first-letter:leading-[0.8] ${o.dropCapClass}`}
        >
          {o.description}
        </p>
        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">You get</span>
          <p className="text-sm">{o.youGet}</p>
        </div>
        <div className="flex items-baseline gap-2 border-t border-border pt-4">
          <span className="text-3xl font-extrabold tabular-nums" style={display}>{o.price}</span>
          <span className="text-xs text-muted-foreground">{o.priceNote}</span>
        </div>
      </div>
    </article>
  )
}

function TierHeading({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-col gap-1 pt-4 md:flex-row md:items-baseline md:justify-between">
      <h3 className="text-2xl font-bold leading-tight" style={display}>{title}</h3>
      <p className="text-sm text-muted-foreground">{note}</p>
    </div>
  )
}

export function ServicesMai() {
  return (
    <MaiScrollSection id="services" title="Where to start.">
      <div className="flex flex-col gap-6">
        {/* Step one: the free call */}
        <div className="relative overflow-hidden rounded-2xl border border-transparent bg-panel p-8 text-panel-foreground md:p-10 dark:border-border">
          {/* Color Code intent strip: trust, growth, belonging, energy */}
          <div className="absolute inset-y-0 right-0 hidden w-40 md:flex" aria-hidden>
            {["var(--intent-trust)", "var(--intent-growth)", "var(--intent-belonging-solid)", "var(--intent-energy-solid)"].map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>
          <div className="relative flex max-w-xl flex-col gap-4 md:pr-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-panel-trust">Start here</span>
            <h3 className="text-3xl font-extrabold leading-tight md:text-4xl" style={display}>
              15-min Color Call. <span className="text-panel-trust">Free.</span>
            </h3>
            <p className="text-base text-panel-muted">
              I show you where your color is costing you, and the one thing to fix first.
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-panel-foreground px-5 py-3 text-sm font-semibold text-panel transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-trust focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
            >
              Book the call <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Tier one: self-serve reports */}
        <TierHeading title="Start with a report" note="The tool runs it. You get a branded PDF the same day." />
        <div className="grid gap-6 md:grid-cols-2">
          {reports.map((o) => (
            <OfferCard key={o.name} o={o} />
          ))}
        </div>

        {/* Tier two: done-for-you work */}
        <TierHeading
          title="Or have it done for you"
          note="I do the work in your code. Priced per repository, because the work grows with the codebase."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((o) => (
            <OfferCard key={o.name} o={o} />
          ))}
        </div>

        {/* The method, installed */}
        <article className="grid gap-8 rounded-2xl border-2 border-foreground bg-card p-6 md:grid-cols-[3fr_2fr] md:p-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-belonging">Complete setup</span>
            <h3 className="text-2xl font-bold leading-tight md:text-3xl" style={display}>The Color Code System</h3>
            <p className="text-base text-muted-foreground">
              Your whole color system, done for you. I rename the colors you have, test your palette so users feel safe enough to act, then set up naming rules in your code so every new color follows them.
            </p>
            <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-border pt-4">
              <span className="text-4xl font-extrabold tabular-nums" style={display}>$3,999</span>
              <span className="text-sm text-muted-foreground">per repository</span>
              <span className="rounded-full border border-growth px-3 py-0.5 text-xs font-semibold text-growth">Save $1,498</span>
            </div>
          </div>
          <ul className="flex flex-col self-center text-sm">
            {bundle.map((b) => (
              <li key={b.label} className="flex items-center gap-3 border-t border-border py-3">
                <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: b.swatch }} aria-hidden />
                <span className="flex-1">{b.label}</span>
                <span className="tabular-nums text-muted-foreground">{b.price}</span>
              </li>
            ))}
            <li className="flex items-center gap-3 border-t border-border py-3 font-semibold">
              <span className="h-3 w-3 shrink-0 rounded-sm" style={{ background: "var(--intent-belonging)" }} aria-hidden />
              <span className="flex-1">Naming rules in your code</span>
              <span className="text-growth">Only here</span>
            </li>
            <li className="flex items-center gap-3 border-t-2 border-foreground py-3 font-semibold">
              <span className="h-3 w-3 shrink-0" aria-hidden />
              <span className="flex-1">Bought separately</span>
              <span className="tabular-nums text-muted-foreground line-through">$5,497</span>
            </li>
          </ul>
        </article>
      </div>
    </MaiScrollSection>
  )
}
