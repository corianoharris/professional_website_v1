# Color Design System Documentation

This document describes the color system implementation

## Architecture Overview

The color system follows a 4-layer architecture:

1. **Base Colors** - Raw palette (purple, cyan, teal, blue, orange)
2. **Semantic Colors** - Purpose-driven tokens (`action.primary`, `text.heading`, etc.)
3. **Component Colors** - Component-specific tokens (`button.primary.background`, etc.)
4. **Theme Colors** - Theme variations (light, dark, high-contrast)

## Implementation

### CSS Variables (globals.css)

All colors are defined as CSS variables in `app/globals.css`:

```css
/* Semantic Color Tokens */
--color-action-primary: #7c3aed;        /* Primary brand purple */
--color-action-secondary: #14b8a6;       /* Teal - secondary action */
--color-action-hover: #a78bfa;          /* Lighter purple for hover */

/* Brand Colors */
--color-brand-purple: #7c3aed;
--color-brand-cyan: #06b6d4;
--color-brand-teal: #14b8a6;
--color-brand-blue: #1e40af;
--color-brand-orange: #f97316;

/* Gradient Colors */
--color-brand-gradient-start: #1e40af;   /* Blue */
--color-brand-gradient-middle: #7c3aed;  /* Purple */
--color-brand-gradient-end: #14b8a6;     /* Teal */
```

### TypeScript Type Safety (lib/color-tokens.ts)

Type-safe color tokens are defined in `lib/color-tokens.ts`:

```typescript
export const semanticColors = {
  action: {
    primary: 'var(--color-action-primary)',
    secondary: 'var(--color-action-secondary)',
    hover: 'var(--color-action-hover)',
  },
  text: {
    heading: 'var(--color-text-heading)',
    body: 'var(--color-text-body)',
    muted: 'var(--color-text-muted)',
  },
  // ... more tokens
}
```

## Usage Guidelines

### ✅ DO: Use Semantic Tokens

```tsx
// ✅ Good - Uses semantic token
<button className="bg-[var(--color-brand-purple)]">
  Click me
</button>

// ✅ Good - Uses CSS variable
<button className="bg-primary">
  Click me
</button>
```

### ❌ DON'T: Use Hardcoded Colors

```tsx
// ❌ Bad - Hardcoded hex color
<button className="bg-[#7c3aed]">
  Click me
</button>
```

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

1. **Single Source of Truth** - Colors defined in one place
2. **Type Safety** - TypeScript ensures valid color paths
3. **Theme Consistency** - Colors adapt automatically to themes
4. **Maintainability** - Change colors in one place, updates everywhere
5. **Accessibility** - Built-in contrast and theme support

