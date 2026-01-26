# Intent-Based Color Design System Documentation

## Philosophy

> "Vulnerability is the birthplace of trust. Color is that brave first whisper—evoking calm, understanding, and belonging in 0.05 seconds."

This color system follows **psychology before pixels**. Colors are organized by emotional intent, not appearance. Each token represents a psychological purpose that drives user behavior and creates measurable results.

## Architecture Overview

The color system follows an intent-driven architecture:

1. **Intent Colors** - Psychology-driven tokens (`intent.trust`, `intent.calm`, `intent.belonging`, etc.)
2. **Base Colors** - Raw palette mapped to psychological intents (purple, cyan, teal, blue, orange)
3. **Component Colors** - Component-specific tokens that inherit from intents (`button.primary.background`, etc.)
4. **Theme Colors** - Theme variations (light, dark, high-contrast)

## Intent Tokens

Each intent token expresses **WHY** we use a color, not **WHAT** color it is:

### Trust (`intent.trust`)
- **Purpose**: Builds confidence and reduces anxiety
- **Color**: Cyan (#06b6d4)
- **Use Cases**: Primary CTAs, trust signals, confidence-building elements
- **Psychology**: Cyan evokes reliability, clarity, and reduces anxiety

### Calm (`intent.calm`)
- **Purpose**: Reduces cognitive load and creates peace
- **Color**: Cyan (#06b6d4)
- **Use Cases**: Backgrounds, loading states, error recovery
- **Psychology**: Cyan's calming properties help users feel understood

### Belonging (`intent.belonging`)
- **Purpose**: Creates connection and authenticity
- **Color**: Purple (#7c3aed)
- **Use Cases**: Primary actions, links, community elements
- **Psychology**: Purple invites users to feel seen and part of something meaningful

### Vulnerability (`intent.vulnerability`)
- **Purpose**: The birthplace of trust—shows courage and invites openness
- **Color**: Purple (#7c3aed)
- **Use Cases**: Authentic messaging, personal stories, brave moments
- **Psychology**: Purple shows courage and invites openness

### Attention (`intent.attention`)
- **Purpose**: Directs focus and creates hierarchy
- **Color**: Blue (#1e40af)
- **Use Cases**: Important information, focus states, hierarchy
- **Psychology**: Blue guides the eye and signals importance

### Growth (`intent.growth`)
- **Purpose**: Signals progress and forward movement
- **Color**: Teal (#14b8a6)
- **Use Cases**: Success states, progress indicators, positive feedback
- **Psychology**: Teal represents balance and advancement

### Energy (`intent.energy`)
- **Purpose**: Drives action and creates urgency
- **Color**: Orange (#f97316)
- **Use Cases**: Urgent actions, warnings, time-sensitive elements
- **Psychology**: Orange compels immediate response

### Understanding (`intent.understanding`)
- **Purpose**: Facilitates clarity and comprehension
- **Color**: Cyan/Blue (#06b6d4)
- **Use Cases**: Help text, explanations, learning content
- **Psychology**: Cyan/blue helps users process information

## Implementation

### CSS Variables (globals.css)

All intent colors are defined as CSS variables in `app/globals.css`:

```css
/* Intent-Based Color Tokens */
--intent-trust: #06b6d4;                /* Builds confidence */
--intent-trust-hover: #0891b2;         /* Deeper trust */
--intent-trust-subtle: #a5f3fc;        /* Gentle trust */

--intent-belonging: #7c3aed;           /* Creates connection */
--intent-belonging-hover: #6d28d9;     /* Stronger connection */
--intent-belonging-subtle: #e9d5ff;   /* Gentle invitation */

--intent-growth: #14b8a6;              /* Signals progress */
--intent-growth-hover: #0d9488;        /* Accelerated progress */
--intent-growth-subtle: #ccfbf1;      /* Gentle advancement */

/* ... more intent tokens */
```

### TypeScript Type Safety (lib/color-tokens.ts)

Type-safe intent tokens are defined in `lib/color-tokens.ts`:

```typescript
export const intentColors = {
  trust: {
    base: 'var(--intent-trust)',
    hover: 'var(--intent-trust-hover)',
    subtle: 'var(--intent-trust-subtle)',
  },
  belonging: {
    base: 'var(--intent-belonging)',
    hover: 'var(--intent-belonging-hover)',
    subtle: 'var(--intent-belonging-subtle)',
  },
  // ... more intents
}

// Helper function for type-safe access
const trustColor = getIntentColor('trust.base')
const calmHover = getIntentColor('calm.hover')
```

## Usage Guidelines

### ✅ DO: Use Intent Tokens

```tsx
// ✅ Good - Uses intent token (expresses WHY)
<button className="bg-[var(--intent-belonging)]">
  Connect with me
</button>

// ✅ Good - Uses intent with TypeScript helper
import { getIntentColor } from '@/lib/color-tokens'

const Button = () => (
  <button style={{ backgroundColor: getIntentColor('belonging.base') }}>
    Join the community
  </button>
)

// ✅ Good - Expresses psychological intent
<div className="bg-[var(--intent-trust-subtle)]">
  Trust-building content
</div>
```

### ❌ DON'T: Use Hardcoded Colors or Appearance-Based Names

```tsx
// ❌ Bad - Hardcoded hex color (no intent)
<button className="bg-[#7c3aed]">
  Click me
</button>

// ❌ Bad - Appearance-based naming (doesn't express WHY)
<button className="bg-purple-500">
  Click me
</button>

// ❌ Bad - Generic semantic name (doesn't express psychological purpose)
<button className="bg-[var(--color-action-primary)]">
  Click me
</button>
```

### Intent Selection Guide

Choose intents based on the psychological outcome you want:

- **Want to build trust?** → Use `intent.trust`
- **Want to create calm?** → Use `intent.calm`
- **Want to invite connection?** → Use `intent.belonging`
- **Want to show courage?** → Use `intent.vulnerability`
- **Want to direct attention?** → Use `intent.attention`
- **Want to show progress?** → Use `intent.growth`
- **Want to drive action?** → Use `intent.energy`
- **Want to facilitate clarity?** → Use `intent.understanding`

## Accessibility

The color system includes accessibility features:

1. **WCAG AA Contrast Ratios** - All text meets 4.5:1 contrast ratio
2. **High Contrast Mode** - Full support via `.high-contrast` class
3. **Focus Indicators** - Visible focus states for keyboard navigation
4. **Colorblind-Friendly** - Icons and labels used alongside colors
5. **Dark Mode** - Full theme support with appropriate contrast

## Theme Support

The system supports multiple themes:

- **Light Mode** - Default theme
- **Dark Mode** - `.dark` class
- **High Contrast** - `.high-contrast` class (WCAG AAA compliant)

## Migration Notes

All hardcoded colors have been replaced with CSS variables:

- `#7c3aed` → `var(--color-brand-purple)`
- `#1e40af` → `var(--color-brand-gradient-start)`
- `#14b8a6` → `var(--color-brand-gradient-end)`
- `#a78bfa` → `var(--color-action-hover)`

## Benefits

1. **Psychology-Driven** - Colors express emotional intent, not appearance
2. **Measurable Results** - Intent-based colors drive specific user behaviors
3. **Single Source of Truth** - Colors defined in one place
4. **Type Safety** - TypeScript ensures valid intent paths
5. **Theme Consistency** - Colors adapt automatically to themes
6. **Maintainability** - Change colors in one place, updates everywhere
7. **Accessibility** - Built-in contrast and theme support
8. **Design Philosophy Alignment** - Colors embody "vulnerability is the birthplace of trust"

## Migration from Semantic Tokens

The system maintains backward compatibility with semantic tokens while encouraging migration to intent tokens:

```typescript
// Old (still works, but deprecated)
const color = getColor('action.primary')

// New (recommended - expresses intent)
const color = getIntentColor('belonging.base')
```

Semantic tokens automatically map to intent tokens:
- `action.primary` → `intent.belonging`
- `action.secondary` → `intent.growth`
- `status.success` → `intent.growth`
- `status.warning` → `intent.energy`

