"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
import { ReadMoreText } from "./read-more-text"
import Link from "next/link"

interface AudioPlayerProps {
  src?: string
  title: string
  description?: string
  date?: string
  location?: string
  url?: string
}

export function AudioPlayer({ src, title, description, date, location, url }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      // Silently handle audio loading errors
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !src) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {
        // Handle play error gracefully
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative rounded-xl bg-card border-2 border-foreground/10 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Top wave pattern with gradient */}
      <div className="relative h-14 overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full" 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none"
          style={{ height: "60px" }}
          stroke="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="audioPlayerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
              <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
              <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,30 Q300,5 600,30 T1200,30 L1200,0 L0,0 Z" 
            fill="url(#audioPlayerGradient)"
            stroke="none"
          />
        </svg>
        
        {/* Badge overlay */}
        <div className="absolute top-2 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs bg-background/90 text-foreground font-bold uppercase tracking-wider backdrop-blur-sm">
            Featured Talk
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 md:p-6">
        {/* Magazine-style label */}
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-3">
          AUDIO RECORDING
        </span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-4 leading-[0.95] tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <div className="mb-5">
            <ReadMoreText 
              text={description}
              maxLength={150}
              mobileOnly={true}
            />
          </div>
        )}

        {/* Metadata */}
        {(date || location) && (
          <div className="space-y-2 mb-5 pb-4 border-b border-foreground/10">
            {date && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Date: </span>
                <span>{date}</span>
              </div>
            )}
            {location && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Location: </span>
                <span>{location}</span>
              </div>
            )}
          </div>
        )}

        {/* Audio Player Controls - Only show if audio source is available */}
        {src ? (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="w-full h-2 bg-muted rounded-full cursor-pointer group/progress"
              role="slider"
              aria-label="Audio progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              tabIndex={0}
              onKeyDown={(e) => {
                const audio = audioRef.current
                if (!audio) return
                
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  e.preventDefault()
                  const change = e.key === "ArrowLeft" ? -10 : 10
                  audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + change))
                }
              }}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-100 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="w-12 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" aria-hidden="true" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-5 h-5" aria-hidden="true" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value))
                      setIsMuted(false)
                    }}
                    className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    aria-label="Volume"
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="text-sm text-muted-foreground font-mono tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>
        ) : null}

        {/* Podcast Link */}
        {url && (
          <div className={`${src ? "pt-4 border-t border-foreground/10" : "pt-6"}`}>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-foreground text-background hover:bg-foreground/90 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <Play className="w-6 h-6" aria-hidden="true" />
              <span>Listen to the Interview on iHeart</span>
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Hidden audio element - Only render if src is provided */}
      {src && <audio ref={audioRef} src={src} preload="metadata" />}
    </div>
  )
}

