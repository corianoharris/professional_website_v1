import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-data"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { BlogPageWrapper } from "@/components/blog-page-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Articles | Coriano Harris",
  description: "Ideas worth spreading. Stories about color, trust, and intent-driven design.",
}

const POSTS_PER_PAGE = 4

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1)
  const allPosts = getAllBlogPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const page = Math.min(currentPage, totalPages || 1)
  const start = (page - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return (
    <BlogPageWrapper>
      <div className="min-h-screen w-full relative">
        <main id="main-content" className="relative pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/#blogs" className="inline-block mb-12">
              <Button
                variant="ghost"
                className="text-black dark:text-foreground hover:bg-black/10 dark:hover:bg-muted hover:text-black dark:hover:text-foreground transition-all duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
              All articles
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Ideas worth spreading. Stories that stick.
            </p>

            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  aria-label={`Read article: ${post.title}`}
                  className="group block rounded-xl border border-border bg-background p-6 hover:border-[#7c3aed]/30 hover:shadow-lg transition-all"
                >
                  <span className="text-xs font-medium text-[#7c3aed] uppercase tracking-wider">
                    {post.tags[0] || "Article"}
                  </span>
                  <h2 className="text-xl font-semibold mt-2 group-hover:text-[#7c3aed] transition-colors text-foreground dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#7c3aed] mt-3 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="mt-12 pt-8 border-t border-border"
                aria-label="Article pagination"
              >
                <div className="flex items-center justify-between">
                  <div>
                    {page > 1 ? (
                      <Link href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                      </Link>
                    ) : (
                      <span />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <div>
                    {page < totalPages ? (
                      <Link href={`/blog?page=${page + 1}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </nav>
            )}
            </div>
          </div>
        </main>

        <AccessibilityControls />
      </div>
    </BlogPageWrapper>
  )
}
