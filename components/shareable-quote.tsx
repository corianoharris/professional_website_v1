"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"

const QUOTE = "People decide who you're for before they read a single word. Color is that decision."
const SOURCE = "Intent-Driven Color Model"

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
        title: "Intent-Driven Color Model",
        text: `${QUOTE} ${SOURCE}`,
        url: typeof window !== "undefined" ? window.location.href : "",
      }).catch(() => {})
    } else {
      handleCopy()
    }
  }

  return (
    <div className="rounded-xl p-6 md:p-8">
      <blockquote className="text-lg md:text-xl font-medium text-muted-foreground italic mb-2">
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
