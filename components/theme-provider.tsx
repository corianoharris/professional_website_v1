"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"
type FontSize = "normal" | "large" | "extra-large"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  animationsEnabled: boolean
  toggleAnimations: () => void
  highContrast: boolean
  toggleHighContrast: () => void
  readingFocus: boolean
  toggleReadingFocus: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [readingFocus, setReadingFocus] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedFontSize = localStorage.getItem("fontSize") as FontSize | null
    const savedAnimations = localStorage.getItem("animationsEnabled")
    const savedHighContrast = localStorage.getItem("highContrast")
    const savedReadingFocus = localStorage.getItem("readingFocus")

    if (savedTheme) setTheme(savedTheme)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedAnimations !== null) setAnimationsEnabled(savedAnimations === "true")
    if (savedHighContrast !== null) setHighContrast(savedHighContrast === "true")
    if (savedReadingFocus !== null) setReadingFocus(savedReadingFocus === "true")
  }, [])

  useEffect(() => {
    const root = document.documentElement

    // Theme
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)

    // Font size
    root.classList.remove("font-normal", "font-large", "font-extra-large")
    root.classList.add(`font-${fontSize}`)
    localStorage.setItem("fontSize", fontSize)

    // Animations
    if (!animationsEnabled) {
      root.classList.add("no-animations")
    } else {
      root.classList.remove("no-animations")
    }
    localStorage.setItem("animationsEnabled", String(animationsEnabled))

    // High contrast
    if (highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", String(highContrast))

    // Reading focus
    localStorage.setItem("readingFocus", String(readingFocus))
  }, [theme, fontSize, animationsEnabled, highContrast, readingFocus])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev)
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  const toggleReadingFocus = () => {
    setReadingFocus((prev) => !prev)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        setFontSize,
        animationsEnabled,
        toggleAnimations,
        highContrast,
        toggleHighContrast,
        readingFocus,
        toggleReadingFocus,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
