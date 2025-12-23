"use client"

import { Sparkles, Heart, Brain, Target, Zap, Quote } from "lucide-react"

export function ColorPsychologySection() {
  const colorSwatches = [
    {
      name: "Trust & Calm",
      color: "#06b6d4", // cyan
      description: "Evokes calm authority and trust. Perfect for healthcare, finance, and professional services.",
      emotion: "Security",
      icon: Heart,
      fontFamily: 'var(--font-playfair), serif', // Serif
    },
    {
      name: "Courage & Innovation",
      color: "#7c3aed", // purple
      description: "Bold, creative, and distinctive. Signals innovation and forward-thinking.",
      emotion: "Confidence",
      icon: Sparkles,
      fontFamily: 'var(--font-baloo2), sans-serif', // Bold sans-serif
    },
    {
      name: "Energy & Action",
      color: "#f97316", // orange
      description: "Drives action and engagement. Creates urgency and excitement.",
      emotion: "Motivation",
      icon: Zap,
      fontFamily: 'var(--font-space-grotesk), sans-serif', // Modern sans-serif
    },
    {
      name: "Growth & Balance",
      color: "#14b8a6", // teal
      description: "Represents growth, harmony, and renewal. Connects with nature and sustainability.",
      emotion: "Harmony",
      icon: Brain,
      fontFamily: 'var(--font-raleway), sans-serif', // Elegant sans-serif
    },
    {
      name: "Focus & Precision",
      color: "#1e40af", // blue
      description: "Communicates professionalism and reliability. Builds trust through clarity.",
      emotion: "Clarity",
      icon: Target,
      fontFamily: 'var(--font-inter), sans-serif', // Clean sans-serif
    },
  ]

  return (
    <section id="color-psychology" className="px-8 md:px-16 py-12 md:py-16 relative">
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
          <linearGradient id="colorPsychGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#colorPsychGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-7xl mx-auto mb-12 z-10 pt-4 overflow-hidden md:overflow-visible">
        {/* Label - Consistent with other sections */}
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>COLOR PSYCHOLOGY</span>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Understanding the psychology behind color choices:
        </p>

        {/* Insight Quote - Quote UI Design with Icons */}
        <div className="mb-16 max-w-4xl mx-auto relative z-10 md:-ml-16 md:pl-16 md:-mr-16 md:pr-16" style={{ overflow: 'visible' }}>
          <div className="relative pl-8 md:pl-12 py-8 md:py-12" style={{ overflow: 'visible' }}>
            {/* Opening Quote Icon - Extends Outside */}
            <div className="absolute -top-8 -left-8 md:-top-16 md:-left-16 z-0" style={{ overflow: 'visible' }}>
              <Quote 
                className="w-32 h-32 md:w-64 md:h-64 text-foreground/20 md:text-foreground/10 rotate-180" 
                aria-hidden="true"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
            
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>INSIGHT</span>
              <h3 className="font-portfolio-title text-4xl md:text-5xl mb-6 leading-tight">The 0.05 Second Rule</h3>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Users form their first impression in <span className="highlighter">0.05 seconds</span>. Color is the fastest signal of your brand's personality, values, and trustworthiness.
              </p>
            </div>
            
            {/* Closing Quote Icon - Extends Outside */}
            <div className="absolute -bottom-8 -right-8 md:-bottom-16 md:-right-16 z-0" style={{ overflow: 'visible' }}>
              <Quote 
                className="w-32 h-32 md:w-64 md:h-64 text-foreground/20 md:text-foreground/10" 
                aria-hidden="true"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
          </div>
        </div>

        {/* Color Swatches - Circles Representing Colors: Odd on Left, Even on Right */}
        <div className="space-y-12 md:space-y-16 relative md:-ml-16 md:pl-16 md:-mr-16 md:pr-16" style={{ overflow: 'visible' }}>
          {colorSwatches.map((swatch, index) => {
            const IconComponent = swatch.icon
            const isOdd = index % 2 === 1 // Odd items (1, 3, 5) on left, Even items (0, 2, 4) on right
            return (
              <div
                key={index}
                className="relative grid grid-cols-12 gap-0 overflow-visible"
                style={{ overflow: 'visible' }}
              >
                {/* Left Section - Small Circle - Odd items on left, Even items on right */}
                <div 
                  className={`col-span-3 relative flex items-center justify-center ${isOdd ? 'order-1 -ml-16' : 'order-2 -mr-16 col-start-10'}`} 
                  style={{ overflow: 'visible' }}
                >
                  {/* Small Circle Representing Color */}
                  <div 
                    className="w-16 h-16 rounded-full flex flex-col items-center justify-center relative shadow-2xl"
                    style={{ 
                      backgroundColor: swatch.color,
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    {/* Stacked Text Overlay - On Top of Circle (Same for Mobile and Desktop) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 space-y-0.5">
                      {swatch.name.split(' & ').map((word, i) => (
                        <div
                          key={i}
                          className="font-black uppercase leading-none text-center"
                          style={{ 
                            fontFamily: 'var(--font-raleway), sans-serif',
                            fontSize: 'clamp(0.625rem, 2vw, 1.5rem)',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                          }}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Section - Content (3/4 width) */}
                <div 
                  className={`col-span-9 ${isOdd ? 'order-2 pl-4 lg:pl-6' : 'order-1 pr-4 lg:pr-6'}`} 
                  style={{ overflow: 'visible' }}
                >
                  {/* Editorial Content - Magazine Style */}
                  <div className="space-y-6 h-full flex flex-col justify-center">
                    {/* Emotion Label - Upper Right Corner */}
                    <div className={`flex justify-end ${isOdd ? '' : 'md:justify-start'}`}>
                      <div className="space-y-2">
                        <span 
                          className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block"
                          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                        >
                          {swatch.emotion}
                        </span>
                        <div className="w-16 h-px bg-foreground/20" />
                      </div>
                    </div>
                    
                    {/* Description - Different Font Family for Each Color */}
                    <p 
                      className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground"
                      style={{ 
                        fontFamily: swatch.fontFamily
                      }}
                    >
                      {swatch.description}
                    </p>
                    
                    {/* Divider Line - Magazine Style */}
                    <div className="w-full h-px bg-foreground/10 mt-8" />
                  </div>
                </div>
              </div>
            )
          })}
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
          <linearGradient id="colorPsychGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#colorPsychGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}

