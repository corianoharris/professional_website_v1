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
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="16.67%" stopColor="#4ECDC4" />
            <stop offset="33.33%" stopColor="#45B7D1" />
            <stop offset="50%" stopColor="#96CEB4" />
            <stop offset="66.67%" stopColor="#FFEEAD" />
            <stop offset="83.33%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#9B59B6" />
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

        <Card className="p-8 md:p-12 bg-muted/30 border-2">
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              For transparency: This form will open your default email client. Your information is never stored on this
              website and is sent directly through your email provider.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className={`hover:border-primary/50 focus:border-primary transition-colors ${
                    errors.name ? "border-destructive focus:border-destructive" : ""
                  }`}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className={`hover:border-primary/50 focus:border-primary transition-colors ${
                    errors.email ? "border-destructive focus:border-destructive" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Services you're interested in (select all that apply)</label>
              <div className="grid md:grid-cols-2 gap-3 p-4 border rounded-lg bg-background">
                {services.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <label htmlFor={service} className="text-sm cursor-pointer">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={6}
                value={formData.message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
                className={`hover:border-primary/50 focus:border-primary transition-colors ${
                  errors.message ? "border-destructive focus:border-destructive" : ""
                }`}
                required
              />
              {errors.message && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Send message
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a href="mailto:hello@yourname.com" className="hover:text-primary transition-colors">
                  hello@yourname.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
