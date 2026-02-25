"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

export function AboutMai() {
  return (
    <MaiScrollSection
      id="about"
      title="Who are you?"
      subtitle="The story. The why. The permission to be different."
      variant="muted"
    >
      <div className="max-w-2xl mx-auto">
        {/* Content */}
        <div className="space-y-6 text-left">
          <p className="text-foreground text-lg leading-relaxed">
           I&apos;m the person who stands in a botanical garden and studies the petals.

Not because they&apos;re pretty. Because they&apos;re precise.

Color isn&apos;t decoration. It&apos;s a signal. It&apos;s the first thing we notice, the shortcut our brain uses to decide: safe or risky, clear or confusing, trustworthy or not.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed italic">
           In products, color debt is real. It shows up as errors, support tickets, rework, and quiet lost conversions. It shows up when “success” feels like “warning” and users hesitate instead of act. I help product leaders replace color debt with color intent.
           Because when a product doesn&apos;t hide when it communicates clearly, people feel seen. They trust you. And trust is a growth strategy.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <span className="text-foreground font-medium">Real color systems build real trust.</span> Start with why. Be real. Build for the people who notice. Everyone else will feel it too.
          </p>

          {/* Proof - badges */}
          {/* <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-3 py-1 text-sm font-medium text-[#14b8a6]">
              Healthcare · costs recovered
            </span>
            <span className="inline-flex items-center rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-3 py-1 text-sm font-medium text-[#14b8a6]">
              Finance · revision cycles cut
            </span>
            <span className="inline-flex items-center rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-3 py-1 text-sm font-medium text-[#14b8a6]">
              E-commerce · checkout improved
            </span>
          </div> */}

          <p className="text-foreground text-lg leading-relaxed">
            The Intent-Driven Color Model™. It works. Because it&apos;s built for people like us, the ones who notice.
          </p>
        </div>
      </div>
    </MaiScrollSection>
  )
}
