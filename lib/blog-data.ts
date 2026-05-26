export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  content: string
  tags: string[]
  tldr?: string[] // Optional TLDR key points
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "the-hidden-cost-of-generic-blue",
    title: "The Hidden Cost of Generic Blue",
    excerpt: "Your product looks like everyone else's. Learn why safe blue is costing you trust, memory, and differentiation.",
    image: "/generic_blue.webp",
    date: "March 15, 2025",
    author: "Coriano Harris",
    tags: ["Color Strategy", "Trust", "Differentiation"],
    tldr: [
      "Generic blue = low risk, low memory. Users trust it and forget it instantly.",
      "Unopinionated design is expensive over time. Your product blends in. Your brand becomes interchangeable."
    ],
    content: `
# The Hidden Cost of Generic Blue

You know that blue? The one that looks like every SaaS product ever made? Yeah, that one. It screams "I'm a button!" but whispers "I'm also forgettable."

Users trust it. And forget it ==instantly==. It's like meeting someone at a party who's perfectly nice but has the personality of a beige wall. You'll never remember their name.

Teams keep choosing it because it passes color accessibility checks. Stakeholders rarely object. The meeting ends faster. But your product suffers.

Your product ==blends into the SaaS crowd==. Your brand becomes ==interchangeable==. Your UI doesn't tell a story—only instructions.

Generic blue isn't bad design. It's ==unopinionated design==. And unopinionated design is ==expensive over time==.
    `,
  },
  {
    id: "2",
    slug: "the-future-of-color-in-digital-interfaces",
    title: "The Future of Color in Digital Interfaces",
    excerpt: "Color is neuroscience, not decoration. Make every hue work harder for your users and your business.",
    image: "/colorful-abstract.png",
    date: "December 15, 2025",
    author: "Coriano Harris",
    tags: ["Color Psychology", "UX Design", "Research"],
    tldr: [
      "Color psychology is neuroscience. Brains process color before they read a word. Context changes everything.",
      "The future isn't consistency—it's intentionality. What emotion? What action? What story?"
    ],
    content: `
# The Future of Color in Digital Interfaces

Color isn't decoration. It's ==communication==. Every hue tells a story.

==Color psychology is neuroscience==. Your brain processes color before reading words. Red triggers urgency. Blue builds trust. Green signals growth. But ==context changes everything==.

A red button at checkout means "buy now." The same red on a medical app means "emergency." ==Same color. Different story.==

The future isn't about consistency. It's about ==intention==. Every color should answer: What emotion? What action? What story?

Color is ==emotional architecture==. It sets mood. Guides attention. Creates atmosphere.

Choose colors with ==purpose==. Not because they match brand guidelines. Not because they're trendy. Because they ==serve your user's journey==.

Color isn't decoration. It's ==direction==.
`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  // Sort by date, most recent first
  return [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // Most recent first
  })
}
