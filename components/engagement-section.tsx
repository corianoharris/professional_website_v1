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
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
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
              className="relative p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              {/* Top wave pattern for card */}
              <svg 
                className="absolute top-0 left-0 w-full" 
                viewBox="0 0 1200 60" 
                preserveAspectRatio="none"
                style={{ height: "60px" }}
                stroke="none"
              >
                <defs>
                  <linearGradient id={`engagementCardGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="16.67%" stopColor="#4ECDC4" />
                    <stop offset="33.33%" stopColor="#45B7D1" />
                    <stop offset="50%" stopColor="#96CEB4" />
                    <stop offset="66.67%" stopColor="#FFEEAD" />
                    <stop offset="83.33%" stopColor="#D4A5A5" />
                    <stop offset="100%" stopColor="#9B59B6" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,40 Q300,20 600,40 T1200,40 L1200,0 L0,0 Z" 
                  fill={`url(#engagementCardGradient${index})`}
                  stroke="none"
                />
              </svg>

              <div className="flex items-start justify-between mb-4 relative z-10 pt-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-xs text-white font-medium`}
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground font-medium">
                    {event.type}
                  </span>
                </div>
                {event.status === "upcoming" && (
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
                    Upcoming
                  </span>
                )}
              </div>

              <h3 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors relative z-10 leading-tight">{event.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4 relative z-10 leading-relaxed">{event.description}</p>

              <div className="space-y-2 text-sm text-muted-foreground relative z-10">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.dateFormatted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attendees</span>
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
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#engagementGradientBottom)" stroke="none" />
      </svg>
    </div>
  )
}
