"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { Mail, Send, Twitter, Linkedin, Github, AlertCircle, Quote } from "lucide-react"
import { useState, useMemo } from "react"
import { Filter } from "bad-words"
import DOMPurify from "dompurify"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    services: [] as string[],
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [showBadWordsModal, setShowBadWordsModal] = useState(false)

  // Initialize bad words filter
  const filter = useMemo(() => {
    if (typeof window !== "undefined") {
      return new Filter()
    }
    return null
  }, [])

  const services = [
    "Color Strategy",
    "Product Design",
    "Technology Integration",
    "UX Consultation",
    "Brand Identity",
    "Design Systems",
    "Speaking",
    "Workshop",
  ]

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  // Character limits
  const limits = {
    name: { min: 2, max: 50 },
    email: { min: 5, max: 100 },
    message: { min: 10, max: 1000 },
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }
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
    } else if (formData.email.trim().length < limits.email.min) {
      newErrors.email = `Email must be at least ${limits.email.min} characters`
      isValid = false
    } else if (formData.email.trim().length > limits.email.max) {
      newErrors.email = `Email must be no more than ${limits.email.max} characters`
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
    } else if (formData.message.trim().length > limits.message.max) {
      newErrors.message = `Message must be no more than ${limits.message.max} characters`
      isValid = false
    }

    setErrors(newErrors)
    
    // Scroll to first error if validation fails
    if (!isValid) {
      setTimeout(() => {
        const firstErrorField = document.querySelector('[id="name"], [id="email"], [id="message"]')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
          firstErrorField.focus()
        }
      }, 100)
    }
    
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Sanitize all inputs with DOMPurify to prevent XSS attacks
    const sanitizedName = DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] })
    const sanitizedEmail = DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] })
    const sanitizedMessage = DOMPurify.sanitize(formData.message, { ALLOWED_TAGS: [] })

    // Check for bad words using the bad-words library
    if (filter) {
      if (filter.isProfane(sanitizedName) || filter.isProfane(sanitizedEmail) || filter.isProfane(sanitizedMessage)) {
        setShowBadWordsModal(true)
        return
      }
    }

    const subject = encodeURIComponent(`Inquiry about ${formData.services.join(", ") || "your services"}`)
    const body = encodeURIComponent(
      `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nServices Interested In: ${formData.services.join(", ")}\n\nMessage:\n${sanitizedMessage}`,
    )
    window.location.href = `mailto:me@corianoharris.com?subject=${subject}&body=${body}`
    
    // Clear form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        message: "",
        services: [],
      })
      setErrors({
        name: "",
        email: "",
        message: "",
      })
    }, 100)
  }

  const handleFieldChange = (field: string, value: string) => {
    // Enforce max length limits
    const limits = {
      name: 50,
      email: 100,
      message: 1000,
    }
    
    const maxLength = limits[field as keyof typeof limits]
    const truncatedValue = maxLength ? value.slice(0, maxLength) : value
    
    // Sanitize input as user types to prevent XSS
    const sanitizedValue = typeof window !== "undefined" 
      ? DOMPurify.sanitize(truncatedValue, { ALLOWED_TAGS: [] })
      : truncatedValue
    setFormData({ ...formData, [field]: sanitizedValue })
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", hidden: true },
    { icon: Linkedin, href: "https://www.linkedin.com/in/corianoharris/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:me@corianoharris.com", label: "Email" },
    { icon: Github, href: "https://github.com/corianoharris", label: "GitHub" },
  ]

  return (
    <>
      <AlertDialog open={showBadWordsModal} onOpenChange={setShowBadWordsModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Inappropriate Content Detected
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Your message contains inappropriate language or content that violates my site. 
              Please revise your message to remove any offensive content before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowBadWordsModal(false)}>
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <section id="contact" className="px-4 md:px-8 lg:px-16 py-12 md:py-16 relative overflow-hidden md:overflow-visible">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
      >
        <defs>
          <linearGradient id="contactGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#contactGradientTop)" stroke="none" />
      </svg>

      <div className="max-w-5xl mx-auto relative z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4">CONNECT</span>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Let's see solutions together:
        </p>
        
        <div className="mb-12 overflow-hidden md:overflow-visible">
          <div className="overflow-hidden md:overflow-visible">
            <div className="pl-4 md:pl-8 py-8 md:py-12 relative md:-ml-32 md:pl-32">
              {/* Opening Quote Icon - Very Large - Hidden on mobile */}
              <div className="hidden md:block absolute -top-16 -left-32 z-0">
                <Quote 
                  className="w-64 md:h-64 text-foreground/30 dark:text-foreground/40 rotate-180" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
              <p 
                className="text-xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed text-foreground relative z-10 pl-8 md:pl-32"
                style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontStyle: 'italic', fontWeight: 600 }}
              >
                Starting with <span className="highlighter">WHY</span>. Building <span className="highlighter">remarkable</span> through <span className="highlighter">vulnerability</span> and <span className="highlighter">heart</span>. Let's connect.
              </p>
              {/* Closing Quote Icon - Very Large - Hidden on mobile */}
              <div className="hidden md:block absolute -bottom-16 -right-32 z-0">
                <Quote 
                  className="w-64 md:h-64 text-foreground/30 dark:text-foreground/40" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Magazine-style layout: Form on left, sidebar on right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 overflow-hidden md:overflow-visible">
          {/* Main form column - wider */}
          <div className="md:col-span-8 overflow-hidden md:overflow-visible">
            <Card className="p-4 md:p-8 lg:p-12 bg-muted/30 border-2 overflow-hidden md:overflow-visible">
              {/* Editorial header */}
              <div className="mb-12 pb-8 border-b-2 border-foreground/20">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">INQUIRY</span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight text-foreground">
                  Let's Start the Conversation
                </h3>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-12">
                {/* Name and Email - stacked */}
                <div className="flex flex-col gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="name" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                        Your Name
                      </label>
                      <span className={`text-xs ${
                        formData.name.length < limits.name.min || formData.name.length > limits.name.max
                          ? 'text-orange-500' 
                          : 'text-muted-foreground'
                      }`}>
                        {formData.name.length} / {limits.name.min} characters minimum
                      </span>
                    </div>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      aria-describedby={errors.name ? "name-error" : "name-hint"}
                      aria-invalid={!!errors.name}
                      aria-required="true"
                      className={`text-base md:text-xl lg:text-2xl py-4 md:py-5 px-4 md:px-5 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors bg-background w-full max-w-full ${
                        errors.name ? "border-amber-500 focus:border-amber-500" : ""
                      }`}
                      style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}
                    />
                    <span id="name-hint" className="sr-only">
                      Name must be between {limits.name.min} and {limits.name.max} characters
                    </span>
                    {errors.name && (
                      <div id="name-error" className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r" role="alert" aria-live="polite">
                        <p className="text-base md:text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                          <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          {errors.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="email" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                        Email Address
                      </label>
                      <span className={`text-xs ${
                        formData.email.length < limits.email.min || formData.email.length > limits.email.max
                          ? 'text-orange-500' 
                          : 'text-muted-foreground'
                      }`}>
                        {formData.email.length} / {limits.email.min} characters minimum
                      </span>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      aria-describedby={errors.email ? "email-error" : "email-hint"}
                      aria-invalid={!!errors.email}
                      aria-required="true"
                      className={`text-base md:text-xl lg:text-2xl py-4 md:py-5 px-4 md:px-5 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors bg-background w-full max-w-full ${
                        errors.email ? "border-amber-500 focus:border-amber-500" : ""
                      }`}
                      style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}
                    />
                    <span id="email-hint" className="sr-only">
                      Email must be between {limits.email.min} and {limits.email.max} characters and be a valid email address
                    </span>
                    {errors.email && (
                      <div id="email-error" className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r" role="alert" aria-live="polite">
                        <p className="text-base md:text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2 font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                          <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Services - full width */}
                <div className="space-y-6">
                  <label className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                    Services You're Interested In
                  </label>
                  <div className="grid md:grid-cols-2 gap-4 p-4 md:p-8 border-2 border-foreground/20 rounded-lg bg-background">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-3 md:space-x-4">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                          className="w-5 h-5 md:w-6 md:h-6 border-2 border-foreground/40 dark:border-foreground/60 dark:bg-background flex-shrink-0"
                        />
                        <label htmlFor={service} className="text-base md:text-lg lg:text-xl cursor-pointer font-medium text-foreground break-words">
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message - full width with drop cap style */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                      Your Message
                    </label>
                    <span className={`text-xs ${
                      formData.message.length < limits.message.min || formData.message.length > limits.message.max
                        ? 'text-orange-500' 
                        : 'text-muted-foreground'
                    }`}>
                      {formData.message.length} / {limits.message.min} characters minimum
                    </span>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, your vision, and what transformation you're seeking..."
                      rows={10}
                      value={formData.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      aria-describedby={errors.message ? "message-error" : "message-hint"}
                      aria-invalid={!!errors.message}
                      aria-required="true"
                      className={`text-base md:text-xl lg:text-2xl py-4 md:py-6 px-4 md:px-6 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors leading-relaxed resize-none bg-background w-full max-w-full ${
                        errors.message ? "border-amber-500 focus:border-amber-500" : ""
                      }`}
                      style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}
                    />
                    <span id="message-hint" className="sr-only">
                      Message must be between {limits.message.min} and {limits.message.max} characters
                    </span>
                  </div>
                  {errors.message && (
                    <div id="message-error" className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r" role="alert" aria-live="polite">
                      <p className="text-base md:text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        {errors.message}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit button - centered on mobile, right aligned on desktop */}
                <div className="pt-6 border-t-2 border-foreground/20 flex justify-center md:justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-xl transition-all duration-300 text-base md:text-xl lg:text-2xl px-8 md:px-10 py-6 md:py-7 font-black uppercase tracking-wider w-full md:w-auto"
                  >
                    <Send className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar column - narrower, magazine style */}
          <div className="md:col-span-4 space-y-8 overflow-hidden md:overflow-visible">
            {/* Transparency notice - pull quote style */}
            <div className="p-4 md:p-8 bg-primary/10 border-l-4 border-primary/50 rounded-r-lg">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                  For your convenience: This form will automatically populate your email information, so you don't have to retype it in your email provider. It will open your default email client, and your information is never stored on this website — it's securely sent directly through your email provider.
                  <br /><br />
                  If you'd prefer, you can also contact me directly via email: <a href="mailto:me@corianoharris.com" className="text-primary hover:underline font-semibold">me@corianoharris.com</a>.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="pl-4 md:pl-8 py-6 md:py-8 lg:py-12 relative overflow-hidden md:overflow-visible">
              {/* Opening Quote Icon - Hidden on mobile */}
              <div className="hidden md:block absolute top-2 left-0 z-0">
                <Quote 
                  className="w-20 md:h-20 text-foreground/30 dark:text-foreground/40 rotate-180" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
              <p 
                className="text-xl md:text-3xl lg:text-4xl leading-relaxed text-foreground relative z-10 pl-4 md:pl-12"
                style={{ fontFamily: 'var(--font-baloo2), sans-serif', fontStyle: 'italic', fontWeight: 600 }}
              >
                I price the <span className="highlighter">transformation</span>. Selective for <span className="highlighter">high-impact</span>.
              </p>
              {/* Closing Quote Icon - Hidden on mobile */}
              <div className="hidden md:block absolute bottom-2 right-0 z-0">
                <Quote 
                  className="w-20 md:h-20 text-foreground/30 dark:text-foreground/40" 
                  aria-hidden="true"
                  strokeWidth={0}
                  fill="currentColor"
                />
              </div>
            </div>

            {/* Contact info */}
            <div className="p-4 md:p-8 bg-muted/30 rounded-lg">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-6">DIRECT CONTACT</span>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-foreground" />
                  <a href="mailto:me@corianoharris.com" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                    me@corianoharris.com
                  </a>
                </div>
                <div className="pt-6 border-t border-foreground/20">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">SOCIAL</span>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Connect with me</h4>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((social, index) => {
                        const IconComponent = social.icon
                        if (social.hidden) {
                          return null
                        }
                        return (
                          <a
                            key={index}
                            href={social.href}
                            aria-label={social.label}
                            className="w-12 h-12 rounded-full bg-background hover:bg-foreground hover:text-background hover:scale-110 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                          >
                            <IconComponent className="w-6 h-6" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="contactGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#contactGradientBottom)" stroke="none" />
      </svg>
    </section>
    </>
  )
}
