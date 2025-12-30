"use client"
import { useState } from "react"
import { TrendingUp, Building2, Sparkles } from "lucide-react"
import { ShowMoreButton } from "./show-more-button"

export function PortfolioSection() {
  const [visibleCount, setVisibleCount] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  const outcomes = [
    {
      icon: Sparkles,
      title: "A+ Automotive: 95% stakeholder approval on first iteration",
      description: <>Created initial mockup designs for A+ Automotive's website, establishing the visual foundation and <span className="highlighter">user experience</span> strategy. Collaborated with the Design and Code team to deliver compelling designs that balance aesthetics with functionality and user needs. Result: 95% stakeholder approval on first iteration, reducing design review cycles by 70%.</>,
      color: "bg-purple-600",
      category: "design",
      result: "95% stakeholder approval",
    },
    {
      icon: Building2,
      title: "City of Memphis Blight Zero: 60% faster route processing",
      description: <>Developed an online portal for the Blight Zero Project Clean City initiative. Enabled route assignment to vendors, completion reporting with photo attachments, and hour tracking. <span className="highlighter">Transformed</span> city operations through <span className="highlighter">intuitive</span> design and efficient workflow management. Result: 60% reduction in route processing time and 100% vendor adoption within first month.</>,
      color: "bg-cyan-500",
      category: "development",
      result: "60% faster processing",
    },
    {
      icon: TrendingUp,
      title: "Prediabetes Risk Test: UI design that improves clarity and engagement",
      description: <>Redesigned the Prediabetes Risk Test interface with a focus on visual hierarchy, <span className="highlighter">color psychology</span>, and user-friendly interactions. Transformed the single long form that was hidden under the fold into a multi-step form experience, breaking it into digestible sections that guide users through the screening process. Conducted A/B testing of the form with users to validate design decisions and optimize the user experience. Enhanced the UI design compared to the current CDC Prediabetes Risk page by improving readability, creating clearer visual pathways, and applying strategic <span className="highlighter">color</span> choices. User feedback revealed preferences for the improved visual clarity, more intuitive form layout, and better use of <span className="highlighter">color</span> to distinguish sections compared to the CDC version. Result: A more intuitive and engaging user experience that makes health screening accessible and approachable.</>,
      color: "bg-orange-500",
      category: "design",
      result: "Improved engagement",
    },
  ]

  const getCategoryColorHex = (category: string) => {
    switch (category) {
      case "design":
        return "var(--color-brand-purple)" // Using semantic token
      case "development":
        return "var(--color-brand-cyan)" // Using semantic token
      default:
        return "var(--color-brand-orange)" // Using semantic token
    }
  }

  return (
    <section id="portfolio" className="px-8 md:px-16 py-12 md:py-16 border-b relative" aria-labelledby="portfolio-heading">
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
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>CASE STUDIES</span>
          <h2 id="portfolio-heading" className="sr-only">Portfolio and Case Studies</h2>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Proof in action:
        </p>

        {/* Table of Contents Style Layout - No Borders */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
          {outcomes.slice(0, visibleCount).map((outcome, index) => {
            const caseNumber = String(index + 1).padStart(2, '0')
            const isLeftColumn = index % 2 === 0
            const isThirdItem = index === 2
            
            return (
              <div
                key={index}
                className={`relative flex items-start gap-2 md:gap-3 min-h-[200px] ${isThirdItem ? 'md:col-span-2' : ''} md:overflow-visible`}
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
                <div className={`flex-1 ${isLeftColumn ? 'order-2' : 'order-2'}`}>
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
            )
          })}
        </div>

        {/* Show More/Less Buttons */}
        {outcomes.length > 2 && (
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
            They armor up with safe generics—skipping <span className="highlighter">vulnerability</span>, aiming to fit in.
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
