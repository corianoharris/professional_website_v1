"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    // Microsoft AI-style: smooth reveal with better easing
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-revealed")
            // Stagger children if they have the class
            const children = entry.target.querySelectorAll(".stagger-child")
            children.forEach((child, i) => {
              ;(child as HTMLElement).style.transitionDelay = `${i * 100}ms`
            })
            sectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
    )

    // Sections get the reveal treatment (skip sections inside intent-float-in - they use that animation)
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      if (section.closest(".intent-float-in")) return
      if (!section.classList.contains("section-reveal")) {
        section.classList.add("section-reveal")
      }
      // If already visible on load, reveal immediately to avoid opacity-0 flash
      const rect = section.getBoundingClientRect()
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (alreadyVisible) {
        section.classList.add("section-revealed")
        const children = section.querySelectorAll(".stagger-child")
        children.forEach((child) => {
          ;(child as HTMLElement).style.transitionDelay = "0ms"
        })
      } else {
        sectionObserver.observe(section)
      }
    })

    return () => {
      sectionObserver.disconnect()
    }
  }, [])

  return null
}

