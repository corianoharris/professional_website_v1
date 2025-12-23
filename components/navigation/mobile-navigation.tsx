"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { mainNavigation, moreNavigation, type NavigationItem } from "./navigation-data"

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

  return (
    <div 
      className="container mx-auto px-6 pb-6 flex flex-col gap-4"
      style={{
        paddingTop: 'calc(73px + max(0px, env(safe-area-inset-top)))',
        paddingLeft: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-left)))',
        paddingRight: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-right)))',
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
          className="p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
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
          className={`text-base font-semibold transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
            activeSection === item.sectionId
              ? "text-[#7c3aed] font-bold"
              : "text-foreground dark:text-foreground hover:text-[#7c3aed]"
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
          className={`w-full text-base font-semibold transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 flex items-center justify-between ${
            moreNavigation.items.some(item => activeSection === item.sectionId)
              ? "text-[#7c3aed] font-bold"
              : "text-foreground dark:text-foreground hover:text-[#7c3aed]"
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
          <div className="pl-6 mt-2 space-y-2">
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
                className={`w-full text-left text-sm font-medium transition-all duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                  activeSection === item.sectionId
                    ? "text-[#7c3aed] font-semibold"
                    : "text-foreground dark:text-foreground font-semibold hover:text-[#7c3aed]"
                }`}
              >
                {item.label}
              </button>
            ))}
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
        className="bg-foreground dark:bg-background text-background dark:text-foreground border-2 border-[#7c3aed] hover:bg-[#7c3aed] hover:text-background dark:hover:text-background transition-all w-full mt-2"
        aria-label="Navigate to contact form"
      >
        Get in touch
      </Button>
    </div>
  )
}

