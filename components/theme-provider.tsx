"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"
export type FontSize = "normal" | "large" | "extra-large"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  highContrast: boolean
  toggleHighContrast: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [fontSize, setFontSize] = useState<FontSize>("normal")
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedFontSize = localStorage.getItem("fontSize") as FontSize | null
    const savedHighContrast = localStorage.getItem("highContrast")

    if (savedTheme) setTheme(savedTheme)
    if (savedFontSize) setFontSize(savedFontSize)
    if (savedHighContrast !== null) setHighContrast(savedHighContrast === "true")

    // Settings from removed options (animations, reading focus)
    localStorage.removeItem("animationsEnabled")
    localStorage.removeItem("readingFocus")
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

    // High contrast
    if (highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }
    localStorage.setItem("highContrast", String(highContrast))
  }, [theme, fontSize, highContrast])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        fontSize,
        setFontSize,
        highContrast,
        toggleHighContrast,
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
