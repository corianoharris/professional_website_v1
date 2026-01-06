"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
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
 * - Song fades out after 30 seconds
 * - Accessible (keyboard + screen readers)
 * - Includes visible transcript toggle
 * - Never blocks scrolling or primary CTAs
 */
export function HomepageAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeStartTimeRef = useRef<number | null>(null)

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
    }
  }, [])

  // Handle fade out after 30 seconds
  useEffect(() => {
    if (!isPlaying) {
      // Reset fade state when paused
      setIsFading(false)
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
      }
      fadeStartTimeRef.current = null
      return
    }

    const audio = audioRef.current
    if (!audio) return

    // Start fade out timer after 30 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
      fadeStartTimeRef.current = Date.now()
      const fadeDuration = 2000 // 2 second fade
      const startVolume = audio.volume

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
    }, 30000) // 30 seconds

    return () => {
      clearTimeout(fadeTimer)
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

  // Transcript content - replace with actual transcript
  const transcript = `Hi there! I'm Coriano Harris, and I'd love to connect with you. If you're interested in learning more about how I can work with you to create remarkable products, please reach out. Let's start a conversation.`

  return (
    <TooltipProvider>
      <div 
        className="fixed bottom-24 sm:bottom-28 left-4 sm:left-6 z-40 flex flex-col gap-3"
        role="complementary"
        aria-label="Audio invitation"
      >
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

        {/* Desktop: Minimal button with popover for transcript */}
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
              <p className="text-sm">
                Enjoy the soothing music
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Transcript button */}
          <Popover>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full border-2 bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110 hover:shadow-lg active:scale-95 text-foreground hover:text-foreground"
                    aria-label="Show transcript"
                  >
                    <FileText className="w-4 h-4 text-foreground" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8} className="!z-[300]">
                <p className="text-sm">
                  {isPlaying ? (isFading ? "Fading out..." : "Click to pause") : "Click to hear a brief message"}
                </p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent 
              side="right" 
              sideOffset={8}
              align="end"
              className="w-64 sm:w-80 !z-[300] -mt-2"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Transcript</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {transcript}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src="/audio/Visual-Spectrum.mp3"
          preload="none"
          aria-label="Audio invitation message"
        />
      </div>
    </TooltipProvider>
  )
}

