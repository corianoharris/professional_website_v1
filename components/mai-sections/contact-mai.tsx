"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { MaiScrollSection } from "@/components/mai-scroll-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Send, Mail, Linkedin, Github, AlertCircle } from "lucide-react"
import { Filter } from "bad-words"
import DOMPurify from "dompurify"

const services = [
  { name: "Color Intent Strategy", type: "Primary" },
  { name: "Color Blindness Audit", type: "Primary" },
  { name: "Intent-Based Design Systems", type: "Primary" },
  { name: "Product Design Validation", type: "Secondary" },
  { name: "Implementation Support", type: "Secondary" },
  { name: "Intent Alignment", type: "Secondary" },
  { name: "Brand → Intent Translation", type: "Secondary" },
]

export function ContactMai() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    services: [] as string[],
  })
  const [errors, setErrors] = useState({ name: "", email: "", message: "" })
  const [showBadWordsModal, setShowBadWordsModal] = useState(false)

  const filter = useMemo(() => (typeof window !== "undefined" ? new Filter() : null), [])

  const limits = { name: { min: 2, max: 50 }, email: { min: 5, max: 100 }, message: { min: 10, max: 1000 } }

  const handleServiceToggle = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(name)
        ? prev.services.filter((s) => s !== name)
        : [...prev.services, name],
    }))
  }

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (formData.name.trim().length < limits.name.min) {
      newErrors.name = `Name must be at least ${limits.name.min} characters`
      isValid = false
    } else if (formData.name.trim().length > limits.name.max) {
      newErrors.name = `Name must be no more than ${limits.name.max} characters`
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      isValid = false
    } else if (formData.message.trim().length < limits.message.min) {
      newErrors.message = `Message must be at least ${limits.message.min} characters`
      isValid = false
    }

    setErrors(newErrors)
    if (!isValid) {
      setTimeout(() => {
        const first = document.querySelector('[id="contact-name"], [id="contact-email"], [id="contact-message"]') as HTMLElement
        first?.scrollIntoView({ behavior: "smooth", block: "center" })
        first?.focus()
      }, 100)
    }
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const sanitizedName = DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] })
    const sanitizedEmail = DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] })
    const sanitizedMessage = DOMPurify.sanitize(formData.message, { ALLOWED_TAGS: [] })

    if (filter && (filter.isProfane(sanitizedName) || filter.isProfane(sanitizedEmail) || filter.isProfane(sanitizedMessage))) {
      setShowBadWordsModal(true)
      return
    }

    const subject = encodeURIComponent(`Inquiry about ${formData.services.join(", ") || "your services"}`)
    const body = encodeURIComponent(
      `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nServices: ${formData.services.join(", ")}\n\nMessage:\n${sanitizedMessage}`,
    )
    window.location.href = `mailto:me@corianoharris.com?subject=${subject}&body=${body}`

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "", services: [] })
      setErrors({ name: "", email: "", message: "" })
    }, 100)
  }

  const handleFieldChange = (field: string, value: string) => {
    const maxLen = { name: 50, email: 100, message: 1000 }[field as keyof typeof formData]
    const sanitized = typeof window !== "undefined" ? DOMPurify.sanitize(value.slice(0, maxLen), { ALLOWED_TAGS: [] }) : value.slice(0, maxLen)
    setFormData((prev) => ({ ...prev, [field]: sanitized }))
    if (errors[field as keyof typeof errors]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  return (
    <>
      <AlertDialog open={showBadWordsModal} onOpenChange={setShowBadWordsModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Inappropriate Content Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your message contains inappropriate language. Please revise before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowBadWordsModal(false)}>I Understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <MaiScrollSection
        id="contact"
        title="Get in touch"
        subtitle="You're here. You're ready. What happens next is up to you."
      >
        <div className="grid md:grid-cols-5 gap-12 max-w-4xl">
          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className={`h-12 border-2 ${errors.name ? "border-amber-500" : "border-border"}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={`h-12 border-2 ${errors.email ? "border-amber-500" : "border-border"}`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Services you're interested in</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <Checkbox
                        id={`svc-${s.name}`}
                        checked={formData.services.includes(s.name)}
                        onCheckedChange={() => handleServiceToggle(s.name)}
                        className="border-2"
                      />
                      <label htmlFor={`svc-${s.name}`} className="text-sm cursor-pointer">
                        {s.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your vision and what results you're looking for..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  className={`border-2 resize-y min-h-[120px] ${errors.message ? "border-amber-500" : "border-border"}`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full md:w-auto bg-[#06b6d4] hover:bg-[#0891b2] text-white">
                <Send className="w-4 h-4 mr-2" />
                Send message
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <p className="text-sm text-muted-foreground mb-4">
                This form opens your email client with your message. Your information is never stored on this site.
              </p>
              <a
                href="mailto:me@corianoharris.com"
                className="inline-flex items-center gap-2 text-[#06b6d4] font-medium hover:underline"
              >
                <Mail className="w-4 h-4" />
                me@corianoharris.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Connect</p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/corianoharris/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-[#06b6d4] hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/corianoharris"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-[#06b6d4] hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </MaiScrollSection>
    </>
  )
}
