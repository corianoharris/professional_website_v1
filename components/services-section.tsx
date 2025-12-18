export function ServicesSection() {

  return (
    <div className="px-8 md:px-16 py-12 md:py-16 relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="servicesGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#servicesGradientTop)" stroke="none" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">DELIVERABLES</span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
            What I Deliver
          </h2>
        </div>
        
        <p className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">Brave, remarkable difference:</p>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="relative p-8 rounded-2xl bg-card border-l-4 border-foreground shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-5xl font-bold text-muted-foreground/30 block mb-4">01</span>
            <p className="text-xl md:text-2xl leading-relaxed font-semibold text-foreground">
              Products that connect heart-first and stand out forever.
            </p>
          </div>
          <div className="relative p-8 rounded-2xl bg-card border-l-4 border-foreground shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-5xl font-bold text-muted-foreground/30 block mb-4">02</span>
            <p className="text-xl md:text-2xl leading-relaxed font-semibold text-foreground">
              Millions in added revenue from trust and differentiation.
            </p>
          </div>
          <div className="relative p-8 rounded-2xl bg-card border-l-4 border-foreground shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-5xl font-bold text-muted-foreground/30 block mb-4">03</span>
            <p className="text-xl md:text-2xl leading-relaxed font-semibold text-foreground">
              Loyalty that compounds—tribes that pay premium and spread virally.
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
          <linearGradient id="servicesGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#servicesGradientBottom)" stroke="none" />
      </svg>
    </div>
  )
}
