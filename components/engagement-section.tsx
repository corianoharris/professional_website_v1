"use client"
import { useState } from "react"
import { Calendar, MapPin, Users, Filter } from "lucide-react"
import { Button } from "./ui/button"

export function EngagementSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [visibleCount, setVisibleCount] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  const filters = [
    { id: "all", label: "All" },
    { id: "color", label: "Color" },
    { id: "research", label: "Research" },
    { id: "design", label: "Design" },
    { id: "development", label: "Development" },
  ]

  const events = [
    {
      title: "Color Psychology in Modern Interfaces",
      type: "Virtual",
      category: "color",
      date: "2025-01-15",
      dateFormatted: "Jan 15, 2025",
      location: "Virtual",
      attendees: "50+",
      description: "Deep dive into applying color psychology principles to digital product design",
      status: "upcoming",
    },
    {
      title: "Building Accessible Design Systems",
      type: "Conference",
      category: "design",
      date: "2025-02-20",
      dateFormatted: "Feb 20, 2025",
      location: "SF",
      attendees: "200+",
      description: "How to create inclusive design systems that prioritize accessibility and color contrast",
      status: "upcoming",
    },
    {
      title: "User Research for Color Decisions",
      type: "Virtual",
      category: "research",
      date: "2025-03-10",
      dateFormatted: "Mar 10, 2025",
      location: "Virtual",
      attendees: "100+",
      description: "Evidence-based approaches to validating color choices with users",
      status: "upcoming",
    },
    {
      title: "React Color Systems Workshop",
      type: "Workshop",
      category: "development",
      date: "2025-04-05",
      dateFormatted: "Apr 5, 2025",
      location: "NYC",
      attendees: "30",
      description: "Building dynamic theming systems with React and CSS-in-JS",
      status: "upcoming",
    },
  ]

  const filteredEvents = selectedFilter === "all" ? events : events.filter((event) => event.category === selectedFilter)

  const visibleEvents = filteredEvents.slice(0, visibleCount)
  const hasMore = visibleCount < filteredEvents.length
  const canShowLess = visibleCount > 4

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 2, filteredEvents.length))
      setIsLoading(false)
    }, 500)
  }

  const handleShowLess = () => {
    setVisibleCount(4)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "color":
        return "bg-cyan-500"
      case "research":
        return "bg-pink-500"
      case "design":
        return "bg-purple-500"
      case "development":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div id="engagement" className="px-8 md:px-16 py-12 md:py-16 border-b relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="engagementGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#engagementGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">EVENTS</span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
            Speaking & Workshops
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold">
          Sharing vulnerability and ideas on stages:
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground self-center mr-2" />
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter.id)
                setVisibleCount(4)
              }}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              className={
                selectedFilter === filter.id
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-transparent hover:bg-muted"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {visibleEvents.map((event, index) => (
            <div
              key={index}
              className="relative rounded-xl bg-card overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Top wave pattern with gradient */}
              <div className="relative h-14 overflow-hidden">
                <svg 
                  className="absolute top-0 left-0 w-full" 
                  viewBox="0 0 1200 60" 
                  preserveAspectRatio="none"
                  style={{ height: "60px" }}
                  stroke="none"
                >
                  <defs>
                    <linearGradient id={`engagementCardGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,30 Q300,5 600,30 T1200,30 L1200,0 L0,0 Z" 
                    fill={`url(#engagementCardGradient${index})`}
                    stroke="none"
                  />
                </svg>
                
                {/* Tags overlay on gradient */}
                <div className="absolute top-2 left-4 right-4 z-10 flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg`}
                    >
                      {event.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-background/90 text-foreground font-medium backdrop-blur-sm">
                      {event.type}
                    </span>
                  </div>
                  {event.status === "upcoming" && (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500 text-white font-bold uppercase tracking-wider shadow-lg">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
              
              {/* Content area */}
              <div className="p-5 md:p-6">
                {/* Magazine-style label */}
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-3">
                  EVENT {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Headline - magazine style */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-4 leading-[0.95] tracking-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                {/* Body text - editorial style */}
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-serif mb-5">
                  {event.description}
                </p>

                {/* Metadata - magazine style */}
                <div className="space-y-2 pt-4 border-t border-foreground/10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{event.dateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-muted-foreground py-8 relative z-10">No events found for this category.</p>
      )}

      {(hasMore || canShowLess) && (
        <div className="flex justify-center gap-4 mt-8 relative z-10">
          {hasMore && (
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-12 py-6 text-lg"
            >
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          )}
          {canShowLess && (
            <Button onClick={handleShowLess} size="lg" variant="outline" className="px-12 py-6 text-lg bg-transparent">
              Show Less
            </Button>
          )}
        </div>
      )}

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="engagementGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#engagementGradientBottom)" stroke="none" />
      </svg>
    </div>
  )
}
