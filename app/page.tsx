import { Header } from "@/components/header"
import { HeroWithContent } from "@/components/hero-with-content"
import { Footer } from "@/components/footer"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AIChat } from "@/components/ai-chat"
import { AIChatProvider } from "@/components/ai-chat-context"

export default function Page() {
  return (
    <AIChatProvider>
      {/* Live region for screen reader announcements */}
      <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
      <main id="main-content" className="min-h-screen relative" tabIndex={-1}>
        <Header />
        <HeroWithContent />
        <div className="relative z-10">
          <Footer />
        </div>
        <AccessibilityControls />
        <AIChat />
      </main>
    </AIChatProvider>
  )
}
