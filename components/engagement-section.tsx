"use client"
import { useState } from "react"
import { Calendar, MapPin, Users, Filter } from "lucide-react"
import { Button } from "./ui/button"
import { AudioPlayer } from "./audio-player"
import { ReadMoreText } from "./read-more-text"

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
      title: "Web Working the System",
      type: "Workshop",
      category: "development",
      date: "2026-02-01",
      dateFormatted: "Feb 2026",
      location: "Memphis, TN",
      attendees: "Upcoming",
      description: <>A deep dive into web workers—exploring how to leverage web workers for better <span className="highlighter">performance</span> and <span className="highlighter">user experience</span> in modern web applications.</>,
      status: "upcoming",
    },
    {
      title: "UX/UI Bytes",
      type: "Virtual",
      category: "design",
      date: "2024-01-01",
      dateFormatted: "Every 4th Friday",
      location: "Virtual",
      attendees: "Ongoing",
      description: <>UX/UI depth and conversation, and QA with Code Connector. A recurring virtual event for <span className="highlighter">design</span> discussions and <span className="highlighter">community</span> engagement.</>,
      status: "upcoming",
    },
    {
      title: "Hue Got This! Using Coloristic to Drive Action in UI Designs and Interfaces",
      type: "Conference",
      category: "color",
      date: "2025-05-02",
      dateFormatted: "May 2-4, 2025",
      location: "Buffalo, NY",
      attendees: "58",
      description: <><span className="highlighter">Color</span> isn't just about aesthetics—it's a powerful tool for guiding user behavior and driving action. An engaging and interactive session exploring how <span className="highlighter">color psychology</span> influences decision-making.</>,
      status: "upcoming",
    },
    {
      title: "Keynote Speaker & UX/UI Workshop",
      type: "Conference",
      category: "design",
      date: "2025-05-07",
      dateFormatted: "May 7-9, 2025",
      location: "Memphis, TN",
      attendees: "76",
      description: <>Keynote speaker and UX/UI workshop at hackMemphis, sharing insights on <span className="highlighter">design thinking</span> and <span className="highlighter">user experience</span>.</>,
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

  const getCategoryColorHex = (category: string) => {
    switch (category) {
      case "color":
        return "#06b6d4" // cyan-500
      case "research":
        return "#ec4899" // pink-500
      case "design":
        return "#a855f7" // purple-500
      case "development":
        return "#f97316" // orange-500
      default:
        return "#6b7280" // gray-500
    }
  }

  return (
    <section id="engagement" className="px-8 md:px-16 py-12 md:py-16 border-b relative" aria-labelledby="engagement-heading">
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
          <linearGradient id="engagementGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#engagementGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">EVENTS</span>
          <h2 id="engagement-heading" className="sr-only">Speaking and Engagement Events</h2>
        </div>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Sharing vulnerability and ideas on stages:
        </p>

        {/* Featured Audio Talk */}
        <div className="mb-12 max-w-4xl mx-auto">
          <AudioPlayer
            title="Never Be a Spectator"
            description="A conversation about user experience strategy, the intersection of design and development, and how learning to accept failure led to success. Featured on The Code to Life podcast."
            date="May 1, 2020"
            location="The Code to Life Podcast"
            url="https://www.iheart.com/podcast/269-the-code-to-life-62799139/episode/coriano-harris-never-be-a-spectator-62810785/"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter events by category">
          <Filter className="w-5 h-5 text-muted-foreground self-center mr-2" aria-hidden="true" />
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter.id)
                setVisibleCount(4)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedFilter(filter.id)
                  setVisibleCount(4)
                }
              }}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              aria-pressed={selectedFilter === filter.id}
              aria-label={`Filter by ${filter.label}`}
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

        {/* Table of Contents Style Layout - No Borders */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
          {visibleEvents.map((event, index) => {
            const eventNumber = String(index + 1).padStart(2, '0')
            const isLeftColumn = index % 2 === 0
            
            return (
              <div
                key={index}
                className="relative flex items-start gap-2 md:gap-3 min-h-[200px] overflow-hidden md:overflow-visible"
              >
                {/* Large Vertical Number - Rotated Sideways with Color */}
                <div className={`hidden md:flex flex-shrink-0 items-center justify-center ${isLeftColumn ? 'order-1 md:-ml-32' : 'order-3 md:-mr-32'}`} style={{ overflow: 'visible' }}>
                  <div 
                    className="text-9xl lg:text-[10rem] font-black leading-none"
                    style={{ 
                      fontFamily: 'var(--font-baloo2), sans-serif',
                      fontWeight: 800,
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center',
                      whiteSpace: 'nowrap',
                      color: getCategoryColorHex(event.category)
                    }}
                  >
                    {eventNumber}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLeftColumn ? 'order-2' : 'order-2'}`}>
                  <div className="mb-2 flex items-center gap-3">
                    {/* Mobile number - visible on mobile only */}
                    <span 
                      className="md:hidden text-4xl font-black leading-none"
                      style={{ 
                        fontFamily: 'var(--font-baloo2), sans-serif',
                        fontWeight: 800,
                        color: getCategoryColorHex(event.category),
                        opacity: 0.3
                      }}
                    >
                      {eventNumber}
                    </span>
                    <span 
                      className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-block mb-2`}
                    >
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-base md:text-lg leading-relaxed text-foreground mb-4" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                    {event.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-1 text-sm text-muted-foreground font-serif">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>{event.dateFormatted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" aria-hidden="true" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-muted-foreground py-8 relative z-10" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>No events found for this category.</p>
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
        aria-hidden="true"
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
    </section>
  )
}
