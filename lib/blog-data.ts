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
    slug: "color-as-courageous-remarkability",
    title: "Color as Courageous Remarkability",
    excerpt: "Stop blending in. Stand out so boldly people can't help but remember you.",
    image: "/colored_rocket.png",
    date: "June 22, 2025",
    author: "Coriano Harris",
    tags: ["Remarkability", "Differentiation", "Standout"],
    tldr: [
      "Remarkable = stand out so boldly people can't help but notice, talk about, remember. Color is your bold distinction.",
      "Fitting in is the opposite of remarkable. Tribes pay premium and spread virally."
    ],
    content: `
# Color as Courageous Remarkability

In a world of ordinary products, be remarkable. Be boldly distinctive: impossible to ignore. Like a peacock at a penguin convention.

==Color is your bold distinction==. It's your product's personality. Without it, you're another gray blob in a sea of gray blobs.

Most teams choose colors that feel safe. They aim to fit in. But fitting in is the opposite of remarkable. Remarkable means standing out. Being unforgettable. Creating belonging through difference.

When you choose colors with courage, you're making a statement. "This is who we are. This is what we stand for. This is why we matter."

Remarkable products get remembered. They get shared. They build tribes. And tribes pay premium and spread virally.

Your market is waiting. They're probably tired of seeing the same blue button everywhere.
    `,
  },
  {
    id: "3",
    slug: "accessibility-as-vulnerable-inclusion",
    title: "Accessibility as Vulnerable Inclusion",
    excerpt: "Accessibility isn't a checkbox. It's your competitive edge. See how winning brands include everyone.",
    image: "/accessibility-vulnerable-inclusion.jpg",
    date: "September 8, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "Inclusion", "Connection"],
    tldr: [
      "Accessibility isn't compliance—it's courage. 'Everyone belongs here.'",
      "Winning brands treat it as competitive advantage. True inclusion requires vulnerability."
    ],
    content: `
# Accessibility as Vulnerable Inclusion

Accessibility isn't compliance. It's ==courage==. It's the brave act of saying: "==Everyone belongs here==."

Most teams treat it as a checkbox. Necessary but annoying. The brands that win—Stripe, Airbnb, Apple—treat it as their ==competitive advantage==.

True inclusion requires ==vulnerability==. Admitting you don't know everything. Listening to voices you've ignored. Building for people who've been left out.

When you build accessible products, you're not checking boxes. You're ==building connection==. ==Creating belonging==. Showing that ==everyone matters==.

Accessible design isn't about following rules. It's about ==creating connection==. Products that work for everyone. Products that make everyone feel seen.

The remarkable edge isn't in following the crowd. It's in ==including everyone==.
    `,
  },
  {
    id: "4",
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

Color isn't decoration. It's communication. Every hue tells a story.

Color psychology is neuroscience. Your brain processes color before reading words. Red triggers urgency. Blue builds trust. Green signals growth. But context changes everything.

A red button at checkout means "buy now." The same red on a medical app means "emergency." Same color. Different story.

The future isn't about consistency. It's about intention. Every color should answer: What emotion? What action? What story?

Color is emotional architecture. It sets mood. Guides attention. Creates atmosphere.

Choose colors with purpose. Not because they match brand guidelines. Not because they're trendy. Because they serve your user's journey.

Color isn't decoration. It's direction.
`,
  },
  {
    id: "5",
    slug: "building-accessible-products-that-everyone-can-use",
    title: "Building Accessible Products That Everyone Can Use",
    excerpt: "One billion people have a disability. Build for them first. Everyone benefits.",
    image: "/building-accessible-products.jpg",
    date: "November 20, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "Inclusive Design", "UX Research"],
    tldr: [
      "One billion people have a disability. Accessibility benefits everyone—closed captions, high contrast, keyboard nav.",
      "Build from the start. Automated tools catch 30%. Real users catch the rest."
    ],
    content: `
# Building Accessible Products That Everyone Can Use

Accessibility isn't a feature. It's a ==foundation==. When you build accessible products, you create experiences that ==work for everyone==. That make everyone feel seen. That create ==true belonging==.

==One billion people worldwide have a disability==. But here's what most teams miss: ==accessibility benefits everyone==. Closed captions help in noisy environments. High contrast helps in bright sunlight. Keyboard navigation helps power users. When you build for accessibility, you ==build for everyone==.

It's not just the right thing to do. It's ==smart business==. Accessible products reach more users. Rank higher. Reduce legal risk. The real advantage: when you design for people with disabilities, you discover solutions that ==benefit everyone==.

Build it from the start. Choose colors with sufficient contrast. Don't rely on color alone—add icons, labels, patterns. ==8% of men and 0.5% of women== have color vision deficiency. Your color system must work for all of them.

Automated tools catch about 30% of issues. Real users catch the rest. Test with people who use assistive technologies.

The question isn't whether you should build accessible products. The question is: How can you build them better?
    `,
  },
  {
    id: "6",
    slug: "react-color-design-system-building-scalable-palettes",
    title: "React Color Design System: Building Scalable Palettes",
    excerpt: "Stop hardcoding hex values. Learn the architecture that scales without breaking.",
    image: "/react-color-design-system.jpg",
    date: "October 12, 2025",
    author: "Coriano Harris",
    tags: ["React", "Design System", "Front End"],
    tldr: [
      "Use semantic tokens (color.action.primary) not hex codes. Update one file, entire app adapts.",
      "TypeScript = type safety. Build accessibility in from the start."
    ],
    content: `
# React Color Design System: Building Scalable Palettes

A designer picks blue. A developer hardcodes #3b82f6. Six months later, the brand changes. That blue becomes purple. The developer searches hundreds of files. They always miss some. One button stays blue forever.

Color tokens solve this. Names that describe purpose, not appearance. 'color.action.primary' instead of 'primaryBlue'. When your brand changes, you update one file. Your entire app adapts.

Structure in layers: base → semantic → component → theme. Each builds on the last.

Build accessibility from the start. Every color combo meets contrast standards. Don't rely on color alone—add icons, labels, patterns.

Build it right, everything else becomes easier. Build it wrong, you'll fight it forever.
    `,
  },
  {
    id: "7",
    slug: "color-intent-based-design-tokens",
    title: "Intent-Based Design Tokens: Beyond Semantic Naming",
    excerpt: "Semantic tokens tell you where. Intent tokens tell you why. Design with meaning, not just usage.",
    image: "/images/global-token.png",
    date: "January 25, 2026",
    author: "Coriano Harris",
    tags: ["Design System", "Color Strategy", "Design Tokens"],
    tldr: [
      "Semantic tokens tell you WHERE. Intent tokens tell you WHY. What feeling? What action?",
      "Organize by psychological purpose: trust.calm, energy.action, growth.positive. Change the color, keep the intent."
    ],
    content: `
# Intent-Based Design Tokens: Beyond Semantic Naming

Most design systems stop at semantic tokens. 'action.primary'. 'text.heading'. Done.

But semantic tokens tell you WHERE to use color, not WHY. They answer "What component?" not "What feeling?"

Intent-based tokens go deeper. They organize by emotional goal. What emotion? What action? What story?

Instead of 'action.primary', you have 'trust.calm' or 'energy.action'. Instead of 'status.success', you have 'growth.positive'.

It's the difference between naming a color "blue" and naming it "trust."

Semantic tokens answer "what." Intent tokens answer "why." When you understand why, you make better choices.

Four layers: base → intent → semantic → component.

Healthcare needs 'trust.calm'. E-commerce needs 'energy.action'. The intent guides the choice.

Your brand changes. Purple becomes blue. With intent tokens, you update one mapping. Components don't break. Only the color changes. The intent remains.

Intent tokens create shared language. Designer: "I need trust." Developer: "Use 'trust.calm'." The conversation shifts from "what color?" to "what feeling?"

Build with intent. Design with meaning.
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
