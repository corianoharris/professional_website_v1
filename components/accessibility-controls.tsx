"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Moon, Sun, Zap, ZapOff, Contrast, Eye } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme, fontSize, setFontSize, animationsEnabled, toggleAnimations, highContrast, toggleHighContrast, readingFocus, toggleReadingFocus } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  // Reading focus is now pure CSS via html.reading-focus class (toggled in ThemeProvider).
  // No JavaScript event listeners needed — browser handles :hover natively at compositor level.

  return (
    <div className="relative">
      <div
          ref={menuRef}
          className={`absolute top-full right-0 left-auto mt-3 w-[200px] max-w-[calc(100vw-2rem)] sm:min-w-[180px] max-h-[45dvh] sm:max-h-[60dvh] overflow-y-auto overflow-x-hidden overscroll-contain rounded-lg border border-border bg-card p-2.5 sm:p-3 shadow-xl transition-all duration-300 [-webkit-overflow-scrolling:touch] z-50 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          role="menu"
          aria-label="Accessibility settings menu"
          aria-hidden={!isOpen}
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="space-y-2 sm:space-y-2.5 min-w-0">
            {/* Theme Toggle */}
            <div>
              <p className="text-xs font-medium mb-1">Theme</p>
              <Button 
                onClick={toggleTheme} 
                variant="outline" 
                size="sm"
                className="w-full justify-start bg-transparent h-7 sm:h-8 text-xs"
                title={theme === "light" ? "Switch to dark theme (Midnight)" : "Switch to light theme (Sunshine)"}
              >
                {theme === "light" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {theme === "light" ? "Sunshine" : "Midnight"}
              </Button>
            </div>

            {/* Font Size */}
            <div>
              <p className="text-xs font-medium mb-1">Font Size</p>
              <div className="space-y-1">
                <Button
                  onClick={() => setFontSize("normal")}
                  variant={fontSize === "normal" ? "default" : "outline"}
                  className="w-full justify-start h-7 text-xs"
                  size="sm"
                  title="Set font size to normal (16px)"
                >
                  <span className="text-base mr-2 font-bold">T</span>
                  Normal
                </Button>
                <Button
                  onClick={() => setFontSize("large")}
                  variant={fontSize === "large" ? "default" : "outline"}
                  className="w-full justify-start h-7 text-xs"
                  size="sm"
                  title="Set font size to large (18px)"
                >
                  <span className="text-lg mr-2 font-bold">T</span>
                  Large
                </Button>
                <Button
                  onClick={() => setFontSize("extra-large")}
                  variant={fontSize === "extra-large" ? "default" : "outline"}
                  className="w-full justify-start h-7 text-xs"
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
              <p className="text-xs font-medium mb-1">Animations</p>
              <Button 
                onClick={toggleAnimations} 
                variant="outline" 
                size="sm"
                className="w-full justify-start bg-transparent h-7 sm:h-8 text-xs"
                title={animationsEnabled ? "Disable animations and transitions for reduced motion" : "Enable animations and transitions"}
              >
                {animationsEnabled ? <Zap className="w-4 h-4 mr-2" /> : <ZapOff className="w-4 h-4 mr-2" />}
                {animationsEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>

            {/* High Contrast */}
            <div>
              <p className="text-xs font-medium mb-1">High Contrast</p>
              <Button 
                onClick={toggleHighContrast}
                size="sm"
                variant={highContrast ? "default" : "outline"} 
                className={`h-7 sm:h-8 w-full justify-start text-xs ${
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
              <p className="text-xs font-medium mb-1">Reading Focus</p>
              <Button 
                onClick={toggleReadingFocus}
                size="sm"
                variant={readingFocus ? "default" : "outline"} 
                className={`h-7 sm:h-8 w-full justify-start text-xs ${
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
          size="sm"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full shadow-xl bg-primary hover:bg-primary/90 group relative ring-2 ring-primary/20"
          aria-label="Accessibility settings"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          title={isOpen ? "Close accessibility settings menu" : "Open accessibility settings menu"}
        >
          <Accessibility className="!w-3 !h-3 md:!w-4 md:!h-4" />
          <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Accessibility
          </span>
        </Button>
    </div>
  )
}
