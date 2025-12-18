import type React from "react"
import type { Metadata } from "next"
import { Inter, Baloo_2 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollAnimations } from "@/components/scroll-animations"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const baloo2 = Baloo_2({ 
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-baloo2" 
})

export const metadata: Metadata = {
  title: "Human-Driven Color UX Technologist | Portfolio",
  description:
    "Personal portfolio of a Human-Driven Color UX Technologist and Frontend Developer specializing in creative digital experiences",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} ${baloo2.variable} font-sans antialiased`}
        style={{
          background: "linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEEAD, #D4A5A5, #9B59B6)",
          backgroundSize: "400% 400%",
          animation: "funGradient 15s ease infinite",
        }}
      >
        <ThemeProvider>
          <ScrollAnimations />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
