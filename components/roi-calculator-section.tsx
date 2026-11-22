"use client"

import { useState } from "react"

/** Share of support tickets assumed to come from color and UI confusion */
const COLOR_UI_TICKET_RATIO = 0.3

const money = (n: number) => `$${Math.round(n).toLocaleString()}`

type LeverId = "tickets" | "minutes" | "rate" | "visitors" | "lift" | "deal"

const LEVERS: {
  id: LeverId
  label: string
  min: number
  max: number
  step: number
  format: (v: number) => string
  group: "g" | "e"
}[] = [
  { id: "tickets", label: "Support tickets a month", min: 0, max: 200, step: 5, format: String, group: "g" },
  { id: "minutes", label: "Minutes to resolve one", min: 0, max: 120, step: 5, format: String, group: "g" },
  { id: "rate", label: "Support cost an hour", min: 0, max: 200, step: 5, format: money, group: "g" },
  { id: "visitors", label: "Visitors to pricing or checkout a month", min: 0, max: 100000, step: 500, format: (v) => v.toLocaleString(), group: "e" },
  { id: "lift", label: "Lift from clearer color", min: 0, max: 2, step: 0.05, format: (v) => `+${v.toFixed(2)} pts`, group: "e" },
  { id: "deal", label: "Average deal value", min: 0, max: 50000, step: 250, format: money, group: "e" },
]

export function RoiCalculatorSection() {
  const [v, setV] = useState<Record<LeverId, number>>({
    tickets: 20,
    minutes: 20,
    rate: 65,
    visitors: 2500,
    lift: 0.25,
    deal: 1500,
  })

  const supportMonthly = ((v.tickets * COLOR_UI_TICKET_RATIO * v.minutes) / 60) * v.rate
  const revenueMonthly = v.visitors * (v.lift / 100) * v.deal
  const supportYear = supportMonthly * 12
  const revenueYear = revenueMonthly * 12
  const total = supportYear + revenueYear
  const supportShare = total > 0 ? (supportYear / total) * 100 : 0

  return (
    <section id="roi-calculator" className="sec cost">
      <div className="wrap">
        <h2 className="label" style={{ color: "var(--energy)", fontFamily: "var(--mono)", fontWeight: 500 }}>
          Cost estimate · color confusion costs you
        </h2>
        <p className="bigcost" aria-live="polite">
          {money(total)}
          <small>a year</small>
        </p>
        <div
          className="splitbar"
          role="img"
          aria-label={`Support is ${supportShare.toFixed(0)}% of the total. Lost revenue is ${(100 - supportShare).toFixed(0)}%.`}
        >
          <b style={{ width: `${supportShare}%` }} />
          <b />
        </div>
        <dl className="legend">
          <div>
            <dt>
              <i style={{ background: "var(--growth)" }} />
              Support time
            </dt>
            <dd>
              {money(supportYear)}
              <small>{money(supportMonthly)}/mo</small>
            </dd>
          </div>
          <div>
            <dt>
              <i style={{ background: "var(--energy)" }} />
              Lost revenue
            </dt>
            <dd>
              {money(revenueYear)}
              <small>{money(revenueMonthly)}/mo</small>
            </dd>
          </div>
        </dl>

        <div className="levers">
          {LEVERS.map((l) => (
            <div key={l.id} className={`lever ${l.group}`}>
              <div className="lt">
                <label htmlFor={`lever-${l.id}`}>{l.label}</label>
                <output htmlFor={`lever-${l.id}`}>{l.format(v[l.id])}</output>
              </div>
              <input
                type="range"
                id={`lever-${l.id}`}
                min={l.min}
                max={l.max}
                step={l.step}
                value={v[l.id]}
                onChange={(e) => setV((prev) => ({ ...prev, [l.id]: parseFloat(e.target.value) }))}
              />
            </div>
          ))}
        </div>

        <div className="fine">
          <p>
            Assumes <span className="mono">30%</span> of tickets come from color and UI confusion, and a lift of{" "}
            <span className="mono">{v.lift.toFixed(2)} conversion points</span>. Every other number is yours to set.
          </p>
          <a className="btn btn-hot" href="#contact">
            Book the free 15-min call →
          </a>
        </div>
      </div>
    </section>
  )
}
