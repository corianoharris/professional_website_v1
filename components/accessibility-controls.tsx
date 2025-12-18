"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Moon, Sun, Type, Zap, ZapOff, ArrowUp } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme, fontSize, setFontSize, animationsEnabled, toggleAnimations } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      <Button
        onClick={scrollToTop}
        size="lg"
        className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 group relative"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Back to Top
        </span>
      </Button>

      <div className="relative">
        <div
          className={`mb-4 bg-card border-2 rounded-xl shadow-xl p-4 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
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
          </div>
        </div>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-14 h-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 group relative"
          aria-label="Accessibility settings"
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
