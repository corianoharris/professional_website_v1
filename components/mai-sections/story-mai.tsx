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
           They were 90 days away from losing a <span className="font-semibold text-[#14b8a6]">$2M contract</span>. Not because they lacked talent. Because they lacked clarity. Their color accessibility audit failed again. Error looked like success. Warning looked like info. Users couldn&apos;t tell the difference. The report was 47 pages long.
          </p>
          <p className="text-muted-foreground">
            So they stopped decorating and started communicating.

Color mapped to intent. Trust for confirmation. Energy for urgency. Growth for success. One system. Design and engineering aligned.
          </p>
          <p className="text-foreground">
            In this scenario, they passed the audit. They kept the contract.
          </p>
          <p className="text-muted-foreground italic">
           Your results will vary. But clarity compounds. And the teams who act before the next deadline? They’re the ones who find out what&apos;s possible.
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
