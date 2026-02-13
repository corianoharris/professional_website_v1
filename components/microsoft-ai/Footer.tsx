"use client"

import Link from "next/link"
import { Linkedin, Instagram } from "lucide-react"

const footerLinks = [
  { href: "https://microsoft.ai/contact", label: "Contact" },
  { href: "https://privacy.microsoft.com", label: "Privacy & Cookies" },
  { href: "https://www.microsoft.com/legal/terms-of-use", label: "Terms" },
  { href: "https://www.microsoft.com/legal/intellectualproperty/trademarks", label: "Trademarks" },
  { href: "https://www.microsoft.com", label: "Microsoft.com" },
]

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialLinks = [
  { href: "https://linkedin.com/company/microsoft", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/microsoft", icon: Instagram, label: "Instagram" },
  { href: "https://x.com/microsoft", icon: XIcon, label: "X" },
]

export function MaiFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-[#0066ff] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav aria-label="Social media">
            <ul className="flex gap-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#0066ff] transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © Microsoft {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
