"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Moon, Sun, Menu, X } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { useTheme } from "@/components/theme-provider"
import { getSectionOrderForIntent, type SectionId } from "@/lib/intent-landing"
import { ServicesMai, ProofMai, QualifierMai, ContactMai } from "@/components/mai-sections"
import { RoiCalculatorSection } from "@/components/roi-calculator-section"
import { PaletteReadSection } from "@/components/palette-read-section"

import { HomepageAudio } from "@/components/homepage-audio"
import { Button } from "@/components/ui/button"
import { AccessibilityControls } from "@/components/accessibility-controls"

// In page order. "Sound familiar?" sits right under the hero, so it needs no link.
const navLinks: { href: string; label: string; event?: string }[] = [
  { href: "#palette-read", label: "Check your colors", event: "palette_read_open" },
  { href: "#roi-calculator", label: "Cost" },
  { href: "#services", label: "Services" },
]

function goToNavLink(link: (typeof navLinks)[number], location: "nav" | "mobile_nav") {
  if (link.event) sendGAEvent("event", link.event, { location })
  scrollToSection(link.href.slice(1))
}

// While a nav link is scrolling the page, the header stays put instead of hiding
let navScrollUntil = 0

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  navScrollUntil = Date.now() + 1200
  window.addEventListener("scrollend", () => { navScrollUntil = 0 }, { once: true })

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const headerOffset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
}

const defaultHeroSubhead = "Something in your app looks off. You can't fix it without breaking something else."
const defaultHeroSupport = "Skip the six months of meetings. Take a 15-minute call. I'll show you where color is costing you money, and what to fix first."

const SECTION_MAP: Record<SectionId, React.ReactNode> = {
  qualifier: <QualifierMai />,
  "palette-read": <PaletteReadSection />,
  contact: <ContactMai />,
  story: null, // hidden until real testimonial is ready
  proof: <ProofMai />,
  services: <ServicesMai />,
  "roi-calculator": <RoiCalculatorSection />,
}

function IntentDrivenSections({ intent }: { intent: null }) {
  const order = getSectionOrderForIntent(intent)
  return (
    <div className="bg-background rounded-t-3xl -mt-8 relative z-20 shadow-sm overflow-x-hidden overflow-y-visible isolate">
      {order.map((id) => {
        const section = SECTION_MAP[id]
        if (!section) return null
        return <React.Fragment key={id}>{section}</React.Fragment>
      })}
    </div>
  )
}

export function ColorIntentMaiPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const mobileMenuOpenRef = useRef(false)
  const { theme, toggleTheme } = useTheme()
  const intent = null

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current

      if (currentScrollY < 10 || Date.now() < navScrollUntil) {
        setHeaderVisible(true)
      } else if (delta > 8 && currentScrollY > 80 && !mobileMenuOpenRef.current) {
        setHeaderVisible(false)
      } else if (delta < -2) {
        setHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to hash section after mount (e.g. arriving at /#services)
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

  return (
    <div className="min-h-screen bg-surface-page">
      {/* Spacer so content isn't hidden under fixed header */}
      <div className="h-20 shrink-0" aria-hidden />
      <div>
        {/* Header - fixed at top, content scrolls under */}
        <header
          className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 pt-4"
          style={{
            transform: headerVisible ? 'translateY(0)' : 'translateY(calc(-100% - 50px))',
            transition: 'transform 0.35s ease-in-out',
          }}
        >
        <div className="relative max-w-4xl mx-auto">
        <div className="flex h-14 items-center justify-between px-4 md:px-6 rounded-full border border-surface-warm-line bg-surface-warm/95 backdrop-blur gap-2 md:gap-0">
          {/* Brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-1.5 md:gap-2 text-base md:text-xl font-bold tracking-tight text-foreground hover:text-trust transition-colors min-w-0 shrink"
          >
            <img src="/favicon.svg" alt="" className="w-5 h-5 md:w-6 md:h-6 shrink-0" aria-hidden />
            <span className="truncate md:whitespace-normal">Coriano Harris</span>
          </button>

          {/* Right: Nav + theme */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <nav className="hidden md:flex items-center gap-1 mr-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goToNavLink(link, "nav")}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-white/70 hover:text-trust dark:hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-lg hover:bg-white/60 text-foreground transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <div className="hidden md:block">
              <AccessibilityControls />
            </div>
            <Button
              onClick={() => { sendGAEvent("event", "cta_click", { label: "book_call", location: "nav" }); scrollToSection("contact") }}
              size="sm"
              className="bg-energy-solid hover:bg-energy-solid-hover text-white text-xs md:text-sm px-3 md:px-4 h-8 md:h-9 shrink-0"
            >
              Book a call
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
          <div className="md:hidden mt-2 mx-4 rounded-xl border border-surface-warm-line bg-surface-warm px-6 py-4">
            <nav className="flex flex-col gap-2" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    goToNavLink(link, "mobile_nav")
                    setMobileMenuOpen(false)
                  }}
                  className="-mx-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/70 hover:text-trust dark:hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Display</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-muted/50 text-foreground transition-colors"
                  aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
                <AccessibilityControls />
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* Hero - Warm gradient, serif heading, Color Intent content */}
        <section
          id="hero"
          className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20 bg-surface-warm"
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
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-energy/30 shadow-xl">
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
  aria-label="You can see it, but you can't map it yet."
  className="text-xs uppercase tracking-widest text-muted-foreground mb-6 flex items-center justify-center gap-1.5"
>
  <p className="m-0">Your color is costing you.</p>
</div>

            <h1
              className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6 text-balance"
              style={{ fontFamily: "var(--font-baloo2), sans-serif" }}
            >
              "You can see it, but you can't <span className="highlighter">map it</span> yet."
            </h1>
            <p
              className="text-xl md:text-2xl font-medium text-muted-foreground mb-4 text-balance"
            >
              {defaultHeroSubhead}
            </p>
            <p
              className="text-base md:text-lg text-foreground/90 mb-10 max-w-xl mx-auto"
            >
              {defaultHeroSupport}
            </p>
          </div>

        </section>

        {/* Content sections - intent-driven order: surface most relevant content first */}
        <IntentDrivenSections intent={intent} />
      </main>

      {/* Footer - CTA repeat, newsletter, contact */}
      <footer className="bg-panel text-panel-foreground py-16 border-t border-panel-line">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center text-center gap-10">
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:me@corianoharris.com"
                className="text-sm text-panel-muted hover:text-panel-foreground transition-colors"
              >
                Contact
              </a>
              <a
                href="https://www.linkedin.com/in/corianoharris/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-panel-muted hover:text-panel-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
            <div className="pt-6 border-t border-panel-line w-full max-w-md space-y-1">
              <p className="text-sm text-panel-muted" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
                © {new Date().getFullYear()} Coriano Harris
              </p>
              <p className="text-xs text-panel-muted" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
                The Color Code™
              </p>
            </div>
          </div>
        </div>
        </footer>
      </div>
    </div>
  )
}
