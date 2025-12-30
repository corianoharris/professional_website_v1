/**
 * Color Design System Tokens
 * 
 * Following the React Color Design System architecture:
 * 1. Base colors - Raw palette (reds, blues, greens, grays)
 * 2. Semantic colors - Purpose-driven tokens (action.primary, status.success, text.heading)
 * 3. Component colors - Component-specific tokens (button.primary.background, card.border)
 * 4. Theme colors - Theme variations (light, dark, high-contrast)
 * 
 * This file provides TypeScript type safety for the color system.
 * Colors are defined as CSS variables in globals.css and referenced here for type safety.
 */

/**
 * Base color palette - Raw colors used throughout the system
 * These map to CSS variables defined in globals.css
 */
export const baseColors = {
  // Brand colors - Base palette
  purple: {
    500: '#7c3aed',      // Primary brand purple
    600: '#6d28d9',      // Darker purple for hover states
    400: '#a78bfa',      // Lighter purple for dark mode
  },
  cyan: {
    500: '#06b6d4',      // Trust & Calm
  },
  teal: {
    500: '#14b8a6',      // Growth & Balance
  },
  blue: {
    700: '#1e40af',      // Focus & Precision
    500: '#3b82f6',      // Standard blue
  },
  orange: {
    500: '#f97316',      // Energy & Action
  },
} as const

/**
 * Semantic color tokens - Purpose-driven, not appearance-driven
 * These describe WHAT the color is used for, not WHAT color it is
 */
export const semanticColors = {
  // Action colors - For interactive elements
  action: {
    primary: 'var(--color-action-primary)',        // Main action color (purple)
    secondary: 'var(--color-action-secondary)',    // Secondary action (teal)
    hover: 'var(--color-action-hover)',            // Hover state
  },
  // Text colors - Organized by hierarchy
  text: {
    heading: 'var(--color-text-heading)',         // Headings - high contrast
    body: 'var(--color-text-body)',                // Body text - medium contrast
    muted: 'var(--color-text-muted)',              // Muted text - low contrast
  },
  // Background colors - For surfaces
  background: {
    primary: 'var(--background)',                 // Main background
    secondary: 'var(--card)',                      // Secondary surfaces
    accent: 'var(--accent)',                       // Accent backgrounds
  },
  // Status colors - For feedback
  status: {
    success: 'var(--color-status-success)',        // Success states
    error: 'var(--destructive)',                   // Error states
    warning: 'var(--color-status-warning)',       // Warning states
  },
  // Border colors
  border: {
    default: 'var(--border)',                      // Default borders
    accent: 'var(--color-border-accent)',          // Accent borders
  },
} as const

/**
 * Component-specific color tokens
 * These inherit from semantic colors but add component context
 */
export const componentColors = {
  button: {
    primary: {
      background: 'var(--color-action-primary)',
      foreground: 'var(--primary-foreground)',
      hover: 'var(--color-action-hover)',
    },
    secondary: {
      background: 'var(--color-action-secondary)',
      foreground: 'var(--secondary-foreground)',
    },
  },
  card: {
    background: 'var(--card)',
    foreground: 'var(--card-foreground)',
    border: 'var(--border)',
  },
  link: {
    default: 'var(--color-action-primary)',
    hover: 'var(--color-action-hover)',
  },
} as const

/**
 * Theme color tokens
 * These override semantic colors for different visual experiences
 */
export const themeColors = {
  light: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
  },
  dark: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
  },
  highContrast: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
  },
} as const

/**
 * Type-safe color path helper
 * This ensures you can only access valid color paths
 */
export type ColorPath = 
  | 'action.primary'
  | 'action.secondary'
  | 'action.hover'
  | 'text.heading'
  | 'text.body'
  | 'text.muted'
  | 'background.primary'
  | 'background.secondary'
  | 'status.success'
  | 'status.error'
  | 'border.default'

/**
 * Helper function to get color values
 * Use this in components for type-safe color access
 */
export function getColor(path: ColorPath): string {
  const [category, token] = path.split('.') as [keyof typeof semanticColors, string]
  return semanticColors[category][token as keyof typeof semanticColors[typeof category]] as string
}

/**
 * Brand color utilities
 * These are the specific brand colors used in gradients and accents
 */
export const brandColors = {
  gradient: {
    start: 'var(--color-brand-gradient-start)',    // Blue (#1e40af)
    middle: 'var(--color-brand-gradient-middle)',  // Purple (#7c3aed)
    end: 'var(--color-brand-gradient-end)',        // Teal (#14b8a6)
  },
  accent: {
    purple: 'var(--color-brand-purple)',           // Primary purple
    cyan: 'var(--color-brand-cyan)',               // Cyan accent
    teal: 'var(--color-brand-teal)',               // Teal accent
    blue: 'var(--color-brand-blue)',               // Blue accent
    orange: 'var(--color-brand-orange)',           // Orange accent
  },
} as const

