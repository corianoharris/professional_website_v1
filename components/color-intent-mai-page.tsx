"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageCircle, Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { useAIChat } from "@/components/ai-chat-context"
import { useTheme } from "@/components/theme-provider"
import { getSectionOrderForIntent, type SectionId } from "@/lib/intent-landing"
import { ServicesMai, UrgencyMai, HowItWorksMai, ProofMai, QualifierMai, SiteAuditScoreMai, StoryMai, ContactMai, AboutMai } from "@/components/mai-sections"
// BlogMai is hidden from homepage but component is preserved: import { BlogMai } from "@/components/mai-sections"
import { RoiCalculatorSection } from "@/components/roi-calculator-section"

import { HomepageAudio } from "@/components/homepage-audio"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#services", label: "Services" },
]
const exploreLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#story", label: "The story" },
  { href: "#proof", label: "What's Possible" },
  { href: "#site-audit", label: "Score your system" },
  { href: "#roi-calculator", label: "ROI Calculator" },
  { href: "#blog", label: "Articles" },
  { href: "#about", label: "About" },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) {
    el.scrollIntoView({ block: "start" })
    return
  }

  const headerOffset = 80
  const elementPosition = el.getBoundingClientRect().top

  // If the element is already in view (below the header and above the bottom), skip scroll
  if (elementPosition >= headerOffset && elementPosition <= window.innerHeight) return

  const targetY = elementPosition + window.scrollY - headerOffset
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 1800 // Slow, deliberate scroll
  let startTime: number | null = null

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  function animate(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)
    window.scrollTo(0, startY + distance * eased)
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

const defaultHeroSubhead = "You know color is broken. But you can't prove it—and you can't fix what you can't measure."
const defaultHeroSupport =
  "That's what we change. In 15 minutes, you'll know exactly what your color system is costing you—in failed audits, lost contracts, and revision cycles that never end."

const SECTION_MAP: Record<SectionId, React.ReactNode> = {
  qualifier: <QualifierMai />,
  contact: <ContactMai />,
  urgency: <UrgencyMai />,
  "how-it-works": <HowItWorksMai />,
  story: <StoryMai />,
  proof: <ProofMai />,
  services: <ServicesMai />,
  "site-audit": <SiteAuditScoreMai />,
  "roi-calculator": <RoiCalculatorSection />,
  blog: null, // hidden — content preserved in BlogMai component
  about: <AboutMai />,
}

function IntentDrivenSections({ intent }: { intent: null }) {
  const order = getSectionOrderForIntent(intent)
  return (
    <div className="bg-background rounded-t-3xl -mt-8 relative z-20 shadow-sm overflow-x-hidden overflow-y-visible isolate">
      {order.map((id) => (
        <React.Fragment key={id}>
          {SECTION_MAP[id]}
        </React.Fragment>
      ))}
    </div>
  )
}

export function ColorIntentMaiPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const exploreWrapperRef = useRef<HTMLDivElement>(null)
  const exploreTriggerRef = useRef<HTMLButtonElement>(null)
  const { theme, toggleTheme } = useTheme()
  const { toggleChat } = useAIChat()
  const intent = null

  // Scroll to hash section after mount (e.g. navigating back to /#blog)
  // Use instant scroll — no animation — so the page doesn't flicker at the top
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const headerOffset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo(0, top)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Focus first menu item when dropdown opens
  useEffect(() => {
    if (exploreOpen) {
      const firstItem = exploreWrapperRef.current?.querySelector<HTMLButtonElement>(
        '[role="menuitem"]'
      )
      firstItem?.focus()
    }
  }, [exploreOpen])

  const closeExplore = () => setExploreOpen(false)

  const handleExploreTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeExplore()
      exploreTriggerRef.current?.focus()
      e.preventDefault()
      return
    }
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (!exploreOpen) {
        setExploreOpen(true)
      } else {
        const first = exploreWrapperRef.current?.querySelector<HTMLButtonElement>(
          '[role="menuitem"]'
        )
        first?.focus()
      }
    }
  }

  const handleExploreMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    const items = exploreWrapperRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"]'
    )
    if (!items?.length) return

    switch (e.key) {
      case "Escape":
        closeExplore()
        exploreTriggerRef.current?.focus()
        e.preventDefault()
        break
      case "ArrowDown":
        e.preventDefault()
        items[(index + 1) % items.length].focus()
        break
      case "ArrowUp":
        e.preventDefault()
        items[(index - 1 + items.length) % items.length].focus()
        break
      case "Enter":
      case " ":
        e.preventDefault()
        scrollToSection(exploreLinks[index].href.slice(1))
        closeExplore()
        exploreTriggerRef.current?.focus()
        break
    }
  }

  const handleExploreBlur = (e: React.FocusEvent) => {
    // Blur doesn't bubble, so we attach to trigger + each menuitem
    if (!exploreWrapperRef.current?.contains(e.relatedTarget as Node)) {
      closeExplore()
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f0e6] dark:bg-background">
      {/* Spacer so content isn't hidden under fixed header */}
      <div className="h-20 shrink-0" aria-hidden />
      <div>
        {/* Header - fixed at top, content scrolls under */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 pt-4">
        <div className="relative max-w-4xl mx-auto">
        <div className="flex h-14 items-center justify-between px-4 md:px-6 rounded-full border border-[#e8e0d5] dark:border-white/20 bg-[#f7f0e6]/95 dark:bg-background/95 backdrop-blur gap-2 md:gap-0">
          {/* Left: Chat - ask a question */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => { sendGAEvent("event", "chat_open", { location: "nav" }); toggleChat() }}
              className="p-2 rounded-lg hover:bg-white/60 text-foreground transition-colors flex items-center gap-2"
              aria-label="Ask a question"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline text-sm font-medium">Chat</span>
            </button>
          </div>

          {/* Center: Brand - shorter on mobile */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-1.5 md:gap-2 text-base md:text-xl font-bold tracking-tight text-foreground hover:text-[#06b6d4] transition-colors min-w-0 shrink"
          >
            <img src="/favicon.svg" alt="" className="w-5 h-5 md:w-6 md:h-6 shrink-0" aria-hidden />
            <span className="truncate md:whitespace-normal">Coriano Harris</span>
          </button>

          {/* Right: Nav + theme */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href.slice(1))}
                  className="text-sm font-medium text-foreground hover:text-[#06b6d4] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div ref={exploreWrapperRef} className="relative">
                <button
                  ref={exploreTriggerRef}
                  onClick={() => setExploreOpen(!exploreOpen)}
                  onBlur={handleExploreBlur}
                  onKeyDown={handleExploreTriggerKeyDown}
                  className="text-sm font-medium text-foreground hover:text-[#7c3aed] transition-colors flex items-center gap-1"
                  aria-expanded={exploreOpen}
                  aria-haspopup="menu"
                  aria-controls="explore-menu"
                >
                  Explore
                  <ChevronDown className={`w-4 h-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
                </button>
                {exploreOpen && (
                  <div
                    id="explore-menu"
                    role="menu"
                    aria-label="Explore sections"
                    className="absolute top-full right-0 mt-1 py-2 w-36 rounded-lg bg-background dark:bg-card border border-border shadow-lg"
                  >
                    {exploreLinks.map((link, index) => (
                      <button
                        key={link.href}
                        role="menuitem"
                        onClick={() => {
                          scrollToSection(link.href.slice(1))
                          closeExplore()
                        }}
                        onBlur={handleExploreBlur}
                        onKeyDown={(e) => handleExploreMenuKeyDown(e, index)}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-[#7c3aed]"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-lg hover:bg-white/60 text-foreground transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <Button
              onClick={() => { sendGAEvent("event", "cta_click", { label: "book_call", location: "nav" }); scrollToSection("contact") }}
              size="sm"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs md:text-sm px-3 md:px-4 h-8 md:h-9 shrink-0"
            >
              <span className="sm:hidden">Book a call</span>
              <span className="hidden sm:inline">Book a 15-min call</span>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/60 dark:hover:bg-muted/50"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <HomepageAudio variant="nav" />
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 rounded-xl border border-[#e8e0d5] dark:border-white/20 bg-[#f7f0e6] dark:bg-background px-6 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    scrollToSection(link.href.slice(1))
                    setMobileMenuOpen(false)
                  }}
                  className="text-sm font-medium text-foreground hover:text-[#06b6d4] py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <p className="text-xs uppercase tracking-wider text-muted-foreground pt-2 mt-2 border-t border-border/40">Explore</p>
              {exploreLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    scrollToSection(link.href.slice(1))
                    setMobileMenuOpen(false)
                  }}
                  className="text-sm text-foreground/80 hover:text-[#7c3aed] py-1.5 text-left pl-2"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* Hero - Warm gradient, serif heading, Color Intent content */}
        <section
          id="hero"
          className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20 bg-[#f7f0e6] dark:bg-background"
        >
          {/* Warm gradient background - peach/orange/gold (light mode) - opaque base prevents intent bg flicker on scroll */}
          <div
            className="absolute inset-0 pointer-events-none dark:opacity-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 220, 180, 0.6) 0%, rgba(255, 235, 205, 0.5) 40%, rgba(255, 248, 220, 0.6) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-muted/30 via-background to-background pointer-events-none opacity-0 dark:opacity-100" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Headshot — human face anchors the trust claim */}
            <div className="flex justify-center mb-5">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-[#f97316]/30 shadow-xl">
                <Image
                  src="/images/my-image.jpg"
                  alt="Coriano Harris"
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                  priority
                />
              </div>
            </div>

            <div
  role="text"
  aria-label="I fix the color systems costing you contracts — Color Intent Technologist"
  className="text-xs uppercase tracking-widest text-muted-foreground mb-6 flex items-center justify-center gap-1.5"
  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
>
  <p className="m-0">
    I fix the color systems costing you contracts —&nbsp;<span className="highlighter">Color Intent Technologist</span>
  </p>
</div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontStyle: "italic" }}
            >
              Real <span className="highlighter">color systems</span>
              <br />
              build real <span className="highlighter">trust</span>.
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {defaultHeroSubhead}
            </p>
            <p
              className="text-base md:text-lg text-foreground/90 mb-10 max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {defaultHeroSupport}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => { sendGAEvent("event", "cta_click", { label: "book_call", location: "hero" }); scrollToSection("contact") }}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white"
              >
                Book the 15-min Color ROI Call
              </Button>
              <button
                onClick={() => { sendGAEvent("event", "cta_click", { label: "see_proof", location: "hero" }); scrollToSection("proof") }}
                className="text-sm text-foreground/70 hover:text-foreground underline underline-offset-4 transition-colors"
              >
                See how it works →
              </button>
            </div>
          </div>

        </section>

        {/* Content sections - intent-driven order: surface most relevant content first */}
        <IntentDrivenSections intent={intent} />
      </main>

      {/* Footer - CTA repeat, newsletter, contact */}
      <footer className="bg-[#0f172a] dark:bg-[#f7f0e6] text-white dark:text-neutral-900 py-16 border-t border-white/10 dark:border-neutral-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center text-center gap-10">
            <div>
              <h3 className="text-xl font-bold mb-2">The best time was yesterday</h3>
              <p className="text-white/80 dark:text-neutral-600 text-sm mb-6 max-w-md mx-auto">
                The second best is now. 15 minutes. No pitch. Just the truth about what color is costing you.
              </p>
              <Button
                onClick={() => { sendGAEvent("event", "cta_click", { label: "book_call", location: "footer" }); scrollToSection("contact") }}
                size="lg"
                className="bg-[#f97316] hover:bg-[#ea580c] text-white"
              >
                Book the 15-min Color ROI Call
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:me@corianoharris.com"
                className="text-sm text-white/80 dark:text-neutral-600 hover:text-white dark:hover:text-neutral-900 transition-colors"
              >
                Contact
              </a>
              <a
                href="https://www.linkedin.com/in/corianoharris/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 dark:text-neutral-600 hover:text-white dark:hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/corianoharris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 dark:text-neutral-600 hover:text-white dark:hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="pt-6 border-t border-white/20 dark:border-neutral-200 w-full max-w-md space-y-1">
              <p className="text-sm text-white/70 dark:text-neutral-600" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
                © {new Date().getFullYear()} Coriano Harris, <span className="highlighter">Color Intent Technologist</span>™
              </p>
              <p className="text-xs text-white/60 dark:text-neutral-500" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
                Intent-Driven Color Model™ | All rights reserved
              </p>
            </div>
          </div>
        </div>
        </footer>
      </div>
    </div>
  )
}
