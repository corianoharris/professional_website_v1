"use client"

export function UrgencySection() {
  const triggers = [
    {
      question: `"We'll fix the colors after launch"`,
      detail: "Now your color debt costs 10x more to fix. Every feature request breaks something else. Your team is stuck.",
    },
    {
      question: `"Our designers can handle it"`,
      detail: "Without a system, you get 47 shades of blue, zero consistency, and $180K/year in revision cycles.",
    },
    {
      question: `"Users won't notice bad colors"`,
      detail: "They won't tell you—they'll just leave. 67% of B2B buyers abandon apps with confusing interfaces.",
    },
    {
      question: `"This rebrand will be quick"`,
      detail: "Six months later, your team is still updating hardcoded hex values. Legal threatens delay. Board asks why.",
    },
  ]

  return (
    <section className="w-full px-4 md:w-full md:px-16 py-12 md:py-16 border-b relative">
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
          <linearGradient id="urgencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#urgencyGradient)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>COSTLY MISJUDGMENTS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Common <span className="highlighter">scenarios</span> that cost millions</h2>
        </div>

        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Every product leader hears these. Few realize the true cost until it's too late.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {triggers.map((trigger, index) => (
            <div
              key={index}
              className="bg-card border-2 border-destructive/20 rounded-lg p-6 hover:border-destructive/50 transition-colors"
            >
              <h3 className="font-bold text-xl mb-3 text-destructive" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                {trigger.question}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {trigger.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic' }}>
            You're not alone. Every product leader at scaling B2B SaaS companies deals with this.
          </p>
          <p className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            The difference? They <span className="highlighter">act now</span>—before the board asks <span className="highlighter">why</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
