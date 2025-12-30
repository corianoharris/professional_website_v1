"use client"
import { useState } from "react"
import type React from "react"
import { Users, Calendar, MapPin, Award, GraduationCap } from "lucide-react"
import { ShowMoreButton } from "./show-more-button"

interface LeadershipRole {
  title: string
  organization: string
  location?: string
  startDate: string
  endDate: string | "Present"
  description: string | React.ReactNode
  highlights?: string[]
  icon: any
  color: string
}

export function LeadershipSection() {
  const [visibleCount, setVisibleCount] = useState(2)
  const [isLoading, setIsLoading] = useState(false)
  
  const roles: LeadershipRole[] = [
    {
      title: "Leader",
      organization: "Friends of Figma, San Diego",
      location: "San Diego, CA",
      startDate: "2024",
      endDate: "2025",
      description: <>Leading <span className="highlighter">Figma</span>-focused workshops and talks for designers, developers, project managers, and stakeholders. Participating in Figma feature <span className="highlighter">beta testing</span> to provide feedback on new tools and product updates. Speaker at San Diego <span className="highlighter">Design Week</span> for World Design Conference.</>,
      highlights: [
        "Speaker at San Diego Design Week for World Design Conference",
        "Organized and led design workshops for the community",
        "Beta tested new Figma features and provided product feedback"
      ],
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Leader",
      organization: "Code Connector",
      location: "Memphis, TN",
      startDate: "2019",
      endDate: "Present",
      description: <>Leading a <span className="highlighter">community</span> of developers, designers, and technologists. Organizing events, workshops, and networking opportunities to foster <span className="highlighter">growth</span> and <span className="highlighter">collaboration</span> in the tech community. Creating spaces for learning, <span className="highlighter">mentorship</span>, and professional development.</>,
      highlights: [
        "Organized community events and workshops",
        "Fostered mentorship and professional development",
        "Built connections across the tech community"
      ],
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Entrepreneur Mentor",
      organization: "University of Memphis",
      location: "Memphis, TN",
      startDate: "2024",
      endDate: "Present",
      description: <>Mentoring entrepreneurs in the ImagineU Summer Program. Sharing insights on design thinking, product development, and building <span className="highlighter">remarkable</span> businesses. <span className="highlighter">Empowering</span> the next generation of entrepreneurs with practical knowledge and strategic guidance.</>,
      highlights: [
        "Mentored entrepreneurs in ImagineU Summer Program",
        "Shared expertise in design thinking and product development",
        "Empowered next generation of business leaders"
      ],
      icon: GraduationCap,
      color: "bg-green-500",
    },
  ]

  // Sort roles: "Present" roles first (by start date), then others by start date (most recent first)
  const sortedRoles = [...roles].sort((a, b) => {
    // If both are "Present", sort by start date (most recent first)
    if (a.endDate === "Present" && b.endDate === "Present") {
      return parseInt(b.startDate) - parseInt(a.startDate)
    }
    // "Present" roles come first
    if (a.endDate === "Present") return -1
    if (b.endDate === "Present") return 1
    // Otherwise sort by start date (most recent first)
    return parseInt(b.startDate) - parseInt(a.startDate)
  })

  return (
    <section id="leadership" className="px-8 md:px-16 py-12 md:py-16 border-b relative" aria-labelledby="leadership-heading">
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
          <linearGradient id="leadershipGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#leadershipGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>LEADERSHIP</span>
          <h2 id="leadership-heading" className="sr-only">Leadership and Mentoring</h2>
        </div>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Leading, mentoring, and empowering others:
        </p>

        {/* Table of Contents Style Layout - No Borders */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
          {sortedRoles.slice(0, visibleCount).map((role, index) => {
            const roleNumber = String(index + 1).padStart(2, '0')
            const isLeftColumn = index % 2 === 0
            const isThirdItem = index === 2
            
            const getCategoryColorHex = (color: string) => {
              switch (color) {
                case "bg-purple-500":
                  return "var(--color-brand-purple-light)" // Using semantic token
                case "bg-blue-500":
                  return "var(--color-brand-blue-light)" // Using semantic token
                case "bg-green-500":
                  return "var(--color-brand-green)" // Using semantic token
                default:
                  return "var(--color-brand-gray)" // Using semantic token
              }
            }
            
            return (
              <div
                key={index}
                className={`relative flex items-start gap-2 md:gap-3 min-h-[200px] ${isThirdItem ? 'md:col-span-2' : ''} md:overflow-visible`}
                style={{ overflow: 'visible' }}
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
                      color: getCategoryColorHex(role.color)
                    }}
                  >
                    {roleNumber}
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
                        color: getCategoryColorHex(role.color),
                        opacity: 0.3
                      }}
                    >
                      {roleNumber}
                    </span>
                    <span 
                      className={`${role.color} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-block mb-2`}
                    >
                      Leadership
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {role.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg font-semibold text-foreground">{role.organization}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-foreground font-serif text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                      {role.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1 text-sm text-muted-foreground font-serif">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {role.startDate} - {role.endDate}
                      </span>
                    </div>
                    {role.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>{role.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  {role.highlights && role.highlights.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-foreground/10">
                      <ul className="space-y-2">
                        {role.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Show More/Less Buttons */}
        {roles.length > 2 && (
          <>
            {visibleCount < roles.length && (
              <ShowMoreButton
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setVisibleCount(roles.length)
                    setIsLoading(false)
                  }, 300)
                }}
                count={roles.length - visibleCount}
                isLoading={isLoading}
              />
            )}
            {visibleCount > 2 && (
              <ShowMoreButton
                onClick={() => setVisibleCount(2)}
                showLess={true}
              />
            )}
          </>
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
          <linearGradient id="leadershipGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#leadershipGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}

