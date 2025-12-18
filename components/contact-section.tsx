"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Send, Twitter, Linkedin, AlertCircle } from "lucide-react"
import { useState } from "react"

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
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
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
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const subject = encodeURIComponent(`Inquiry about ${formData.services.join(", ") || "your services"}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nServices Interested In: ${formData.services.join(", ")}\n\nMessage:\n${formData.message}`,
    )
    window.location.href = `mailto:hello@yourname.com?subject=${subject}&body=${body}`
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const socialLinks = [
    { icon: Send, href: "#", label: "Telegram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@yourname.com", label: "Email" },
  ]

  return (
    <div id="contact" className="px-8 md:px-16 py-12 md:py-16 relative">
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

      <div className="max-w-5xl mx-auto relative z-10 pt-4">
        <div className="mb-12 -mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2">CONNECT</span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-4">Dare Greatly Together</h2>
        </div>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground font-semibold mb-6">
              If you believe in starting with WHY—building remarkable products through vulnerability, heart, and human feeling—if you're ready to inspire tribes, dominate categories, and unlock millions in value—let's connect.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="border-l-4 border-foreground pl-6 py-4 bg-muted/30 rounded-r-lg">
              <p className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                I price the transformation. Selective for high-impact.
              </p>
            </div>
          </div>
        </div>

        {/* Magazine-style layout: Form on left, sidebar on right */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Main form column - wider */}
          <div className="md:col-span-8">
            <Card className="p-8 md:p-12 bg-muted/30 border-2">
              {/* Editorial header */}
              <div className="mb-12 pb-8 border-b-2 border-foreground/20">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">INQUIRY</span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight text-foreground">
                  Let's Start the Conversation
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Name and Email - stacked */}
                <div className="flex flex-col gap-8">
                  <div className="space-y-4">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className={`text-xl md:text-2xl py-5 px-5 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors font-serif bg-background ${
                        errors.name ? "border-destructive focus:border-destructive" : ""
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className={`text-xl md:text-2xl py-5 px-5 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors font-serif bg-background ${
                        errors.email ? "border-destructive focus:border-destructive" : ""
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Services - full width */}
                <div className="space-y-6">
                  <label className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                    Services You're Interested In
                  </label>
                  <div className="grid md:grid-cols-2 gap-4 p-8 border-2 border-foreground/20 rounded-lg bg-background">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-4">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                          className="w-6 h-6 border-2 border-foreground/40 dark:border-foreground/60 dark:bg-background"
                        />
                        <label htmlFor={service} className="text-lg md:text-xl cursor-pointer font-medium text-foreground">
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message - full width with drop cap style */}
                <div className="space-y-6">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-[0.2em] text-foreground block">
                    Your Message
                  </label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, your vision, and what transformation you're seeking..."
                      rows={10}
                      value={formData.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      className={`text-xl md:text-2xl py-6 px-6 border-2 border-foreground/30 hover:border-primary/50 focus:border-primary transition-colors font-serif leading-relaxed resize-none bg-background ${
                        errors.message ? "border-destructive focus:border-destructive" : ""
                      }`}
                      required
                    />
                  </div>
                  {errors.message && (
                    <p className="text-sm text-destructive flex items-center gap-1 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button - right aligned */}
                <div className="pt-6 border-t-2 border-foreground/20 flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-xl transition-all duration-300 text-xl md:text-2xl px-10 py-7 font-black uppercase tracking-wider"
                  >
                    <Send className="w-6 h-6 mr-3" />
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar column - narrower, magazine style */}
          <div className="md:col-span-4 space-y-8">
            {/* Transparency notice - pull quote style */}
            <div className="p-8 bg-primary/10 border-l-4 border-primary/50 rounded-r-lg">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  For transparency: This form will open your default email client. Your information is never stored on this
                  website and is sent directly through your email provider.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="p-8 bg-muted/30 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight italic mb-4">
                "I price the transformation. Selective for high-impact."
              </p>
            </div>

            {/* Contact info */}
            <div className="p-8 bg-muted/30 rounded-lg">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-6">DIRECT CONTACT</span>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-foreground" />
                  <a href="mailto:hello@yourname.com" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                    hello@yourname.com
                  </a>
                </div>
                <div className="pt-6 border-t border-foreground/20">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">SOCIAL</span>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
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
  )
}
