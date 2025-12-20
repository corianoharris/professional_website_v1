import { Header } from "@/components/header"
import { HeroWithContent } from "@/components/hero-with-content"
import { Footer } from "@/components/footer"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AIChat } from "@/components/ai-chat"

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen relative">
      <Header />
      <HeroWithContent />
      <div className="relative z-10">
        <Footer />
      </div>
      <AccessibilityControls />
      <AIChat />
    </main>
  )
}
