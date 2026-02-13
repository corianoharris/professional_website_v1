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
      subtitle="One story. Real stakes. Real numbers."
      variant="default"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <article className="space-y-6 text-lg leading-relaxed">
          <p className="text-foreground">
            A regional healthcare network was about to lose a <span className="font-semibold text-[#14b8a6]">$2M contract</span>. Their accessibility audit had failed. Again. The procurement team had given them 90 days to fix it, or the deal was off.
          </p>
          <p className="text-muted-foreground">
            The problem wasn&apos;t effort. They had designers. They had developers. They had a design system. What they didn&apos;t have was a color system that communicated intent. Error states looked like success. Warnings looked like info. Users with color vision differences couldn&apos;t tell the difference. The audit report was 47 pages long.
          </p>
          <p className="text-foreground">
            We mapped their palette to intent. Trust for confirmation. Energy for urgency. Growth for success. One system. Design and engineering aligned. They passed the audit. They kept the contract. They recovered the cost, and then some.
          </p>
          <p className="text-muted-foreground italic">
            That&apos;s one story. Your results will vary. But the people who act? They&apos;re the ones who find out.
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
