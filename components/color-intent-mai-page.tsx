"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Moon, Sun, Menu, X } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { useTheme } from "@/components/theme-provider"
import { ServicesMai, ProofMai, ContactMai } from "@/components/mai-sections"
import { RoiCalculatorSection } from "@/components/roi-calculator-section"
import { PaletteReadSection } from "@/components/palette-read-section"
import { HeroSpectrum } from "@/components/hero-spectrum"
import { HomepageAudio } from "@/components/homepage-audio"
import { AccessibilityControls } from "@/components/accessibility-controls"

// In page order. "Sound familiar?" sits right under the hero, so it needs no link.
const navLinks: { href: string; label: string; event?: string; hideSm?: boolean }[] = [
  { href: "#palette-read", label: "Check your colors", event: "palette_read_open" },
  { href: "#roi-calculator", label: "Cost", hideSm: true },
  { href: "#services", label: "Services", hideSm: true },
]

const track = (link: (typeof navLinks)[number], location: "nav" | "mobile_nav") => {
  if (link.event) sendGAEvent("event", link.event, { location })
}

const bookCall = (location: string) => sendGAEvent("event", "cta_click", { label: "book_call", location })

export function ColorIntentMaiPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Header stays pinned; its shadow appears once the page scrolls under it.
  // Listens in the capture phase so it also hears <body> scrolling (globals.css makes body a scroll container).
  useEffect(() => {
    const onScroll = () => {
      const y = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
      setScrolled(y > 8)
    }
    onScroll()
    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    return () => document.removeEventListener("scroll", onScroll, { capture: true })
  }, [])

  const ThemeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )

  return (
    <div className="cc">
      <header className={`top ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap bar">
          <a className="brand" href="#hero">
            <Image src="/images/my-image.jpg" alt="" width={32} height={32} className="brand-face" priority />
            <span>Coriano Harris</span>
          </a>
          <nav aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={link.hideSm ? "hide-sm" : undefined} onClick={() => track(link, "nav")}>
                {link.label}
              </a>
            ))}
            <div className="tools">
              {ThemeButton}
              <AccessibilityControls />
            </div>
            <a className="btn btn-hot" href="#contact" onClick={() => bookCall("nav")}>
              Book a call
            </a>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
          <HomepageAudio variant="nav" />
        </div>

        <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
          <nav aria-label="Mobile navigation" style={{ display: "grid" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  track(link, "mobile_nav")
                  setMenuOpen(false)
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="display">
            <span className="label">Display</span>
            <div>
              {ThemeButton}
              {menuOpen && <AccessibilityControls />}
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="hero">
          <div className="wrap">
            <div className="kicker">
              <span className="dot" aria-hidden />
              <span className="label">Coriano Harris · Product architect &amp; color scientist</span>
            </div>
            <div className="hero-top">
              <h1>
                Every color says something. Yours might be <span className="lie">lying</span>.
              </h1>
              <div className="hero-side">
                <p>
                  Users pause. Tickets pile up. Audits fail.{" "}
                  <b>I find the color that&apos;s causing it, and fix it so it stays fixed.</b>
                </p>
                <div className="hero-ctas">
                  <a className="btn btn-hot" href="#contact" onClick={() => bookCall("hero")}>
                    Book the free 15-min call
                  </a>
                  <a className="btn btn-line" href="#palette-read" onClick={() => sendGAEvent("event", "palette_read_open", { location: "hero" })}>
                    Check your colors
                  </a>
                </div>
              </div>
            </div>
          </div>

          <HeroSpectrum />
          <div className="wrap hint label">
            <span>The Color Code · 10 intents across the hue wheel</span>
            <span>Drag, tap or use ← → to probe</span>
          </div>
        </section>

        <ProofMai />
        <PaletteReadSection />
        <RoiCalculatorSection />
        <ServicesMai />
        <ContactMai />
      </main>

      <footer>
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} Coriano Harris · The Color Code™
          </span>
          <nav aria-label="Footer">
            <a href="mailto:me@corianoharris.com">Contact</a>
            <a href="https://www.linkedin.com/in/corianoharris/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
