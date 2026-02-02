"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Moon, Sun, Type, Zap, ZapOff, ArrowUp, Contrast, Eye } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { theme, toggleTheme, fontSize, setFontSize, animationsEnabled, toggleAnimations, highContrast, toggleHighContrast, readingFocus, toggleReadingFocus } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      setShowScrollToTop(window.scrollY > 400)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  // Focus trap for accessibility menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    const menu = menuRef.current
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
    firstElement?.focus()

    return () => {
      menu.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen])

  // Close accessibility menu when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reading focus: highlight paragraphs on hover
  useEffect(() => {
    if (!readingFocus) {
      // Remove any existing highlights when disabled
      document.querySelectorAll(".reading-focus-highlight").forEach((el) => {
        el.classList.remove("reading-focus-highlight")
      })
      return
    }

    // Select text content elements, excluding interactive elements
    const textElements = document.querySelectorAll("p, li, blockquote, h1, h2, h3, h4, h5, h6, article, section, dd, dt")
    let highlightedElement: HTMLElement | null = null

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      
      // Don't highlight if inside accessibility controls or other interactive areas
      if (
        target.closest('[role="menu"]') || 
        target.closest('.fixed.bottom-6.right-4') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return
      }
      
      // Remove previous highlight
      if (highlightedElement) {
        highlightedElement.classList.remove("reading-focus-highlight")
      }
      
      // Add highlight to current element
      target.classList.add("reading-focus-highlight")
      highlightedElement = target
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      target.classList.remove("reading-focus-highlight")
      if (highlightedElement === target) {
        highlightedElement = null
      }
    }

    textElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
        element.classList.remove("reading-focus-highlight")
      })
      if (highlightedElement) {
        highlightedElement.classList.remove("reading-focus-highlight")
      }
    }
  }, [readingFocus])

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-6">
      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="lg"
        variant="outline"
        className={`w-12 h-12 rounded-full shadow-lg border-2 !bg-white hover:!bg-white/90 !border-[var(--color-brand-purple)]/20 hover:!border-[var(--color-brand-purple)] dark:!bg-white dark:hover:!bg-white/90 dark:!border-[var(--color-brand-purple)]/20 dark:hover:!border-[var(--color-brand-purple)] group relative transition-all duration-300 ${
          showScrollToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-label="Back to top"
        title="Scroll to the top of the page"
      >
        <ArrowUp className="w-5 h-5 !text-[var(--color-brand-purple)] dark:!text-[var(--color-brand-purple)]" />
        <span className="absolute right-full mr-3 !bg-black !text-white dark:!bg-black dark:!text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Back to Top
        </span>
      </Button>

      {/* Accessibility Button */}
      <div className="relative">
        {/* Popup Menu - positioned above the button; on mobile: scrollable, max height so it doesn't get cut off */}
        <div
          ref={menuRef}
          className={`absolute bottom-full right-0 left-0 sm:left-auto mb-3 w-[calc(100vw-2rem)] sm:w-auto sm:min-w-[240px] max-h-[70dvh] sm:max-h-[85dvh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-xl border-2 border-border bg-card p-4 shadow-xl transition-all duration-300 [-webkit-overflow-scrolling:touch] ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          role="menu"
          aria-label="Accessibility settings menu"
          aria-hidden={!isOpen}
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <div className="space-y-4 min-w-0">
            {/* Theme Toggle */}
            <div>
              <p className="text-sm font-medium mb-2">Theme</p>
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                title={theme === "light" ? "Switch to dark theme (Midnight)" : "Switch to light theme (Sunshine)"}
              >
                {theme === "light" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === "light" ? "Sunshine" : "Midnight"}
              </Button>
            </div>

            {/* Font Size */}
            <div>
              <p className="text-sm font-medium mb-2">Font Size</p>
              <div className="space-y-2">
                <Button
                  onClick={() => setFontSize("normal")}
                  variant={fontSize === "normal" ? "default" : "outline"}
                  className="w-full justify-start"
                  size="sm"
                  title="Set font size to normal (16px)"
                >
                  <span className="text-base mr-2 font-bold">T</span>
                  Normal
                </Button>
                <Button
                  onClick={() => setFontSize("large")}
                  variant={fontSize === "large" ? "default" : "outline"}
                  className="w-full justify-start"
                  size="sm"
                  title="Set font size to large (18px)"
                >
                  <span className="text-lg mr-2 font-bold">T</span>
                  Large
                </Button>
                <Button
                  onClick={() => setFontSize("extra-large")}
                  variant={fontSize === "extra-large" ? "default" : "outline"}
                  className="w-full justify-start"
                  size="sm"
                  title="Set font size to extra large (20px)"
                >
                  <span className="text-xl mr-2 font-bold">T</span>
                  Extra Large
                </Button>
              </div>
            </div>

            {/* Animations */}
            <div>
              <p className="text-sm font-medium mb-2">Animations</p>
              <Button 
                onClick={toggleAnimations} 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                title={animationsEnabled ? "Disable animations and transitions for reduced motion" : "Enable animations and transitions"}
              >
                {animationsEnabled ? <Zap className="w-4 h-4 mr-2" /> : <ZapOff className="w-4 h-4 mr-2" />}
                {animationsEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {/* High Contrast */}
            <div>
              <p className="text-sm font-medium mb-2">High Contrast</p>
              <Button 
                onClick={toggleHighContrast} 
                variant={highContrast ? "default" : "outline"} 
                className={`w-full justify-start ${
                  highContrast 
                    ? "!bg-primary !text-primary-foreground hover:!bg-primary/90 hover:!text-primary-foreground dark:hover:!bg-primary/80 dark:hover:!text-primary-foreground border-2 !border-primary" 
                    : "bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground border-2"
                }`}
                aria-pressed={highContrast}
                title={highContrast ? "Disable high contrast mode" : "Enable high contrast mode for better visibility (WCAG AAA compliant)"}
              >
                <Contrast className={`w-4 h-4 mr-2 ${highContrast ? "!text-primary-foreground" : ""}`} />
                {highContrast ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {/* Reading Focus */}
            <div>
              <p className="text-sm font-medium mb-2">Reading Focus</p>
              <Button 
                onClick={toggleReadingFocus} 
                variant={readingFocus ? "default" : "outline"} 
                className={`w-full justify-start ${
                  readingFocus 
                    ? "!bg-primary !text-primary-foreground hover:!bg-primary/90 hover:!text-primary-foreground dark:hover:!bg-primary/80 dark:hover:!text-primary-foreground border-2 !border-primary" 
                    : "bg-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground border-2"
                }`}
                aria-pressed={readingFocus}
                title="Light up a selected paragraph on the page by hovering with the mouse across the page"
              >
                <Eye className={`w-4 h-4 mr-2 ${readingFocus ? "!text-primary-foreground" : ""}`} />
                {readingFocus ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 group relative ring-2 ring-primary/20"
          aria-label="Accessibility settings"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          title={isOpen ? "Close accessibility settings menu" : "Open accessibility settings menu"}
        >
          <Accessibility className="!w-6 !h-6 md:!w-9 md:!h-9" />
          <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Accessibility
          </span>
        </Button>
      </div>
    </div>
  )
}
