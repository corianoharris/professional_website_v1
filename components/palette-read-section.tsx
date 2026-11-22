"use client"

import { useMemo, useState } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { Pipette } from "lucide-react"
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

const CHIP_LABEL: Record<Severity, string> = { pass: "Pass", warn: "Check", fail: "Fail" }

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
    const example = PRESETS.find((p) => p.id === presetId)
    const message = [
      example
        ? `I tried the palette check with the ${example.label} palette and I'd like a full audit of my own colors.`
        : "I ran the palette check on my colors and I'd like the full audit.",
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
    <section id="palette-read" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label" style={{ color: "var(--belonging)" }}>
              Palette check · runs in your browser
            </span>
            <h2>What are your colors telling users?</h2>
          </div>
          <p>
            Check your own product&apos;s colors. Type or paste a hex code for each role, and the read updates as you
            go. Nothing is saved.
          </p>
        </div>

        <div className="lab">
          <div className="lab-in">
            <div className="step-head">
              <span className="label step-n">1 · Enter your colors</span>
              <p>Type or paste a hex code like #1a73e8, or tap a swatch to pick a color.</p>
            </div>

            <div className="chips">
              {ROLES.map((r) => {
                const draft = drafts[r.id] ?? palette[r.id]
                const invalid = !isHex(draft.startsWith("#") ? draft : `#${draft}`)
                return (
                  <div key={r.id} className="chip-in">
                    <div className="fill" style={{ background: palette[r.id] }}>
                      <Pipette className="pick-icon" aria-hidden />
                      <input
                        type="color"
                        id={`palette-pick-${r.id}`}
                        aria-label={`Pick ${r.label} color`}
                        value={palette[r.id]}
                        onChange={(e) => setColor(r.id, e.target.value)}
                      />
                    </div>
                    <div className="meta">
                      <label htmlFor={`palette-hex-${r.id}`}>{r.label}</label>
                      <input
                        type="text"
                        id={`palette-hex-${r.id}`}
                        value={draft}
                        onChange={(e) => setColor(r.id, e.target.value)}
                        onBlur={() => setDrafts((d) => ({ ...d, [r.id]: undefined }))}
                        maxLength={7}
                        placeholder="#000000"
                        spellCheck={false}
                        autoComplete="off"
                        aria-invalid={invalid}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="presets" role="group" aria-labelledby="palette-examples">
              <span id="palette-examples" className="label">
                Or load an example
              </span>
              {PRESETS.map((p) => (
                <button key={p.id} type="button" onClick={() => loadPreset(p.id)} aria-pressed={presetId === p.id}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Their UI, in their colors */}
            <div className="stage" style={{ background: palette.bg }} aria-label="Preview with these colors">
              <p style={{ color: palette.text }}>Your order ships Thursday. Review the details before you pay.</p>
              <div className="row">
                <span className="pay" style={{ background: palette.primary, color: palette.buttonText }}>
                  Pay $84.00
                </span>
                <span style={{ color: palette.link, textDecoration: "underline" }}>Edit cart</span>
              </div>
              <div className="row">
                <span className="tag" style={{ background: palette.success }}>
                  Payment received
                </span>
                <span className="tag" style={{ background: palette.error }}>
                  Card declined
                </span>
              </div>
            </div>
          </div>

          <div className="lab-out" aria-live="polite">
            <div className="step-head row">
              <span className="label step-n">2 · Your read</span>
              <span className={`checking ${presetId ? "" : "yours"}`}>
                {presetId ? `Example: ${PRESETS.find((p) => p.id === presetId)?.label.replace(" (example)", "")}` : "Your colors"}
              </span>
            </div>
            <p className="scoreline">
              <b>{passing}</b> <span>of {findings.length} checks pass under the Color Code™</span>
            </p>
            <div className="meter" aria-hidden>
              {sorted.map((f) => (
                <i key={f.key} className={f.severity} />
              ))}
            </div>
            <p className="read">{read}</p>
            <ul className="findings">
              {sorted.map((f) => (
                <li key={f.key}>
                  <span className={`chip ${f.severity}`}>{CHIP_LABEL[f.severity]}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="act">
              <p>Your audit request will include these findings.</p>
              <button type="button" className="btn btn-bel" onClick={requestAudit}>
                Get the full audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
