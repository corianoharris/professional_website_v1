"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Linkedin, Mail, Github } from "lucide-react"
import { mainNavigation, moreNavigation, socialLinks, type NavigationItem } from "./navigation-data"

interface DesktopNavigationProps {
  activeSection: string
  scrollToSection: (id: string) => void
}

export function DesktopNavigation({ activeSection, scrollToSection }: DesktopNavigationProps) {
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setMoreOpen(false)
  }

  const iconMap: Record<string, typeof Linkedin> = {
    Linkedin,
    Mail,
    Github,
  }

  return (
    <div className="hidden md:flex items-center gap-8">
      {/* Main Navigation Items */}
      {mainNavigation.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.sectionId)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleNavClick(item.sectionId)
            }
          }}
          aria-label={item.ariaLabel}
          aria-current={activeSection === item.sectionId ? "page" : undefined}
          className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
            activeSection === item.sectionId
              ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-semibold"
              : "text-foreground/90 dark:text-white/90 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
          }`}
        >
          {item.label}
          {activeSection === item.sectionId && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-brand-purple)] dark:bg-[#a78bfa]" aria-hidden="true"></span>
          )}
        </button>
      ))}

      {/* More Dropdown */}
      <div className="relative" ref={moreRef}>
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setMoreOpen(!moreOpen)
            }
          }}
          aria-label="More navigation options"
          aria-expanded={moreOpen}
          className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 flex items-center gap-1 ${
            moreNavigation.items.some(item => activeSection === item.sectionId)
              ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-semibold"
              : "text-foreground/90 dark:text-white/90 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
          }`}
        >
          {moreNavigation.label}
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          {moreNavigation.items.some(item => activeSection === item.sectionId) && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-brand-purple)] dark:bg-[#a78bfa]" aria-hidden="true"></span>
          )}
        </button>

        {/* Dropdown Menu */}
        {moreOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-background dark:bg-gray-950 border border-foreground/10 dark:border-foreground/20 rounded-lg shadow-lg py-2 z-50">
            {moreNavigation.items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.sectionId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleNavClick(item.sectionId)
                  }
                }}
                aria-label={item.ariaLabel}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  activeSection === item.sectionId
                    ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-semibold bg-[var(--color-brand-purple)]/10 dark:bg-[#a78bfa]/10"
                    : "text-foreground/90 dark:text-white/90 hover:bg-foreground/5 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Social Links Separator */}
            {socialLinks.length > 0 && (
              <>
                <div className="border-t border-foreground/10 dark:border-foreground/20 my-2" />
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon]
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      aria-label={social.ariaLabel}
                      className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 text-foreground/90 dark:text-white/90 hover:bg-foreground/5 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" aria-hidden="true" />}
                      {social.label}
                    </a>
                  )
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

