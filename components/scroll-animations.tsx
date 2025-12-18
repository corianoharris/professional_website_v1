"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    // Fade-in on scroll using Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-on-scroll")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all sections and divs with IDs
    const sections = document.querySelectorAll("section, [id], .fade-in")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

