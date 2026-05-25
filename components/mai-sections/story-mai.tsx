"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

export function StoryMai() {
  return (
    <MaiScrollSection
      id="story"
      title="What happened."
      variant="default"
    >
      <div className="max-w-2xl mx-auto">
        <article className="space-y-6 text-lg leading-relaxed">
          <p className="text-foreground">
            A <span className="font-semibold text-[#14b8a6]">$2 million</span> contract was nearly lost. Because a single design token lied.
          </p>
          <p className="text-muted-foreground">
            Red looked like green. Errors looked like success. The team was blind to the gap until the client called them on it.
          </p>
          <p className="text-muted-foreground">
            I fixed it.
          </p>
          <p className="text-foreground font-semibold">
            The audit passed. The contract stayed.
          </p>
          <p className="font-semibold text-[#14b8a6]">
            Color is never just color.
          </p>
        </article>
      </div>
    </MaiScrollSection>
  )
}
