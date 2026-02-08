import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Baloo_2, Space_Grotesk, Playfair_Display, Raleway, Cinzel_Decorative, Bungee, Monoton, Fascinate } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileScrollFix } from "@/components/mobile-scroll-fix"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const baloo2 = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-baloo2"
})
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk"
})
const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-playfair"
})
const raleway = Raleway({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway"
})
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-cinzel-decorative"
})
const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee"
})
const monoton = Monoton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-monoton"
})
const fascinate = Fascinate({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-fascinate"
})

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://corianoharris.com"

export const metadata: Metadata = {
  title: "Coriano Harris",
  description:
    "Color intent is my voice. Strategy, UX, UI, code, my stage. Experiences people remember. Color Intent Technologist™.",
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
    "theme-color": "#7c3aed",
    "msapplication-TileColor": "#7c3aed",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#7c3aed",
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
        className={`${inter.className} ${baloo2.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${raleway.variable} ${cinzelDecorative.variable} ${bungee.variable} ${monoton.variable} ${fascinate.variable} font-sans antialiased`}
        style={{
          backgroundImage: "linear-gradient(45deg, #FFB3BA, #FFDFBA, #FFFFBA, #BAFFC9, #BAE1FF, #E1BAFF, #FFBAE1)",
          backgroundSize: "400% 400%",
          animation: "funGradient 15s ease infinite",
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
      </body>
    </html>
  )
}
