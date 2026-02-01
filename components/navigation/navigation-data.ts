export interface NavigationItem {
  id: string
  label: string
  sectionId: string
  ariaLabel: string
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

export const mainNavigation: NavigationItem[] = [
  {
    id: "about",
    label: "What I Believe",
    sectionId: "about",
    ariaLabel: "Navigate to What I Believe section",
  },
  {
    id: "expertise",
    label: "What I Do",
    sectionId: "expertise",
    ariaLabel: "Navigate to What I Do section",
  },
  {
    id: "portfolio",
    label: "Outcomes",
    sectionId: "portfolio",
    ariaLabel: "Navigate to Outcomes section",
  },
  {
    id: "engagement",
    label: "Speaking",
    sectionId: "engagement",
    ariaLabel: "Navigate to Speaking section",
  },
]

export const moreNavigation: NavigationFolder = {
  id: "more",
  label: "More",
  items: [
    {
      id: "services",
      label: "Services",
      sectionId: "services",
      ariaLabel: "Navigate to Services section",
    },
    {
      id: "leadership",
      label: "Leadership",
      sectionId: "leadership",
      ariaLabel: "Navigate to Leadership section",
    },
    {
      id: "color-psychology",
      label: "Color",
      sectionId: "color-psychology",
      ariaLabel: "Navigate to Color Psychology section",
    },
    {
      id: "testimonials",
      label: "Voices",
      sectionId: "testimonials",
      ariaLabel: "Navigate to Testimonials section",
    },
    {
      id: "blog",
      label: "Blogs",
      sectionId: "blog",
      ariaLabel: "Navigate to Blogs section",
    },
    {
      id: "press",
      label: "Press",
      sectionId: "press",
      ariaLabel: "Navigate to Press section",
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
    external: false,
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

