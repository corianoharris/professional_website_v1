"use client"
import { useState } from "react"
import { TrendingUp, Building2, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { ShowMoreButton } from "./show-more-button"

export function PortfolioSection() {
  const [visibleCount, setVisibleCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }
  const outcomes = [
    {
      icon: TrendingUp,
      title: "Healthcare SaaS: Could recover $2M+ from color confusion",
      description: <>When healthcare platforms experience color accessibility failures, user errors in patient data entry lead to costly mistakes and compliance risks. What if that bloated color system (dozens of tokens, no clear intent) could become a lean set of semantic color intents? The <span className="highlighter">Intent-Driven Color Model™</span> is built for that. Imagine fewer errors, fewer support tickets, and compliance that actually passes.</>,
      color: "bg-green-600",
      category: "color-system",
      result: "Potential outcome: $2M+ recovered",
    },
    {
      icon: Building2,
      title: "Financial Services: Could save $180K in development costs",
      description: <>When fintech companies have 120+ <span className="highlighter">color</span> variables with no clear naming, dev teams spend 40% of sprint time resolving inconsistencies and merge conflicts. What if all those variables could speak one language, and handoff stopped eating the sprint? The <span className="highlighter">Intent-Driven Color Model™</span> is built for that. Imagine dev costs dropping and color-related bugs disappearing.</>,
      color: "bg-cyan-500",
      category: "color-system",
      result: "Potential outcome: $180K saved",
    },
    {
      icon: TrendingUp,
      title: "E-commerce Platform: Could 3x conversion in checkout flows",
      description: <>When B2B marketplaces use inconsistent button colors, users get confused about primary actions. Cart abandonment skyrockets. What if every color had a job, and the next step was obvious? Strategic <span className="highlighter">color psychology</span> is built for that. Imagine checkout completion climbing and "which button?" support calls falling.</>,
      color: "bg-orange-500",
      category: "color-system",
      result: "Potential outcome: 3x conversion",
    },
  ]

  const getCategoryColorHex = (category: string) => {
    switch (category) {
      case "color-system":
        return "var(--color-brand-green)" // Using semantic token for color system work
      case "design":
        return "var(--color-brand-purple)" // Using semantic token
      case "development":
        return "var(--color-brand-cyan)" // Using semantic token
      default:
        return "var(--color-brand-orange)" // Using semantic token
    }
  }

  return (
    <section id="portfolio" className="section-reveal w-full px-4 md:w-full md:px-16 py-12 md:py-16 border-b relative" aria-labelledby="portfolio-heading">
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
          <linearGradient id="portfolioGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#portfolioGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>WHO THIS COULD HELP</span>
          <h2 id="portfolio-heading" className="sr-only">Example scenarios: who this could help and how</h2>
        </div>

        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-4 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Three ways it goes wrong. Three ways it could go right.
        </p>
        <p className="text-lg md:text-xl text-center text-muted-foreground/90 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Real problems. Here's how I could solve them.
        </p>

        {/* Table of Contents Style Layout - No Borders */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-12 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
          {outcomes.slice(0, visibleCount).map((outcome, index) => {
            const caseNumber = String(index + 1).padStart(2, '0')
            const isLeftColumn = index % 2 === 0
            const isThirdItem = index === 2
            const isExpanded = expandedCards.has(index)

            return (
              <div
                key={index}
                className={`relative flex items-start gap-2 md:gap-3 min-h-[120px] md:min-h-[200px] ${isThirdItem ? 'md:col-span-2' : ''} md:overflow-visible pb-2`}
                style={{ overflow: 'visible' }}
              >
                {/* Large Vertical Number - Rotated Sideways with Color */}
                <div className={`hidden md:flex shrink-0 items-center justify-center ${isLeftColumn ? 'order-1 md:-ml-32' : 'order-3 md:-mr-32'}`} style={{ overflow: 'visible' }}>
                  <div
                    className="text-9xl lg:text-[10rem] font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-baloo2), sans-serif',
                      fontWeight: 800,
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center',
                      whiteSpace: 'nowrap',
                      color: getCategoryColorHex(outcome.category)
                    }}
                  >
                    {caseNumber}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLeftColumn ? 'order-2' : 'order-2'} flex flex-col pr-2 md:pr-0`}>
                  <div className="mb-2 flex items-center gap-3">
                    {/* Mobile number - visible on mobile only */}
                    <span
                      className="md:hidden text-4xl font-black leading-none"
                      style={{
                        fontFamily: 'var(--font-baloo2), sans-serif',
                        fontWeight: 800,
                        color: getCategoryColorHex(outcome.category),
                        opacity: 0.3
                      }}
                    >
                      {caseNumber}
                    </span>
                    <span
                      className={`${outcome.color} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-block mb-2`}
                    >
                      {outcome.category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {outcome.title}
                  </h3>

                  {/* Expandable Content - Mobile Only */}
                  <div className="md:hidden">
                    <div
                      id={`case-study-content-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[2000px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="mb-4">
                        <p className="text-foreground font-portfolio-content text-base leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                          {outcome.description}
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="space-y-1 text-sm text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" aria-hidden="true" />
                          <span className="font-semibold">{outcome.result}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button - Mobile Only */}
                    <div className="flex justify-end pr-2">
                      <button
                        onClick={() => toggleCard(index)}
                        className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mb-4 pb-1"
                        aria-expanded={isExpanded}
                        aria-controls={`case-study-content-${index}`}
                        aria-label={isExpanded ? "Collapse case study details" : "Expand case study details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Desktop Content - Always Visible */}
                  <div className="hidden md:block">
                    <div className="mb-4">
                      <p className="text-foreground font-portfolio-content text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                        {outcome.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        <span className="font-semibold">{outcome.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Show More/Less Buttons */}
        {outcomes.length > 3 && (
          <>
            {visibleCount < outcomes.length && (
              <ShowMoreButton
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setVisibleCount(outcomes.length)
                    setIsLoading(false)
                  }, 300)
                }}
                count={outcomes.length - visibleCount}
                isLoading={isLoading}
              />
            )}
            {visibleCount > 2 && (
              <ShowMoreButton
                onClick={() => setVisibleCount(2)}
                showLess={true}
              />
            )}
          </>
        )}
      </div>

      <div className="mt-16 max-w-4xl mx-auto p-10 md:p-12 bg-muted/30 rounded-2xl border-l-4 border-foreground relative z-10 editorial-breakout-full">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>INSIGHT</span>
        <h3 className="font-portfolio-title text-4xl md:text-5xl mb-8 leading-tight">Why Most Fail</h3>
        <div className="space-y-6 text-muted-foreground">
          <p className="font-portfolio-content text-xl md:text-2xl leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            They protect themselves with safe, generic choices, skipping <span className="highlighter">authenticity</span>, aiming to fit in.
          </p>
          <p className="font-portfolio-content text-2xl md:text-3xl leading-relaxed font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            They start with features, not feeling.
          </p>
          <div className="pt-6 border-t border-border/50">
            <p className="font-portfolio-title text-3xl md:text-4xl pt-4 text-center text-foreground leading-tight" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
              Perfection hides. <span className="highlighter">Courage</span> connects. Average vanishes. <span className="highlighter">Remarkable</span> spreads.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="portfolioGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#portfolioGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
