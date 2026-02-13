"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface MaiCardProps {
  title: string
  description?: string
  href?: string
  tag?: string
  readTime?: string
  image?: string
  className?: string
}

export function MaiCard({
  title,
  description,
  href,
  tag,
  readTime,
  image,
  className = "",
}: MaiCardProps) {
  const content = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group rounded-xl border border-border bg-card overflow-hidden hover:border-[#0066ff]/30 hover:shadow-lg hover:shadow-[#0066ff]/5 transition-all ${className}`}
    >
      {image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/70" />
        </div>
      )}
      <div className="p-6">
        {tag && (
          <span className="text-xs font-medium text-[#0066ff] uppercase tracking-wider">
            {tag}
          </span>
        )}
        <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-[#0066ff] transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        {readTime && (
          <p className="mt-2 text-xs text-muted-foreground">{readTime}</p>
        )}
      </div>
    </motion.article>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </Link>
    )
  }

  return content
}
