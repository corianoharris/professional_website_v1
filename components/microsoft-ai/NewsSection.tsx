"use client"

import { MaiSection } from "./Section"
import { MaiCard } from "./Card"

const newsItems = [
  {
    title: "It's About Time: The Copilot Usage Report 2025",
    href: "https://microsoft.ai/news/its-about-time-the-copilot-usage-report-2025/",
    tag: "research",
    readTime: "20 min read",
  },
  {
    title: "Towards Humanist Superintelligence",
    href: "https://microsoft.ai/news/towards-humanist-superintelligence/",
    tag: "announcements",
    readTime: "20 min read",
  },
  {
    title: "Copilot Fall Release: A big step forward in making AI more personal, useful, and human-centered",
    href: "https://www.microsoft.com/en-us/microsoft-copilot/blog/2025/10/23/human-centered-ai/",
    tag: "copilot",
  },
  {
    title: "Introducing MAI-Image-1, debuting in the top 10 on LMArena",
    href: "https://microsoft.ai/news/introducing-mai-image-1-debuting-in-the-top-10-on-lmarena/",
    tag: "models",
    readTime: "4 min read",
  },
]

export function MaiNewsSection() {
  return (
    <MaiSection id="news">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        Latest news
      </h2>
      <p className="text-muted-foreground mb-12">
        Stories. Updates. Perspectives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((item) => (
          <MaiCard
            key={item.title}
            title={item.title}
            href={item.href}
            tag={item.tag}
            readTime={item.readTime}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="https://microsoft.ai/news"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#0066ff] font-semibold hover:underline"
        >
          All news
        </a>
      </div>
    </MaiSection>
  )
}
