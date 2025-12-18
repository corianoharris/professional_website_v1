"use client"

import { useEffect } from "react"

export function BlogPageWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Smoothly scroll to top with fade-in effect
    const fadeInScroll = () => {
      const start = window.pageYOffset
      const duration = 800 // Slower fade-in scroll
      let startTime: number | null = null

      function easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, start * (1 - ease))

        if (timeElapsed < duration) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    fadeInScroll()
  }, [])

  return <div className="animate-fade-in">{children}</div>
}

