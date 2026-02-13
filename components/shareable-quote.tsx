"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"

const QUOTE = "Average is a failing strategy. Choose remarkable."
const SOURCE = "— Coriano Harris, Color Intent Technologist"

export function ShareableQuote() {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share)
  }, [])

  const handleCopy = async () => {
    const text = `${QUOTE} ${SOURCE}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: open share intent or do nothing
    }
  }

  const handleShare = () => {
    if (canShare && navigator.share) {
      navigator.share({
        title: "Color Intent Technologist",
        text: `${QUOTE} ${SOURCE}`,
        url: typeof window !== "undefined" ? window.location.href : "",
      }).catch(() => {})
    } else {
      handleCopy()
    }
  }

  return (
    <div className="rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/5 dark:bg-[#7c3aed]/10 p-6 md:p-8">
      <blockquote className="text-xl md:text-2xl font-semibold text-foreground italic mb-2">
        &ldquo;{QUOTE}&rdquo;
      </blockquote>
      <p className="text-sm text-muted-foreground mb-4">{SOURCE}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Quote copied" : "Copy quote"}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted/50 text-sm font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#14b8a6]" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" aria-hidden />
              Copy
            </>
          )}
        </button>
        {canShare && (
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share quote"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#7c3aed]/40 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 text-[#7c3aed] text-sm font-medium transition-colors"
          >
            Share
          </button>
        )}
      </div>
    </div>
  )
}
