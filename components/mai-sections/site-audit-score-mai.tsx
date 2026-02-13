"use client"

import { useState } from "react"
import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

const QUESTIONS = [
  {
    id: "source-of-truth",
    question: "Do you have a single source of truth for colors?",
    options: [
      { label: "No: colors live in Figma, code, and spreadsheets", value: 0 },
      { label: "Partially: we have tokens but they're inconsistent", value: 1 },
      { label: "Design and code share one system", value: 2 },
    ],
  },
  {
    id: "accessibility",
    question: "Have you passed WCAG accessibility audits for color?",
    options: [
      { label: "No: we've failed or never tested", value: 0 },
      { label: "We've tested but have known issues", value: 1 },
      { label: "We pass and maintain compliance", value: 2 },
    ],
  },
  {
    id: "alignment",
    question: "Do design and engineering agree on color usage?",
    options: [
      { label: "No: we fight about every color choice", value: 0 },
      { label: "Sometimes: it depends on the team", value: 1 },
      { label: "We're aligned on intent and tokens", value: 2 },
    ],
  },
  {
    id: "support-cost",
    question: "Color-related support tickets or rework?",
    options: [
      { label: "Frequent: it's a real cost", value: 0 },
      { label: "Occasional: we patch as we go", value: 1 },
      { label: "Rare or none: system handles it", value: 2 },
    ],
  },
  {
    id: "intent",
    question: "Do your colors communicate intent (trust, urgency, success)?",
    options: [
      { label: "No: we pick colors by look, not purpose", value: 0 },
      { label: "Somewhat: we have semantic tokens", value: 1 },
      { label: "Intent drives every color choice", value: 2 },
    ],
  },
] as const

const SCORE_LABELS: Record<number, { label: string; color: string; message: string }> = {
  0: {
    label: "Critical",
    color: "text-red-600 dark:text-red-400",
    message: "Color debt is costing you. The 15-min audit will show you exactly where.",
  },
  1: {
    label: "Critical",
    color: "text-red-600 dark:text-red-400",
    message: "Color debt is costing you. The 15-min audit will show you exactly where.",
  },
  2: {
    label: "At Risk",
    color: "text-[#f97316]",
    message: "You're bleeding. A system audit could save you six figures.",
  },
  3: {
    label: "At Risk",
    color: "text-[#f97316]",
    message: "You're bleeding. A system audit could save you six figures.",
  },
  4: {
    label: "Fragile",
    color: "text-amber-600 dark:text-amber-400",
    message: "It works until it doesn't. One rebrand away from chaos.",
  },
  5: {
    label: "Fragile",
    color: "text-amber-600 dark:text-amber-400",
    message: "It works until it doesn't. One rebrand away from chaos.",
  },
  6: {
    label: "Improving",
    color: "text-[#14b8a6]",
    message: "You're on the right track. The audit can show you the gaps.",
  },
  7: {
    label: "Improving",
    color: "text-[#14b8a6]",
    message: "You're on the right track. The audit can show you the gaps.",
  },
  8: {
    label: "Strong",
    color: "text-[#14b8a6]",
    message: "Solid foundation. The audit can help you scale without breaking.",
  },
  9: {
    label: "Strong",
    color: "text-[#14b8a6]",
    message: "Solid foundation. The audit can help you scale without breaking.",
  },
  10: {
    label: "Exceptional",
    color: "text-[#06b6d4]",
    message: "You get it. The audit can validate and refine.",
  },
}

function getScoreLabel(score: number) {
  return SCORE_LABELS[Math.min(score, 10)] ?? SCORE_LABELS[0]
}

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
}

export function SiteAuditScoreMai() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const maxScore = QUESTIONS.length * 2
  const displayScore = Math.round((totalScore / maxScore) * 10)
  const allAnswered = Object.keys(answers).length === QUESTIONS.length
  const { label, color, message } = getScoreLabel(displayScore)

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <MaiScrollSection
      id="site-audit"
      title="What's your color system score?"
      subtitle="5 questions. 2 minutes. A number that tells the truth. 0 = critical, 10 = exceptional."
      variant="muted"
    >
      <div className="max-w-2xl mx-auto">
        {!submitted ? (
          <>
            <div className="space-y-8">
              {QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <p className="font-semibold mb-4">{q.question}</p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleAnswer(q.id, opt.value)}
                        aria-pressed={answers[q.id] === opt.value}
                        className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                          answers[q.id] === opt.value
                            ? "border-[#06b6d4] bg-[#06b6d4]/10 dark:bg-[#06b6d4]/20 text-foreground font-medium"
                            : "border-border hover:border-[#06b6d4]/50 hover:bg-muted/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white disabled:opacity-50"
              >
                Get my score
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {allAnswered && (
                <p className="text-sm text-muted-foreground self-center">
                  {totalScore}/{maxScore} points
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border border-[#14b8a6]/40 bg-[#14b8a6]/5 dark:bg-[#14b8a6]/10 p-8 text-center">
              <p className="text-6xl md:text-7xl font-bold text-[#14b8a6] mb-2">
                {displayScore}
                <span className="text-2xl font-normal text-muted-foreground">/10</span>
              </p>
              <p className={`text-lg font-semibold uppercase tracking-wider ${color} mb-4`}>
                {label}
              </p>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>

              {/* Permission ladder: email for PDF before main CTA */}
              {!emailSubmitted ? (
                <div className="mb-6 p-4 rounded-lg border border-[#06b6d4]/30 bg-[#06b6d4]/5 dark:bg-[#06b6d4]/10">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Get your score + 3 next steps as a PDF
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (email.trim()) setEmailSubmitted(true)
                    }}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <label htmlFor="site-audit-email" className="sr-only">
                      Email address for PDF
                    </label>
                    <Input
                      id="site-audit-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" variant="outline" className="border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10">
                      Send PDF
                    </Button>
                  </form>
                </div>
              ) : (
                <p className="text-sm text-[#14b8a6] font-medium mb-6">Check your inbox. We&apos;ve sent it.</p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={scrollToContact}
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white"
                >
                  Book the 15-min Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={handleReset} className="border-border">
                  Retake quiz
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MaiScrollSection>
  )
}
