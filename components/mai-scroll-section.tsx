"use client"

import { useRef, useEffect, useState } from "react"

interface MaiScrollSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  variant?: "default" | "muted" | "dark"
  layout?: "center" | "alternate"
}

/**
 * Microsoft AI-style section: content and text reveal together when user scrolls.
 */
export function MaiScrollSection({
  id,
  title,
  subtitle,
  children,
  variant = "default",
  layout = "center",
}: MaiScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If inside intent-float-in, start visible so the section-level animation controls the reveal
    if (el.closest(".intent-float-in")) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const bgClass =
    variant === "muted"
      ? "bg-muted/20"
      : variant === "dark"
        ? "bg-foreground text-background"
        : ""

  return (
    <section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 px-6 transition-all duration-900 scroll-mt-24 ${bgClass}`}
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-900 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${variant === "dark" ? "text-background" : "text-foreground"}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg md:text-xl mb-12 max-w-2xl ${variant === "dark" ? "text-background/80" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
        <div>{children}</div>
      </div>
    </section>
  )
}
