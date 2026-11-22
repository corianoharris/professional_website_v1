import type React from "react"
import type { Metadata, Viewport } from "next"
import { Unbounded, Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleTagManager } from "@next/third-parties/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileScrollFix } from "@/components/mobile-scroll-fix"
import "./globals.css"
import "./color-code.css"

// Headings: Unbounded. Prices and big numbers: Bricolage Grotesque. Body: Instrument Sans. Hex values and data: JetBrains Mono.
const unbounded = Unbounded({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-unbounded" })
const bricolage = Bricolage_Grotesque({ weight: ["600", "700", "800"], subsets: ["latin"], variable: "--font-bricolage" })
const instrument = Instrument_Sans({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-instrument" })
const jetbrainsMono = JetBrains_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-jetbrains-mono" })

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://corianoharris.com"

export const metadata: Metadata = {
  title: "Coriano Harris | Product Architect & Color Scientist",
  description:
    "Product architect and color scientist. I find the colors that make users pause, flood support and fail audits, and fix them so they stay fixed. The Color Code™.",
  manifest: "/manifest.json",

  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon-tab.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/web-app-manifest-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  other: {
    "theme-color": "#06b6d4",
    "msapplication-TileColor": "#06b6d4",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#06b6d4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="md:scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/favicon.svg" as="image" />
      </head>
      <body
        className={`${instrument.className} ${instrument.variable} ${unbounded.variable} ${bricolage.variable} ${jetbrainsMono.variable} antialiased`}
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <MobileScrollFix />
          {children}
        </ThemeProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  )
}
