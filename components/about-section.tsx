import { Quote } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="px-8 md:px-16 py-12 md:py-16 relative overflow-hidden md:overflow-visible" aria-labelledby="about-heading">
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
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#bodyGradient)" stroke="none" />
      </svg>

      <div className="relative max-w-7xl mx-auto mb-12 z-10 pt-4 md:overflow-visible">
        {/* Label */}
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>FEATURE</span>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Starting with why:
        </p>

        {/* Quote-focused layout - Single column with large decorative quotes */}
        <div className="relative max-w-5xl mx-auto md:overflow-visible">
          {/* Main Quote with Large Decorative Quote Marks - Extends outside on desktop */}
          <div className="relative mb-12 md:mb-16 md:-ml-32 md:pl-32 md:-mr-32 md:pr-32" style={{ overflow: 'visible' }}>
            {/* Opening Quote Icon - Very Large */}
            <div className="absolute -top-8 -left-8 md:-top-16 md:-left-32 z-0">
              <Quote 
                className="w-32 h-32 md:w-64 md:h-64 text-foreground/40 md:text-foreground/30 dark:text-foreground/50 dark:md:text-foreground/40 rotate-180" 
                aria-hidden="true"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
            <p 
              id="about-heading"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-foreground mb-8 relative z-10 pl-20 md:pl-32"
              style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic', fontWeight: 500 }}
            >
              People don't buy what you do—they buy why you do it.
            </p>
            {/* Closing Quote Icon - Very Large */}
            <div className="absolute -bottom-8 -right-8 md:-bottom-16 md:-right-32 z-0">
              <Quote 
                className="w-32 h-32 md:w-64 md:h-64 text-foreground/40 md:text-foreground/30 dark:text-foreground/50 dark:md:text-foreground/40" 
                aria-hidden="true"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
            <div className="w-32 h-0.5 border-t border-dashed border-foreground/30 mt-8 mx-auto md:mx-0" />
          </div>

          {/* Body Content */}
          <div className="space-y-8 md:space-y-12">
            <p 
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              <span 
                className="text-7xl md:text-8xl lg:text-9xl leading-none float-left mr-4 mt-2 text-foreground"
                style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 800 }}
              >
                I
              </span>
              believe <span className="highlighter">vulnerability</span> creates real <span className="highlighter">trust</span>: showing up authentically, daring to feel human.
            </p>
            
            <p 
              className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              <span className="highlighter">Color</span> is that <span className="highlighter">brave</span> first whisper—evoking <span className="highlighter">calm</span>, understanding, and <span className="highlighter">belonging</span> in 0.05 seconds.
            </p>

            {/* Emphasis Box with Quotes */}
            <div className="pl-8 py-8 md:py-12 mt-12 md:mt-16 relative" style={{ overflow: 'visible' }}>
              {/* Opening Quote Icon */}
              <div className="absolute top-0 left-0 md:top-2 md:left-0 z-0">
                <Quote 
                  className="w-12 h-12 md:w-20 md:h-20 text-foreground/40 md:text-foreground/30 dark:text-foreground/50 dark:md:text-foreground/40 rotate-180" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
              <p 
                className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground relative z-10 pl-8 md:pl-12"
                style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontStyle: 'italic', fontWeight: 600 }}
              >
                That's why I build experiences where people feel <span className="highlighter">seen</span>, choose you <span className="highlighter">wholeheartedly</span>, spread the idea, and drive measurable <span className="highlighter">revenue</span>.
              </p>
              {/* Closing Quote Icon */}
              <div className="absolute bottom-0 right-0 md:bottom-2 md:right-0 z-0">
                <Quote 
                  className="w-12 h-12 md:w-20 md:h-20 text-foreground/40 md:text-foreground/30 dark:text-foreground/50 dark:md:text-foreground/40" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
            </div>
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
          <linearGradient id="bodyGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#bodyGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
