"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useAIChat } from "@/components/ai-chat-context"
import { DesktopNavigation } from "@/components/navigation/desktop-navigation"
import { MobileNavigation } from "@/components/navigation/mobile-navigation"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggleTheme } = useTheme()
  const { isOpen: chatOpen, toggleChat } = useAIChat()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["hero", "about", "expertise", "portfolio", "services", "leadership", "color-psychology", "testimonials", "engagement", "press", "blog", "contact"]
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      // Focus the close button when menu opens
      const closeButton = mobileMenuRef.current.querySelector('button[aria-label="Close navigation menu"]') as HTMLElement
      if (closeButton) {
        setTimeout(() => closeButton.focus(), 100)
      }
    }
  }, [mobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return

    const menu = mobileMenuRef.current
    const focusableElements = menu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    menu.addEventListener("keydown", handleTabKey)

    return () => {
      menu.removeEventListener("keydown", handleTabKey)
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Temporarily disable smooth scroll on html element to prevent flickering
      const htmlElement = document.documentElement
      const originalScrollBehavior = htmlElement.style.scrollBehavior
      htmlElement.style.scrollBehavior = 'auto'
      
      // Force a reflow to ensure the style change takes effect
      void htmlElement.offsetHeight

      const start = window.pageYOffset || window.scrollY
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const target = elementPosition - headerOffset
      const distance = target - start
      const duration = 2500 // Slower, smoother scroll duration (2.5 seconds)
      let startTime: number | null = null
      let animationId: number | null = null

      // Store animation ID in a way that can be cancelled
      const cancelPreviousAnimation = () => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      }

      // Cancel any existing scroll animation
      cancelPreviousAnimation()

      // Smoother easing function - easeInOutQuart for very gentle acceleration/deceleration
      function easeInOutQuart(t: number): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
      }

      function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutQuart(progress)

        const currentPosition = start + distance * ease
        window.scrollTo(0, currentPosition)

        if (timeElapsed < duration) {
          animationId = requestAnimationFrame(animate)
        } else {
          // Ensure we end exactly at the target position
          window.scrollTo(0, target)
          // Restore original scroll behavior after a short delay
          setTimeout(() => {
            htmlElement.style.scrollBehavior = originalScrollBehavior
          }, 100)
          animationId = null
        }
      }

      animationId = requestAnimationFrame(animate)
      
      // Focus management: Move focus to the target section after scroll completes
      // This helps screen reader users know where they've navigated to
      setTimeout(() => {
        // Make section focusable temporarily if it isn't already
        const originalTabIndex = element.getAttribute('tabindex')
        if (!originalTabIndex) {
          element.setAttribute('tabindex', '-1')
        }
        element.focus()
        // Remove tabindex after focus to restore normal flow
        if (!originalTabIndex) {
          element.removeAttribute('tabindex')
        }
      }, duration + 100)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        scrolled 
          ? "bg-background/80 dark:bg-gray-950 dark:backdrop-blur-2xl dark:backdrop-saturate-150 backdrop-blur-2xl backdrop-saturate-150 border-b border-foreground/10 dark:border-white/20" 
          : "bg-background/60 dark:bg-gray-950 dark:backdrop-blur-xl dark:backdrop-saturate-150 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/5 dark:border-white/15"
      }`}
      style={{
        top: 0,
        paddingTop: 'max(0px, env(safe-area-inset-top))',
      }}
    >
      <div className="container mx-auto px-6 py-3 relative z-10">
        {/* Top Row: Logo and Navigation */}
        <nav className="flex items-center justify-between mb-2" aria-label="Main navigation">
          {/* Left: Logo/Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("hero")
                }
              }}
              aria-label="Go to homepage"
              className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl font-bold tracking-tight text-foreground/90 dark:text-white/90 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            >
              <img 
                src="/favicon.svg" 
                alt="" 
                className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap">Coriano Harris</span>
            </button>
          </div>

          {/* Right: Navigation Items */}
          <DesktopNavigation 
            activeSection={activeSection} 
            scrollToSection={scrollToSection}
          />
          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={toggleTheme} 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-foreground/80"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("contact")
                }
              }}
              size="sm"
              className="bg-foreground dark:bg-background text-background dark:text-foreground border-2 border-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)] hover:text-white dark:hover:bg-[var(--color-brand-purple)] dark:hover:text-white transition-all"
              aria-label="Navigate to contact form"
            >
              Get in touch
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {!mobileMenuOpen && (
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="text-foreground/80 hover:text-foreground 
                transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </Button>
            )}
          </div>
        </nav>

        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`md:hidden fixed inset-x-0 bg-background/80 dark:bg-gray-950 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/10 dark:border-foreground/20 transition-all duration-300 z-50 ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
          style={{
            top: 0,
            paddingTop: 'max(0px, env(safe-area-inset-top))',
          }}
          role="menu"
          aria-label="Mobile navigation menu"
          aria-hidden={!mobileMenuOpen}
        >
          <MobileNavigation 
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  )
}
