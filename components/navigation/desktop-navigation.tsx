"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Linkedin, Mail, Github, Search } from "lucide-react"
import { primaryNav, mainNavigation, moreNavigation, socialLinks } from "./navigation-data"

interface DesktopNavigationProps {
  activeSection: string
  scrollToSection: (id: string) => void
  onSearchClick?: () => void
}

export function DesktopNavigation({ activeSection, scrollToSection, onSearchClick }: DesktopNavigationProps) {
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
    <div className="hidden md:flex items-center gap-6 lg:gap-8">
      {/* Microsoft.ai-style primary nav: Search, Explore, Latest */}
      {primaryNav.map((item) => (
        "action" in item && item.action === "search" ? (
          <button
            key={item.id}
            onClick={onSearchClick}
            aria-label={item.ariaLabel}
            className="text-sm font-medium text-foreground hover:text-[#0078D4] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:ring-offset-2 rounded-md px-2 py-1"
          >
            <Search className="w-4 h-4" aria-hidden />
            {item.label}
          </button>
        ) : (
          <button
            key={item.id}
            onClick={() => item.sectionId && handleNavClick(item.sectionId)}
            aria-label={item.ariaLabel}
            aria-current={activeSection === item.sectionId ? "page" : undefined}
            className={`text-sm font-medium transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:ring-offset-2 rounded-md px-2 py-1 ${
              activeSection === item.sectionId
                ? "text-[#0078D4] font-semibold"
                : "text-foreground hover:text-[#0078D4]"
            }`}
          >
            {item.label}
            {activeSection === item.sectionId && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0078D4]" aria-hidden />
            )}
          </button>
        )
      ))}
      <span className="text-border w-px h-4" aria-hidden />
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
          className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:ring-offset-2 rounded-md px-2 py-1 ${
            activeSection === item.sectionId
              ? "text-[#0078D4] font-semibold"
              : "text-foreground hover:text-[#0078D4]"
          }`}
        >
          {item.label}
          {activeSection === item.sectionId && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0078D4]" aria-hidden="true"></span>
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
          className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-[#0078D4] focus:ring-offset-2 rounded-md px-2 py-1 flex items-center gap-1 ${
            moreNavigation.items.some(item => activeSection === item.sectionId)
              ? "text-[#0078D4] font-semibold"
              : "text-foreground/90 hover:text-[#0078D4]"
          }`}
        >
          {moreNavigation.label}
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          {moreNavigation.items.some(item => activeSection === item.sectionId) && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0078D4]" aria-hidden="true"></span>
          )}
        </button>

        {/* Dropdown Menu */}
        {moreOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-background/98 dark:bg-gray-950/98 backdrop-blur-md border border-foreground/10 dark:border-foreground/20 rounded-lg shadow-lg py-2 z-50">
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
                    ? "text-[#0078D4] font-semibold bg-[#0078D4]/10"
                    : "text-foreground hover:bg-foreground/5 hover:text-[#0078D4]"
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
                      className="w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 text-foreground hover:bg-foreground/5 hover:text-[#0078D4]"
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

