"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { MaiScrollSection } from "@/components/mai-scroll-section"

interface Service {
  name: string
  kind: string
  price: string
  priceNote: string
  description: string
  image: string
  /** Intent hue for the swatch strip and kind label */
  swatch: string
  labelClass: string
}

const services: Service[] = [
  {
    name: "Screen Color Checker",
    kind: "Color check",
    price: "$499",
    priceNote: "per page",
    description: "Send a live link. I show you what each color tells your users, and what color-blind users actually see.",
    image: "/images/screen_analysis.png",
    swatch: "var(--intent-trust)",
    labelClass: "text-trust",
  },
  {
    name: "The Color Naming Cleaner",
    kind: "Code cleanup",
    price: "$1,500",
    priceNote: "per repository",
    description: "Fixes the colors you already have. Slate-200 tells your team nothing, so I rename every color in your code for the job it does.",
    image: "/images/token_auditor.png",
    swatch: "var(--intent-growth)",
    labelClass: "text-growth",
  },
  {
    name: "The Color Mood Finder",
    kind: "Color science",
    price: "$2,500",
    priceNote: "per repository",
    description: "Color changes how people feel at the moment they decide. I test your palette so users feel safe enough to act.",
    image: "/images/colors_comparison.png",
    swatch: "var(--intent-belonging)",
    labelClass: "text-belonging",
  },
]

const display = { fontFamily: "var(--font-baloo2), sans-serif" }

function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl">
      <div className="h-1.5" style={{ background: s.swatch }} aria-hidden />
      <div className="relative h-36 overflow-hidden bg-muted">
        <Image
          src={s.image}
          alt=""
          fill
          sizes="(min-width: 768px) 280px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className={`text-xs font-semibold uppercase tracking-wider ${s.labelClass}`}>{s.kind}</span>
        <h3 className="text-xl font-bold leading-tight" style={display}>{s.name}</h3>
        <p className="text-sm text-muted-foreground">{s.description}</p>
        <div className="mt-auto flex items-baseline gap-2 border-t border-border pt-4">
          <span className="text-3xl font-extrabold tabular-nums" style={display}>{s.price}</span>
          <span className="text-xs text-muted-foreground">{s.priceNote}</span>
        </div>
      </div>
    </article>
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

        {/* Then: the work */}
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.name} s={s} />
          ))}
        </div>

        {/* The method, installed */}
        <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl">
          <div className="h-1.5" style={{ background: "var(--intent-attention)" }} aria-hidden />
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-attention">Complete setup</span>
              <h3 className="text-xl font-bold leading-tight" style={display}>The Color Code System</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Your whole color system, done for you. I rename the colors you have, test your palette so users feel safe enough to act, then set up naming rules in your code so every new color follows them.
              </p>
            </div>
            <div className="flex items-baseline gap-2 border-t border-border pt-4 md:border-0 md:pt-0">
              <span className="text-3xl font-extrabold tabular-nums" style={display}>$4,500</span>
              <span className="text-xs text-muted-foreground">per repository</span>
            </div>
          </div>
        </article>
      </div>
    </MaiScrollSection>
  )
}
