"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, MessageCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useAIChat } from "@/components/ai-chat-context"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme, toggleTheme } = useTheme()
  const { isOpen: chatOpen, toggleChat } = useAIChat()

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
      const start = window.pageYOffset || window.scrollY
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const target = elementPosition - headerOffset
      const distance = target - start
      const duration = 800 // Faster, smoother scroll duration (0.8 seconds)
      let startTime: number | null = null
      let animationId: number | null = null

      // Store animation ID in a way that can be cancelled
      const cancelPreviousAnimation = () => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      }

      // Cancel any existing scroll animation
      cancelPreviousAnimation()

      // Smoother easing function - easeInOutCubic for gentle acceleration/deceleration
      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        const currentPosition = start + distance * ease
        window.scrollTo({
          top: currentPosition,
          behavior: 'auto' // Use 'auto' to override CSS smooth scroll for more control
        })

        if (timeElapsed < duration) {
          animationId = requestAnimationFrame(animate)
        } else {
          // Ensure we end exactly at the target position
          window.scrollTo({
            top: target,
            behavior: 'auto'
          })
          animationId = null
        }
      }

      animationId = requestAnimationFrame(animate)
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        scrolled 
          ? "bg-background/80 dark:bg-gray-950 dark:backdrop-blur-2xl dark:backdrop-saturate-150 backdrop-blur-2xl backdrop-saturate-150 border-b border-foreground/10 dark:border-white/20" 
          : "bg-background/60 dark:bg-gray-950 dark:backdrop-blur-xl dark:backdrop-saturate-150 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/5 dark:border-white/15"
      }`}
    >
      <div className="container mx-auto px-6 py-3 relative z-10">
        {/* Top Row: Logo and Navigation */}
        <nav className="flex items-center justify-between mb-2" aria-label="Main navigation">
          {/* Left: Logo/Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("hero")
                }
              }}
              aria-label="Go to homepage"
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            >
              <img 
                src="/favicon.svg" 
                alt="" 
                className="w-8 h-8"
                aria-hidden="true"
              />
              <span>Coriano Harris</span>
            </button>
            <div className="relative flex items-center hidden sm:flex">
              <Button
                onClick={toggleChat}
                size="default"
                className="bg-[#7c3aed] text-white hover:bg-[#a78bfa] dark:hover:bg-[#a78bfa] transition-all px-4 py-2 h-auto"
                aria-label={chatOpen ? "Close Chroma chat" : "Talk with Chroma"}
                aria-expanded={chatOpen}
              >
                <span className="hidden sm:inline">Talk with Chroma</span>
              </Button>
            </div>
          </div>

          {/* Right: Navigation Items */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("about")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("about")
                }
              }}
              aria-label="Navigate to What I Believe section"
              aria-current={activeSection === "about" ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                activeSection === "about"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
              }`}
            >
              What I Believe
              {activeSection === "about" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" aria-hidden="true"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("expertise")
                }
              }}
              aria-label="Navigate to What I Do section"
              aria-current={activeSection === "expertise" ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                activeSection === "expertise"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
              }`}
            >
              What I Do
              {activeSection === "expertise" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" aria-hidden="true"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("portfolio")
                }
              }}
              aria-label="Navigate to Outcomes section"
              aria-current={activeSection === "portfolio" ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                activeSection === "portfolio"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
              }`}
            >
              Outcomes
              {activeSection === "portfolio" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" aria-hidden="true"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("engagement")
                }
              }}
              aria-label="Navigate to Speaking section"
              aria-current={activeSection === "engagement" ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                activeSection === "engagement"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
              }`}
            >
              Speaking
              {activeSection === "engagement" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" aria-hidden="true"></span>
              )}
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("blog")
                }
              }}
              aria-label="Navigate to Blog section"
              aria-current={activeSection === "blog" ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                activeSection === "blog"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/90 dark:text-white/90 hover:text-[#7c3aed] dark:hover:text-[#a78bfa]"
              }`}
            >
              Blog
              {activeSection === "blog" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7c3aed]" aria-hidden="true"></span>
              )}
            </button>
            <Button 
              onClick={toggleTheme} 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-foreground/80"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
            </Button>
            <Button
              onClick={() => scrollToSection("contact-form")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("contact-form")
                }
              }}
              size="sm"
              className="bg-foreground dark:bg-background text-background dark:text-foreground border-2 border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white dark:hover:bg-[#7c3aed] dark:hover:text-white transition-all"
              aria-label="Navigate to contact form"
            >
              Get in touch
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Button
              onClick={toggleChat}
              variant="ghost"
              size="icon"
              className={`text-foreground/80 hover:text-[#7c3aed] transition-colors ${chatOpen ? "text-[#7c3aed] bg-[#7c3aed]/10" : ""}`}
              aria-label={chatOpen ? "Close AI chat" : "Open AI chat"}
              aria-expanded={chatOpen}
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
            </Button>
            <Button 
              onClick={toggleTheme} 
              variant="ghost" 
              size="icon" 
              className="text-foreground/80 hover:text-[#7c3aed] transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
            </Button>
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-foreground/80 hover:text-[#7c3aed] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </Button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-x-0 top-0 bg-background/80 dark:bg-gray-950 backdrop-blur-xl backdrop-saturate-150 border-b border-foreground/10 dark:border-foreground/20 transition-all duration-300 z-50 ${
            mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="container mx-auto px-6 pt-[73px] pb-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("about")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("about")
                }
              }}
              role="menuitem"
              aria-label="Navigate to What I Believe section"
              className={`text-base font-medium transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                activeSection === "about"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-foreground/80 hover:text-[#7c3aed]"
              }`}
            >
              What I Believe
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("expertise")
                }
              }}
              role="menuitem"
              aria-label="Navigate to What I Do section"
              className={`text-base font-medium transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                activeSection === "expertise"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-[#1e40af] hover:text-[#7c3aed]"
              }`}
            >
              What I Do
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("portfolio")
                }
              }}
              role="menuitem"
              aria-label="Navigate to Outcomes section"
              className={`text-base font-medium transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                activeSection === "portfolio"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-[#1e40af] hover:text-[#7c3aed]"
              }`}
            >
              Outcomes
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("engagement")
                }
              }}
              role="menuitem"
              aria-label="Navigate to Speaking section"
              className={`text-base font-medium transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                activeSection === "engagement"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-[#1e40af] hover:text-[#7c3aed]"
              }`}
            >
              Speaking
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("blog")
                }
              }}
              role="menuitem"
              aria-label="Navigate to Blog section"
              className={`text-base font-medium transition-all duration-300 text-left py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 ${
                activeSection === "blog"
                  ? "text-[#7c3aed] font-semibold"
                  : "text-[#1e40af] hover:text-[#7c3aed]"
              }`}
            >
              Blog
            </button>
            <Button
              onClick={() => scrollToSection("contact-form")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  scrollToSection("contact-form")
                }
              }}
              className="bg-foreground dark:bg-background text-background dark:text-foreground border-2 border-[#7c3aed] hover:bg-[#7c3aed] hover:text-background dark:hover:text-background transition-all w-full mt-2"
              aria-label="Navigate to contact form"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
