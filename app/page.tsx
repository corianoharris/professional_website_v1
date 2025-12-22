import { Header } from "@/components/header"
import { HeroWithContent } from "@/components/hero-with-content"
import { Footer } from "@/components/footer"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AIChat } from "@/components/ai-chat"
import { AIChatProvider } from "@/components/ai-chat-context"

export default function Page() {
  return (
    <AIChatProvider>
      <main id="main-content" className="min-h-screen relative">
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
