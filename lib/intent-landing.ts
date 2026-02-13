/**
 * Intent-based landing configuration
 *
 * Maps business intents ("What's driving your visit?") to intent colors
 * from the design system. Keeps the experience strategic, not mood-based.
 */

export type IntentId =
  | "fix-design-system"
  | "prove-roi"
  | "accessibility"
  | "scale"
  | "exploring"

export interface IntentOption {
  id: IntentId
  label: string
  /** Maps to intent color token (--intent-*) */
  intentToken: "trust" | "calm" | "growth" | "understanding" | "belonging"
  /** Base hex for background gradient */
  bgColor: string
  /** Lighter variant for gradient end */
  bgColorLight: string
  /** Hero subheadline - intent-specific */
  heroSubhead: string
  /** Hero supporting line - intent-specific */
  heroSupport: string
}

export const INTENT_STORAGE_KEY = "coriano-intent"

export const intentOptions: IntentOption[] = [
  {
    id: "fix-design-system",
    label: "Fix a broken design system",
    intentToken: "trust",
    bgColor: "#06b6d4",
    bgColorLight: "#cffafe",
    heroSubhead: "One source of truth. Design and engineering aligned.",
    heroSupport: "Broken systems cost you. One source of truth—design and engineering aligned—builds the trust you need.",
  },
  {
    id: "prove-roi",
    label: "Prove design ROI to leadership",
    intentToken: "growth",
    bgColor: "#14b8a6",
    bgColorLight: "#ccfbf1",
    heroSubhead: "Let's talk numbers. The cost is real.",
    heroSupport: "Color system failures cost $100K–$500K/year. I help you prove the upside.",
  },
  {
    id: "accessibility",
    label: "Resolve color/accessibility issues",
    intentToken: "understanding",
    bgColor: "#0891b2",
    bgColorLight: "#e0f2fe",
    heroSubhead: "Pass the audit. Stay passed.",
    heroSupport: "Accessibility audits, compliance, clarity. Intent-driven color makes it pass—and stay passed.",
  },
  {
    id: "scale",
    label: "Scale without chaos",
    intentToken: "calm",
    bgColor: "#0d9488",
    bgColorLight: "#ccfbf1",
    heroSubhead: "Growth without the mess.",
    heroSupport: "One system, one source of truth. Calm scales.",
  },
  {
    id: "exploring",
    label: "Just exploring",
    intentToken: "belonging",
    bgColor: "#7c3aed",
    bgColorLight: "#e9d5ff",
    heroSubhead: "I'm the one who'd stare at flower color patterns for hours in a botanical garden.",
    heroSupport: "So I never take color lightly. When your product doesn't hide—when color tells the truth—people feel seen. They trust you. They choose you. That's worth fighting for.",
  },
]

/** Section IDs for intent-driven ordering */
export type SectionId =
  | "qualifier"
  | "contact"
  | "urgency"
  | "how-it-works"
  | "story"
  | "proof"
  | "services"
  | "site-audit"
  | "roi-calculator"
  | "blog"
  | "about"

/** Default section order (exploring / general) */
const defaultSectionOrder: SectionId[] = [
  "qualifier",
  "contact",
  "urgency",
  "how-it-works",
  "story",
  "proof",
  "services",
  "site-audit",
  "roi-calculator",
  "blog",
  "about",
]

/** Intent-specific section order: surface the most relevant content first */
export function getSectionOrderForIntent(intent: IntentId | null): SectionId[] {
  if (!intent) return defaultSectionOrder
  switch (intent) {
    case "prove-roi":
      return [
        "qualifier",
        "contact",
        "roi-calculator",
        "urgency",
        "how-it-works",
        "story",
        "proof",
        "services",
        "site-audit",
        "blog",
        "about",
      ]
    case "accessibility":
      return [
        "qualifier",
        "contact",
        "site-audit",
        "services",
        "urgency",
        "how-it-works",
        "story",
        "proof",
        "roi-calculator",
        "blog",
        "about",
      ]
    case "fix-design-system":
    case "scale":
      return [
        "qualifier",
        "contact",
        "services",
        "how-it-works",
        "urgency",
        "story",
        "proof",
        "site-audit",
        "roi-calculator",
        "blog",
        "about",
      ]
    default:
      return defaultSectionOrder
  }
}

export function getIntentById(id: IntentId): IntentOption | undefined {
  return intentOptions.find((o) => o.id === id)
}
