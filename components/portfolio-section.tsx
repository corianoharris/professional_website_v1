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
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
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
                className="relative flex items-start gap-4 p-6 rounded-xl bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Top wave pattern for card */}
                <svg 
                  className="absolute top-0 left-0 w-full" 
                  viewBox="0 0 1200 60" 
                  preserveAspectRatio="none"
                  style={{ height: "60px" }}
                  stroke="none"
                >
                  <defs>
                    <linearGradient id={`portfolioCardGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="16.67%" stopColor="#4ECDC4" />
                      <stop offset="33.33%" stopColor="#45B7D1" />
                      <stop offset="50%" stopColor="#96CEB4" />
                      <stop offset="66.67%" stopColor="#FFEEAD" />
                      <stop offset="83.33%" stopColor="#D4A5A5" />
                      <stop offset="100%" stopColor="#9B59B6" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,40 Q300,20 600,40 T1200,40 L1200,0 L0,0 Z" 
                    fill={`url(#portfolioCardGradient${index})`}
                    stroke="none"
                  />
                </svg>
                
                <div className={`${outcome.color} p-3 rounded-lg flex items-center justify-center shrink-0 relative z-10`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 relative z-10 pt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">{outcome.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{outcome.description}</p>
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
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#portfolioGradientBottom)" stroke="none" />
      </svg>
    </div>
  )
}
