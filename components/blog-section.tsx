"use client"
import { useState, useMemo, useEffect } from "react"
import { Filter } from "lucide-react"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"
import { Button } from "./ui/button"
import { ShowMoreButton } from "./show-more-button"

// Consolidated filter categories - map tags to broader categories
const filterCategories: Record<string, string[]> = {
  "Color": [
    "Color Strategy",
    "Color Psychology",
    "Remarkability",
    "Differentiation",
    "Standout",
    "Trust",
  ],
  "Accessibility": [
    "Accessibility",
    "Inclusion",
    "Inclusive Design",
    "Connection",
  ],
  "Design Systems": [
    "React",
    "Design System",
    "Front End",
  ],
  "UX & Research": [
    "UX Design",
    "UX Research",
    "Research",
  ],
}

export function BlogSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [showAll, setShowAll] = useState<boolean>(false)
  const allPosts = getAllBlogPosts()

  // Consolidated filter list
  const consolidatedFilters = [
    { id: "all", label: "All" },
    { id: "color", label: "Color" },
    { id: "accessibility", label: "Accessibility" },
    { id: "design-systems", label: "Design Systems" },
    { id: "ux-research", label: "UX & Research" },
  ]

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedFilter === "all") {
      return allPosts
    }
    
    const categoryTags = filterCategories[
      selectedFilter === "color" ? "Color" :
      selectedFilter === "accessibility" ? "Accessibility" :
      selectedFilter === "design-systems" ? "Design Systems" :
      selectedFilter === "ux-research" ? "UX & Research" : ""
    ] || []
    
    return allPosts.filter(post => 
      post.tags.some(tag => 
        categoryTags.some(categoryTag => 
          tag.toLowerCase() === categoryTag.toLowerCase()
        )
      )
    )
  }, [allPosts, selectedFilter, filterCategories])

  // Reset showAll when filter changes
  useEffect(() => {
    setShowAll(false)
  }, [selectedFilter])

  // Show 3 posts initially, or all if showAll is true
  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3)
  const hasMorePosts = filteredPosts.length > 3
  
  // For the initial 3-post layout
  const initialPosts = filteredPosts.slice(0, 3)
  const [firstPost, ...remainingPosts] = initialPosts

  // Check if a filter has associated posts
  const hasPostsForFilter = (filterId: string): boolean => {
    if (filterId === "all") return allPosts.length > 0
    
    const categoryTags = filterCategories[
      filterId === "color" ? "Color" :
      filterId === "accessibility" ? "Accessibility" :
      filterId === "design-systems" ? "Design Systems" :
      filterId === "ux-research" ? "UX & Research" : ""
    ] || []
    
    return allPosts.some(post => 
      post.tags.some(tag => 
        categoryTags.some(categoryTag => 
          tag.toLowerCase() === categoryTag.toLowerCase()
        )
      )
    )
  }

  return (
    <section id="blog" className="px-8 md:px-16 py-12 md:py-16 relative">
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
          <linearGradient id="blogGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#blogGradientTop)" stroke="none" />
      </svg>

      <div className="relative z-10 pt-4">
        <div className="relative max-w-6xl mx-auto mb-12">
          <div className="mb-12 mt-0 md:-mt-8">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">EDITORIAL</span>
            <h2 id="blog-heading" className="sr-only">Blog and Editorial Content</h2>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Building with stories:
        </p>

        {/* Filter buttons - Consolidated categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter articles by category">
          <Filter className="w-5 h-5 text-muted-foreground self-center mr-2" aria-hidden="true" />
          {consolidatedFilters.map((filter) => {
            const isDisabled = !hasPostsForFilter(filter.id)
            return (
              <Button
                key={filter.id}
                onClick={() => !isDisabled && setSelectedFilter(filter.id)}
                onKeyDown={(e) => {
                  if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    setSelectedFilter(filter.id)
                  }
                }}
                disabled={isDisabled}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                aria-pressed={selectedFilter === filter.id}
                aria-label={`Filter by ${filter.label}${isDisabled ? " (no articles available)" : ""}`}
                aria-disabled={isDisabled}
                className={
                  isDisabled
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : selectedFilter === filter.id
                    ? "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    : "bg-transparent hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                }
              >
                {filter.label}
              </Button>
            )
          })}
        </div>

        {/* Desktop: Two-column layout for first 3, grid layout for more */}
        {!showAll && (
          <div className={`grid gap-6 max-w-6xl mx-auto ${remainingPosts.length === 0 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'}`}>
            {/* Left Column: Large Featured Card */}
            {firstPost && (
              <Link href={`/blog/${firstPost.slug}`} className={`${remainingPosts.length === 0 ? '' : 'md:row-span-2'} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl`}>
                <div className="group cursor-pointer h-full bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-primary hover:border-double">
                  <div className="relative w-full h-64 md:h-[400px] overflow-hidden">
                    <img
                      src={firstPost.image || "/placeholder.svg"}
                      alt={firstPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:p-10">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-3">{firstPost.date}</span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                      {firstPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            )}

            {/* Right Column: Smaller Cards */}
            <div className="flex flex-col gap-6">
              {remainingPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl">
                  <div className={`group cursor-pointer bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent ${
                    index === 0 
                      ? 'hover:border-accent hover:border-dashed' 
                      : 'hover:border-secondary hover:border-solid'
                  }`}>
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-2">{post.date}</span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grid layout when showing all posts */}
        {showAll && (
          <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post, index) => {
              // Various border styles based on index
              const borderStyles = [
                'hover:border-primary hover:border-double',      // 0: Double border
                'hover:border-accent hover:border-dashed',       // 1: Dashed border
                'hover:border-secondary hover:border-solid',    // 2: Solid border
                'hover:border-primary hover:border-dotted',     // 3: Dotted border
                'hover:border-accent hover:border-double',       // 4: Double border accent
                'hover:border-secondary hover:border-dashed',   // 5: Dashed border secondary
              ]
              const borderStyle = borderStyles[index % borderStyles.length]
              
              return (
              <Link key={post.id} href={`/blog/${post.slug}`} className={`focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl ${index === 0 ? 'md:col-span-2 lg:col-span-1 md:row-span-2' : ''}`}>
                <div className={`group cursor-pointer h-full bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent ${borderStyle}`}>
                  <div className={`relative w-full overflow-hidden ${index === 0 ? 'h-64 md:h-[400px]' : 'h-48'}`}>
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className={`${index === 0 ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}>
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-2">{post.date}</span>
                    <h3 className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-bold mb-2 leading-tight group-hover:text-primary transition-colors`}>
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
              )
            })}
          </div>
        )}

        {displayedPosts.length === 0 && (
          <p className="text-center text-muted-foreground py-8 relative z-10" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            No articles found for this filter.
          </p>
        )}

        {/* Show More/Less button */}
        {hasMorePosts && (
          <>
            {!showAll && (
              <ShowMoreButton
                onClick={() => setShowAll(true)}
                count={filteredPosts.length - 3}
              />
            )}
            {showAll && (
              <ShowMoreButton
                onClick={() => setShowAll(false)}
                showLess={true}
              />
            )}
          </>
        )}

        {/* <p className="text-center text-xl md:text-2xl font-semibold text-muted-foreground mt-16 italic">
          More soon. Subscribe to dare greatly together.
        </p> */}
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
          <linearGradient id="blogGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#blogGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
