"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { Button } from "./ui/button"

interface ArticleTLDRProps {
  points: string[]
}

export function ArticleTLDR({ points }: ArticleTLDRProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="my-8 rounded-lg border-2 border-black/20 bg-gradient-to-br from-black/5 to-black/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-black/5 transition-colors"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse TLDR" : "Expand TLDR"}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-black/70" />
          <h3 className="text-lg md:text-xl font-bold text-black">
            TL;DR
          </h3>
          <span className="text-xs text-black/50 font-medium">
            ({points.length} key points)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-black/70" />
          ) : (
            <ChevronDown className="w-5 h-5 text-black/70" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-black/10">
          <ul className="space-y-3 mt-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black/20 text-black font-bold text-sm flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>
                <span className="text-base md:text-lg text-black leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

