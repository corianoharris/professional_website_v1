"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"

export function BlogSection() {
  const posts = getAllBlogPosts()
  const [firstPost, ...remainingPosts] = posts

  return (
    <div id="blog" className="px-8 md:px-16 py-12 md:py-16 relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="blogGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#blogGradientTop)" stroke="none" />
      </svg>

      <div className="relative z-10 pt-4">
        <div className="relative max-w-6xl mx-auto mb-12">
          <div className="mb-12 -mt-8">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">EDITORIAL</span>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">
              Ideas Worth Feeling & Spreading
            </h2>
          </div>
        </div>

        {/* Desktop: Two-column layout, Mobile: Single column */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Left Column: Large Featured Card */}
          {firstPost && (
            <Link href={`/blog/${firstPost.slug}`} className="md:row-span-2">
              <div className="group cursor-pointer h-full bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-64 md:h-[400px] overflow-hidden">
                  <img
                    src={firstPost.image || "/placeholder.svg"}
                    alt={firstPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-3">{firstPost.date}</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    {firstPost.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* Right Column: Smaller Cards */}
          <div className="flex flex-col gap-6">
            {remainingPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group cursor-pointer bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold block mb-2">{post.date}</span>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-xl md:text-2xl font-semibold text-muted-foreground mt-16 italic">
          More soon. Subscribe to dare greatly together.
        </p>
      </div>

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="blogGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#blogGradientBottom)" stroke="none" />
      </svg>
    </div>
  )
}
