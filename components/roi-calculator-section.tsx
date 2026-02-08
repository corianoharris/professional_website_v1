"use client"

import { useState } from "react"

export function RoiCalculatorSection() {
  const [supportTickets, setSupportTickets] = useState("50")
  const [avgResolutionTime, setAvgResolutionTime] = useState("30")
  const [avgHourlyRate, setAvgHourlyRate] = useState("75")
  const [monthlyUsers, setMonthlyUsers] = useState("10000")
  const [conversionRate, setConversionRate] = useState("2")
  const [avgDealValue, setAvgDealValue] = useState("5000")

  const calculateROI = () => {
    const tickets = parseFloat(supportTickets) || 0
    const minutes = parseFloat(avgResolutionTime) || 0
    const hourlyRate = parseFloat(avgHourlyRate) || 0
    const users = parseFloat(monthlyUsers) || 0
    const conversion = parseFloat(conversionRate) || 0
    const dealValue = parseFloat(avgDealValue) || 0

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
    <section id="roi-calculator" className="w-full px-4 md:w-full md:px-16 py-12 md:py-16 border-b relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-brand-gradient-start)" />
            <stop offset="50%" stopColor="var(--color-brand-gradient-middle)" />
            <stop offset="100%" stopColor="var(--color-brand-gradient-end)" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#roiGradient)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>ROI CALCULATOR</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How much is color <span className="highlighter">confusion</span> costing you?</h2>
        </div>

        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Most product leaders underestimate the financial impact. Enter your numbers to see the real cost.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column - Inputs */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Your Current Situation</h3>

            <div>
              <label htmlFor="supportTickets" className="block text-sm font-medium mb-2">
                Color-related support tickets per month
              </label>
              <input
                id="supportTickets"
                type="number"
                value={supportTickets}
                onChange={(e) => setSupportTickets(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="50"
              />
            </div>

            <div>
              <label htmlFor="avgResolutionTime" className="block text-sm font-medium mb-2">
                Average resolution time (minutes)
              </label>
              <input
                id="avgResolutionTime"
                type="number"
                value={avgResolutionTime}
                onChange={(e) => setAvgResolutionTime(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="30"
              />
            </div>

            <div>
              <label htmlFor="avgHourlyRate" className="block text-sm font-medium mb-2">
                Average support hourly rate ($)
              </label>
              <input
                id="avgHourlyRate"
                type="number"
                value={avgHourlyRate}
                onChange={(e) => setAvgHourlyRate(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="75"
              />
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h4 className="text-sm font-semibold mb-4 text-muted-foreground">Revenue Impact</h4>

              <div className="space-y-4">
                <div>
                  <label htmlFor="monthlyUsers" className="block text-sm font-medium mb-2">
                    Monthly active users
                  </label>
                  <input
                    id="monthlyUsers"
                    type="number"
                    value={monthlyUsers}
                    onChange={(e) => setMonthlyUsers(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label htmlFor="conversionRate" className="block text-sm font-medium mb-2">
                    Current conversion rate (%)
                  </label>
                  <input
                    id="conversionRate"
                    type="number"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="2"
                    step="0.1"
                  />
                </div>

                <div>
                  <label htmlFor="avgDealValue" className="block text-sm font-medium mb-2">
                    Average deal value ($)
                  </label>
                  <input
                    id="avgDealValue"
                    type="number"
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-destructive" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Support Ticket Costs</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-semibold text-foreground">${roi.monthlySupportCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-destructive/20 pt-2">
                  <span>Annual:</span>
                  <span className="font-semibold text-foreground">${roi.annualSupportCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 text-orange-600 dark:text-orange-400" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Lost Revenue Opportunity</h3>
              <p className="text-xs text-muted-foreground mb-3">
                If clearer color increased conversion by just 1%
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span className="font-semibold text-foreground">${roi.monthlyOpportunityCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-orange-500/20 pt-2">
                  <span>Annual:</span>
                  <span className="font-semibold text-foreground">${roi.annualOpportunityCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border-2 border-primary rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Total Annual Cost</h3>
              <p className="text-4xl font-black text-primary mb-4">
                ${roi.totalAnnualCost.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                This is what a broken color system costs you every year. And this is a <span className="font-semibold text-foreground">conservative</span> estimate.
              </p>
              <button
                onClick={scrollToContact}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
              >
                Book a 15-min Color System Audit
              </button>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span> This calculator uses industry averages. Your actual costs may be higher when factoring in developer time fighting color tokens, failed accessibility audits, and lost contracts.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground mb-4" style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic' }}>
            See those numbers? That's why my clients typically see 5-10x ROI in the first year.
          </p>
          <p className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
            The <span className="highlighter">Intent-Driven Color Model™</span> doesn't just fix symptoms. It eliminates the root cause.
          </p>
        </div>
      </div>
    </section>
  )
}
