"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

export function ProofMai() {
  return (
    <MaiScrollSection id="proof" title="Sound familiar?" variant="muted">
      <div className="mb-10 flex flex-col gap-6">
        <p className="text-lg text-muted-foreground">
          Let&apos;s be real for a second: You look at your screen, something feels off, the colors don&apos;t match, and you can literally see your users hesitating before they click.
        </p>
        <p className="text-lg text-muted-foreground">
          Come on, that ain&apos;t just a minor tech glitch. That confusion is a silent tax on your business, and it is actively killing deals before anyone even smells a contract.
        </p>
        <p className="text-lg font-bold text-[#14b8a6] pt-2 border-t border-border">
          I point out exactly where your work is broken. Then, I fix it.
        </p>
      </div>
    </MaiScrollSection>
  )
}
