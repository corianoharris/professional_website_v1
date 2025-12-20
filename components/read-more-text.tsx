"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"

interface ReadMoreTextProps {
  text: string
  maxLength?: number
  className?: string
  mobileOnly?: boolean
}

export function ReadMoreText({ 
  text, 
  maxLength = 150, 
  className = "",
  mobileOnly = true 
}: ReadMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsTruncation, setNeedsTruncation] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Check if text needs truncation
    const checkTruncation = () => {
      if (mobileOnly && typeof window !== 'undefined') {
        // Only truncate on mobile (below md breakpoint)
        if (window.innerWidth < 768) {
          setNeedsTruncation(text.length > maxLength)
        } else {
          setNeedsTruncation(false)
          setIsExpanded(false)
        }
      } else {
        // Truncate on all screen sizes
        setNeedsTruncation(text.length > maxLength)
      }
    }
    
    checkTruncation()
    if (mobileOnly && typeof window !== 'undefined') {
      window.addEventListener('resize', checkTruncation)
      return () => window.removeEventListener('resize', checkTruncation)
    }
  }, [text, maxLength, mobileOnly])

  const displayText = needsTruncation && !isExpanded 
    ? text.slice(0, maxLength) + "..."
    : text

  return (
    <div className={className}>
      <p 
        ref={textRef}
        className="text-base md:text-lg leading-relaxed text-muted-foreground" 
        style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}
      >
        {displayText}
      </p>
      {needsTruncation && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 md:hidden text-primary hover:text-primary/80 p-0 h-auto font-medium text-sm"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="w-4 h-4 ml-1" aria-hidden="true" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}

