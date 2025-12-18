"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = ["hero", "about", "expertise", "portfolio", "engagement", "blog", "contact"]
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const start = window.pageYOffset
      const target = element.offsetTop - 80
      const distance = target - start
      const duration = 2500 // Slower, more gradual scroll duration
      let startTime: number | null = null

      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, start + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
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
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-black hover:text-black/80 transition-colors"
          >
            <img 
              src="/icon.svg" 
              alt="Logo" 
              className="w-8 h-8"
            />
            yourname.com
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === "about"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              What I Believe
              {activeSection === "about" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === "expertise"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              What I Do
              {activeSection === "expertise" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === "portfolio"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              Outcomes
              {activeSection === "portfolio" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === "engagement"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              Speaking
              {activeSection === "engagement" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === "blog"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              Blog
              {activeSection === "blog" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]"></span>
              )}
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
              className={`text-base font-medium transition-all duration-300 text-left py-2 ${
                activeSection === "about"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              What I Believe
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className={`text-base font-medium transition-all duration-300 text-left py-2 ${
                activeSection === "expertise"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              What I Do
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className={`text-base font-medium transition-all duration-300 text-left py-2 ${
                activeSection === "portfolio"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              Outcomes
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              className={`text-base font-medium transition-all duration-300 text-left py-2 ${
                activeSection === "engagement"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
            >
              Speaking
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className={`text-base font-medium transition-all duration-300 text-left py-2 ${
                activeSection === "blog"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-black hover:text-[#7c3aed]"
              }`}
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
