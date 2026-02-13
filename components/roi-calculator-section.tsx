"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"

export function RoiCalculatorSection() {
  const [supportTickets, setSupportTickets] = useState(50)
  const [avgResolutionTime, setAvgResolutionTime] = useState(30)
  const [avgHourlyRate, setAvgHourlyRate] = useState(75)
  const [monthlyUsers, setMonthlyUsers] = useState(10000)
  const [conversionRate, setConversionRate] = useState(2)
  const [avgDealValue, setAvgDealValue] = useState(5000)

  const calculateROI = () => {
    const tickets = supportTickets
    const minutes = avgResolutionTime
    const hourlyRate = avgHourlyRate
    const users = monthlyUsers
    const conversion = conversionRate
    const dealValue = avgDealValue

    // Support ticket costs (monthly)
    const hoursSpent = (tickets * minutes) / 60
    const monthlySupportCost = hoursSpent * hourlyRate

    // Annual support cost
    const annualSupportCost = monthlySupportCost * 12

    // Lost conversion opportunity (if color clarity improved conversion by just 1%)
    const currentMonthlyRevenue = users * (conversion / 100) * dealValue
    const potentialMonthlyRevenue = users * ((conversion + 1) / 100) * dealValue
    const monthlyOpportunityCost = potentialMonthlyRevenue - currentMonthlyRevenue
    const annualOpportunityCost = monthlyOpportunityCost * 12

    // Total annual impact
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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <MaiScrollSection
      id="roi-calculator"
      title="How much is it costing you?"
      subtitle="You probably don't know. Adjust the sliders. See the number."
      variant="muted"
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Left Column - Interactive Sliders + Inputs */}
          <div className="rounded-xl border border-border bg-background p-6 space-y-6">
            <h3 className="text-lg font-semibold mb-4">Your Current Situation</h3>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <label htmlFor="supportTickets" className="font-medium">
                  Color-related support tickets/month
                </label>
                <span className="font-semibold text-[#14b8a6]">{supportTickets}</span>
              </div>
              <Slider
                id="supportTickets"
                min={10}
                max={200}
                step={5}
                value={[supportTickets]}
                onValueChange={([v]) => setSupportTickets(v)}
                className="mb-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <label htmlFor="avgResolutionTime" className="font-medium">
                  Avg resolution time (min)
                </label>
                <span className="font-semibold text-[#14b8a6]">{avgResolutionTime}</span>
              </div>
              <Slider
                id="avgResolutionTime"
                min={5}
                max={120}
                step={5}
                value={[avgResolutionTime]}
                onValueChange={([v]) => setAvgResolutionTime(v)}
                className="mb-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <label htmlFor="avgHourlyRate" className="font-medium">
                  Support hourly rate ($)
                </label>
                <span className="font-semibold text-[#14b8a6]">{avgHourlyRate}</span>
              </div>
              <Slider
                id="avgHourlyRate"
                min={25}
                max={200}
                step={5}
                value={[avgHourlyRate]}
                onValueChange={([v]) => setAvgHourlyRate(v)}
                className="mb-2"
              />
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h4 className="text-sm font-semibold mb-4 text-muted-foreground">Revenue Impact</h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label htmlFor="monthlyUsers" className="font-medium">Monthly active users</label>
                    <span className="font-semibold text-[#14b8a6]">{monthlyUsers.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="monthlyUsers"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={[monthlyUsers]}
                    onValueChange={([v]) => setMonthlyUsers(v)}
                    className="mb-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label htmlFor="conversionRate" className="font-medium">Conversion rate (%)</label>
                    <span className="font-semibold text-[#14b8a6]">{conversionRate}%</span>
                  </div>
                  <Slider
                    id="conversionRate"
                    min={0.5}
                    max={10}
                    step={0.1}
                    value={[conversionRate]}
                    onValueChange={([v]) => setConversionRate(v)}
                    className="mb-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label htmlFor="avgDealValue" className="font-medium">Avg deal value ($)</label>
                    <span className="font-semibold text-[#14b8a6]">${avgDealValue.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="avgDealValue"
                    min={500}
                    max={50000}
                    step={500}
                    value={[avgDealValue]}
                    onValueChange={([v]) => setAvgDealValue(v)}
                    className="mb-2"
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
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Lost Revenue Opportunity</h3>
              <p className="text-xs text-muted-foreground mb-3">
                If clearer color increased conversion by just 1%
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
                This is what a broken color system costs you every year. And this is a <span className="font-semibold text-foreground">conservative</span> estimate.
              </p>
              <Button
                onClick={scrollToContact}
                className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white"
              >
                Book the 15-min Audit
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> This calculator uses industry averages. Your actual costs may be higher when factoring in developer time fighting color tokens, failed accessibility audits, and lost contracts.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-lg font-semibold max-w-2xl mx-auto">
          That number? It&apos;s real. The fix? It&apos;s real too. The <span className="highlighter">Intent-Driven Color Model™</span> doesn&apos;t paper over the problem. It eliminates it.
        </p>
      </MaiScrollSection>
  )
}
