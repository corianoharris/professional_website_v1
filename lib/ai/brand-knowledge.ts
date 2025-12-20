/**
 * Brand Knowledge Base
 * This file contains your personal brand data that the AI will use
 * Update this with your actual resume, LinkedIn content, talks, etc.
 */

export interface BrandKnowledge {
  id: string
  source: 'resume' | 'linkedin' | 'talk' | 'blog' | 'website' | 'case-study'
  content: string
  metadata: {
    title?: string
    date?: string
    url?: string
    type?: string
    tags?: string[]
  }
}

export const brandKnowledgeBase: BrandKnowledge[] = [
  {
    id: 'resume-1',
    source: 'resume',
    content: `Coriano Harris - Human-Driven Color Product Technologist

Expertise:
- Color Strategy & Psychology
- Product Design & UX
- Technology Integration
- Design Systems
- Brand Identity

Key Achievements:
- Recovered $2.3M revenue (onboarding 34% → 81%) for Healthcare SaaS
- Reduced support tickets by 47% ($180K saved yearly) for Fintech app
- Increased conversion 2% → 11% (340% standout gain) for E-commerce brand
- Shipped enterprise project in 3 weeks (ended 8-month stall)

Services:
- Color Strategy
- Product Design
- Technology Integration
- UX Consultation
- Brand Identity
- Design Systems
- Speaking & Workshops

Philosophy: "Vulnerability is the birthplace of trust. Color is that brave first whisper—evoking calm, understanding, and belonging in 0.05 seconds."`,
    metadata: {
      title: 'Professional Resume',
      tags: ['expertise', 'achievements', 'services']
    }
  },
  {
    id: 'philosophy-1',
    source: 'website',
    content: `My WHY: People don't buy what you do—they buy why you do it.

I believe vulnerability creates real trust: showing up authentically, daring to feel human. Color is that brave first whisper—evoking calm, understanding, and belonging in 0.05 seconds.

That's why I build experiences where people feel seen, choose you wholeheartedly, spread the idea, and drive measurable revenue.`,
    metadata: {
      title: 'My Philosophy',
      tags: ['philosophy', 'values', 'approach']
    }
  },
  {
    id: 'methodology-1',
    source: 'website',
    content: `How I Do It:

With courage and remarkability: psychology before pixels. Engineering calm authority, ethical influence, unforgettable presence. Building tribes around products that feel profoundly right—and profoundly different.

Most fail because they armor up with safe generics—skipping vulnerability, aiming to fit in. They start with features, not feeling. Perfection hides. Courage connects. Average vanishes. Remarkable spreads.`,
    metadata: {
      title: 'Methodology',
      tags: ['methodology', 'approach', 'process']
    }
  },
  {
    id: 'case-study-1',
    source: 'case-study',
    content: `Case Study: Healthcare SaaS - $2.3M Recovered Revenue

Their blue-heavy dashboard confused users. We rebuilt the color hierarchy. Onboarding completion went from 34% to 81%. That's not design—that's money.

The problem: Users couldn't distinguish between critical actions and secondary information due to poor color differentiation.

The solution: Created a semantic color system that used color psychology to guide user attention and reduce cognitive load.

The result: 34% to 81% onboarding completion rate, recovering $2.3M in previously lost revenue.`,
    metadata: {
      title: 'Healthcare SaaS Case Study',
      tags: ['case-study', 'healthcare', 'onboarding', 'revenue']
    }
  },
  {
    id: 'case-study-2',
    source: 'case-study',
    content: `Case Study: Fintech App - 47% Fewer Support Tickets ($180K Saved Yearly)

Fintech app with confusing color states. Users couldn't tell success from error. We created a semantic color system. Support costs dropped $180K/year. Color clarity is cost reduction.

The problem: Users couldn't distinguish between success, warning, and error states, leading to confusion and support tickets.

The solution: Implemented a semantic color system with clear visual hierarchy and accessibility compliance.

The result: 47% reduction in support tickets, saving $180K annually in support costs.`,
    metadata: {
      title: 'Fintech App Case Study',
      tags: ['case-study', 'fintech', 'support', 'cost-reduction']
    }
  },
  {
    id: 'case-study-3',
    source: 'case-study',
    content: `Case Study: E-commerce Brand - Conversion 2% → 11% (340% Standout Gain)

E-commerce brand nobody noticed. We audited competitor colors, found a gap, owned it. Standout increased 340%. Market research confirmed: they were the only ones people remembered.

The problem: Generic color palette made the brand invisible in a crowded market.

The solution: Competitive color audit revealed an opportunity. Created a distinctive color identity that stood out while maintaining brand trust.

The result: Conversion rate increased from 2% to 11%, a 340% improvement in standout and brand recognition.`,
    metadata: {
      title: 'E-commerce Case Study',
      tags: ['case-study', 'e-commerce', 'conversion', 'brand-identity']
    }
  },
  {
    id: 'services-1',
    source: 'website',
    content: `What I Deliver:

1. Products that connect heart-first and stand out forever.
2. Millions in added revenue from trust and differentiation.
3. Loyalty that compounds—tribes that pay premium and spread virally.

I price the transformation. Selective for high-impact.

Services include:
- Color Strategy: Psychology-based color systems that drive measurable results
- Product Design: Human-centered design that builds trust and belonging
- Technology Integration: Implementing color systems in modern tech stacks
- UX Consultation: Evidence-based UX improvements
- Brand Identity: Remarkable brand differentiation through color
- Design Systems: Scalable, accessible design systems
- Speaking & Workshops: Sharing vulnerability and ideas on stages`,
    metadata: {
      title: 'Services & Deliverables',
      tags: ['services', 'deliverables', 'pricing']
    }
  }
]

/**
 * Add your LinkedIn content here
 * You can export your LinkedIn profile or manually add key content
 */
export const linkedinContent: BrandKnowledge[] = [
  // Add your LinkedIn posts, articles, profile content here
  // Example:
  // {
  //   id: 'linkedin-1',
  //   source: 'linkedin',
  //   content: 'Your LinkedIn post content...',
  //   metadata: {
  //     title: 'LinkedIn Post Title',
  //     date: '2024-01-15',
  //     url: 'https://linkedin.com/...',
  //     tags: ['thought-leadership']
  //   }
  // }
]

/**
 * Add your talk transcripts/summaries here
 */
export const talkContent: BrandKnowledge[] = [
  // Add your talk content here
  // Example:
  // {
  //   id: 'talk-1',
  //   source: 'talk',
  //   content: 'Talk transcript or summary...',
  //   metadata: {
  //     title: 'Color Psychology in Modern Interfaces',
  //     date: '2025-01-15',
  //     url: 'https://youtube.com/...',
  //     type: 'Virtual',
  //     tags: ['color', 'psychology', 'interfaces']
  //   }
  // }
]

// Combine all knowledge sources
export const allBrandKnowledge = [
  ...brandKnowledgeBase,
  ...linkedinContent,
  ...talkContent
]

