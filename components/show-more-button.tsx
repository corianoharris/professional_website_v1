"use client"

import { Button } from "@/components/ui/button"

interface ShowMoreButtonProps {
  onClick: () => void
  count?: number
  showLess?: boolean
  isLoading?: boolean
  className?: string
}

export function ShowMoreButton({ 
  onClick, 
  count, 
  showLess = false,
  isLoading = false,
  className = "" 
}: ShowMoreButtonProps) {
  const displayText = showLess 
    ? "Show Less" 
    : isLoading
      ? "Loading..."
      : count !== undefined && count > 0
        ? `Show More (${count} more)`
        : "Show More"

  return (
    <div className={`flex justify-center gap-4 mt-8 relative z-10 ${className}`}>
      {!showLess && (
        <Button
          onClick={onClick}
          disabled={isLoading}
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base md:text-lg"
          aria-label={isLoading ? "Loading" : `Show ${count || "more"} more items`}
        >
          {displayText}
        </Button>
      )}
      {showLess && (
        <Button 
          onClick={onClick} 
          size="lg" 
          variant="outline" 
          className="px-8 py-6 text-base md:text-lg bg-transparent"
          aria-label="Show fewer items"
        >
          {displayText}
        </Button>
      )}
    </div>
  )
}

