# Accessibility & Keyboard Audit

**Date:** February 2026  
**Scope:** Full site (homepage, blog, components)

---

## Executive Summary

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| **Skip link / Landmarks** | ⚠️ Partial | Blog pages missing `main` + `id="main-content"` |
| **Keyboard navigation** | ⚠️ Partial | Explore dropdown, some buttons lack Enter/Space |
| **ARIA / Semantics** | ✅ Good | Most interactive elements have labels |
| **Focus management** | ✅ Good | Modals trap focus, Escape closes |
| **Form accessibility** | ✅ Good | Labels, aria-invalid, error focus |

---

## 1. Skip Link & Landmarks

### ✅ Working
- **Skip to main content** – Present in layout, visible on focus
- **Homepage** – `<main id="main-content">` on Color Intent MAI page

### ❌ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Blog index has no main-content** | `app/blog/page.tsx` | Wrap content in `<main id="main-content">` |
| **Blog post has no main-content** | `app/blog/[slug]/page.tsx` | Add `<main id="main-content">` around article |
| **Skip link breaks on blog** | Blog routes | Skip link targets #main-content which doesn't exist on /blog |

---

## 2. Keyboard Navigation

### ✅ Working
- **AI Chat** – Escape closes, focus trap, Enter to send
- **Accessibility menu** – Escape closes, focus trap, focus returns to button
- **Homepage audio** – Space/Enter toggles play
- **Desktop nav** (header.tsx) – Enter/Space on logo
- **Mobile nav** – Full keyboard support
- **Contact form** – Focus moves to first error on validation
- **Pagination** – Links are keyboard-focusable (Tab + Enter)

### ⚠️ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Explore dropdown** – No arrow-key navigation | `color-intent-mai-page.tsx` | Add ArrowDown/ArrowUp to move between items, Enter to select |
| **Explore dropdown** – Closes on blur (150ms)** | `onBlur` with setTimeout | Can cause focus loss before Tab reaches items. Consider `onBlur` only when focus leaves entire dropdown |
| **Nav/Explore buttons** – No explicit Enter/Space handler | `color-intent-mai-page.tsx` | Native buttons work, but add `onKeyDown` for Enter/Space if using div/span |
| **Shareable quote** – Copy/Share buttons | `shareable-quote.tsx` | Add `aria-label` to Copy and Share buttons |
| **Site audit quiz** – Option buttons | `site-audit-score-mai.tsx` | Buttons work; add `aria-pressed` for selected state |
| **Theme toggle** – No aria-label on homepage | `color-intent-mai-page.tsx` | Has `aria-label` ✓ |
| **Pagination buttons** – Wrapped in Link | `app/blog/page.tsx` | Links are keyboard-accessible ✓ |

---

## 3. ARIA & Semantics

### ✅ Working
- **Nav** – `aria-label="Main navigation"`
- **Explore** – `aria-expanded={exploreOpen}`
- **Chat** – `aria-label="Ask a question"`
- **Theme** – `aria-label` for light/dark
- **Mobile menu** – `aria-label="Toggle menu"`, `aria-expanded`
- **Accessibility controls** – `aria-label`, `aria-expanded`, `aria-haspopup`, `aria-pressed`
- **AI Chat** – `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`
- **Contact form** – `aria-invalid` on fields with errors
- **Social links** – `aria-label` (LinkedIn, GitHub)
- **Pagination** – `aria-label="Article pagination"`

### ⚠️ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Explore dropdown** – No `role="menu"` or `aria-label` | `color-intent-mai-page.tsx` | Add `role="menu"` and `aria-label="Explore sections"` to dropdown |
| **Explore dropdown items** – No `role="menuitem"` | `color-intent-mai-page.tsx` | Add `role="menuitem"` to each item |
| **Shareable quote** – Copy/Share buttons | `shareable-quote.tsx` | Add `aria-label="Copy quote"` and `aria-label="Share quote"` |
| **Site audit** – Quiz options | `site-audit-score-mai.tsx` | Add `aria-pressed={answers[q.id] === opt.value}` to option buttons |
| **Article TLDR** – Expandable | `article-tldr.tsx` | Has `aria-expanded`, `aria-label` ✓ |
| **Blog article cards** – No `aria-label` on links | `app/blog/page.tsx`, `blog-mai.tsx` | Add `aria-label={`Read article: ${post.title}`}` |

---

## 4. Focus Management

### ✅ Working
- **Modals** – Focus trap (AI Chat, Accessibility menu)
- **Escape** – Closes modals and returns focus to trigger
- **Contact form** – Focus moves to first error field on validation
- **Focus indicators** – `focus:ring-2`, `focus:ring-primary` on most buttons

### ⚠️ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Explore dropdown** – No focus trap | `color-intent-mai-page.tsx` | When open, Tab should cycle through items or close on Tab out |
| **Explore dropdown** – Focus not moved to first item** | When open | Consider `firstItem?.focus()` when dropdown opens |

---

## 5. Forms & Inputs

### ✅ Working
- **Contact form** – Labels, `aria-invalid`, error focus
- **Site audit** – Email input has `required`
- **Email input** – `type="email"`, `placeholder`

### ⚠️ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Contact form** – Checkbox group | `contact-mai.tsx` | Ensure checkboxes have `aria-describedby` or fieldset legend for "Services" |
| **Site audit email** – No `id` on input | `site-audit-score-mai.tsx` | Add `id` and `htmlFor` on label for accessibility |

---

## 6. Images & Media

### ✅ Working
- **Favicon** – `alt=""` (decorative), `aria-hidden`
- **Decorative icons** – `aria-hidden="true"`
- **Article images** – `alt={post.title}`

### ⚠️ Issues

| Issue | Location | Fix |
|-------|----------|-----|
| **Article featured image** | `app/blog/[slug]/page.tsx` | Verify `alt` is descriptive (currently `alt={post.title}` ✓) |

---

## 7. Color & Contrast

### ✅ Working
- **High contrast mode** – WCAG AAA compliant
- **Reduced motion** – `prefers-reduced-motion` respected
- **Intent colors** – Documented in INTENT_DRIVEN_COLOR_BREAKDOWN.md

---

## 8. Priority Fixes

### High (fix first)
1. Add `<main id="main-content">` to blog index and blog post pages
2. Add `aria-label` to ShareableQuote Copy and Share buttons
3. Add `aria-label` to blog article links

### Medium
4. Add `role="menu"` and `role="menuitem"` to Explore dropdown
5. Add `aria-pressed` to site audit option buttons
6. Add arrow-key navigation to Explore dropdown

### Low
7. Add `id` to site audit email input and associate label
8. Review focus behavior when Explore dropdown opens

---

## 9. Fixes Applied (Feb 2026)

| Fix | Status |
|-----|--------|
| Add `<main id="main-content">` to blog index | ✅ Done |
| Add `<main id="main-content">` to blog post | ✅ Done |
| Add `aria-label` to ShareableQuote Copy/Share buttons | ✅ Done |
| Add `aria-label` to blog article links | ✅ Done |
| Add `role="menu"` and `role="menuitem"` to Explore dropdown | ✅ Done |
| Add `aria-haspopup`, `aria-controls`, `id="explore-menu"` | ✅ Done |
| Add `aria-pressed` to site audit option buttons | ✅ Done |
| Add `id` + `htmlFor` + sr-only label to site audit email | ✅ Done |
| Arrow-key navigation in Explore dropdown | ✅ Done |
| Focus trap when Explore opens (focus first item) | ✅ Done |
| Fix onBlur: use wrapper + relatedTarget check | ✅ Done |

---

*Generated from audit of corianoharris.com. Color Intent Technologist.*
