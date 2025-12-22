"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Moon, Sun, Type, Zap, ZapOff, ArrowUp, Contrast } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { theme, toggleTheme, fontSize, setFontSize, animationsEnabled, toggleAnimations, highContrast, toggleHighContrast } = useTheme()
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-6">
      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="lg"
        variant="outline"
        className={`w-12 h-12 rounded-full shadow-lg border-2 !bg-white hover:!bg-white/90 !border-[#7c3aed]/20 hover:!border-[#7c3aed] dark:!bg-white dark:hover:!bg-white/90 dark:!border-[#7c3aed]/20 dark:hover:!border-[#7c3aed] group relative transition-all duration-300 ${
          showScrollToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 !text-[#7c3aed] dark:!text-[#7c3aed]" />
        <span className="absolute right-full mr-3 !bg-black !text-white dark:!bg-black dark:!text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Back to Top
        </span>
      </Button>

      {/* Accessibility Button */}
      <div className="relative">
        {/* Popup Menu - positioned above the button */}
        <div
          ref={menuRef}
          className={`absolute bottom-full right-0 mb-3 bg-card border-2 rounded-xl shadow-xl p-4 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          role="menu"
          aria-label="Accessibility settings menu"
          aria-hidden={!isOpen}
        >
          <div className="space-y-4 min-w-[240px]">
            {/* Theme Toggle */}
            <div>
              <p className="text-sm font-medium mb-2">Theme</p>
              <Button onClick={toggleTheme} variant="outline" className="w-full justify-start bg-transparent">
                {theme === "light" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === "light" ? "Light Mode" : "Dark Mode"}
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
                >
                  <Type className="w-4 h-4 mr-2" />
                  Normal
                </Button>
                <Button
                  onClick={() => setFontSize("large")}
                  variant={fontSize === "large" ? "default" : "outline"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Type className="w-5 h-5 mr-2" />
                  Large
                </Button>
                <Button
                  onClick={() => setFontSize("extra-large")}
                  variant={fontSize === "extra-large" ? "default" : "outline"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <Type className="w-6 h-6 mr-2" />
                  Extra Large
                </Button>
              </div>
            </div>

            {/* Animations */}
            <div>
              <p className="text-sm font-medium mb-2">Animations</p>
              <Button onClick={toggleAnimations} variant="outline" className="w-full justify-start bg-transparent">
                {animationsEnabled ? <Zap className="w-4 h-4 mr-2" /> : <ZapOff className="w-4 h-4 mr-2" />}
                {animationsEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {/* High Contrast */}
            <div>
              <p className="text-sm font-medium mb-2">High Contrast</p>
              <Button onClick={toggleHighContrast} variant={highContrast ? "default" : "outline"} className="w-full justify-start bg-transparent">
                <Contrast className="w-4 h-4 mr-2" />
                {highContrast ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 group relative ring-2 ring-primary/20"
          aria-label="Accessibility settings"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <Settings className={`w-6 h-6 ${isOpen ? "rotate-90" : ""} transition-transform duration-300`} />
          <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Accessibility
          </span>
        </Button>
      </div>
    </div>
  )
}
