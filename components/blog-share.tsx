"use client"

import { useState, useEffect } from "react"
import { Link2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogShareProps {
  title: string
  url: string
  excerpt: string
}

export function BlogShare({ title, url, excerpt }: BlogShareProps) {
  const [shareCount, setShareCount] = useState(0)
  const [copied, setCopied] = useState(false)

  // Get current page URL
  const currentUrl = typeof window !== "undefined" ? window.location.href : url

  // Share count starts at 0 and increments when link is copied
  useEffect(() => {
    setShareCount(0)
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setShareCount((prev) => prev + 1)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Share Count */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-black/60">
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">
            <span className="text-2xl font-bold text-black">{shareCount}</span> shares
          </span>
        </div>
      </div>

      {/* Copy Link Button */}
      <Button
        onClick={handleCopyLink}
        variant="outline"
        className="w-full border-black/20 hover:bg-gray-50 hover:border-gray-300 transition-all"
      >
        <Link2 className="w-4 h-4" />
        <span className="text-xs">{copied ? "Copied!" : "Copy Link"}</span>
      </Button>
    </div>
  )
}
