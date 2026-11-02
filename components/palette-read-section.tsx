"use client"

import { useMemo, useState } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { MaiScrollSection } from "@/components/mai-scroll-section"
import {
  PRESETS,
  ROLES,
  isHex,
  runChecks,
  sortFindings,
  templateRead,
  type Palette,
  type RoleId,
  type Severity,
} from "@/lib/color-code/checks"

export const PALETTE_AUDIT_EVENT = "palette-read:audit"

const CHIP: Record<Severity, { label: string; className: string }> = {
  pass: { label: "Pass", className: "bg-done-subtle text-done" },
  warn: { label: "Check", className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" },
  fail: { label: "Fail", className: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" },
}

export function PaletteReadSection() {
  const [palette, setPalette] = useState<Palette>(PRESETS[0].palette)
  const [presetId, setPresetId] = useState<string | null>(PRESETS[0].id)
  const [drafts, setDrafts] = useState<Partial<Record<RoleId, string>>>({})

  const findings = useMemo(() => runChecks(palette), [palette])
  const sorted = useMemo(() => sortFindings(findings), [findings])
  const passing = findings.filter((f) => f.severity === "pass").length
  const read = templateRead(findings)

  const setColor = (id: RoleId, value: string) => {
    let v = value.trim().toLowerCase()
    if (v && !v.startsWith("#")) v = `#${v}`
    setDrafts((d) => ({ ...d, [id]: value }))
    if (!isHex(v)) return
    setPalette((p) => ({ ...p, [id]: v }))
    setPresetId(null)
  }

  const loadPreset = (id: string) => {
    const preset = PRESETS.find((p) => p.id === id)!
    setPalette(preset.palette)
    setPresetId(id)
    setDrafts({})
  }

  const requestAudit = () => {
    const issues = sorted.filter((f) => f.severity !== "pass")
    const message = [
      "I ran the palette check on my colors and I'd like the full audit.",
      "",
      ...(issues.length
        ? ["What it flagged:", ...issues.map((f) => `- ${f.issue}. ${f.detail}`)]
        : ["Every check passed. I'd like the full audit to cover the rest."]),
      "",
      "My colors:",
      ROLES.map((r) => `${r.label} ${palette[r.id]}`).join(" · "),
    ].join("\n")
    sendGAEvent("event", "palette_audit_click", { failing: issues.length })
    window.dispatchEvent(new CustomEvent(PALETTE_AUDIT_EVENT, { detail: message.slice(0, 1000) }))
  }

  return (
    <MaiScrollSection
      id="palette-read"
      title="What are your colors telling users?"
      subtitle="Enter your colors. Get a Color Code read in two seconds. Nothing is saved."
      variant="muted"
    >
      <div className="grid md:grid-cols-[5fr_7fr] gap-6 max-w-5xl mx-auto text-left items-start">
        {/* Inputs */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Load a palette">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => loadPreset(p.id)}
                aria-pressed={presetId === p.id}
                className="rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-belonging aria-pressed:border-belonging aria-pressed:bg-belonging-subtle aria-pressed:text-belonging"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {ROLES.map((r) => {
              const draft = drafts[r.id] ?? palette[r.id]
              const invalid = !isHex(draft.startsWith("#") ? draft : `#${draft}`)
              return (
                <div key={r.id} className="grid grid-cols-[40px_1fr_104px] gap-3 items-center">
                  <input
                    type="color"
                    id={`palette-pick-${r.id}`}
                    aria-label={`${r.label} color picker`}
                    value={palette[r.id]}
                    onChange={(e) => setColor(r.id, e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-lg border border-border bg-background p-0.5"
                  />
                  <label htmlFor={`palette-hex-${r.id}`} className="flex flex-col text-sm font-semibold leading-tight">
                    {r.label}
                    <span className="text-xs font-normal text-muted-foreground">{r.hint}</span>
                  </label>
                  <input
                    type="text"
                    id={`palette-hex-${r.id}`}
                    value={draft}
                    onChange={(e) => setColor(r.id, e.target.value)}
                    onBlur={() => setDrafts((d) => ({ ...d, [r.id]: undefined }))}
                    maxLength={7}
                    spellCheck={false}
                    autoComplete="off"
                    aria-invalid={invalid}
                    className="w-full rounded-md border border-border bg-muted px-2.5 py-2 font-mono text-sm lowercase aria-[invalid=true]:border-rose-600"
                  />
                </div>
              )
            })}
          </div>

          {/* Their UI, in their colors */}
          <div
            className="flex flex-col gap-2.5 rounded-lg border border-border p-4"
            style={{ background: palette.bg, color: palette.text }}
            aria-label="Preview with these colors"
          >
            <p className="text-sm">Your order ships Thursday. Review the details before you pay.</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md px-3.5 py-2 text-sm font-semibold" style={{ background: palette.primary, color: palette.buttonText }}>
                Pay $84.00
              </span>
              <span className="text-sm underline" style={{ color: palette.link }}>Edit cart</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded px-2.5 py-1 text-xs font-semibold text-white" style={{ background: palette.success }}>Payment received</span>
              <span className="rounded px-2.5 py-1 text-xs font-semibold text-white" style={{ background: palette.error }}>Card declined</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-5" aria-live="polite">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-5xl font-extrabold tabular-nums leading-none" style={{ fontFamily: "var(--font-baloo2), sans-serif" }}>
              {passing}/{findings.length}
            </span>
            <span className="text-muted-foreground">checks pass under the Color Code™</span>
          </div>

          <div className="rounded-lg bg-belonging-subtle px-5 py-4 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-belonging">The read</span>
            <p className="text-base font-medium text-foreground">{read}</p>
            <span className="text-xs text-muted-foreground">
              Every number comes from the checks below.
            </span>
          </div>

          <ul className="flex flex-col">
            {sorted.map((f) => (
              <li key={f.key} className="grid grid-cols-[64px_1fr] gap-3 border-t border-border py-3">
                <span className={`h-fit rounded py-0.5 text-center text-[0.68rem] font-semibold uppercase tracking-wider ${CHIP[f.severity].className}`}>
                  {CHIP[f.severity].label}
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground max-w-xs">Your audit request will include these findings.</p>
            <button
              type="button"
              onClick={requestAudit}
              className="rounded-lg bg-belonging-solid px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-belonging-solid-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-belonging-solid focus-visible:ring-offset-2"
            >
              Get the full audit
            </button>
          </div>
        </div>
      </div>
    </MaiScrollSection>
  )
}
