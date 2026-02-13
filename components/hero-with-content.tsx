"use client"

import { AboutSection } from "@/components/about-section"
import { BlogSection } from "@/components/blog-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { QualifierSection } from "@/components/qualifier-section"
import { UrgencySection } from "@/components/urgency-section"
import { RoiCalculatorSection } from "@/components/roi-calculator-section"
import { HomepageAudio } from "@/components/homepage-audio"
import { ColorIntentDemo } from "@/components/color-intent-demo"
import { Button } from "@/components/ui/button"

export function HeroWithContent() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative mt-7 overflow-x-hidden md:overflow-x-visible">
      <div className="px-2 md:px-6 mt-24 overflow-x-hidden md:overflow-x-visible">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[100dvh] md:min-h-0 md:h-[80vh] max-w-6xl mx-auto">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/background-site-image.jpg"
              alt="Abstract colorful background"
              className="w-full h-full object-cover transform -skew-y-3 scale-110"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center md:items-center justify-center text-white px-4 sm:px-6 md:pl-16 md:pr-12 lg:pl-20 lg:pr-16 pt-12 md:pt-16 pb-36 md:pb-32 z-10 gap-6 md:gap-12 overflow-y-auto overflow-x-hidden md:overflow-hidden">
              {/* Left side - Headline with entrance animation */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-2 w-full px-2 sm:px-0 gap-4">
                <p className="hero-animate hero-animate-delay-1 text-sm uppercase tracking-widest text-white/80 font-medium" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Color Intent Technologist
                </p>
                <h1 className="hero-animate hero-animate-delay-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-balance leading-[1.1] max-w-4xl break-words">
                  Real <span className="highlighter">color systems</span> build real <span className="highlighter">trust</span>.
                </h1>
                <p className="hero-animate hero-animate-delay-3 text-lg md:text-xl lg:text-2xl text-white/90 max-w-xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Trust starts when your product doesn&apos;t hide.
                </p>
                <div className="hero-animate hero-animate-delay-4">
                  <Button
                    size="lg"
                    onClick={scrollToContact}
                    className="mt-4 bg-[#0078D4] hover:bg-[#106EBE] text-white border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book a Color System Audit (15 min)
                  </Button>
                </div>
              </div>

              {/* Right side - Animated Color Intent Demo + Subtitle */}
              <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right gap-6">
                <div className="hero-animate hero-animate-delay-2">
                  <ColorIntentDemo />
                </div>
                <div className="flex flex-col gap-2 hero-animate hero-animate-delay-5">
                  <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-2xl text-balance leading-snug" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black leading-none text-white">I</span>n a world of ordinary products, be <span className="highlighter">remarkable</span>, boldly <span className="highlighter">distinctive</span> and impossible to ignore.
                  </p>
                  <p className="text-sm md:text-base text-white/80 max-w-xl" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                    For product leaders whose color system is costing them. What if it could do the opposite?
                  </p>
                </div>
              </div>
            </div>
            <HomepageAudio variant="hero" />
          </div>
        </div>
      </div>

      <div className="relative px-2 md:px-6 -mt-[10vh] z-20 max-w-5xl mx-auto flex flex-col justify-center items-center -mb-32 overflow-x-hidden md:overflow-visible transition-all duration-500">
        <div className="w-full max-w-6xl mx-auto bg-background rounded-3xl shadow-2xl overflow-x-hidden md:overflow-visible relative">
          <PortfolioSection />
          <ServicesSection />
          <UrgencySection />
          <QualifierSection />
          <RoiCalculatorSection />
          <BlogSection />
          <ContactSection />
          <AboutSection />
        </div>
      </div>
    </section>
  )
}
