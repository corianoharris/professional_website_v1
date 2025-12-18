"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#E8E4DC]/80 backdrop-blur-lg" : "bg-[#E8E4DC]"
      }`}
    >
      <div className="container mx-auto px-6 py-4 relative z-10">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold tracking-tight text-black hover:text-black/80 transition-colors"
          >
            yourname.com
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-black hover:text-black/80 transition-colors"
            >
              What I Believe
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-sm font-medium text-black hover:text-black/80 transition-colors"
            >
              What I Do
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-sm font-medium text-black hover:text-black/80 transition-colors"
            >
              Outcomes
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              className="text-sm font-medium text-black hover:text-black/80 transition-colors"
            >
              Speaking
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-sm font-medium text-black hover:text-black/80 transition-colors"
            >
              Blog
            </button>
            <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-black hover:text-black/80">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="bg-black text-white hover:bg-black/80"
            >
              Get in touch
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-black hover:text-black/80">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-black hover:text-black/80"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </nav>

        <div
          className={`md:hidden fixed inset-x-0 top-[73px] bg-[#E8E4DC]/95 backdrop-blur-lg transition-all duration-300 ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-base font-medium text-black hover:text-black/80 transition-colors text-left py-2"
            >
              What I Believe
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-base font-medium text-black hover:text-black/80 transition-colors text-left py-2"
            >
              What I Do
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-base font-medium text-black hover:text-black/80 transition-colors text-left py-2"
            >
              Outcomes
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              className="text-base font-medium text-black hover:text-black/80 transition-colors text-left py-2"
            >
              Speaking
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-base font-medium text-black hover:text-black/80 transition-colors text-left py-2"
            >
              Blog
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-black text-white hover:bg-black/80 w-full mt-2"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
