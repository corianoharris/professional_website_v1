import { Header } from "@/components/header"
import { HeroWithContent } from "@/components/hero-with-content"
import { Footer } from "@/components/footer"
import { AccessibilityControls } from "@/components/accessibility-controls"

export default function Page() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <HeroWithContent />
      <div className="relative z-10">
        <Footer />
      </div>
      <AccessibilityControls />
    </main>
  )
}
