"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { Image, Brain, SlidersHorizontal, ArrowRight } from "lucide-react"
import { ColorIntentDemo } from "@/components/color-intent-demo"

const steps = [
  {
    icon: Image,
    title: "Upload",
    description: "Share your design tokens or a public page URL."
  },
  {
    icon: Brain,
    title: "Analyze",
    description: "Emotion and intent extracted from every color. You know what you're really saying."
  },
  {
    icon: SlidersHorizontal,
    title: "Get your output",
    description: "Receive color-intent formatted output in JSON, PDF, or DOC."
  },
]

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function HowItWorksMai() {
  return (
    <MaiScrollSection
      id="how-it-works"
      title="How it works"
      subtitle="Built and battle-tested. Decodes emotion from pixels so you get clarity, not chaos."
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-12">
        {steps.map((step, i) => (
          <div key={step.title} className="flex items-center w-full md:w-auto">
            {i > 0 && (
              <ArrowRight className="w-6 h-6 text-[#06b6d4] shrink-0 hidden md:block mx-1" aria-hidden />
            )}
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-transparent flex items-center justify-center mb-4 border border-[#06b6d4]/30">
                <step.icon className="w-8 h-8 text-[#06b6d4]" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Step {i + 1}
              </span>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-2xl border border-border bg-transparent p-8">
          <ColorIntentDemo variant="light" preset="process" />
        </div>
        <Button
          onClick={scrollToContact}
          className="bg-[#f97316] hover:bg-[#ea580c] text-white"
        >
          Book the 15-min Audit
        </Button>
      </div>
    </MaiScrollSection>
  )
}
