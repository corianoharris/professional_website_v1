"use client"

import { useState } from "react"
import { ExternalLink, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface PressArticle {
  title: string
  publication: string
  date: string
  url: string
  excerpt?: string
  category?: string
}

export function PressSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const articles: PressArticle[] = [
    {
      title: "Conversation with Coriano Harris",
      publication: "MemphisVoyager",
      date: "2025-03-25",
      url: "https://memphisvoyager.com/interview/conversations-with-coriano-harris",
      excerpt: <>A deep dive into the journey of a Full-Stack Creative Technologist who thrives at the intersection of <span className="highlighter">design</span>, <span className="highlighter">development</span>, and <span className="highlighter">strategy</span>—from tech support to game testing, <span className="highlighter">UX/UI design</span>, and full-stack development.</>,
      category: "Design",
    },
    {
      title: "The Future of Color in Digital Interfaces",
      publication: "Design Week",
      date: "2024-12-15",
      url: "https://example.com/article2",
      excerpt: <>Exploring the <span className="highlighter">psychological</span> impact of <span className="highlighter">color</span> choices in modern web <span className="highlighter">design</span>...</>,
      category: "Research",
    },
    {
      title: "Building Accessible Products That Everyone Can Use",
      publication: "UX Magazine",
      date: "2024-11-20",
      url: "https://example.com/article3",
      excerpt: <>A comprehensive guide to creating <span className="highlighter">inclusive</span> <span className="highlighter">digital experiences</span>...</>,
      category: "Accessibility",
    },
  ]

  // Fixed filter list - only category filters
  const filters = [
    { id: "all", label: "All" },
    { id: "research", label: "Research" },
    { id: "design", label: "Design" },
    { id: "front-end", label: "Front End" },
    { id: "fullstack", label: "Fullstack" },
    { id: "accessibility", label: "Accessibility" },
  ]

  const filteredArticles = selectedFilter === "all" 
    ? articles.slice(0, 1) // Only show first article
    : articles.filter((article) => {
        // Normalize category names for comparison (handle spaces, hyphens, case)
        const normalizeCategory = (cat: string) => 
          cat.toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-")
        const articleCategory = article.category ? normalizeCategory(article.category) : ""
        return articleCategory === selectedFilter
      }).slice(0, 1) // Only show first article

  return (
    <section id="press" className="px-8 md:px-16 py-12 md:py-16 relative" aria-labelledby="press-heading">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pressGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#pressGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto z-10 pt-4">
        <div className="mb-12 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">PRESS</span>
          <h2 id="press-heading" className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4 hidden">
            Featured In
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Articles and features spotlighting my work and ideas:
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter articles by category or publication">
          <Filter className="w-5 h-5 text-muted-foreground self-center mr-2" aria-hidden="true" />
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedFilter(filter.id)
                }
              }}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              aria-pressed={selectedFilter === filter.id}
              aria-label={`Filter by ${filter.label}`}
              className={
                selectedFilter === filter.id
                  ? "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  : "bg-transparent hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Show only first card, centered */}
        {(() => {
          const [firstArticle] = filteredArticles
          return (
            <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-1 max-w-2xl">
              {/* Featured Card - Centered */}
              {firstArticle && (
                <Link
                  href={firstArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read ${firstArticle.title} on ${firstArticle.publication}`}
                  aria-label={`Read ${firstArticle.title} on ${firstArticle.publication} (opens in new tab)`}
                  className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <div className="relative rounded-xl bg-card overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col border-2 border-foreground/10">
                    {/* Top wave pattern with gradient */}
                    <div className="relative h-12 overflow-hidden">
                      <svg 
                        className="absolute top-0 left-0 w-full" 
                        viewBox="0 0 1200 50" 
                        preserveAspectRatio="none"
                        style={{ height: "50px" }}
                        stroke="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id="pressFeaturedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="50%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#14b8a6" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,25 Q300,5 600,25 T1200,25 L1200,0 L0,0 Z" 
                          fill="url(#pressFeaturedGradient)"
                          stroke="none"
                        />
                      </svg>
                      
                      {/* Category badge */}
                      {firstArticle.category && (
                        <div className="absolute top-2 left-4 z-10">
                          <span className="px-2 py-1 rounded-full text-xs bg-background/90 text-foreground font-bold uppercase tracking-wider backdrop-blur-sm">
                            {firstArticle.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content area */}
                    <div className="p-8 md:p-10 flex-grow flex flex-col">
                      {/* Publication name */}
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4">
                        {firstArticle.publication}
                      </span>
                      
                      {/* Headline - larger for featured */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4 leading-[0.95] tracking-tight group-hover:text-[#7c3aed] group-hover:underline transition-colors flex-grow">
                        {firstArticle.title}
                      </h3>
                      
                      {/* Excerpt - more visible for featured */}
                      {firstArticle.excerpt && (
                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                          {firstArticle.excerpt}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="mt-auto pt-4 border-t border-foreground/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span className="font-medium">
                              {new Date(firstArticle.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#7c3aed] group-hover:text-[#6d28d9] transition-colors">
                            <span className="font-medium">Read article</span>
                            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )
        })()}

        {filteredArticles.length === 0 && (
          <p className="text-center text-muted-foreground py-8 relative z-10" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>No articles found for this filter.</p>
        )}
      </div>

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pressGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#pressGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}

