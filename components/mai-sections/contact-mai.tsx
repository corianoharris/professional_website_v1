"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Mail, Linkedin } from "lucide-react"
import { Filter } from "bad-words"
import DOMPurify from "dompurify"
import { PALETTE_AUDIT_EVENT } from "@/components/palette-read-section"

const EMAIL = "me@corianoharris.com"

/** The free call comes first and starts checked: every "Book a call" button lands here. */
const topics = [
  { id: "call", name: "Free 15-min call", short: "Free 15-min call" },
  { id: "page", name: "Page check report", short: "Page check report" },
  { id: "mood", name: "Palette mood report", short: "Palette mood report" },
  { id: "clean", name: "The Color Naming Cleaner", short: "Naming Cleaner" },
  { id: "test", name: "Palette mood testing", short: "Mood testing" },
  { id: "system", name: "The Color Code System", short: "Color Code System" },
]

type Field = "name" | "email" | "message"
const LIMITS: Record<Field, number> = { name: 50, email: 100, message: 1000 }
const noErrors: Record<Field, string> = { name: "", email: "", message: "" }

export function ContactMai() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [chosen, setChosen] = useState<string[]>(["Free 15-min call"])
  const [errors, setErrors] = useState(noErrors)
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)

  // "Get the full audit" in the palette check prefills the message with its findings
  useEffect(() => {
    const onAudit = (e: Event) => {
      const message = (e as CustomEvent<string>).detail
      setForm((d) => ({ ...d, message }))
      setChosen((c) => (c.includes("Page check report") ? c : [...c, "Page check report"]))
      setErrors((err) => ({ ...err, message: "" }))
      const field = document.getElementById("contact-message")
      document.getElementById("contact")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      })
      field?.focus({ preventScroll: true })
    }
    window.addEventListener(PALETTE_AUDIT_EVENT, onAudit)
    return () => window.removeEventListener(PALETTE_AUDIT_EVENT, onAudit)
  }, [])

  const filter = useMemo(() => (typeof window !== "undefined" ? new Filter() : null), [])

  const toggleTopic = (name: string) =>
    setChosen((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]))

  const validate = () => {
    const next: Record<Field, string> = {
      name: form.name.trim().length < 2 ? "Enter your name, at least 2 characters." : "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? "" : "Enter an email like you@company.com.",
      message: form.message.trim().length < 10 ? "Tell me a little more, at least 10 characters." : "",
    }
    setErrors(next)
    const first = (Object.keys(next) as Field[]).find((k) => next[k])
    if (first) document.getElementById(`contact-${first}`)?.focus()
    return !first
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const clean = (s: string) => DOMPurify.sanitize(s, { ALLOWED_TAGS: [] })
    const name = clean(form.name)
    const email = clean(form.email)
    const message = clean(form.message)

    if (filter && (filter.isProfane(name) || filter.isProfane(email) || filter.isProfane(message))) {
      setShowLanguageDialog(true)
      return
    }

    const subject = encodeURIComponent(chosen.length ? chosen.join(", ") : "Your services")
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nInterested in: ${chosen.join(", ") || "Not sure yet"}\n\n${message}`,
    )
    sendGAEvent("event", "form_submit", { form: "contact", services: chosen.join(", ") || "none" })
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setForm({ name: "", email: "", message: "" })
      setChosen(["Free 15-min call"])
      setErrors(noErrors)
    }, 100)
  }

  const change = (field: Field, value: string) => {
    const capped = value.slice(0, LIMITS[field])
    setForm((prev) => ({ ...prev, [field]: capped }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    value: form[field],
    maxLength: LIMITS[field],
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  })

  const ErrorText = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p className="err" id={`contact-${field}-error`}>
        {errors[field]}
      </p>
    ) : null

  return (
    <>
      <AlertDialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please reword your message</AlertDialogTitle>
            <AlertDialogDescription>
              Some of the wording was flagged by the language filter. Edit it and send again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLanguageDialog(false)}>Edit message</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section id="contact" className="contact">
        <div className="wrap grid">
          <div>
            <span className="label">Contact</span>
            <h2>Talk to me.</h2>
            <p className="lede">Fifteen minutes. Free. You leave knowing the one thing to fix first.</p>
            <ol className="steps">
              <li>Your email app opens with this message. Nothing is saved here.</li>
              <li>I reply within two business days with a time for the call.</li>
              <li>On the call, I show you where your color is costing you.</li>
            </ol>
            <div className="reach">
              <a href={`mailto:${EMAIL}`} className="mono email-pill">
                <Mail className="h-4 w-4" aria-hidden />
                {EMAIL}
              </a>
              <a href="https://www.linkedin.com/in/corianoharris/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="formcard">
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" autoComplete="name" {...fieldProps("name")} onChange={(e) => change("name", e.target.value)} />
                <ErrorText field="name" />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Work email</label>
                <input type="email" autoComplete="email" {...fieldProps("email")} onChange={(e) => change("email", e.target.value)} />
                <ErrorText field="email" />
              </div>
              <fieldset className="topics">
                <legend>What do you want to talk about?</legend>
                <div className="opts">
                  {topics.map((t) => (
                    <label key={t.id}>
                      <input
                        type="checkbox"
                        id={`topic-${t.id}`}
                        checked={chosen.includes(t.name)}
                        onChange={() => toggleTopic(t.name)}
                      />
                      <span>{t.short}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="contact-message">What&apos;s going on with your colors?</label>
                <textarea
                  rows={5}
                  placeholder="The screen, the product, where users get stuck."
                  {...fieldProps("message")}
                  onChange={(e) => change("message", e.target.value)}
                />
                <ErrorText field="message" />
              </div>
              <div>
                <button type="submit" className="btn btn-hot">
                  Write the email →
                </button>
              </div>
              <p className="form-note">Opens your email app with this message filled in. Nothing is saved on this site.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
