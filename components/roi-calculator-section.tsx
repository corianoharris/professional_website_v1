"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { MaiScrollSection } from "@/components/mai-scroll-section"

const COLOR_UI_TICKET_RATIO = 0.3

const display = { fontFamily: "var(--font-baloo2), sans-serif" }
const money = (n: number) => `$${n.toLocaleString()}`

interface Lever {
  id: string
  label: string
  value: number
  set: (v: number) => void
  min: number
  max: number
  step: number
  format: (v: number) => string
}

function LeverGroup({ title, swatch, levers }: { title: string; swatch: string; levers: Lever[] }) {
  return (
    <fieldset className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center gap-2" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: swatch }} />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      {levers.map((l) => (
        <div key={l.id} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <label htmlFor={l.id} className="font-medium">{l.label}</label>
            <span className="text-lg font-bold tabular-nums" style={display}>{l.format(l.value)}</span>
          </div>
          <Slider id={l.id} min={l.min} max={l.max} step={l.step} value={[l.value]} onValueChange={([v]) => l.set(v)} />
        </div>
      ))}
    </fieldset>
  )
}

export function RoiCalculatorSection() {
  const [supportTickets, setSupportTickets] = useState(20)
  const [avgResolutionTime, setAvgResolutionTime] = useState(20)
  const [avgHourlyRate, setAvgHourlyRate] = useState(65)
  const [monthlyUsers, setMonthlyUsers] = useState(2500)
  const [conversionRate, setConversionRate] = useState(2)
  const [avgDealValue, setAvgDealValue] = useState(1500)

  const calculateROI = () => {
    const colorTickets = supportTickets * COLOR_UI_TICKET_RATIO
    const hoursSpent = (colorTickets * avgResolutionTime) / 60
    const monthlySupportCost = hoursSpent * avgHourlyRate
    const annualSupportCost = monthlySupportCost * 12

    const potentialMonthlyRevenue = monthlyUsers * ((conversionRate + 1) / 100) * avgDealValue
    const currentMonthlyRevenue = monthlyUsers * (conversionRate / 100) * avgDealValue
    const monthlyOpportunityCost = potentialMonthlyRevenue - currentMonthlyRevenue
    const annualOpportunityCost = monthlyOpportunityCost * 12

    const totalAnnualCost = annualSupportCost + annualOpportunityCost

    return {
      monthlySupportCost: Math.round(monthlySupportCost),
      annualSupportCost: Math.round(annualSupportCost),
      monthlyOpportunityCost: Math.round(monthlyOpportunityCost),
      annualOpportunityCost: Math.round(annualOpportunityCost),
      totalAnnualCost: Math.round(totalAnnualCost),
    }
  }

  const roi = calculateROI()
  // Share of the total, drawn to scale. A tiny share still gets a visible sliver.
  const supportShare = roi.totalAnnualCost > 0 ? (roi.annualSupportCost / roi.totalAnnualCost) * 100 : 0

  return (
    <MaiScrollSection id="roi-calculator" title="How much is it costing you?" subtitle="Move the sliders to match your product. The total updates as you go.">
      <div className="grid items-start gap-6 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <LeverGroup
            title="Support"
            swatch="var(--intent-growth)"
            levers={[
              { id: "supportTickets", label: "Support tickets a month", value: supportTickets, set: setSupportTickets, min: 0, max: 200, step: 5, format: String },
              { id: "avgResolutionTime", label: "Minutes to resolve one", value: avgResolutionTime, set: setAvgResolutionTime, min: 0, max: 120, step: 5, format: String },
              { id: "avgHourlyRate", label: "Support cost an hour", value: avgHourlyRate, set: setAvgHourlyRate, min: 0, max: 200, step: 5, format: money },
            ]}
          />
          <LeverGroup
            title="Revenue"
            swatch="var(--intent-energy)"
            levers={[
              { id: "monthlyUsers", label: "Monthly active users", value: monthlyUsers, set: setMonthlyUsers, min: 0, max: 100000, step: 1000, format: (v) => v.toLocaleString() },
              { id: "conversionRate", label: "Conversion rate", value: conversionRate, set: setConversionRate, min: 0, max: 10, step: 0.1, format: (v) => `${v.toFixed(1)}%` },
              { id: "avgDealValue", label: "Average deal value", value: avgDealValue, set: setAvgDealValue, min: 0, max: 50000, step: 500, format: money },
            ]}
          />
        </div>

        {/* The answer */}
        <div className="flex flex-col gap-6 rounded-2xl border border-transparent bg-panel p-8 text-panel-foreground dark:border-border" aria-live="polite">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-panel-muted">Color confusion costs you</span>
            <p className="text-5xl font-extrabold leading-none tabular-nums md:text-6xl" style={display}>
              {money(roi.totalAnnualCost)}
            </p>
            <span className="text-sm text-panel-muted">a year</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex h-4 overflow-hidden rounded-full bg-panel-line" role="img" aria-label={`Support is ${supportShare.toFixed(0)}% of the total. Lost revenue is ${(100 - supportShare).toFixed(0)}%.`}>
              <span className="min-w-[3px] bg-panel-growth transition-[width] duration-300" style={{ width: `${supportShare}%` }} />
              <span className="flex-1 bg-panel-energy" />
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-0.5">
                <dt className="flex items-center gap-2 text-panel-muted">
                  <span className="h-2 w-2 rounded-full bg-panel-growth" aria-hidden /> Support time
                </dt>
                <dd className="text-xl font-bold tabular-nums" style={display}>{money(roi.annualSupportCost)}</dd>
                <dd className="text-xs text-panel-muted tabular-nums">{money(roi.monthlySupportCost)} a month</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="flex items-center gap-2 text-panel-muted">
                  <span className="h-2 w-2 rounded-full bg-panel-energy" aria-hidden /> Lost revenue
                </dt>
                <dd className="text-xl font-bold tabular-nums" style={display}>{money(roi.annualOpportunityCost)}</dd>
                <dd className="text-xs text-panel-muted tabular-nums">{money(roi.monthlyOpportunityCost)} a month</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-4 border-t border-panel-line pt-6">
            <p className="text-sm text-panel-muted">That number doesn&apos;t go away on its own. The first call is free.</p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-energy-solid px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-energy-solid-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-panel-energy focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
            >
              Book the free 15-min call <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <p className="text-xs text-panel-muted">
              Assumes 30% of tickets come from color and UI confusion, and a 1-point conversion lift. Most clients see 2 to 3 times that.
            </p>
          </div>
        </div>
      </div>
    </MaiScrollSection>
  )
}
