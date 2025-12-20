"use client"
import { Users, Calendar, MapPin, Award, GraduationCap } from "lucide-react"
import { ReadMoreText } from "./read-more-text"

interface LeadershipRole {
  title: string
  organization: string
  location?: string
  startDate: string
  endDate: string | "Present"
  description: string
  highlights?: string[]
  icon: any
  color: string
}

export function LeadershipSection() {
  const roles: LeadershipRole[] = [
    {
      title: "Leader",
      organization: "Friends of Figma, San Diego",
      location: "San Diego, CA",
      startDate: "2024",
      endDate: "2025",
      description: "Leading Figma-focused workshops and talks for designers, developers, project managers, and stakeholders. Participating in Figma feature beta testing to provide feedback on new tools and product updates. Speaker at San Diego Design Week for World Design Conference.",
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
      description: "Leading a community of developers, designers, and technologists. Organizing events, workshops, and networking opportunities to foster growth and collaboration in the tech community. Creating spaces for learning, mentorship, and professional development.",
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
      description: "Mentoring entrepreneurs in the ImagineU Summer Program. Sharing insights on design thinking, product development, and building remarkable businesses. Empowering the next generation of entrepreneurs with practical knowledge and strategic guidance.",
      highlights: [
        "Mentored entrepreneurs in ImagineU Summer Program",
        "Shared expertise in design thinking and product development",
        "Empowered next generation of business leaders"
      ],
      icon: GraduationCap,
      color: "bg-green-500",
    },
  ]

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
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#leadershipGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">LEADERSHIP</span>
          <h2 id="leadership-heading" className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
            Building Communities
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold">
          Leading, mentoring, and empowering others:
        </p>

        {/* 2x2 Grid Layout - Third card spans full width */}
        <div className={`grid gap-6 max-w-6xl mx-auto ${roles.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'}`}>
          {roles.map((role, index) => {
            const IconComponent = role.icon
            const isThirdCard = index === 2
            return (
              <div
                key={index}
                className={`relative rounded-xl bg-card overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 border-foreground/10 ${isThirdCard ? 'md:col-span-2' : ''}`}
              >
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
                      <linearGradient id={`leadershipCardGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e40af" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,30 Q300,5 600,30 T1200,30 L1200,0 L0,0 Z" 
                      fill={`url(#leadershipCardGradient${index})`}
                      stroke="none"
                    />
                  </svg>
                  
                  {/* Icon overlay on gradient */}
                  <div className="absolute top-3 left-4 z-10">
                    <div className={`${role.color} p-2 rounded-lg flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Content area */}
                <div className="p-5 md:p-6">
                  {/* Magazine-style label */}
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-3">
                    LEADERSHIP {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Headline - magazine style */}
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-2 leading-[0.95] tracking-tight group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  
                  {/* Organization */}
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg font-semibold text-foreground">{role.organization}</span>
                  </div>
                  
                  {/* Date and Location */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {role.startDate} - {role.endDate}
                      </span>
                    </div>
                    {role.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{role.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Body text - editorial style with read more/less on mobile */}
                  <div className="mb-4">
                    <ReadMoreText 
                      text={role.description}
                      maxLength={150}
                      mobileOnly={true}
                    />
                  </div>
                  
                  {/* Highlights */}
                  {role.highlights && role.highlights.length > 0 && (
                    <div className="pt-4 border-t border-foreground/10">
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
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#leadershipGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}

