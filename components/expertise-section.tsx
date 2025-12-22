"use client"

export function ExpertiseSection() {

  return (
    <section id="expertise" className="px-8 md:px-16 py-12 md:py-16 relative overflow-hidden md:overflow-visible" aria-labelledby="expertise-heading">
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
          <linearGradient id="expertiseGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#expertiseGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-7xl mx-auto mb-12 z-10 pt-4 md:overflow-visible" style={{ overflow: 'visible' }}>
        <div className="mb-16 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>METHODOLOGY</span>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Creating with purpose:
        </p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 relative md:-ml-32 md:pl-32 md:-mr-32 md:pr-32" style={{ overflow: 'visible' }}>
          <div className="md:col-span-1">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <span className="text-3xl md:text-4xl font-bold text-foreground">01</span>
            </div>
            <p 
              className="text-xl md:text-2xl lg:text-3xl leading-tight text-foreground"
              style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 600 }}
            >
              With <span className="highlighter">courage</span> and <span className="highlighter">remarkability</span>: <span className="highlighter">psychology</span> before pixels.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 bg-purple-500" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
              </div>
              <span className="text-3xl md:text-4xl font-bold text-foreground">02</span>
            </div>
            <p 
              className="text-xl md:text-2xl lg:text-3xl leading-tight text-foreground"
              style={{ fontFamily: 'var(--font-playfair), serif', fontWeight: 500 }}
            >
              Engineering <span className="highlighter">calm authority</span>, <span className="highlighter">ethical influence</span>, <span className="highlighter">unforgettable</span> presence.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 border-2 border-purple-500 rounded-full"></div>
              </div>
              <span className="text-4xl md:text-5xl font-bold text-foreground">03</span>
            </div>
            <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-foreground">
              <p 
                className="text-xl md:text-2xl lg:text-3xl leading-tight text-foreground"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontWeight: 600 }}
              >
                Building <span className="highlighter">tribes</span> around products that feel <span className="highlighter">profoundly right</span>—and profoundly <span className="highlighter">different</span>.
              </p>
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
          <linearGradient id="expertiseGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#expertiseGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
