"use client"

import { useState } from "react"
import { Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogShareProps {
  title: string
  url: string
  excerpt: string
}

export function BlogShare({ title, url, excerpt }: BlogShareProps) {
  const [copied, setCopied] = useState(false)

  // Get current page URL
  const currentUrl = typeof window !== "undefined" ? window.location.href : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Button
      onClick={handleCopyLink}
      className="w-full bg-black text-white border-none shadow-lg hover:bg-black/90 hover:shadow-xl transition-all"
    >
      <Link2 className="w-4 h-4 mr-2" />
      <span>{copied ? "Copied!" : "Copy Link"}</span>
    </Button>
  )
}
