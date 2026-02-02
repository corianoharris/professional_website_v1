"use client"

import { useEffect } from "react"

/**
 * Fixes mobile Chrome/Safari bug where the page cannot scroll on initial load.
 * Triggers a reflow so the browser establishes the document as the scroll container.
 */
export function MobileScrollFix() {
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    if (!isTouch) return

    // Force reflow so mobile browsers establish scroll container (fixes first-load no-scroll)
    const html = document.documentElement
    void html.offsetHeight
    if (window.visualViewport) void window.visualViewport.height
    window.dispatchEvent(new Event("resize"))
  }, [])

  return null
}
