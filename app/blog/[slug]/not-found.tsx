import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#E8E4DC] dark:bg-gray-900 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Blog Post Not Found</h2>
        <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
