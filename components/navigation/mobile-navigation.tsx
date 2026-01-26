"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, X, Linkedin, Mail, Github } from "lucide-react"
import { mainNavigation, moreNavigation, socialLinks, type NavigationItem } from "./navigation-data"

interface MobileNavigationProps {
  activeSection: string
  scrollToSection: (id: string) => void
  onNavigate: () => void
}

export function MobileNavigation({ activeSection, scrollToSection, onNavigate }: MobileNavigationProps) {
  const [moreOpen, setMoreOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    onNavigate()
    setMoreOpen(false)
  }

  const iconMap: Record<string, typeof Linkedin> = {
    Linkedin,
    Mail,
    Github,
  }

  return (
    <div 
      className="container mx-auto px-6 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-73px-env(safe-area-inset-top))]"
      style={{
        paddingTop: 'calc(73px + max(0px, env(safe-area-inset-top)))',
        paddingLeft: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))',
        paddingBottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom)))',
      }}
    >
      {/* Close Button - Inside menu for better UX */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onNavigate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onNavigate()
            }
          }}
          aria-label="Close navigation menu"
          className="p-2 text-foreground/90 dark:text-foreground/90 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
      
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
          role="menuitem"
          aria-label={item.ariaLabel}
          className={`text-base font-semibold transition-all duration-300 text-left py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 ${
            activeSection === item.sectionId
              ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-bold"
              : "text-foreground/95 dark:text-foreground/95 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* More Folder */}
      <div>
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setMoreOpen(!moreOpen)
            }
          }}
          role="menuitem"
          aria-label="More navigation options"
          aria-expanded={moreOpen}
          className={`w-full text-base font-semibold transition-all duration-300 text-left py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 flex items-center justify-between ${
            moreNavigation.items.some(item => activeSection === item.sectionId)
              ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-bold"
              : "text-foreground/95 dark:text-foreground/95 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
          }`}
        >
          <span>{moreNavigation.label}</span>
          {moreOpen ? (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* Folder Items */}
        {moreOpen && (
          <div className="pl-6 mt-2 space-y-1">
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
                role="menuitem"
                aria-label={item.ariaLabel}
                className={`w-full text-left text-sm font-semibold transition-all duration-300 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 ${
                  activeSection === item.sectionId
                    ? "text-[var(--color-brand-purple)] dark:text-[var(--color-action-hover)] font-bold"
                    : "text-foreground/95 dark:text-foreground/95 font-semibold hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Social Links Separator */}
            {socialLinks.length > 0 && (
              <>
                <div className="border-t border-foreground/10 dark:border-foreground/20 my-2 mx-3" />
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon]
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      role="menuitem"
                      aria-label={social.ariaLabel}
                      className="w-full text-left text-sm font-semibold transition-all duration-300 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 flex items-center gap-2 text-foreground/95 dark:text-foreground/95 hover:text-[var(--color-brand-purple)] dark:hover:text-[var(--color-action-hover)]"
                      onClick={() => onNavigate()}
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

      {/* Contact Button */}
      <Button
        onClick={() => handleNavClick("contact")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleNavClick("contact")
          }
        }}
        className="bg-foreground dark:bg-background text-background dark:text-foreground border-2 border-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)] hover:text-background dark:hover:text-background transition-all w-full mt-4 mb-2"
        aria-label="Navigate to contact form"
      >
        Get in touch
      </Button>
    </div>
  )
}

