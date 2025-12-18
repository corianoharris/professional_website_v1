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
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "the-hidden-cost-of-generic-blue",
    title: "The Hidden Cost of Generic Blue",
    excerpt: "How hiding kills trust and growth.",
    image: "/colorful-abstract-branding.jpg",
    date: "January 10, 2025",
    author: "Your Name",
    tags: ["Color Strategy", "Trust", "Differentiation"],
    content: `
# The Hidden Cost of Generic Blue

How hiding kills trust and growth.

Most brands default to "trustworthy blue" because it feels safe. But when everyone uses the same color, you become invisible. You blend into the noise.

## The Cost of Blending In

Generic blue doesn't build trust—it builds anonymity. When users can't distinguish you from competitors, they default to the cheapest option or the one they've heard of.

## Standing Out Through Courage

The brands that win aren't the ones that look like everyone else. They're the ones brave enough to show their true colors—literally. They understand that vulnerability and differentiation are the same thing.

## Building Real Trust

Trust isn't built by looking like everyone else. It's built by showing up authentically, by being remarkable, by daring to be different.

The hidden cost of generic blue isn't just lost revenue—it's lost opportunity to connect, to belong, to matter.
    `,
  },
  {
    id: "2",
    slug: "color-as-courageous-remarkability",
    title: "Color as Courageous Remarkability",
    excerpt: "Dare to stand out boldly—own belonging and memory through remarkable distinction.",
    image: "/technology-color-interface.jpg",
    date: "January 15, 2025",
    author: "Your Name",
    tags: ["Remarkability", "Differentiation", "Standout"],
    content: `
# Color as Courageous Remarkability

Dare to stand out boldly—own belonging and memory through remarkable distinction.

In a world of ordinary products, be remarkable. Be boldly distinctive: impossible to ignore.

## The Remarkable Standout Principle

Seth Godin taught us that remarkable products stand out so boldly—you can't help but notice them, talk about them, remember them. Color is your bold distinction.

## Courage Over Comfort

Most teams choose colors that feel safe. They aim to fit in. But fitting in is the opposite of remarkable. Remarkable means standing out, being unforgettable, creating belonging through difference.

## Owning Your Space

When you choose colors with courage, you're not just picking a palette. You're making a statement. You're saying: "This is who we are. This is what we stand for. This is why we matter."

## The Remarkable Edge

Remarkable products don't just get noticed—they get remembered. They get shared. They build tribes. And tribes pay premium and spread virally.

Dare to be boldly distinctive. Your market is waiting.
    `,
  },
  {
    id: "3",
    slug: "accessibility-as-vulnerable-inclusion",
    title: "Accessibility as Vulnerable Inclusion",
    excerpt: "The remarkable edge of true connection.",
    image: "/accessibility-design-interface.jpg",
    date: "January 20, 2025",
    author: "Your Name",
    tags: ["Accessibility", "Inclusion", "Connection"],
    content: `
# Accessibility as Vulnerable Inclusion

The remarkable edge of true connection.

Accessibility isn't compliance—it's courage. It's the vulnerable act of saying: "Everyone belongs here."

## Beyond Compliance

Most teams treat accessibility as a checkbox. A requirement. A constraint. But the brands that win—Stripe, Airbnb, Apple—treat it as their competitive advantage.

## The Vulnerability of Inclusion

True inclusion requires vulnerability. It means admitting you don't know everything. It means listening to voices you've ignored. It means building for people who've been excluded.

## The Remarkable Edge

When you build accessible products, you're not just checking boxes. You're building connection. You're creating belonging. You're showing that everyone matters.

## Connection Over Compliance

Accessible design isn't about following rules—it's about creating connection. It's about building products that work for everyone, that make everyone feel seen, that create true belonging.

The remarkable edge isn't in following the crowd. It's in including everyone.
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}
