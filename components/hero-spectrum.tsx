"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { INTENT_BANDS, contrast, hue, intentOf } from "@/lib/color-code/checks"

interface Reading {
  hueDeg: number
  y: number
  hex: string
  intent: string
  vsWhite: number
  vsBlack: number
  left: number
  dropToBottom: boolean
}

const verdict = (c: number) =>
  c >= 4.5 ? { cls: "pass", text: "AA" } : c >= 3 ? { cls: "warn", text: "Large" } : { cls: "fail", text: "Fail" }

/**
 * Hero instrument: a hue spectrum you can drag, tap or arrow-key across.
 * The readout names the Color Code intent under the probe and its contrast with white and black.
 * The bands under the strip are the real hue ranges from lib/color-code/checks.ts.
 */
export function HeroSpectrum() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const readoutRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ hue: 190, y: 0.42 })
  const [r, setR] = useState<Reading | null>(null)

  const measure = useCallback((h: number, y: number) => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { willReadFrequently: true })
    if (!wrap || !canvas || !ctx || !canvas.width) return
    const hueDeg = Math.max(0, Math.min(359, h))
    const yy = Math.max(0.05, Math.min(0.95, y))
    pos.current = { hue: hueDeg, y: yy }

    const rect = wrap.getBoundingClientRect()
    const px = ctx.getImageData(
      Math.min(canvas.width - 1, Math.round((hueDeg / 360) * canvas.width)),
      Math.round(yy * canvas.height),
      1,
      1,
    ).data
    const hex = "#" + [px[0], px[1], px[2]].map((v) => v.toString(16).padStart(2, "0")).join("")
    const x = (hueDeg / 360) * rect.width

    // Readout sits beside the probe, flips near the right edge, and stays inside the strip.
    const rw = readoutRef.current?.offsetWidth ?? 232
    const pad = 8
    let left = x + rw + 28 > rect.width ? x - rw - 18 : x + 18
    left = Math.max(pad, Math.min(rect.width - rw - pad, left))
    // On narrow screens it can't clear the probe, so move it away from the probe dot.
    const dropToBottom = rect.width < rw * 2 + 60 && yy < 0.5

    setR({
      hueDeg,
      y: yy,
      hex,
      intent: intentOf(hex),
      vsWhite: contrast(hex, "#ffffff"),
      vsBlack: contrast(hex, "#000000"),
      left,
      dropToBottom,
    })
  }, [])

  // Paint the spectrum; repaint on resize.
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const draw = () => {
      const rect = wrap.getBoundingClientRect()
      const d = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * d)
      canvas.height = Math.round(rect.height * d)
      const W = canvas.width
      const H = canvas.height
      const g = ctx.createLinearGradient(0, 0, W, 0)
      for (let i = 0; i <= 36; i++) g.addColorStop(i / 36, `hsl(${i * 10},88%,50%)`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)
      const v = ctx.createLinearGradient(0, 0, 0, H)
      v.addColorStop(0, "rgba(255,255,255,.45)")
      v.addColorStop(0.5, "rgba(255,255,255,0)")
      v.addColorStop(0.5, "rgba(0,0,0,0)")
      v.addColorStop(1, "rgba(0,0,0,.55)")
      ctx.fillStyle = v
      ctx.fillRect(0, 0, W, H)
      measure(pos.current.hue, pos.current.y)
    }

    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(wrap)

    // One sweep on load, from Alarm to Trust.
    let raf = 0
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t0 = performance.now()
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1800)
        const e = 1 - Math.pow(1 - k, 3)
        measure(8 + (190 - 8) * e, 0.42)
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [measure])

  const fromPointer = (e: React.PointerEvent) => {
    const rect = wrapRef.current!.getBoundingClientRect()
    measure(((e.clientX - rect.left) / rect.width) * 360, (e.clientY - rect.top) / rect.height)
  }

  const onKey = (e: React.KeyboardEvent) => {
    const s = e.shiftKey ? 10 : 2
    const { hue: h, y } = pos.current
    if (e.key === "ArrowRight") measure(h + s, y)
    else if (e.key === "ArrowLeft") measure(h - s, y)
    else if (e.key === "ArrowUp") measure(h, y - 0.05)
    else if (e.key === "ArrowDown") measure(h, y + 0.05)
    else return
    e.preventDefault()
  }

  const activeHue = r ? hue(r.hex) : null
  const w = r && verdict(r.vsWhite)
  const b = r && verdict(r.vsBlack)

  return (
    <>
      <div
        ref={wrapRef}
        className="spectrum"
        tabIndex={0}
        role="slider"
        aria-label="Hue probe"
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={Math.round(r?.hueDeg ?? 190)}
        aria-valuetext={r ? `${r.hex}, reads as ${r.intent}, ${r.vsWhite.toFixed(1)} to 1 with white` : undefined}
        onPointerDown={(e) => {
          fromPointer(e)
          try {
            e.currentTarget.setPointerCapture(e.pointerId)
          } catch {}
        }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse" || e.buttons) fromPointer(e)
        }}
        onKeyDown={onKey}
      >
        <canvas ref={canvasRef} aria-hidden />
        <div
          className="probe"
          style={
            {
              left: r ? `${(r.hueDeg / 360) * 100}%` : "52.8%",
              "--y": `${(r?.y ?? 0.42) * 100}%`,
              "--c": r?.hex,
            } as React.CSSProperties
          }
        />
        <div
          ref={readoutRef}
          className="readout"
          style={{ left: r?.left ?? 18, top: r?.dropToBottom ? "auto" : undefined, bottom: r?.dropToBottom ? "1rem" : undefined }}
        >
          <div className="sw">
            <i style={{ background: r?.hex }} />
            <div>
              <div className="intent">{r?.intent ?? "Trust"}</div>
              <div className="hex">{r?.hex ?? "#16c3e3"}</div>
            </div>
          </div>
          <dl>
            <dt>vs white</dt>
            <dd>{r ? `${r.vsWhite.toFixed(1)}:1` : ""}</dd>
            <dd>{w && <span className={`chip ${w.cls}`}>{w.text}</span>}</dd>
            <dt>vs black</dt>
            <dd>{r ? `${r.vsBlack.toFixed(1)}:1` : ""}</dd>
            <dd>{b && <span className={`chip ${b.cls}`}>{b.text}</span>}</dd>
          </dl>
        </div>
      </div>
      <div className="bands" aria-hidden>
        {INTENT_BANDS.map(([from, to, name]) => (
          <span
            key={`${name}${from}`}
            className={`${to - from < 20 ? "thin" : ""} ${activeHue !== null && activeHue >= from && activeHue < to ? "on" : ""}`}
            style={{ left: `${(from / 360) * 100}%`, width: `${((to - from) / 360) * 100}%` }}
          >
            {name}
            <small>
              {from}–{to}°
            </small>
          </span>
        ))}
      </div>
    </>
  )
}
