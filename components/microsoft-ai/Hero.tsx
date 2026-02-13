"use client"

import { motion } from "framer-motion"

const heroImages = [
  "/images/microsoft-ai/team-1.jpg",
  "/images/microsoft-ai/team-2.jpg",
  "/images/microsoft-ai/team-3.jpg",
  "/images/microsoft-ai/team-4.jpg",
  "/images/microsoft-ai/team-5.jpg",
  "/images/microsoft-ai/team-6.jpg",
]

export function MaiHero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
          style={{ fontFamily: "var(--font-sans), 'Segoe UI', Inter, sans-serif" }}
        >
          <span className="italic">Approachable</span>
          <br />
          Intelligence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-muted-foreground mb-10"
        >
          Responsible AI to empower humanity
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://microsoft.ai/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[#0066ff] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0055dd] transition-colors"
          >
            Learn more
          </a>
          <a
            href="https://microsoft.ai/team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
          >
            MAI Team
          </a>
        </motion.div>
      </div>

      {/* People images grid - placeholder if images don't exist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-5xl mx-auto"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-lg overflow-hidden bg-muted/50 border border-border/50"
          >
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/70 flex items-center justify-center text-muted-foreground text-sm">
              Person {i}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
