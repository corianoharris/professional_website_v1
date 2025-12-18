"use client"

import { AboutSection } from "@/components/about-section"
import { ExpertiseSection } from "@/components/expertise-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { EngagementSection } from "@/components/engagement-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"

export function HeroWithContent() {
  return (
    <section className="relative mt-7">
      <div className="px-4 md:px-6 mt-24">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[80vh] max-w-6xl mx-auto">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/background-site-image.jpg"
              alt=""
              className="w-full h-full object-cover transform -skew-y-3 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-center text-white px-6 md:pl-16 md:pr-12 lg:pl-20 lg:pr-16 pt-12 md:pt-16 pb-32 z-10 gap-8 md:gap-12">
              {/* Left side - Headline */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-2">
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/80 font-semibold block mb-3 md:mb-4">FEATURED STORY</span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight text-balance leading-[1] max-w-5xl">
                  Vulnerability is the birthplace of trust.
                </h1>
              </div>
              
              {/* Right side - Subtitle */}
              <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right">
                <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-2xl text-balance font-serif leading-snug">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black leading-none text-white">I</span>n a world of ordinary products, be remarkable—boldly distinctive and impossible to ignore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-4 md:px-6 -mt-[10vh] z-20 max-w-5xl mx-auto flex flex-col justify-center items-center -mb-32">
        <div className="w-full max-w-6xl mx-auto bg-background rounded-2xl shadow-2xl overflow-visible md:overflow-hidden relative">
          <svg className="w-full relative z-30" viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ height: "80px" }} stroke="none">
            <defs>
              <linearGradient id="heroGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#heroGradientTop)" stroke="none" />
          </svg>

          <div className="px-8 md:px-16 py-12 md:py-16 border-b relative overflow-visible">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-3">INTRODUCTION</span>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                Human-Driven Color Product Technologist
              </p>
            </div>
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start relative">
              <div className="md:col-span-7 space-y-6 relative z-20">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance leading-[1.1]">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none float-left mr-3 mt-1 text-foreground">T</span>
                  o help brave teams create remarkable products worth millions more—building instant trust, deep belonging, and viral word-of-mouth through courageous color as the spark of human connection.
                </h1>
              </div>
              <div className="md:col-span-5 flex justify-center md:justify-end md:absolute md:right-0 md:top-0 md:bottom-0 md:h-full md:w-auto md:-mr-16 relative z-0">
                <div
                  className="w-48 h-64 md:w-[500px] md:h-[500px] rounded-2xl md:rounded-none overflow-hidden bg-muted transform rotate-12 md:rotate-0 shadow-xl md:shadow-2xl relative"
                  style={{ 
                    perspective: "1000px"
                  }}
                >
                  <img 
                    src="/professional-portrait.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    style={{ 
                      objectPosition: "50% 20%"
                    }}
                  />
                </div>
              </div>
            </div>
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              style={{ height: "60px" }}
              stroke="none"
            >
              <defs>
                <linearGradient id="heroGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              <path d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z" fill="url(#heroGradientBottom)" stroke="none" />
            </svg>
          </div>

          <AboutSection />
          <ExpertiseSection />
          <ServicesSection />
          <PortfolioSection />
          <EngagementSection />
          <BlogSection />
          <ContactSection />
        </div>
      </div>
    </section>
  )
}
