"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { MaiScrollSection } from "@/components/mai-scroll-section"

const COLOR_UI_TICKET_RATIO = 0.3

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

  return (
    <MaiScrollSection id="roi-calculator" title="How much is it costing you?" variant="muted">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* Left Column - Sliders */}
        <div className="rounded-xl border border-border bg-background p-6 space-y-6">
          <h3 className="text-lg font-semibold">Pull the levers. See what's leaking.</h3>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <label htmlFor="supportTickets" className="font-medium">Support tickets / month</label>
              <span className="font-semibold text-[#14b8a6]">{supportTickets}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">We estimate ~30% relate to color and UI confusion.</p>
            <Slider
              id="supportTickets"
              min={0}
              max={200}
              step={5}
              value={[supportTickets]}
              onValueChange={([v]) => setSupportTickets(v)}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="avgResolutionTime" className="font-medium">Avg resolution time (min)</label>
              <span className="font-semibold text-[#14b8a6]">{avgResolutionTime}</span>
            </div>
            <Slider
              id="avgResolutionTime"
              min={0}
              max={120}
              step={5}
              value={[avgResolutionTime]}
              onValueChange={([v]) => setAvgResolutionTime(v)}
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <label htmlFor="avgHourlyRate" className="font-medium">Support hourly rate ($)</label>
              <span className="font-semibold text-[#14b8a6]">${avgHourlyRate}</span>
            </div>
            <Slider
              id="avgHourlyRate"
              min={0}
              max={200}
              step={5}
              value={[avgHourlyRate]}
              onValueChange={([v]) => setAvgHourlyRate(v)}
            />
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-semibold mb-4 text-muted-foreground">Revenue Impact</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label htmlFor="monthlyUsers" className="font-medium">Monthly active users</label>
                  <span className="font-semibold text-[#14b8a6]">{monthlyUsers.toLocaleString()}</span>
                </div>
                <Slider
                  id="monthlyUsers"
                  min={0}
                  max={100000}
                  step={1000}
                  value={[monthlyUsers]}
                  onValueChange={([v]) => setMonthlyUsers(v)}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label htmlFor="conversionRate" className="font-medium">Conversion rate (%)</label>
                  <span className="font-semibold text-[#14b8a6]">{conversionRate}%</span>
                </div>
                <Slider
                  id="conversionRate"
                  min={0}
                  max={10}
                  step={0.1}
                  value={[conversionRate]}
                  onValueChange={([v]) => setConversionRate(v)}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label htmlFor="avgDealValue" className="font-medium">Avg deal value ($)</label>
                  <span className="font-semibold text-[#14b8a6]">${avgDealValue.toLocaleString()}</span>
                </div>
                <Slider
                  id="avgDealValue"
                  min={0}
                  max={50000}
                  step={500}
                  value={[avgDealValue]}
                  onValueChange={([v]) => setAvgDealValue(v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Support Ticket Costs</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monthly:</span>
                <span className="font-semibold text-foreground">${roi.monthlySupportCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>Annual:</span>
                <span className="font-semibold text-foreground">${roi.annualSupportCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Revenue you're leaving on the table</h3>
            <p className="text-xs text-foreground/70 font-medium mb-3">
              A 1% conversion lift is conservative. Most clients see 2–3x that.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monthly:</span>
                <span className="font-semibold text-foreground">${roi.monthlyOpportunityCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>Annual:</span>
                <span className="font-semibold text-foreground">${roi.annualOpportunityCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#14b8a6]/40 bg-[#14b8a6]/5 dark:bg-[#14b8a6]/10 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#14b8a6] mb-2">Total Annual Cost</h3>
            <p className="text-3xl font-bold text-[#14b8a6] mb-4 transition-all duration-300">
              ${roi.totalAnnualCost.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              That number will still be there Monday morning. The 15-min call is free.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full rounded-lg bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-4 py-2.5 transition-colors"
            >
              Book the free 15-min call
            </a>
          </div>
        </div>

      </div>
    </MaiScrollSection>
  )
}
