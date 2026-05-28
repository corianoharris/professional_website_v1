"use client"

import { MaiScrollSection } from "@/components/mai-scroll-section"

const bullets = [
  {
    heading: "You actually own a product with a UI.",
    body: "And no, UI isn't a new rapper. It's your User Interface, the face of your business. If your UI looks crazy, your whole company looks crazy.",
  },
  {
    heading: "You know color leaves the station with every single deploy.",
    body: 'Every time your dev team pushes an update, the colors shift. It\'s like a train leaving the station without checking if the track is finished. One day it\'s sleek, the next day it\'s a sickly neon green because "Kevin" in engineering thought it looked modern. Now your users think they logged into a scam website.',
  },
  {
    heading: "You believe accessibility is a promise, not a corporate checklist.",
    body: "Most companies treat accessibility like a terms-and-conditions page. You just scroll to the bottom, click 'I agree,' and pray nobody sues you. But if you treat color-blind users like an afterthought, you broke a promise. You built an app for everyone, but made the text so light they need a magnifying glass and a flashlight just to find the checkout button.",
  },
]

export function QualifierMai() {
  return (
    <MaiScrollSection id="qualifier" title="Is this for you?">
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        Half of y&apos;all love shipping sloppy work. You look at a glitched layout at 4:55 PM on a Friday and say, &ldquo;Looks good from my house. Hit deploy, I got happy hour in ten minutes.&rdquo; If that&apos;s you, close the tab. I don&apos;t want your money.
      </p>
      <p className="text-base font-semibold text-foreground mb-6">
        I only work with people who refuse to ship sloppy work:
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
