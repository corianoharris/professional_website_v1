import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"
import { ArrowLeft, Calendar, User, Tag, Quote } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { BlogShare } from "@/components/blog-share"
import { BlogPageWrapper } from "@/components/blog-page-wrapper"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = getBlogPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Get the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const postUrl = `${baseUrl}/blog/${post.slug}`

  // Parse content into structured sections
  const parseContent = (content: string) => {
    const lines = content.split("\n").filter(line => line.trim())
    const sections: Array<{ type: string; content: string; level?: number }> = []
    
    for (const line of lines) {
      if (line.trim().startsWith("# ")) {
        sections.push({ type: "h1", content: line.replace("# ", "").trim() })
      } else if (line.trim().startsWith("## ")) {
        sections.push({ type: "h2", content: line.replace("## ", "").trim() })
      } else if (line.trim().startsWith("### ")) {
        sections.push({ type: "h3", content: line.replace("### ", "").trim() })
      } else if (line.trim().startsWith("> ")) {
        sections.push({ type: "quote", content: line.replace("> ", "").trim() })
      } else if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
        sections.push({ type: "emphasis", content: line.replace(/\*\*/g, "").trim() })
      } else if (line.trim()) {
        sections.push({ type: "paragraph", content: line.trim() })
      }
    }
    
    return sections
  }

  const contentSections = parseContent(post.content)
  const firstParagraph = contentSections.find(s => s.type === "paragraph")
  const remainingSections = contentSections.filter((s, i) => {
    if (s.type === "paragraph" && i === contentSections.findIndex(sec => sec.type === "paragraph")) {
      return false
    }
    return true
  })

  return (
    <BlogPageWrapper>
      <div className="min-h-screen w-full relative">
        {/* Gradient background - always visible */}
        <div className="fixed inset-0 -z-10" />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-block mb-12">
            <Button 
              variant="ghost" 
              className="text-black hover:bg-black/10 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          {/* Magazine-style header */}
          <div className="mb-12">
            {/* Category/Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/10 text-black border border-black/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Title - Magazine Style */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 text-black">
              {post.title}
            </h1>

            {/* Subtitle/Excerpt */}
            <p className="text-xl md:text-2xl text-black/70 font-light italic mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Byline - Magazine Style */}
            <div className="flex items-center gap-6 text-sm text-black/60 border-t border-b border-black/10 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-black/40" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[60vh] mb-16 overflow-hidden rounded-lg">
            <img
              src={post.image || "/images/background-site-image.jpg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content - Magazine Layout */}
      <article className="relative px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Main content column */}
            <div className="md:col-span-8">
              {/* First paragraph with drop cap */}
              {firstParagraph && (
                <div className="mb-12">
                  <p className="text-lg md:text-xl leading-relaxed text-black font-serif">
                    <span className="float-left text-8xl md:text-9xl font-black leading-none mr-3 mt-2 text-black">
                      {firstParagraph.content.charAt(0)}
                    </span>
                    <span className="text-lg md:text-xl leading-relaxed">
                      {firstParagraph.content.slice(1)}
                    </span>
                  </p>
                </div>
              )}

              {/* Remaining content */}
              <div className="space-y-8">
                {remainingSections.map((section, index) => {
                  if (section.type === "h1") {
                    return (
                      <h1 key={index} className="text-4xl md:text-5xl font-black tracking-tight mt-16 mb-8 text-black leading-tight">
                        {section.content}
                      </h1>
                    )
                  } else if (section.type === "h2") {
                    return (
                      <h2 key={index} className="text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-6 text-black leading-tight">
                        {section.content}
                      </h2>
                    )
                  } else if (section.type === "h3") {
                    return (
                      <h3 key={index} className="text-2xl md:text-3xl font-semibold tracking-tight mt-10 mb-4 text-black leading-tight">
                        {section.content}
                      </h3>
                    )
                  } else if (section.type === "quote") {
                    return (
                      <blockquote key={index} className="border-l-4 border-primary pl-8 py-6 my-12 italic text-xl md:text-2xl text-black font-light leading-relaxed bg-muted/30 rounded-r-lg">
                        <Quote className="w-8 h-8 mb-4 text-primary/50" />
                        {section.content}
                      </blockquote>
                    )
                  } else if (section.type === "emphasis") {
                    return (
                      <p key={index} className="text-2xl md:text-3xl font-bold text-black leading-relaxed my-8 text-center italic">
                        {section.content}
                      </p>
                    )
                  } else if (section.type === "paragraph") {
                    return (
                      <p key={index} className="text-lg md:text-xl leading-relaxed text-black font-serif">
                        {section.content}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* Sidebar - Magazine Style */}
            <aside className="md:col-span-4 md:sticky md:top-24 h-fit">
              <div className="space-y-8 pt-8">
                {/* Share section with buttons and count */}
                <div className="bg-muted/30 rounded-lg p-6 border border-border">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-black/60 mb-4">
                    Share This Article
                  </h3>
                  <BlogShare 
                    title={post.title}
                    url={postUrl}
                    excerpt={post.excerpt}
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* Article footer */}
          <div className="mt-24 pt-12 border-t border-black/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-black/60 mb-2">Written by</p>
                <p className="text-lg font-semibold text-black">{post.author}</p>
              </div>
              <Link href="/#blog">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-black/90 transition-all duration-300"
                >
                  Read More Articles
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Accessibility Controls */}
      <AccessibilityControls />
    </div>
    </BlogPageWrapper>
  )
}
