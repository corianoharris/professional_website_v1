/**
 * Intent-Based Color Design System Tokens
 * 
 * Philosophy: "Vulnerability is the birthplace of trust. Color is that brave first whisper—
 * evoking calm, understanding, and belonging in 0.05 seconds."
 * 
 * This system follows psychology before pixels—colors are organized by emotional intent,
 * not appearance. Each token represents a psychological purpose that drives user behavior
 * and creates measurable results.
 * 
 * Architecture:
 * 1. Intent tokens - Psychology-driven tokens (intent.trust, intent.calm, intent.belonging)
 * 2. Base colors - Raw palette mapped to intents
 * 3. Component colors - Component-specific tokens that inherit from intents
 * 4. Theme colors - Theme variations (light, dark, high-contrast)
 * 
 * This file provides TypeScript type safety for the color system.
 * Colors are defined as CSS variables in globals.css and referenced here for type safety.
 */

/**
 * Base color palette - Raw colors mapped to psychological intents
 * These are the foundational colors that express specific emotional responses
 */
export const baseColors = {
  // Vulnerability & Belonging - Purple evokes authenticity and connection
  purple: {
    500: '#7c3aed',      // Primary brand purple - vulnerability & belonging
    600: '#6d28d9',      // Deeper vulnerability - stronger connection
    400: '#a78bfa',      // Lighter vulnerability - gentle invitation
  },
  // Trust & Calm - Cyan creates understanding and reduces anxiety
  cyan: {
    500: '#06b6d4',      // Trust & Calm - the brave first whisper
  },
  // Growth & Balance - Teal represents progress and harmony
  teal: {
    500: '#14b8a6',      // Growth & Balance - forward movement
  },
  // Focus & Precision - Blue directs attention with clarity
  blue: {
    700: '#1e40af',      // Deep focus - authoritative precision
    500: '#3b82f6',      // Clear focus - direct attention
  },
  // Energy & Action - Orange drives immediate response
  orange: {
    500: '#f97316',      // Energy & Action - urgent movement
  },
} as const

/**
 * Intent-Based Color Tokens
 * 
 * These tokens express WHY we use a color, not WHAT color it is.
 * Each intent is grounded in color psychology and drives specific user behaviors:
 * 
 * - trust: Builds confidence and reduces anxiety (cyan)
 * - calm: Creates peace and reduces cognitive load (cyan)
 * - belonging: Fosters connection and authenticity (purple)
 * - vulnerability: Shows courage and invites openness (purple)
 * - attention: Directs focus and creates hierarchy (blue/purple)
 * - growth: Signals progress and forward movement (teal)
 * - energy: Drives action and urgency (orange)
 * - understanding: Facilitates clarity and comprehension (cyan/blue)
 */
export const intentColors = {
  // Trust - The foundation of all relationships
  // Cyan evokes reliability, clarity, and reduces anxiety
  trust: {
    base: 'var(--intent-trust)',              // Primary trust color (cyan)
    hover: 'var(--intent-trust-hover)',       // Deeper trust on interaction
    subtle: 'var(--intent-trust-subtle)',     // Gentle trust for backgrounds
  },
  
  // Calm - Reduces cognitive load and creates peace
  // Cyan's calming properties help users feel understood
  calm: {
    base: 'var(--intent-calm)',               // Primary calm color (cyan)
    hover: 'var(--intent-calm-hover)',        // Maintained calm on interaction
    subtle: 'var(--intent-calm-subtle)',      // Soothing calm for backgrounds
  },
  
  // Belonging - Creates connection and authenticity
  // Purple invites users to feel seen and part of something meaningful
  belonging: {
    base: 'var(--intent-belonging)',          // Primary belonging color (purple)
    hover: 'var(--intent-belonging-hover)',   // Stronger connection on interaction
    subtle: 'var(--intent-belonging-subtle)', // Gentle invitation
  },
  
  // Vulnerability - The birthplace of trust
  // Purple shows courage and invites openness
  vulnerability: {
    base: 'var(--intent-vulnerability)',      // Primary vulnerability color (purple)
    hover: 'var(--intent-vulnerability-hover)', // Deeper authenticity
    subtle: 'var(--intent-vulnerability-subtle)', // Soft courage
  },
  
  // Attention - Directs focus and creates hierarchy
  // Blue/purple guides the eye and signals importance
  attention: {
    base: 'var(--intent-attention)',          // Primary attention color (blue/purple)
    hover: 'var(--intent-attention-hover)',   // Stronger focus on interaction
    subtle: 'var(--intent-attention-subtle)', // Gentle guidance
  },
  
  // Growth - Signals progress and forward movement
  // Teal represents balance and advancement
  growth: {
    base: 'var(--intent-growth)',             // Primary growth color (teal)
    hover: 'var(--intent-growth-hover)',      // Accelerated progress
    subtle: 'var(--intent-growth-subtle)',    // Gentle advancement
  },
  
  // Energy - Drives action and creates urgency
  // Orange compels immediate response
  energy: {
    base: 'var(--intent-energy)',             // Primary energy color (orange)
    hover: 'var(--intent-energy-hover)',      // Increased urgency
    subtle: 'var(--intent-energy-subtle)',    // Gentle motivation
  },
  
  // Understanding - Facilitates clarity and comprehension
  // Cyan/blue helps users process information
  understanding: {
    base: 'var(--intent-understanding)',      // Primary understanding color (cyan/blue)
    hover: 'var(--intent-understanding-hover)', // Deeper clarity
    subtle: 'var(--intent-understanding-subtle)', // Gentle comprehension
  },
} as const

/**
 * Semantic color tokens - Backward compatibility layer
 * These map to intent colors for existing code while we migrate
 * @deprecated Use intentColors instead - these will be removed in future versions
 */
export const semanticColors = {
  // Action colors - Maps to attention and belonging intents
  action: {
    primary: 'var(--intent-belonging)',        // Main action → belonging
    secondary: 'var(--intent-growth)',        // Secondary action → growth
    hover: 'var(--intent-belonging-hover)',   // Hover → deeper belonging
  },
  // Text colors - Organized by hierarchy
  text: {
    heading: 'var(--color-text-heading)',     // Headings - high contrast
    body: 'var(--color-text-body)',           // Body text - medium contrast
    muted: 'var(--color-text-muted)',         // Muted text - low contrast
  },
  // Background colors - For surfaces
  background: {
    primary: 'var(--background)',              // Main background
    secondary: 'var(--card)',                 // Secondary surfaces
    accent: 'var(--accent)',                  // Accent backgrounds
  },
  // Status colors - Maps to growth, energy, and attention intents
  status: {
    success: 'var(--intent-growth)',          // Success → growth
    error: 'var(--destructive)',              // Error states
    warning: 'var(--intent-energy)',         // Warning → energy/urgency
  },
  // Border colors
  border: {
    default: 'var(--border)',                 // Default borders
    accent: 'var(--intent-attention)',       // Accent borders → attention
  },
} as const

/**
 * Component-specific color tokens
 * These inherit from intent colors but add component context
 * Components express psychological intent through their color choices
 */
export const componentColors = {
  button: {
    // Primary buttons create belonging and invite action
    primary: {
      background: 'var(--intent-belonging)',      // Invites connection
      foreground: 'var(--primary-foreground)',
      hover: 'var(--intent-belonging-hover)',     // Deeper connection
    },
    // Secondary buttons signal growth and progress
    secondary: {
      background: 'var(--intent-growth)',         // Shows advancement
      foreground: 'var(--secondary-foreground)',
      hover: 'var(--intent-growth-hover)',       // Accelerated progress
    },
    // Trust buttons build confidence
    trust: {
      background: 'var(--intent-trust)',          // Builds confidence
      foreground: 'var(--primary-foreground)',
      hover: 'var(--intent-trust-hover)',        // Deeper trust
    },
    // Energy buttons drive urgency
    energy: {
      background: 'var(--intent-energy)',        // Creates urgency
      foreground: 'var(--primary-foreground)',
      hover: 'var(--intent-energy-hover)',       // Increased urgency
    },
  },
  card: {
    background: 'var(--card)',
    foreground: 'var(--card-foreground)',
    border: 'var(--border)',
    // Cards can express different intents
    belonging: {
      border: 'var(--intent-belonging-subtle)',  // Subtle connection
    },
    trust: {
      border: 'var(--intent-trust-subtle)',      // Subtle confidence
    },
  },
  link: {
    // Links create belonging and invite exploration
    default: 'var(--intent-belonging)',          // Invites connection
    hover: 'var(--intent-belonging-hover)',     // Deeper invitation
    // Trust links build confidence
    trust: 'var(--intent-trust)',                // Builds confidence
    trustHover: 'var(--intent-trust-hover)',     // Deeper trust
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
 * Type-safe intent path helper
 * This ensures you can only access valid intent color paths
 */
export type IntentPath = 
  | 'trust.base'
  | 'trust.hover'
  | 'trust.subtle'
  | 'calm.base'
  | 'calm.hover'
  | 'calm.subtle'
  | 'belonging.base'
  | 'belonging.hover'
  | 'belonging.subtle'
  | 'vulnerability.base'
  | 'vulnerability.hover'
  | 'vulnerability.subtle'
  | 'attention.base'
  | 'attention.hover'
  | 'attention.subtle'
  | 'growth.base'
  | 'growth.hover'
  | 'growth.subtle'
  | 'energy.base'
  | 'energy.hover'
  | 'energy.subtle'
  | 'understanding.base'
  | 'understanding.hover'
  | 'understanding.subtle'

/**
 * Type-safe color path helper (backward compatibility)
 * @deprecated Use IntentPath and getIntentColor instead
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
 * Helper function to get intent color values
 * Use this in components for type-safe intent color access
 * 
 * Example:
 * ```tsx
 * const trustColor = getIntentColor('trust.base')
 * const calmHover = getIntentColor('calm.hover')
 * ```
 */
export function getIntentColor(path: IntentPath): string {
  const [intent, variant] = path.split('.') as [keyof typeof intentColors, 'base' | 'hover' | 'subtle']
  return intentColors[intent][variant] as string
}

/**
 * Helper function to get color values (backward compatibility)
 * @deprecated Use getIntentColor instead
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

