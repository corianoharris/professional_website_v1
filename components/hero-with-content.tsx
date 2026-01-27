"use client"

import { AboutSection } from "@/components/about-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { ServicesSection } from "@/components/services-section"
import { LeadershipSection } from "@/components/leadership-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ColorPsychologySection } from "@/components/color-psychology-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { EngagementSection } from "@/components/engagement-section"
import { PressSection } from "@/components/press-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"

export function HeroWithContent() {
  return (
    <section className="relative mt-7 overflow-x-hidden md:overflow-x-visible">
      <div className="px-4 md:px-6 mt-24 overflow-x-hidden md:overflow-x-visible">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[80vh] max-w-6xl mx-auto">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/background-site-image.jpg"
              alt="Abstract colorful background"
              className="w-full h-full object-cover transform -skew-y-3 scale-110"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-center text-white px-4 sm:px-6 md:pl-16 md:pr-12 lg:pl-20 lg:pr-16 pt-12 md:pt-16 pb-32 z-10 gap-8 md:gap-12 overflow-hidden">
              {/* Left side - Headline */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-2 w-full px-2 sm:px-0">
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/80 font-semibold block mb-3 md:mb-4">FEATURED STORY</span>
                <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight text-balance leading-[1] max-w-5xl break-words">
                  Being <span className="highlighter">real</span> is the birthplace of <span className="highlighter">trust</span>.
                </h1>
              </div>
              
              {/* Right side - Subtitle */}
              <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right">
                <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-2xl text-balance leading-snug" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black leading-none text-white">I</span>n a world of ordinary products, be <span className="highlighter">remarkable</span>, boldly <span className="highlighter">distinctive</span> and impossible to ignore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 md:px-6 -mt-[10vh] z-20 max-w-5xl mx-auto flex flex-col justify-center items-center -mb-32 overflow-x-hidden md:overflow-visible">
        <div className="w-full max-w-6xl mx-auto bg-background rounded-3xl shadow-2xl overflow-x-hidden md:overflow-visible relative">
          <svg className="w-full relative z-30" viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ height: "80px", animation: "none", transition: "none", transform: "none" }} stroke="none" aria-hidden="true">
            <defs>
              <linearGradient id="heroGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
                <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
                <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
              </linearGradient>
            </defs>
            <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#heroGradientTop)" stroke="none" />
          </svg>

          <div className="px-4 md:px-16 py-12 md:py-16 border-b relative overflow-x-hidden md:overflow-visible">
            {/* Label */}
            <div className="mb-8 mt-0 md:-mt-8">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>INTRODUCTION</span>
            </div>

            {/* Magazine-style two-column layout */}
            <div className="relative grid md:grid-cols-2 gap-0 min-h-[600px] md:min-h-[700px] overflow-x-hidden md:overflow-visible">
              {/* Left Column - Image with Diagonal Overlay */}
              <div className="relative md:col-span-1 overflow-hidden md:overflow-visible">
                {/* Diagonal Background Element */}
                <div 
                  className="absolute inset-0 z-0 diagonal-triangle"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)'
                  }}
                  aria-hidden="true"
                />

                {/* Image - Overlapping the diagonal */}
                <div className="relative z-20 mt-32 md:mt-40 ml-4 md:ml-12 mb-8 md:mb-0 pr-4 md:pr-0">
                  <div className="relative w-full max-w-[calc(100%-2rem)] md:max-w-xl aspect-[3/4] shadow-2xl">
                    <img 
                      src="/images/my-image.jpg" 
                      alt="Coriano Harris" 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 20%" }}
                    />
                    {/* Subtle overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                  </div>
                </div>

                {/* Large Title - "INTENT DRIVEN" positioned over image on desktop */}
                <div className="absolute bottom-8 left-4 md:left-12 z-30 hidden md:block">
                  <h2 
                    className="text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight break-words"
                    style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 700, color: 'rgba(255, 255, 255, 0.9)', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}
                  >
                    INTENT DRIVEN
                  </h2>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="relative md:col-span-1 pt-16 md:pt-32 pl-4 md:pl-12 pr-4 md:pr-0 md:overflow-visible z-20">
                {/* Large Title - "COLOR" - Desktop positioned in right column */}
                <div className="mb-8 md:mb-12">
                  <h2 
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none tracking-tight text-foreground"
                    style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 800, color: 'var(--color-brand-purple)', whiteSpace: 'nowrap' }}
                  >
                    COLOR
                  </h2>
                </div>

                {/* Large Title - "INTENT DRIVEN" - Mobile only */}
                <div className="mb-8 md:mb-12 md:hidden">
                  <h2 
                    className="text-5xl sm:text-6xl leading-none tracking-tight text-foreground break-words"
                    style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 700 }}
                  >
                    INTENT DRIVEN
                  </h2>
                </div>

                {/* Subtitle */}
                <div className="mt-8 md:mt-16 mb-8 md:mb-12 text-center md:text-left">
                  <p 
                    className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 600 }}
                  >
                    I turn color into products people care about
                  </p>
                  <div className="w-24 h-0.5 border-t border-dashed border-foreground/30 mx-auto md:mx-0" />
                </div>

                {/* Body Content */}
                <div className="space-y-6 md:space-y-8">
                  <p 
                    className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground"
                    style={{ fontFamily: 'var(--font-playfair), serif' }}
                  >
                    <span 
                      className="text-6xl md:text-7xl lg:text-8xl leading-none float-left mr-3 mt-2 text-foreground"
                      style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontWeight: 900 }}
                    >
                      T
                    </span>
                    o help teams create <span className="highlighter">remarkable</span> products worth millions more. I build instant <span className="highlighter">trust</span>, deep <span className="highlighter">belonging</span>, and word-of-mouth that spreads. I do this through <span className="highlighter">color</span>, the spark of human <span className="highlighter">connection</span>.
                  </p>
                </div>
              </div>

            </div>
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              style={{ height: "60px", animation: "none", transition: "none", transform: "none" }}
              stroke="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="heroGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
                  <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
                  <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
                </linearGradient>
              </defs>
              <path d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z" fill="url(#heroGradientBottom)" stroke="none" />
            </svg>
          </div>

          <AboutSection />
          <ExpertiseSection />
          <PortfolioSection />
          <ServicesSection />
          <LeadershipSection />
          <ColorPsychologySection />
          <TestimonialsSection />
          <EngagementSection />
          <PressSection />
          <BlogSection />
          <ContactSection />
        </div>
      </div>
    </section>
  )
}