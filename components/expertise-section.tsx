"use client"

export function ExpertiseSection() {

  return (
    <section id="expertise" className="px-8 md:px-16 py-12 md:py-16 relative" aria-labelledby="expertise-heading">
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

      <div className="relative max-w-5xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">METHODOLOGY</span>
          <h2 id="expertise-heading" className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">How I Do It</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-6">
              With courage and remarkability: psychology before pixels.
            </p>
          </div>
          <div className="md:col-span-1">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-6">
              Engineering calm authority, ethical influence, unforgettable presence.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-foreground">
              <p className="text-xl md:text-2xl font-bold leading-tight text-foreground">
                Building tribes around products that feel profoundly right—and profoundly different.
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
