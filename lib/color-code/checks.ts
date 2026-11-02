/**
 * Color Code™ palette checks
 * Deterministic: contrast (WCAG), role collisions (OKLab ΔE),
 * deuteranopia simulation, and hue → intent mapping.
 * Runs in the browser; results are instant.
 */

export type RoleId = "bg" | "text" | "primary" | "buttonText" | "link" | "success" | "error"
export type Palette = Record<RoleId, string>
export type Severity = "pass" | "warn" | "fail"

export interface Finding {
  key: string
  severity: Severity
  title: string
  /** The problem, phrased for the audit request when the check doesn't pass */
  issue: string
  /** Short factual detail, shown under the title */
  detail: string
  /** Plain-English sentence used by the template read */
  say: string
}

export const ROLES: { id: RoleId; label: string; hint: string }[] = [
  { id: "bg", label: "Background", hint: "Page surface" },
  { id: "text", label: "Body text", hint: "Paragraphs" },
  { id: "primary", label: "Primary button", hint: "Pay, Book a call" },
  { id: "buttonText", label: "Button label", hint: "Text on that button" },
  { id: "link", label: "Links", hint: "Inline actions" },
  { id: "success", label: "Success", hint: "It worked" },
  { id: "error", label: "Error", hint: "Something failed" },
]

export const PRESETS: { id: string; label: string; palette: Palette }[] = [
  {
    id: "checkout",
    label: "Checkout (example)",
    palette: { bg: "#ffffff", text: "#9ca3af", primary: "#16a34a", buttonText: "#ffffff", link: "#3b82f6", success: "#22c55e", error: "#ef4444" },
  },
  {
    id: "clinic",
    label: "Patient portal (example)",
    palette: { bg: "#f8fafc", text: "#334155", primary: "#0d9488", buttonText: "#ffffff", link: "#2563eb", success: "#10b981", error: "#f97316" },
  },
  {
    id: "site",
    label: "This site",
    palette: { bg: "#ffffff", text: "#333333", primary: "#0e7490", buttonText: "#ffffff", link: "#7c3aed", success: "#166534", error: "#e7000b" },
  },
]

export const isHex = (h: unknown): h is string => typeof h === "string" && /^#[0-9a-f]{6}$/i.test(h)

type Vec3 = [number, number, number]

const toRgb = (h: string): Vec3 => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as Vec3
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const linRgb = (h: string) => toRgb(h).map(lin) as Vec3

function luminance(h: string) {
  const [r, g, b] = linRgb(h)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

function oklab([r, g, b]: Vec3): Vec3 {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

const dist = (p: Vec3, q: Vec3) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])
const deltaE = (a: string, b: string) => dist(oklab(linRgb(a)), oklab(linRgb(b)))

// Deuteranopia (Machado 2009, severity 1.0), applied in linear RGB
function deutan(h: string): Vec3 {
  const [r, g, b] = linRgb(h)
  return [
    0.367322 * r + 0.860646 * g - 0.227968 * b,
    0.280085 * r + 0.672501 * g + 0.047413 * b,
    -0.01182 * r + 0.04294 * g + 0.968881 * b,
  ].map((v) => Math.min(1, Math.max(0, v))) as Vec3
}
const deltaEDeutan = (a: string, b: string) => dist(oklab(deutan(a)), oklab(deutan(b)))

function hue(h: string): number | null {
  const [r, g, b] = toRgb(h)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d < 0.08) return null
  const x = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return (x * 60 + 360) % 360
}

/** Hue → Color Code intent */
export function intentOf(h: string) {
  const x = hue(h)
  if (x === null) return "Neutral"
  if (x < 18 || x >= 340) return "Alarm"
  if (x < 45) return "Energy"
  if (x < 65) return "Caution"
  if (x < 165) return "Done"
  if (x < 182) return "Growth"
  if (x < 200) return "Trust"
  if (x < 250) return "Attention"
  if (x < 300) return "Belonging"
  return "Warmth"
}

const EXPECTED: Partial<Record<RoleId, string[]>> = {
  primary: ["Trust", "Belonging", "Energy", "Attention"],
  success: ["Done", "Growth"],
  error: ["Alarm"],
}

const ratio = (a: string, b: string) => `${contrast(a, b).toFixed(1)}:1`
const label = (id: RoleId) => ROLES.find((r) => r.id === id)!.label

export function runChecks(p: Palette): Finding[] {
  const f: Finding[] = []

  const cText = contrast(p.text, p.bg)
  f.push({
    key: "text-contrast",
    severity: cText >= 4.5 ? "pass" : "fail",
    title: "Body text is readable",
    issue: "Body text is hard to read",
    detail: `${ratio(p.text, p.bg)} on the background. WCAG AA needs 4.5:1.`,
    say: `Your body text is ${ratio(p.text, p.bg)} on its background, below the 4.5:1 minimum, so a lot of people are squinting.`,
  })

  const cBtn = contrast(p.buttonText, p.primary)
  f.push({
    key: "button-contrast",
    severity: cBtn >= 4.5 ? "pass" : cBtn >= 3 ? "warn" : "fail",
    title: "Button label is readable",
    issue: "Button label is hard to read",
    detail: `${ratio(p.buttonText, p.primary)} on the primary button. WCAG AA needs 4.5:1.`,
    say: `The label on your primary button is only ${ratio(p.buttonText, p.primary)}. Your most important word is the hardest to read.`,
  })

  const cLink = contrast(p.link, p.bg)
  f.push({
    key: "link-contrast",
    severity: cLink >= 4.5 ? "pass" : cLink >= 3 ? "warn" : "fail",
    title: "Links stand out",
    issue: "Links blend into the page",
    detail: `${ratio(p.link, p.bg)} on the background. WCAG AA needs 4.5:1.`,
    say: `Your links are ${ratio(p.link, p.bg)} on the background, so they're easy to miss.`,
  })

  const dPS = deltaE(p.primary, p.success)
  f.push({
    key: "action-vs-success",
    severity: dPS >= 0.12 ? "pass" : dPS >= 0.06 ? "warn" : "fail",
    title: "Action and success look different",
    issue: "Primary button and success messages look too similar",
    detail: `Primary vs success differ by ΔE ${(dPS * 100).toFixed(1)}. Under 6 reads as the same color. 12 or more is clearly distinct.`,
    say: `Your primary button and your success message are nearly the same color. People read the button as "already done" right before they click.`,
  })

  const dCB = deltaEDeutan(p.success, p.error)
  f.push({
    key: "colorblind-states",
    severity: dCB >= 0.12 ? "pass" : dCB >= 0.07 ? "warn" : "fail",
    title: "Success and error survive color blindness",
    issue: "Success and error blur together for color-blind users",
    detail: `With deuteranopia (about 1 in 16 men), they differ by ΔE ${(dCB * 100).toFixed(1)}. Under 7 reads as the same color. 12 or more is clearly distinct.`,
    say: `For about 1 in 16 men, your success and error colors look almost the same. Those messages need more than color to tell them apart.`,
  })

  for (const role of ["primary", "success", "error"] as const) {
    const got = intentOf(p[role])
    const want = EXPECTED[role]!
    f.push({
      key: `intent-${role}`,
      severity: want.includes(got) ? "pass" : "warn",
      title: `${label(role)} signals the right intent`,
      issue: `${label(role)} color sends a mixed signal`,
      detail: `Reads as ${got}. The Color Code expects ${want.join(" or ")}.`,
      say: `Your ${label(role).toLowerCase()} color reads as ${got.toLowerCase()}, not ${want[0].toLowerCase()}, so it sends a mixed signal.`,
    })
  }

  return f
}

const ORDER: Record<Severity, number> = { fail: 0, warn: 1, pass: 2 }
export const sortFindings = (f: Finding[]) => [...f].sort((a, b) => ORDER[a.severity] - ORDER[b.severity])

/** The read: the top two issues in plain English. */
export function templateRead(f: Finding[]) {
  const bad = sortFindings(f).filter((x) => x.severity !== "pass")
  if (!bad.length) {
    return "Every check passes, so your colors are doing their jobs. A full audit covers what this quick read can't see: focus, disabled, charts, and dark mode."
  }
  const rest = bad.length - 2
  const more = rest > 0 ? ` There ${rest === 1 ? "is 1 more issue" : `are ${rest} more issues`} below.` : ""
  return bad.slice(0, 2).map((x) => x.say).join(" ") + more
}
