"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Accessibility, Contrast } from "lucide-react"
import { useTheme, type FontSize } from "@/components/theme-provider"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const { fontSize, setFontSize, highContrast, toggleHighContrast } = useTheme()
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

  const sizes: { id: FontSize; label: string; className: string }[] = [
    { id: "normal", label: "Normal", className: "text-base" },
    { id: "large", label: "Large", className: "text-lg" },
    { id: "extra-large", label: "Extra large", className: "text-xl" },
  ]

  return (
    <div className="relative">
      <div
          ref={menuRef}
          className={`absolute top-full right-0 left-auto mt-3 w-[220px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-card p-3 shadow-xl transition-all duration-300 motion-reduce:transition-none z-50 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          role="dialog"
          aria-label="Accessibility settings"
          inert={!isOpen}
        >
          <div className="flex flex-col gap-4">
            <div role="group" aria-labelledby="a11y-text-size" className="flex flex-col gap-1.5">
              <p id="a11y-text-size" className="text-xs font-semibold">Text size</p>
              <div className="grid grid-cols-3 gap-1.5">
                {sizes.map((s) => (
                  <Button
                    key={s.id}
                    onClick={() => setFontSize(s.id)}
                    variant={fontSize === s.id ? "default" : "outline"}
                    size="sm"
                    aria-pressed={fontSize === s.id}
                    aria-label={`${s.label} text`}
                    className="h-9"
                  >
                    <span className={`${s.className} font-bold leading-none`} aria-hidden>A</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold">High contrast</p>
              <Button
                onClick={toggleHighContrast}
                variant={highContrast ? "default" : "outline"}
                size="sm"
                aria-pressed={highContrast}
                className="h-9 w-full justify-start text-xs"
              >
                <Contrast className="w-4 h-4 mr-2" aria-hidden />
                {highContrast ? "On" : "Off"}
              </Button>
            </div>
          </div>
        </div>

        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full shadow-xl bg-primary hover:bg-primary-hover relative ring-2 ring-primary/20"
          aria-label="Accessibility settings"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          title={isOpen ? "Close accessibility settings" : "Open accessibility settings"}
        >
          <Accessibility className="!w-3 !h-3 md:!w-4 md:!h-4" />
        </Button>
    </div>
  )
}
