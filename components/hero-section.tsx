"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      const start = window.pageYOffset || window.scrollY
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const target = elementPosition - headerOffset
      const distance = target - start
      const duration = 2500 // Slower, smoother scroll duration (2.5 seconds)
      let startTime: number | null = null
      let animationId: number | null = null

      // Smoother easing function - easeInOutQuart for very gentle acceleration/deceleration
      function easeInOutQuart(t: number): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
      }

      function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutQuart(progress)

        const currentPosition = start + distance * ease
        window.scrollTo({
          top: currentPosition,
          behavior: 'auto'
        })

        if (timeElapsed < duration) {
          animationId = requestAnimationFrame(animate)
        } else {
          window.scrollTo({
            top: target,
            behavior: 'auto'
          })
        }
      }

      animationId = requestAnimationFrame(animate)
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/color-burst-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-sm">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Introduction</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
              I help teams stand out with products people care about, through color
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
              Founder of SpeciNate
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              Start a project
            </Button>
            <Button size="lg" variant="outline">
              View my work
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
