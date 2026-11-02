"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

const bullets = [
  {
    heading: "You have a product people use every day.",
    body: "Its colors are the first thing they read. Before a word, before a button.",
  },
  {
    heading: "Your colors drift with every release.",
    body: "Nobody decided that. It just happened, one deploy at a time. Your users noticed before you did.",
  },
  {
    heading: "You see accessibility as a promise.",
    body: "Not a checklist. If someone can't read your checkout button, you broke that promise to them.",
  },
]

export function QualifierMai() {
  return (
    <MaiScrollSection id="qualifier" title="Is this for you?">
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        I work with people who care how their work lands. If that&apos;s you, keep reading.
      </p>
      <p className="text-base font-semibold text-foreground mb-6">
        You&apos;re in the right place if:
      </p>
      <ul className="space-y-6">
        {bullets.map((b) => (
          <li key={b.heading} className="flex gap-3">
            <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden />
            <div>
              <p className="font-semibold text-foreground mb-1">{b.heading}</p>
              <p className="text-muted-foreground text-sm md:text-base">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </MaiScrollSection>
  )
}
