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
      label: "Blog",
      sectionId: "blog",
      ariaLabel: "Navigate to Blog section",
    },
    {
      id: "press",
      label: "Press",
      sectionId: "press",
      ariaLabel: "Navigate to Press section",
    },
  ],
}

