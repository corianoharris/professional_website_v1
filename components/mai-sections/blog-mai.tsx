"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"
import { ArrowRight } from "lucide-react"

export function BlogMai() {
  const posts = getAllBlogPosts().slice(0, 4)

  return (
    <MaiScrollSection
      id="blog"
      title="Ideas worth spreading"
      subtitle="Stories that stick. Ideas that spread."
      variant="muted"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-border bg-background p-6 hover:border-[#7c3aed]/30 transition-all block"
          >
            <span className="text-xs font-medium text-[#7c3aed] uppercase tracking-wider">
              {post.tags[0] || "Article"}
            </span>
            <h3 className="text-lg font-semibold mt-2 group-hover:text-[#7c3aed] transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#7c3aed] mt-3 group-hover:gap-2 transition-all">
              Read
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="text-[#7c3aed] font-semibold hover:underline"
        >
          All articles
        </Link>
      </div>
    </MaiScrollSection>
  )
}
