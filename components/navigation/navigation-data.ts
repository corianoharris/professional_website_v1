export interface NavigationItem {
  id: string
  label: string
  sectionId: string
  ariaLabel: string
  href?: string // Optional external link (takes precedence over sectionId)
}

export interface NavigationFolder {
  id: string
  label: string
  items: NavigationItem[]
}

export interface SocialLink {
  id: string
  label: string
  href: string
  ariaLabel: string
  icon: string // Icon name from lucide-react
  external?: boolean
}

/* Microsoft.ai-style primary nav: Search, Explore, Latest */
export const primaryNav: Array<
  | { id: string; label: string; action: "search"; ariaLabel: string }
  | { id: string; label: string; sectionId: string; ariaLabel: string }
> = [
  { id: "search", label: "Search", action: "search", ariaLabel: "Open search / ask a question" },
  { id: "explore", label: "Explore", sectionId: "portfolio", ariaLabel: "Explore solutions and services" },
  { id: "latest", label: "Latest", sectionId: "blog", ariaLabel: "View latest articles" },
]

export const mainNavigation: NavigationItem[] = [
  {
    id: "portfolio",
    label: "What I Deliver",
    sectionId: "portfolio",
    ariaLabel: "Navigate to What I Deliver section",
  },
  {
    id: "services",
    label: "Services",
    sectionId: "services",
    ariaLabel: "Navigate to Services section",
  },
  {
    id: "roi-calculator",
    label: "ROI Calculator",
    sectionId: "roi-calculator",
    ariaLabel: "Navigate to ROI Calculator section",
  },
  {
    id: "contact",
    label: "Contact",
    sectionId: "contact",
    ariaLabel: "Navigate to Contact section",
  },
]

export const moreNavigation: NavigationFolder = {
  id: "more",
  label: "More",
  items: [
    {
      id: "qualifier",
      label: "Is This For You?",
      sectionId: "qualifier",
      ariaLabel: "Navigate to Qualifier section",
    },
    {
      id: "urgency",
      label: "Costly Misjudgments",
      sectionId: "urgency",
      ariaLabel: "Navigate to Costly Misjudgments section",
    },
    {
      id: "about",
      label: "What I Believe",
      sectionId: "about",
      ariaLabel: "Navigate to What I Believe section",
    },
    {
      id: "blog",
      label: "Blog",
      sectionId: "blog",
      ariaLabel: "Navigate to Blog page",
      href: "http://localhost:3000/blog",
    },
  ],
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/corianoharris/",
    ariaLabel: "Visit LinkedIn profile",
    icon: "Linkedin",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:me@corianoharris.com",
    ariaLabel: "Send email",
    icon: "Mail",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/corianoharris",
    ariaLabel: "Visit GitHub profile",
    icon: "Github",
    external: true,
  },
]
