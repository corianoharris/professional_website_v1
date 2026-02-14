import { notFound } from "next/navigation"
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-data"
import { ArrowLeft, Calendar, User, Tag, Quote } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { BlogShare } from "@/components/blog-share"
import { BlogPageWrapper } from "@/components/blog-page-wrapper"
import { CollapsibleCodeBlock } from "@/components/collapsible-code-block"
import { ArticleTLDR } from "@/components/article-tldr"

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

  // Helper function to process markdown bold syntax
  const processBold = (text: string): string => {
    return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  }

  // Helper function to process highlighter syntax (==text==)
  const processHighlighter = (text: string): string => {
    return text.replace(/==([^=]+)==/g, '<span class="article-highlighter">$1</span>')
  }

  // Parse content into structured sections
  const parseContent = (content: string) => {
    const lines = content.split("\n")
    const sections: Array<{ type: string; content: string; language?: string; level?: number }> = []

    let i = 0
    let inCodeBlock = false
    let currentCodeBlock: string[] = []
    let codeLanguage = ""

    while (i < lines.length) {
      const line = lines[i]
      const trimmedLine = line.trim()

      // Handle code blocks
      if (trimmedLine.startsWith("```")) {
        if (inCodeBlock) {
          // End of code block
          const codeContent = currentCodeBlock.join("\n")
          sections.push({
            type: "code",
            content: codeContent,
            language: codeLanguage || undefined
          })
          currentCodeBlock = []
          codeLanguage = ""
          inCodeBlock = false
        } else {
          // Start of code block
          inCodeBlock = true
          codeLanguage = trimmedLine.replace("```", "").trim()
        }
        i++
        continue
      }

      if (inCodeBlock) {
        // Collect code lines
        currentCodeBlock.push(line)
        i++
        continue
      }

      // Helper to process both bold and highlighter
      const processText = (text: string): string => {
        return processHighlighter(processBold(text))
      }

      // Handle other markdown elements
      if (trimmedLine.startsWith("# ")) {
        sections.push({ type: "h1", content: processText(trimmedLine.replace("# ", "")) })
      } else if (trimmedLine.startsWith("## ")) {
        sections.push({ type: "h2", content: processText(trimmedLine.replace("## ", "")) })
      } else if (trimmedLine.startsWith("### ")) {
        sections.push({ type: "h3", content: processText(trimmedLine.replace("### ", "")) })
      } else if (trimmedLine.startsWith("> ")) {
        sections.push({ type: "quote", content: processText(trimmedLine.replace("> ", "")) })
      } else if (trimmedLine.startsWith("- ")) {
        // Handle list items
        sections.push({ type: "list-item", content: processText(trimmedLine.replace("- ", "")) })
      } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**") && trimmedLine.split("**").length === 3) {
        sections.push({ type: "emphasis", content: trimmedLine.replace(/\*\*/g, "") })
      } else if (trimmedLine) {
        // Handle inline bold text in paragraphs
        sections.push({ type: "paragraph", content: processText(trimmedLine) })
      }

      i++
    }

    // Handle unclosed code block
    if (inCodeBlock && currentCodeBlock.length > 0) {
      sections.push({
        type: "code",
        content: currentCodeBlock.join("\n"),
        language: codeLanguage || undefined
      })
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

  // Group consecutive list items (but preserve code blocks)
  const groupedSections: Array<{ type: string; content: string; items?: string[]; language?: string }> = []
  let currentListItems: string[] = []

  for (const section of remainingSections) {
    if (section.type === "list-item") {
      // Process highlighter in list items too
      currentListItems.push(processHighlighter(section.content))
    } else {
      if (currentListItems.length > 0) {
        groupedSections.push({ type: "list", content: "", items: [...currentListItems] })
        currentListItems = []
      }
      groupedSections.push(section)
    }
  }
  if (currentListItems.length > 0) {
    groupedSections.push({ type: "list", content: "", items: currentListItems })
  }

  return (
    <BlogPageWrapper>
      <div className="min-h-screen w-full relative">
        {/* Gradient background - always visible */}
        <div className="fixed inset-0 -z-10" />

      {/* Hero Section */}
      <div id="main-content" className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/blog" className="inline-block mb-12">
            <Button
              variant="ghost"
              className="text-black dark:text-white hover:bg-black/10 hover:text-black hover:dark:text-white hover:dark:bg-white/10 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </Button>
          </Link>

          {/* Magazine-style header */}
          <div className="mb-12">
            {/* Category/Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/10 text-black dark:text-white border border-black/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Main Title - Magazine Style */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-8 text-black dark:text-white ">
              {post.title}
            </h1>

            {/* Subtitle/Excerpt */}
            <p className="text-xl md:text-2xl text-black/70 font-light italic mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Share section - Above TLDR */}
            <div className="mb-8 pb-8 border-b border-black/10">
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto md:max-w-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white mb-4 text-center">
                  Share This Article
                </h3>
                <BlogShare
                  title={post.title}
                  url={postUrl}
                  excerpt={post.excerpt}
                />
              </div>
            </div>

            {/* TLDR Section */}
            {post.tldr && post.tldr.length > 0 && (
              <div className="mb-8">
                <ArticleTLDR points={post.tldr} />
              </div>
            )}

            {/* Byline - Magazine Style */}
            <div className="flex items-center gap-6 text-sm text-black/60 dark:text-white border-t border-b border-black/10 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">Written By {post.author}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-black/40" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full max-w-2xl mx-auto aspect-video max-h-48 mb-12 overflow-hidden rounded-lg shadow-lg">
            <img
              src={post.image || "/images/background-site-image.jpg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content - Magazine Layout */}
        <article className="relative px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Main content column - Full width */}
          <div className="max-w-3xl mx-auto">
              {/* First paragraph with drop cap */}
              {firstParagraph && (() => {
                // Extract first character from text content (strip HTML tags for display)
                const textContent = firstParagraph.content.replace(/<[^>]*>/g, '')
                const firstChar = textContent.trim().charAt(0) || ''
                // Find where the first character appears in the original HTML
                let charIndex = 0
                let inTag = false
                for (let i = 0; i < firstParagraph.content.length; i++) {
                  if (firstParagraph.content[i] === '<') inTag = true
                  if (firstParagraph.content[i] === '>') inTag = false
                  if (!inTag && firstParagraph.content[i] === firstChar) {
                    charIndex = i
                    break
                  }
                }
                const beforeChar = firstParagraph.content.substring(0, charIndex)
                const afterChar = firstParagraph.content.substring(charIndex + 1)
                return (
                  <div className="mb-16">
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed text-black dark:text-white" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                      <span
                        className="inline-block text-7xl md:text-8xl lg:text-9xl font-black leading-none mr-3 md:mr-4 text-black dark:text-white align-middle"
                        style={{
                          fontFamily: 'var(--font-baloo2), sans-serif',
                          verticalAlign: 'middle',
                          lineHeight: '1',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {firstChar}
                      </span>
                      <span className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed inline" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }} dangerouslySetInnerHTML={{ __html: afterChar }} />
                    </p>
                  </div>
                )
              })()}

              {/* Remaining content */}
              <div className="space-y-12 md:space-y-16">
                {groupedSections.map((section, index) => {
                  if (section.type === "h1") {
                    return (
                      <h1 key={index} className="text-4xl md:text-5xl font-black tracking-tight mt-20 mb-10 text-black dark:text-white leading-tight" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )
                  } else if (section.type === "h2") {
                    return (
                      <h2 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-20 mb-10 text-black dark:text-white leading-tight" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )
                  } else if (section.type === "h3") {
                    return (
                      <h3 key={index} className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mt-16 mb-8 text-black dark:text-white leading-tight" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )
                  } else if (section.type === "quote") {
                    return (
                      <blockquote key={index} className="border-l-4 border-primary pl-8 py-6 my-16 md:my-20 italic text-xl md:text-2xl lg:text-3xl text-black dark:text-white font-light leading-relaxed bg-muted/30 rounded-r-lg" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', letterSpacing: '0.02em' }}>
                        <Quote className="w-8 h-8 mb-4 text-primary/50" />
                        <span dangerouslySetInnerHTML={{ __html: section.content }} />
                      </blockquote>
                    )
                  } else if (section.type === "emphasis") {
                    return (
                      <p key={index} className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white leading-relaxed my-12 md:my-16 text-center italic" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', letterSpacing: '0.02em' }}>
                        {section.content}
                      </p>
                    )
                  } else if (section.type === "code") {
                    return (
                      <CollapsibleCodeBlock
                        key={index}
                        code={section.content}
                        language={section.language}
                      />
                    )
                  } else if (section.type === "list") {
                    return (
                      <ul key={index} className="space-y-3 md:space-y-4 my-8 ml-0 list-none">
                        {section.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed text-black dark:text-white pl-8 md:pl-10 relative" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                            <span className="absolute left-0 top-0 text-black dark:text-white font-semibold" style={{ fontSize: '1.25em', lineHeight: '1.2', fontFamily: 'var(--font-baloo2), sans-serif' }}>–</span>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </li>
                        ))}
                      </ul>
                    )
                  } else if (section.type === "paragraph") {
                    return (
                      <p key={index} className="text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed text-black dark:text-white mb-8 md:mb-10" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }} dangerouslySetInnerHTML={{ __html: section.content }} />
                    )
                  }
                  return null
                })}
              </div>
            </div>

          {/* Article footer */}
          <div className="mt-24 pt-12 border-t border-black/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-black/60 dark:text-white/60 mb-2">Written by</p>
                <p className="text-lg font-semibold text-black dark:text-white">{post.author}</p>
              </div>
              <Link href="/blog">
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
      </div>
      <AccessibilityControls />
      </div>
    </BlogPageWrapper>
  )
}
