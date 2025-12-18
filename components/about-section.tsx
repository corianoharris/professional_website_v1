export function AboutSection() {
  return (
    <div id="about" className="px-8 md:px-16 py-12 md:py-16 relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
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

      <div className="relative max-w-5xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">FEATURE</span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">My WHY</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 text-foreground">
              People don't buy what you do—they buy why you do it.
            </p>
          </div>
          
          <div className="md:col-span-7 space-y-8">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-muted-foreground">
              <span className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none float-left mr-3 mt-1 text-foreground">I</span>
              believe vulnerability creates real trust: showing up authentically, daring to feel human.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-muted-foreground">
              Color is that brave first whisper—evoking calm, understanding, and belonging in 0.05 seconds.
            </p>
            <div className="border-l-4 border-foreground pl-8 py-6 bg-muted/20 rounded-r-lg">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-foreground italic">
                That's why I build experiences where people feel seen, choose you wholeheartedly, spread the idea, and drive measurable revenue.
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
    </div>
  )
}
