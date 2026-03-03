import { ColorIntentMaiPage } from "@/components/color-intent-mai-page"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AIChat } from "@/components/ai-chat"
import { AIChatProvider } from "@/components/ai-chat-context"
import { ScrollAnimations } from "@/components/scroll-animations"

export default function Page() {
  return (
    <AIChatProvider>
      <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
      <ScrollAnimations />
      <ColorIntentMaiPage />
      <AccessibilityControls />
      <AIChat hideFloatingButton />
    </AIChatProvider>
  )
}
