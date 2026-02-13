"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function ServicesSection() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  const services = [
    {
      title: "Color Intent Strategy",
      type: "Primary",
      whatItDoes: "Defines what each color is for, not just what it looks like.",
      whyItMatters: "Stops opinion debates and creates shared rules teams can follow.",
      outcome: "Clear color roles. Faster decisions. Better accessibility.",
    },
    {
      title: "Intent-Based Design Systems",
      type: "Primary",
      whatItDoes: "Builds design systems driven by color intent, not palettes.",
      whyItMatters: "Most systems fail because rules aren't clear.",
      outcome: "Durable tokens. Shared language. Systems that scale.",
    },
    {
      title: "Product Design Validation",
      type: "Secondary",
      whatItDoes: "Checks that the color system works inside real screens.",
      whyItMatters: "Systems fail when they break under real UI states.",
      outcome: "Confidence the system holds up before launch.",
    },
    {
      title: "Implementation Support",
      type: "Secondary",
      whatItDoes: "Helps teams apply color intent in code and tokens.",
      whyItMatters: "If developers struggle, the system won't stick.",
      outcome: "Cleaner tokens. Faster adoption. Fewer workarounds.",
    },
    {
      title: "Intent Alignment",
      type: "Secondary",
      whatItDoes: "Aligns color meaning with real user needs.",
      whyItMatters: "Users shouldn't guess what color means.",
      outcome: "Clear states. Fewer errors. Stronger trust.",
    },
    {
      title: "Brand → Intent Translation",
      type: "Secondary",
      whatItDoes: "Turns brand colors into usable system rules.",
      whyItMatters: "Brand palettes don't scale on their own.",
      outcome: "Consistent brand without breaking the system.",
    },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      // Find the services section within the contact form
      const servicesLabel = Array.from(contactSection.querySelectorAll('label')).find(
        (label) => label.textContent?.includes("Services You're Interested In")
      )
      
      if (servicesLabel) {
        servicesLabel.scrollIntoView({ behavior: "smooth", block: "center" })
        // Focus the first checkbox for accessibility
        setTimeout(() => {
          const firstCheckbox = contactSection.querySelector('input[type="checkbox"]') as HTMLInputElement
          if (firstCheckbox) {
            firstCheckbox.focus()
          }
        }, 600)
      } else {
        // Fallback: scroll to contact section
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section id="services" className="section-reveal w-full px-4 md:w-full md:px-16 py-12 md:py-16 relative" aria-labelledby="services-heading">
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
          <linearGradient id="servicesGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#servicesGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>COLOR INTENT TECHNOLOGY</span>
          <h2 id="services-heading" className="sr-only" aria-hidden="true">Color Intent Technology Services</h2>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          From &quot;everyone picks their own blue&quot; to one system everyone trusts. Color Intent Technology exclusively.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 max-w-6xl mx-auto overflow-hidden md:overflow-visible mb-8 md:mb-12">
          {services.map((service, index) => {
            const isExpanded = expandedCards.has(index)
            const isPrimary = service.type === "Primary"
            
            return (
              <div
                key={index}
                className="interactive-card relative group rounded-3xl overflow-hidden shadow-lg"
                style={{
                  backgroundColor: isPrimary ? 'rgba(0, 120, 212, 0.08)' : 'rgba(16, 124, 16, 0.08)',
                  border: `2px solid ${isPrimary ? 'rgba(0, 120, 212, 0.3)' : 'rgba(16, 124, 16, 0.3)'}`,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Top Blurred Background Section */}
                <div 
                  className="h-10 md:h-24 relative overflow-hidden"
                  style={{
                    background: isPrimary 
                      ? 'linear-gradient(135deg, rgba(0, 120, 212, 0.3) 0%, rgba(80, 230, 255, 0.2) 50%, rgba(0, 120, 212, 0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(16, 124, 16, 0.3) 0%, rgba(34, 211, 238, 0.2) 50%, rgba(16, 124, 16, 0.3) 100%)',
                    filter: 'blur(0.5px)',
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm" />
                </div>

                {/* Card Content */}
                <div className="relative -mt-5 md:-mt-16 rounded-t-3xl p-3 md:p-8 flex flex-col" style={{ backgroundColor: 'transparent' }}>
                  {/* Folder Tab Style Header */}
                  <div 
                    className="relative mb-2 md:mb-6"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%)',
                    }}
                  >
                    <div 
                      className="px-3 md:px-6 py-2 md:py-4 rounded-tl-2xl rounded-tr-lg"
                      style={{
                        backgroundColor: isPrimary ? 'rgba(0, 120, 212, 0.15)' : 'rgba(16, 124, 16, 0.15)',
                      }}
                    >
                      {/* Header Label - Pill */}
                      <div className="mb-1 md:mb-3">
                        <span 
                          className={`inline-block px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isPrimary 
                              ? 'bg-[#0078D4] text-white' 
                              : 'bg-[#107C10] text-white'
                          }`}
                          style={{ 
                            fontFamily: 'var(--font-space-grotesk), sans-serif',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          {service.type === "Primary" ? "PRIMARY" : "SECONDARY"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        className="text-base md:text-3xl font-bold text-foreground leading-tight mb-0.5 md:mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                      >
                        {service.title}
                      </h3>

                      {/* Description - Always Visible */}
                      <p 
                        className="text-foreground/80 text-xs md:text-base leading-relaxed line-clamp-2"
                        style={{ fontFamily: 'var(--font-playfair), serif' }}
                      >
                        {service.whatItDoes}
                      </p>
                    </div>
                  </div>

                  {/* Expandable Content Area */}
                  <div className="flex flex-col">
                    {/* Expandable Content */}
                    <div
                      id={`service-content-${index}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[1000px] opacity-100 mb-3' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-3 md:space-y-6 pt-3 md:pt-4 border-t border-foreground/20">
                        {/* Why it matters */}
                        <div>
                          <h4 
                            className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                          >
                            Why it matters
                          </h4>
                          <p 
                            className="text-foreground/90 text-xs md:text-base leading-relaxed"
                            style={{ fontFamily: 'var(--font-playfair), serif' }}
                          >
                            {service.whyItMatters}
                          </p>
                        </div>

                        {/* Outcome */}
                        <div className="pt-3 md:pt-4 border-t border-foreground/20">
                          <h4 
                            className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                          >
                            Outcome
                          </h4>
                          <p 
                            className="text-foreground text-xs md:text-base leading-relaxed font-semibold"
                            style={{ fontFamily: 'var(--font-playfair), serif' }}
                          >
                            {service.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button - Bottom Right */}
                    <div className="flex justify-end mt-2 md:mt-6">
                      <button
                        onClick={() => toggleCard(index)}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        style={{
                          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        aria-expanded={isExpanded}
                        aria-controls={`service-content-${index}`}
                        aria-label={isExpanded ? "Collapse service details" : "Expand service details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 md:w-6 md:h-6 transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 md:w-6 md:h-6 transition-transform duration-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )
          })}
        </div>

        {/* Footer Card - How It All Connects */}
        <div className="max-w-6xl mx-auto mb-12">
          <div 
            className="p-6 md:p-8 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(0, 120, 212, 0.1)',
              borderColor: 'rgba(0, 120, 212, 0.3)',
            }}
          >
            <h3 
              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              How It All Connects
            </h3>
            <p 
              className="text-xl md:text-2xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Strategy → Validation → Implementation → Scale
            </p>
            <p 
              className="text-base md:text-lg text-foreground leading-relaxed"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              Color becomes a system teams trust, not a choice they debate.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg md:text-xl text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            Ready to discuss which services fit your needs?
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-[#0078D4] hover:bg-[#106EBE] text-white hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm md:text-xl px-4 md:px-10 py-5 md:py-7 font-black uppercase tracking-wider w-full md:w-auto whitespace-normal md:whitespace-nowrap"
          >
            <span className="block md:inline">Select Services You're Interested In</span>
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 ml-2 mt-1 md:mt-0 inline-block" />
          </Button>
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
          <linearGradient id="servicesGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#servicesGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
