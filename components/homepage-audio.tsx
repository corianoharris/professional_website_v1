"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * Homepage Audio Component
 *
 * Features:
 * - Audio OFF by default, no auto-play
 * - User must click to play
 * - Audio plays only while user remains on page
 * - Page refresh/revisit defaults back to OFF
 * - No cookies, localStorage, or tracking
 * - Song plays in full and fades out at the end
 * - Accessible (keyboard + screen readers)
 * - Never blocks scrolling or primary CTAs
 *
 * Variants:
 * - floating: fixed bottom-left (legacy)
 * - hero: inline in hero section, bottom-right, subtle and supportive
 */
export function HomepageAudio({ variant = "floating" }: { variant?: "floating" | "hero" }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeStartTimeRef = useRef<number | null>(null)
  const fadeCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount - ensures audio stops when leaving page
  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      if (fadeCheckIntervalRef.current) {
        clearInterval(fadeCheckIntervalRef.current)
      }
    }
  }, [])

  // Handle fade out near the end of the song
  useEffect(() => {
    if (!isPlaying) {
      // Reset fade state when paused
      setIsFading(false)
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
      if (fadeCheckIntervalRef.current) {
        clearInterval(fadeCheckIntervalRef.current)
        fadeCheckIntervalRef.current = null
      }
      fadeStartTimeRef.current = null
      return
    }

    const audio = audioRef.current
    if (!audio) return

    // Check audio time to start fade out 3 seconds before the end
    fadeCheckIntervalRef.current = setInterval(() => {
      if (audio.duration && audio.currentTime >= audio.duration - 3) {
        setIsFading(true)
        fadeStartTimeRef.current = Date.now()
        const fadeDuration = 3000 // 3 second fade
        const startVolume = audio.volume

        // Clear the check interval since we're now fading
        if (fadeCheckIntervalRef.current) {
          clearInterval(fadeCheckIntervalRef.current)
          fadeCheckIntervalRef.current = null
        }

        fadeIntervalRef.current = setInterval(() => {
          const elapsed = Date.now() - (fadeStartTimeRef.current || 0)
          const progress = Math.min(elapsed / fadeDuration, 1)
          const newVolume = startVolume * (1 - progress)

          if (audio) {
            audio.volume = Math.max(0, newVolume)
          }

          if (progress >= 1) {
            // Fade complete - pause and reset
            if (audio) {
              audio.pause()
              audio.currentTime = 0
              audio.volume = 1 // Reset volume for next play
            }
            setIsPlaying(false)
            setIsFading(false)
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current)
              fadeIntervalRef.current = null
            }
            fadeStartTimeRef.current = null
          }
        }, 16) // ~60fps for smooth fade
      }
    }, 100) // Check every 100ms

    return () => {
      if (fadeCheckIntervalRef.current) {
        clearInterval(fadeCheckIntervalRef.current)
        fadeCheckIntervalRef.current = null
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setIsFading(false)
      // Reset volume if fading was interrupted
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
        audio.volume = 1
      }
      if (fadeCheckIntervalRef.current) {
        clearInterval(fadeCheckIntervalRef.current)
        fadeCheckIntervalRef.current = null
      }
    } else {
      // Reset audio to start
      audio.currentTime = 0
      audio.volume = 1
      setIsFading(false)

      audio.play().catch((error) => {
        // Handle play error gracefully (e.g., browser autoplay restrictions)
        console.error("Audio play failed:", error)
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      togglePlay()
    }
  }

  const isHero = variant === "hero"

  return (
    <TooltipProvider>
      <div
        className={cn(
          isHero
            ? "absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center justify-end"
            : "fixed bottom-24 sm:bottom-28 left-4 sm:left-6 z-40 flex flex-col gap-3"
        )}
        role="complementary"
        aria-label="Audio invitation"
      >
        {isHero ? (
          /* Hero: single subtle button, bottom-right */
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={togglePlay}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200",
                  "bg-white/15 backdrop-blur-sm border border-white/25 text-white",
                  "hover:bg-white/25 hover:border-white/40 hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
                  isFading && "opacity-70"
                )}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                aria-pressed={isPlaying}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" aria-hidden="true" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={8} className="!z-[300]">
              <p className="text-sm">Listen while you explore</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            {/* Mobile: Just a button */}
            <Button
              onClick={togglePlay}
              onKeyDown={handleKeyDown}
              size="lg"
              variant="default"
              className={cn(
                "w-12 h-12 rounded-full shrink-0 sm:hidden",
                isFading && "opacity-75"
              )}
              aria-label={isPlaying ? "Pause audio invitation" : "Play audio invitation"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
              )}
            </Button>

            {/* Desktop: Play/pause button */}
            <div className="hidden sm:flex items-center gap-2">
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={togglePlay}
                    onKeyDown={handleKeyDown}
                    size="lg"
                    variant="outline"
                    className={cn(
                      "w-12 h-12 rounded-full shrink-0 border-2 bg-background/80 backdrop-blur-sm transition-all",
                      "hover:bg-background hover:scale-110 hover:shadow-lg",
                      "active:scale-95",
                      "text-foreground hover:text-foreground",
                      isFading && "opacity-75"
                    )}
                    aria-label={isPlaying ? "Pause audio invitation" : "Play audio invitation"}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-foreground" aria-hidden="true" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5 text-foreground" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8} className="!z-[300]">
                  <p className="text-sm">Enjoy the soothing music</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </>
        )}

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src="/audio/Intent-Driven_Color_Technologist.mp3"
          preload="none"
          aria-label="Audio invitation message"
        />
      </div>
    </TooltipProvider>
  )
}
