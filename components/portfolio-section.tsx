"use client"
import { TrendingDown, TrendingUp, Users, Code } from "lucide-react"

export function PortfolioSection() {
  const outcomes = [
    {
      icon: TrendingUp,
      title: "$2.3M recovered revenue (onboarding 34% → 81%)",
      description:
        "Healthcare SaaS. Their blue-heavy dashboard confused users. We rebuilt the color hierarchy. Onboarding completion went from 34% to 81%. That's not design—that's money.",
      color: "bg-cyan-500",
    },
    {
      icon: Users,
      title: "47% fewer support tickets ($180K saved yearly)",
      description:
        "Fintech app with confusing color states. Users couldn't tell success from error. We created a semantic color system. Support costs dropped $180K/year. Color clarity is cost reduction.",
      color: "bg-orange-500",
    },
    {
      icon: TrendingDown,
      title: "Conversion 2% → 11% (340% standout gain)",
      description:
        "E-commerce brand nobody noticed. We audited competitor colors, found a gap, owned it. Standout increased 340%. Market research confirmed: they were the only ones people remembered.",
      color: "bg-pink-500",
    },
    {
      icon: Code,
      title: "Enterprise project shipped in 3 weeks (ended 8-month stall)",
      description:
        "Enterprise software locked in 'design review' for 8 months. I joined, made decisive calls, implemented it myself. Developers loved it. Users adopted it. Execs stopped asking 'when.'",
      color: "bg-purple-600",
    },
  ]

  return (
    <div className="px-8 md:px-16 py-12 md:py-16 border-b relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
            Proof That It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {outcomes.map((outcome, index) => {
            const IconComponent = outcome.icon
            return (
              <div
                key={index}
                className="relative rounded-xl bg-card overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Top wave pattern with gradient */}
                <div className="relative h-14 overflow-hidden">
                  <svg 
                    className="absolute top-0 left-0 w-full" 
                    viewBox="0 0 1200 60" 
                    preserveAspectRatio="none"
                    style={{ height: "60px" }}
                    stroke="none"
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
                  
                  {/* Body text - editorial style */}
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-serif">
                    {outcome.description}
                  </p>
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
    </div>
  )
}
