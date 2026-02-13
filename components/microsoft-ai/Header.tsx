"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#news", label: "News" },
  { href: "#team", label: "Team" },
  { href: "#careers", label: "Careers" },
]

export function MaiHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Microsoft logo */}
        <Link
          href="https://www.microsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-foreground hover:text-[#0066ff] transition-colors"
        >
          <svg
            width="108"
            height="21"
            viewBox="0 0 108 21"
            fill="currentColor"
            className="h-5 w-auto"
            aria-label="Microsoft"
          >
            <path d="M0 0h11v11H0V0zm12 0h11v11H12V0zM0 12h11v9H0v-9zm12 0h11v9H12v-9z" />
          </svg>
        </Link>

        {/* Desktop nav - centered */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-[#0066ff] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search + theme toggle */}
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 min-w-[200px]">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-muted/50 text-foreground hover:text-[#0066ff] transition-colors"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 rounded-lg hover:bg-muted/50 text-foreground hover:text-[#0066ff] transition-colors"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-6 py-4">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground hover:text-[#0066ff] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
