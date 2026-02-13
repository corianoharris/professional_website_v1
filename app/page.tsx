import { ColorIntentMaiPage } from "@/components/color-intent-mai-page"
import { AccessibilityControls } from "@/components/accessibility-controls"
import { AIChat } from "@/components/ai-chat"
import { AIChatProvider } from "@/components/ai-chat-context"
import { ScrollAnimations } from "@/components/scroll-animations"
import { IntentLandingProvider } from "@/components/intent-landing-context"
import { IntentSelector } from "@/components/intent-selector"
import { IntentBackground } from "@/components/intent-background"
import { PageWithIntent } from "@/components/page-with-intent"

export default function Page() {
  return (
    <AIChatProvider>
      <IntentLandingProvider>
        <IntentBackground />
        <IntentSelector />
        <div id="announcements" aria-live="polite" aria-atomic="true" className="sr-only" />
        <PageWithIntent>
          <ScrollAnimations />
          <ColorIntentMaiPage />
          <AccessibilityControls />
          <AIChat hideFloatingButton />
        </PageWithIntent>
      </IntentLandingProvider>
    </AIChatProvider>
  )
}
