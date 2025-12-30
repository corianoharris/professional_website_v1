"use client"

import { Quote } from "lucide-react"

function highlightText(text: string) {
  const highlightWords = ['95%', '100%', '60%', 'transformed', 'courageous', 'approval', 'faster', 'adoption']
  const words = text.split(/(\s+)/)
  
  return words.map((word, i) => {
    const shouldHighlight = highlightWords.some(hw => 
      word.toLowerCase().replace(/[.,!?;:]/g, '').includes(hw.toLowerCase())
    )
    return shouldHighlight ? (
      <span key={i} className="highlighter">{word}</span>
    ) : (
      <span key={i}>{word}</span>
    )
  })
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Coriano transformed our brand through courageous color choices. The 95% stakeholder approval speaks for itself—but more importantly, our users feel the difference.",
      author: "A+ Automotive Team",
      role: "Client",
      result: "95% approval rate",
    },
    {
      quote: "The Blight Zero portal redesign didn't just look better—it transformed how our city operates. 60% faster processing and 100% vendor adoption within a month.",
      author: "City of Memphis",
      role: "Government Client",
      result: "60% efficiency gain",
    },
  ]

  return (
    <section id="testimonials" className="px-8 md:px-16 py-12 md:py-16 relative">
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
          <linearGradient id="testimonialsGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#testimonialsGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>CLIENT VOICES</span>
          <h2 id="testimonials-heading" className="sr-only">Client Testimonials</h2>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Results that speak:
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 md:p-12 bg-muted/30 rounded-2xl border-l-4 border-foreground"
            >
              {/* Quote Icon */}
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4">
                <Quote 
                  className="w-8 h-8 md:w-12 md:h-12 text-foreground/20 rotate-180" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
              
              <p 
                className="text-xl md:text-2xl leading-relaxed text-foreground mb-6 relative z-10"
                style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}
              >
                "{highlightText(testimonial.quote)}"
              </p>
              
              <div className="pt-6 border-t border-foreground/10">
                <div className="font-bold text-foreground text-lg mb-1">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {testimonial.role}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--color-brand-purple)' }}>
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
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
          <linearGradient id="testimonialsGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#testimonialsGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}

