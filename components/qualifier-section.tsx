"use client"

import { Check, X } from "lucide-react"

export function QualifierSection() {
  const benefits = [
    "You have a design system (but it's not working)",
    "You're scaling and don't have a design system yet",
    "Color confusion is costing $100K+/year in support tickets",
    "Designers and engineers fight about every color choice",
    "You've failed color accessibility audits or lost contracts",
    "You need to prove design ROI to leadership",
    "You're a product leader at a B2B SaaS company ($5M-$100M ARR)",
  ]

  const notFor = [
    "You just want a 'color refresh' or rebrand",
    "You think color is purely creative work",
    "You're looking for the cheapest option",
    "You're not ready to invest in strategic transformation",
  ]

  return (
    <section id="qualifier" className="section-reveal w-full px-4 md:w-full md:px-16 py-12 md:py-16 border-b relative" aria-labelledby="qualifier-heading">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="qualifierGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#qualifierGradient)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>QUALIFIER</span>
          <h2 id="qualifier-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Is this for you?</h2>
        </div>

        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-4 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          I work with specific people on specific problems.
        </p>
        <p className="text-lg md:text-xl text-center text-muted-foreground/90 mb-12 max-w-2xl mx-auto italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Some are in the first column. Some in the second. Which one are you?
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* This is for you if */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">✓ This is for you if:</h3>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This is NOT for you if */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">✗ This is NOT for you if:</h3>
            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <span className="text-lg opacity-70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            If you're in the first column, let's talk. If you're in the second, I'm not the right fit, and that's okay.
          </p>
        </div>
      </div>
    </section>
  )
}
