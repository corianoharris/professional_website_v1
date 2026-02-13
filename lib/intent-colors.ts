/**
 * Intent-based color mapping for Color Intent Technologist site.
 * Each color communicates purpose by scenario—not a single brand blue.
 *
 * Trust (#06b6d4): Confidence, safety, low-barrier actions
 * Growth (#14b8a6): Results, success, progress
 * Energy (#f97316): Urgency, action, CTAs
 * Belonging (#7c3aed): Connection, authenticity, scale
 * Attention (#1e40af): Focus, hierarchy
 * Understanding (#06b6d4): Clarity, how-it-works
 */

export const intentColors = {
  trust: "var(--intent-trust)",
  trustHover: "var(--intent-trust-hover)",
  growth: "var(--intent-growth)",
  growthHover: "var(--intent-growth-hover)",
  energy: "var(--intent-energy)",
  energyHover: "var(--intent-energy-hover)",
  belonging: "var(--intent-belonging)",
  belongingHover: "var(--intent-belonging-hover)",
  attention: "var(--intent-attention)",
  attentionHover: "var(--intent-attention-hover)",
} as const

/** Tailwind-compatible classes for intent (use arbitrary values where needed) */
export const intentClasses = {
  trust: "text-[#06b6d4] hover:text-[#0891b2]",
  trustBg: "bg-[#06b6d4] hover:bg-[#0891b2]",
  trustBorder: "border-[#06b6d4]",
  trustSubtle: "bg-[#06b6d4]/10 dark:bg-[#06b6d4]/20",
  growth: "text-[#14b8a6] hover:text-[#0d9488]",
  growthBg: "bg-[#14b8a6] hover:bg-[#0d9488]",
  growthBorder: "border-[#14b8a6]",
  energy: "text-[#f97316] hover:text-[#ea580c]",
  energyBg: "bg-[#f97316] hover:bg-[#ea580c]",
  energyBorder: "border-[#f97316]",
  belonging: "text-[#7c3aed] hover:text-[#6d28d9]",
  belongingBg: "bg-[#7c3aed] hover:bg-[#6d28d9]",
  belongingBorder: "border-[#7c3aed]",
  belongingSubtle: "bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20",
  attention: "text-[#1e40af] hover:text-[#1e3a8a]",
  attentionBg: "bg-[#1e40af] hover:bg-[#1e3a8a]",
} as const
