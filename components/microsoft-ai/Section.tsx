"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "muted" | "dark"
}

export function MaiSection({ id, children, className = "", variant = "default" }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const bgClass =
    variant === "muted"
      ? "bg-muted/30"
      : variant === "dark"
        ? "bg-foreground text-background"
        : ""

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`py-16 md:py-20 px-6 ${bgClass} ${className}`}
    >
      <div className="container mx-auto max-w-6xl">{children}</div>
    </motion.section>
  )
}
