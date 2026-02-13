"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Stagger children with reveal animation */
  stagger?: boolean
}

/**
 * Microsoft AI-style section reveal: fades in and slides up on scroll.
 * Optionally staggers child elements for a cascading effect.
 */
export function SectionReveal({ children, className = "", delay = 0, stagger = false }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("section-revealed")
            if (stagger) {
              const children = el.querySelectorAll(".stagger-child")
              children.forEach((child, i) => {
                ;(child as HTMLElement).style.animationDelay = `${delay + i * 80}ms`
              })
            }
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, stagger])

  return (
    <div ref={ref} className={`section-reveal ${className}`} data-stagger={stagger || undefined}>
      {children}
    </div>
  )
}
