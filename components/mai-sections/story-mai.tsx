"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function StoryMai() {
  return (
    <MaiScrollSection
      id="story"
      title="Here's what happened"
      subtitle="One story. A moment that matters."
      variant="default"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <article className="space-y-6 text-lg leading-relaxed">
          <p className="text-foreground">
            <span className="font-semibold text-[#14b8a6]">$2 million.</span> Almost gone. Because the colors lied.
          </p>
          <p className="text-muted-foreground">
            Red looked like green. Errors looked fine.
          </p>
          <p className="text-muted-foreground">
            They fixed it. One color. One job.
          </p>
          <p className="text-foreground font-semibold">
            They passed. They won.
          </p>
          <p className="text-muted-foreground italic">
            Your audit is next.
          </p>
        </article>
        <div className="flex justify-center">
          <Button
            onClick={scrollToContact}
            className="bg-[#f97316] hover:bg-[#ea580c] text-white"
          >
            Book the 15-min Audit
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </MaiScrollSection>
  )
}
