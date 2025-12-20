"use client"
import { TrendingUp, Building2, Sparkles } from "lucide-react"
import { ReadMoreText } from "./read-more-text"

export function PortfolioSection() {
  const outcomes = [
    {
      icon: Sparkles,
      title: "A+ Automotive: 95% stakeholder approval on first iteration",
      description:
        "Created initial mockup designs for A+ Automotive's website, establishing the visual foundation and user experience strategy. Collaborated with the Design and Code team to deliver compelling designs that balance aesthetics with functionality and user needs. Result: 95% stakeholder approval on first iteration, reducing design review cycles by 70%.",
      color: "bg-purple-600",
    },
    {
      icon: Building2,
      title: "City of Memphis Blight Zero: 60% faster route processing",
      description:
        "Developed an online portal for the Blight Zero Project Clean City initiative. Enabled route assignment to vendors, completion reporting with photo attachments, and hour tracking. Transformed city operations through intuitive design and efficient workflow management. Result: 60% reduction in route processing time and 100% vendor adoption within first month.",
      color: "bg-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Prediabetes Risk Test: UI design that improves clarity and engagement",
      description:
        "Redesigned the Prediabetes Risk Test interface with a focus on visual hierarchy, color psychology, and user-friendly interactions. Transformed the single long form that was hidden under the fold into a multi-step form experience, breaking it into digestible sections that guide users through the screening process. Conducted A/B testing of the form with users to validate design decisions and optimize the user experience. Enhanced the UI design compared to the current CDC Prediabetes Risk page by improving readability, creating clearer visual pathways, and applying strategic color choices. User feedback revealed preferences for the improved visual clarity, more intuitive form layout, and better use of color to distinguish sections compared to the CDC version. Result: A more intuitive and engaging user experience that makes health screening accessible and approachable.",
      color: "bg-orange-500",
    },
  ]

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
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#portfolioGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">CASE STUDIES</span>
          <h2 id="portfolio-heading" className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
            Proof That It Works
          </h2>
        </div>

        {/* 2x2 Grid Layout - Third card spans full width */}
        <div className={`grid gap-6 max-w-6xl mx-auto ${outcomes.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'}`}>
          {outcomes.map((outcome, index) => {
            const IconComponent = outcome.icon
            const isThirdCard = index === 2
            return (
              <div
                key={index}
                className={`relative rounded-xl bg-card overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-foreground/10 ${isThirdCard ? 'md:col-span-2' : ''}`}
              >
                {/* Top wave pattern with gradient */}
                <div className="relative h-14 overflow-hidden">
                  <svg 
                    className="absolute top-0 left-0 w-full" 
                    viewBox="0 0 1200 60" 
                    preserveAspectRatio="none"
                    style={{ height: "60px" }}
                    stroke="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id={`portfolioCardGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e40af" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,30 Q300,5 600,30 T1200,30 L1200,0 L0,0 Z" 
                      fill={`url(#portfolioCardGradient${index})`}
                      stroke="none"
                    />
                  </svg>
                  
                  {/* Icon overlay on gradient */}
                  <div className="absolute top-3 left-4 z-10">
                    <div className={`${outcome.color} p-2 rounded-lg flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content area */}
                <div className="p-5 md:p-6">
                  {/* Magazine-style label */}
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-3">
                    CASE STUDY {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Headline - magazine style */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-4 leading-[0.95] tracking-tight group-hover:text-primary transition-colors">
                    {outcome.title}
                  </h3>
                  
                  {/* Body text - modern magazine style with read more/less on mobile */}
                  <ReadMoreText 
                    text={outcome.description}
                    maxLength={150}
                    mobileOnly={true}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto p-10 md:p-12 bg-muted/30 rounded-2xl border-l-4 border-foreground relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4">INSIGHT</span>
        <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Why Most Fail</h3>
        <div className="space-y-6 text-muted-foreground">
          <p className="text-xl md:text-2xl leading-relaxed">
            They armor up with safe generics—skipping vulnerability, aiming to fit in.
          </p>
          <p className="text-2xl md:text-3xl leading-relaxed font-semibold">
            They start with features, not feeling.
          </p>
          <div className="pt-6 border-t border-border/50">
            <p className="text-3xl md:text-4xl font-bold pt-4 text-center text-foreground leading-tight">
              Perfection hides. Courage connects. Average vanishes. Remarkable spreads.
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
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#portfolioGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
