export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  content: string
  tags: string[]
  tldr?: string[] // Optional TLDR key points
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "the-hidden-cost-of-generic-blue",
    title: "The Hidden Cost of Generic Blue",
    excerpt: "How hiding kills trust and growth.",
    image: "/generic_blue.webp",
    date: "March 15, 2025",
    author: "Coriano Harris",
    tags: ["Color Strategy", "Trust", "Differentiation"],
    tldr: [
      "Generic blue communicates low risk but also low memorability—users trust it but forget it instantly",
      "Teams choose it because it passes accessibility checks easily and minimizes debate, but this comes at a cost",
      "The real cost: your product blends into the SaaS crowd, your brand becomes interchangeable, and your UI doesn't tell a story",
      "Generic blue isn't bad design—it's unopinionated design, and unopinionated design is expensive over time"
    ],
    content: `
# The Hidden Cost of Generic Blue

You know that blue? The one that looks like every SaaS product ever made? Yeah, that one. The one that screams "I'm a button!" but whispers "I'm also forgettable." Let's talk about why your product looks like it's in witness protection.

## What this blue communicates (whether you want it to or not)

**Low risk, low memory** – Users trust it… and forget it ==instantly==. It's like meeting someone at a party who's perfectly nice but has the personality of a beige wall. You'll never remember their name, but you'll remember they existed. Maybe.

**Compliance over character** – "We're legit" but not =="We're different"==. It's the design equivalent of wearing khakis to a rock concert. Safe? Yes. Memorable? Absolutely not.

**Borrowed credibility** – It leans on patterns users already know instead of ==earning its own voice==. It's like copying someone's homework but changing the font. Still obvious, still unoriginal.

## Why teams keep choosing it

- It passes accessibility checks easily (because it's been tested a million times)
- Stakeholders rarely object to it (because they've seen it before and their brains shut off)
- It feels professional by default (like wearing a suit to a casual brunch)
- It minimizes debate (and therefore thinking) – The meeting ends faster, but your product suffers

## The real cost

- Your product ==blends into the SaaS crowd== like a chameleon in a box of crayons
- Your brand becomes ==interchangeable== – Users can't tell you apart from your competitors (and honestly, neither can you)
- Your UI does not tell a story—only instructions. It's like reading a manual instead of a novel.

Generic blue isn't bad design.

It's ==unopinionated design==.

And unopinionated design is ==expensive over time==. It's the design equivalent of buying cheap shoes—they work, but your feet (and your brand) will pay for it later.
    `,
  },
  {
    id: "2",
    slug: "color-as-courageous-remarkability",
    title: "Color as Courageous Remarkability",
    excerpt: "Dare to stand out boldly—own belonging and memory through remarkable distinction.",
    image: "/colored_rocket.png",
    date: "June 22, 2025",
    author: "Coriano Harris",
    tags: ["Remarkability", "Differentiation", "Standout"],
    tldr: [
      "Remarkable products stand out so boldly you can't help but notice, talk about, and remember them—color is your bold distinction",
      "Most teams choose safe colors to fit in, but fitting in is the opposite of remarkable—remarkable means standing out and being unforgettable",
      "When you choose colors with courage, you're making a statement about who you are, what you stand for, and why you matter",
      "Remarkable products don't just get noticed—they get remembered, shared, and build tribes that pay premium and spread virally"
    ],
    content: `
# Color as Courageous Remarkability

Dare to stand out boldly—own belonging and memory through remarkable distinction. Or, you know, keep blending in with everyone else. Your choice. But if you're reading this, you probably want to be remembered, not forgotten like that one app you downloaded last week and can't remember the name of.

In a world of ordinary products, be remarkable. Be boldly distinctive: impossible to ignore. Like a peacock at a penguin convention. Sure, the penguins are fine, but everyone's looking at the peacock.

## The Remarkable Standout Principle

Seth Godin taught us that remarkable products ==stand out so boldly==—you can't help but notice them, talk about them, remember them. ==Color is your bold distinction==. It's your product's personality. Without it, you're just another gray blob in a sea of gray blobs. Exciting stuff.

## Courage Over Comfort

Most teams choose colors that feel safe. They aim to fit in. But fitting in is the opposite of remarkable. Remarkable means standing out, being unforgettable, creating belonging through difference. It's like choosing to wear a bright yellow suit to a funeral. Risky? Yes. Memorable? Absolutely. Appropriate? Well, that depends on the funeral, but you get the point.

## Owning Your Space

When you choose colors with courage, you're not just picking a palette. You're making a statement. You're saying: "This is who we are. This is what we stand for. This is why we matter." And if you're lucky, users will say: "Oh wow, I remember this app! It's the one with that wild purple gradient!"

## The Remarkable Edge

Remarkable products don't just get noticed—they get remembered. They get shared. They build tribes. And tribes pay premium and spread virally. It's like having a cult following, but for your color choices. And unlike actual cults, this one is legal and profitable.

Dare to be boldly distinctive. Your market is waiting. And honestly, they're probably tired of seeing the same blue button everywhere.
    `,
  },
  {
    id: "3",
    slug: "accessibility-as-vulnerable-inclusion",
    title: "Accessibility as Vulnerable Inclusion",
    excerpt: "The remarkable edge of true connection.",
    image: "/accessibility-vulnerable-inclusion.jpg",
    date: "September 8, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "Inclusion", "Connection"],
    tldr: [
      "Accessibility isn't compliance—it's courage. It's the vulnerable act of saying: 'Everyone belongs here'",
      "Most teams treat accessibility as a checkbox, but winning brands like Stripe, Airbnb, and Apple treat it as their competitive advantage",
      "True inclusion requires vulnerability: admitting you don't know everything, listening to voices you've ignored, building for people who've been excluded",
      "When you build accessible products, you're not just checking boxes—you're building connection, creating belonging, and showing everyone matters",
      "The remarkable edge isn't in following the crowd—it's in including everyone"
    ],
    content: `
# Accessibility as Vulnerable Inclusion

The remarkable edge of true connection. Or as I like to call it: "How to build products that don't exclude people and make you feel good about yourself."

Accessibility isn't compliance—it's ==courage==. It's the vulnerable act of saying: "==Everyone belongs here==." Even that one user who uses Internet Explorer. Yes, they exist. No, I don't know why.

## Beyond Compliance

Most teams treat accessibility as a checkbox. A requirement. A constraint. Like doing your taxes—necessary but annoying. But the brands that win—==Stripe, Airbnb, Apple==—treat it as their ==competitive advantage==. They're like the kid who did extra credit and got an A+ while everyone else got a C.

## The Vulnerability of Inclusion

True inclusion requires ==vulnerability==. It means admitting you don't know everything. It means listening to voices you've ignored. It means building for people who've been excluded. It's like admitting you've been wrong this whole time, but instead of feeling bad, you feel awesome because now you're doing the right thing.

## The Remarkable Edge

When you build accessible products, you're not just checking boxes. You're ==building connection==. You're ==creating belonging==. You're showing that ==everyone matters==. Even that user who reads your entire terms of service. Yes, they exist too. They're probably lawyers.

## Connection Over Compliance

Accessible design isn't about following rules—it's about ==creating connection==. It's about building products that work for everyone, that make everyone feel seen, that create ==true belonging==. It's like throwing a party and actually inviting everyone, not just the cool kids.

The remarkable edge isn't in following the crowd. It's in ==including everyone==. Even the person who still uses a flip phone. They're out there. And they deserve accessible design too.
    `,
  },
  {
    id: "4",
    slug: "the-future-of-color-in-digital-interfaces",
    title: "The Future of Color in Digital Interfaces",
    excerpt: "Exploring the psychological impact of color choices in modern web design and how they shape user behavior.",
    image: "/colorful-abstract.png",
    date: "December 15, 2025",
    author: "Coriano Harris",
    tags: ["Color Psychology", "UX Design", "Research"],
    tldr: [
      "Color psychology is neuroscience—users' brains process color before they read a word, but context changes everything",
      "The future of color isn't about consistency—it's about intentionality. Every color choice should answer: What emotion? What action? What story?",
      "Measure color's impact: understand how combinations affect cognitive load, contrast ratios influence readability, and cultural associations shape perception",
      "Accessibility is a competitive advantage—WCAG guidelines aren't constraints, they're opportunities to create experiences that work for everyone",
      "Color is emotional architecture: it sets mood, guides attention, and creates atmosphere—the future belongs to designers who understand color is atmosphere, not just aesthetics",
      "Choose colors with purpose: not because they match brand guidelines or are trendy, but because they serve a specific function in the user's journey"
    ],
    content: `
# The Future of Color in Digital Interfaces

Exploring the **psychological** impact of **color** choices in modern web **design** and how they shape user behavior.

Color isn't just decoration—it's ==communication==. Every hue, saturation, and contrast ratio tells a story. In the digital age, where attention spans are measured in seconds (seriously, we have the attention span of a goldfish now), color becomes your ==first and most powerful tool for connection==. It's like speed dating, but for pixels.

## The Psychology Behind the Palette

Color psychology isn't pseudoscience—it's ==neuroscience==. When users see a color, their brains process it before they even read a word. ==Red triggers urgency==. ==Blue builds trust==. ==Green signals growth==. But here's what most designers miss: ==context changes everything==. It's like wearing a red shirt to a bullfight versus a wedding. Same color, very different outcomes.

A red button on a checkout page means "complete purchase." The same red on a medical app means "emergency." The color is identical, but the meaning shifts with context. One says "Buy now!" The other says "You might be dying!" Context matters, people.

## Beyond Brand Guidelines

Most design systems treat color as a brand asset. They create palettes, document hex codes, and enforce consistency. But the future of color in digital interfaces isn't about consistency—it's about ==**intentionality**==.

Every color choice should answer: ==What emotion do we want to evoke?== ==What action do we want to encourage?== ==What story do we want to tell?==

## The Data-Driven Color Revolution

The future belongs to teams that ==measure color's impact==. A/B testing button colors isn't enough. We need to understand how color combinations affect ==cognitive load==, how contrast ratios influence ==readability==, and how ==cultural associations shape perception==. It's like being a color scientist, but cooler because you get to make things people actually use.

Tools like FullStory and Hotjar give us behavioral data. But the real breakthrough comes when we combine that data with color psychology research to make ==informed decisions==. Instead of guessing "maybe blue works better?" you'll know "blue works 23% better, but only on Tuesdays." (That's not real data, but wouldn't that be hilarious?)

## Accessibility as a Competitive Advantage

The future of color in digital interfaces is ==accessible by default==. WCAG guidelines aren't constraints—they're ==opportunities==. When you design with contrast ratios in mind, you're not just checking compliance boxes. You're creating experiences that work for everyone, including users with visual impairments.

But accessibility goes beyond contrast. It's about ==colorblind-friendly palettes==. It's about ==not relying on color alone== to convey meaning. It's about building interfaces that ==communicate through multiple channels==.

## The Emotional Architecture of Color

Great digital interfaces don't just look good—they ==feel right==. Color is ==emotional architecture==. It sets the mood, guides attention, and creates atmosphere. A fintech app might use muted blues and grays to convey stability. A creative platform might use vibrant gradients to inspire. It's like interior design, but for pixels. And you can't blame your roommate for the color choices.

The future belongs to designers who understand that ==color is atmosphere, not just aesthetics==. It's the difference between a room that feels cozy and a room that feels like a hospital waiting area. Both are functional, but only one makes you want to stay.

## Color as Storytelling

Every interface tells a story. Color is your narrative voice. A monochromatic palette says "minimalist and focused." A vibrant spectrum says "energetic and creative." A muted palette says "sophisticated and calm."

The question isn't what colors look good together. The question is: What story do you want to tell?

## The Future is Intentional

The future of color in digital interfaces belongs to teams that choose colors with purpose. Not because they match a brand guideline. Not because they're trendy. But because they serve a specific function in the user's journey.

Color isn't decoration. It's direction. It's emotion. It's communication. And in the future, the most successful digital products will be the ones that use color not just to look good, but to feel right.

Choose your colors with intention. Measure their impact. Build with purpose. The future of digital interfaces depends on it.
    `,
  },
  {
    id: "5",
    slug: "building-accessible-products-that-everyone-can-use",
    title: "Building Accessible Products That Everyone Can Use",
    excerpt: "A comprehensive guide to creating inclusive digital experiences that work for everyone, regardless of ability.",
    image: "/building-accessible-products.jpg",
    date: "November 20, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "Inclusive Design", "UX Research"],
    tldr: [
      "One billion people worldwide have a disability—but accessibility benefits everyone: closed captions help in noisy environments, high contrast helps in bright sunlight",
      "Accessibility isn't just the right thing to do—it's smart business: accessible products reach more users, rank higher in search, reduce legal risk, and improve SEO",
      "The four pillars: Perceivable (text alternatives, captions, contrast), Operable (keyboard navigation, no time limits), Understandable (clear language, consistent navigation), Robust (valid HTML, ARIA labels)",
      "Build accessibility from the start: start with research, design with accessibility in mind, develop with standards, and test with real users",
      "Common mistakes: relying on color alone, poor contrast ratios, missing alt text, keyboard traps, and inaccessible forms",
      "Automated tools catch about 30% of accessibility issues—real users catch the rest. Test with people who use assistive technologies"
    ],
    content: `
# Building Accessible Products That Everyone Can Use

A comprehensive guide to creating **inclusive** **digital experiences** that work for everyone, regardless of ability.

Accessibility isn't a feature—it's a ==foundation==. When you build accessible products, you're not just checking compliance boxes. You're creating experiences that ==work for everyone==, that make everyone feel seen, that create ==true belonging==. It's like building a ramp instead of stairs. Sure, stairs work for most people, but ramps work for everyone. Plus, you can skateboard down ramps. Try that with stairs. I dare you.

## Why Accessibility Matters

==One billion people worldwide have a disability==. That's 15% of the global population. That's like excluding everyone in New York, Los Angeles, and Chicago combined. But here's what most product teams miss: ==accessibility benefits everyone==. Closed captions help people in noisy environments (like that one coffee shop with the blender that never stops). High contrast modes help people in bright sunlight (or when you're trying to check your phone at the beach). Keyboard navigation helps power users work faster (and look cooler doing it).

When you build for accessibility, you ==build for everyone==. It's like making a universal remote that actually works. Revolutionary.

## Beyond Compliance: The Business Case

Accessibility isn't just the right thing to do—it's ==smart business==. Accessible products reach more users. They rank higher in search results. They reduce legal risk. They improve SEO. They create better user experiences for everyone.

But the real competitive advantage comes from understanding that accessibility isn't a constraint—it's ==innovation==. When you design for people with disabilities, you discover solutions that ==benefit everyone==.

## The Four Pillars of Accessibility

**Perceivable** – Information must be presentable to users in ways they can perceive. This means ==text alternatives for images==, ==captions for videos==, and ==sufficient color contrast==.

**Operable** – Interface components must be operable. This means ==keyboard navigation==, no time limits that can't be extended, and no content that causes seizures.

**Understandable** – Information and UI operation must be understandable. This means ==clear language==, ==consistent navigation==, and ==helpful error messages==.

**Robust** – Content must be robust enough to be interpreted by assistive technologies. This means ==valid HTML==, ==proper ARIA labels==, and ==semantic markup==.

## Building Accessibility Into Your Process

Accessibility isn't something you add at the end—it's something you build from the start. Here's how:

**Start with research** – Understand your users' needs. Talk to people with disabilities. Use assistive technologies yourself. Experience your product the way your users do.

**Design with accessibility in mind** – Choose colors with sufficient contrast. Design keyboard-friendly interactions. Create clear information hierarchies. Build flexible layouts that work at any size.

**Develop with standards** – Use semantic HTML. Implement ARIA labels correctly. Test with screen readers. Validate your markup. Follow WCAG guidelines.

**Test with real users** – Automated tools catch about 30% of accessibility issues. Real users catch the rest. Test with people who use assistive technologies. Learn from their experiences.

## Common Accessibility Mistakes (And How to Avoid Them)

**Relying on color alone** – Don't use color as the only way to convey information. Add icons, labels, or patterns.

**Poor contrast ratios** – Text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text). Use tools like WebAIM Contrast Checker.

**Missing alt text** – Every image needs descriptive alt text. If an image is decorative, use an empty alt attribute.

**Keyboard traps** – Users must be able to navigate your entire interface with a keyboard. Test tab order. Ensure focus indicators are visible.

**Inaccessible forms** – Label every input. Group related fields. Provide clear error messages. Make required fields obvious.

## The Tools You Need

**Automated testing** – Tools like axe DevTools, WAVE, and Lighthouse catch many accessibility issues automatically. They're like spell check, but for accessibility. And just like spell check, they'll catch things you didn't even know were problems.

**Screen readers** – Test with NVDA (Windows), VoiceOver (Mac/iOS), or JAWS. Experience your product the way your users do. It's like closing your eyes and navigating your app. Except you can't cheat and peek. And it's actually useful.

**Keyboard navigation** – Unplug your mouse. Navigate your entire interface with just a keyboard. You'll discover issues you never knew existed. Like that button that's impossible to reach. Or that form that traps you forever. Good times.

**Color contrast checkers** – Use WebAIM Contrast Checker or Contrast Ratio to ensure your colors meet WCAG standards. Because guessing if your text is readable is like guessing if your coffee is hot. You'll find out eventually, but it might hurt.

## Building an Accessible Culture

Accessibility isn't just a technical requirement—it's a cultural shift. It requires empathy, curiosity, and commitment. It means asking "Can everyone use this?" at every step of the process.

Start small. Fix one issue at a time. Celebrate progress. Learn from mistakes. Build accessibility into your team's DNA.

## The Future is Inclusive

The future of digital products belongs to teams that build with accessibility in mind. Not as an afterthought. Not as a compliance requirement. But as a core principle.

When you build accessible products, you're not just checking boxes. You're creating experiences that work for everyone. You're building products that make everyone feel seen. You're creating true belonging.

The question isn't whether you should build accessible products. The question is: How can you build them better?

Start today. Build with intention. Create experiences that everyone can use. The future depends on it.
    `,
  },
  {
    id: "6",
    slug: "react-color-design-system-building-scalable-palettes",
    title: "React Color Design System: Building Scalable Palettes",
    excerpt: "How to architect color systems in React that scale across components, themes, and applications.",
    image: "/react-color-design-system.jpg",
    date: "October 12, 2025",
    author: "Coriano Harris",
    tags: ["React", "Design System", "Front End"],
    tldr: [
      "Use semantic color tokens (like 'color.action.primary') instead of appearance-based names (like 'primaryBlue')",
      "Structure your color system in layers: base colors → semantic colors → component colors → theme colors",
      "TypeScript makes your color system type-safe—catch typos at compile time and get autocomplete for all color paths",
      "Build accessibility in from the start: every color combination should meet WCAG AA standards (4.5:1 for text)",
      "Test your color system at multiple levels: unit tests for contrast, visual regression, component tests, and user testing"
    ],
    content: `
# React Color Design System: Building Scalable Palettes

How to architect **color systems** in **React** that scale across components, themes, and applications.

Building a color system in React isn't just about picking colors—it's about creating a ==scalable architecture== that grows with your product. When done right, your color system becomes the foundation for ==consistency==, ==accessibility==, and ==maintainability==.

## The Foundation: Color Tokens

Here's a story I've seen play out too many times: A designer picks a beautiful blue for primary actions. A developer hardcodes \`#3b82f6\` into a button component. Six months later, the brand refreshes, and that blue becomes purple. Now the developer searches through hundreds of files, replacing \`#3b82f6\` with \`#7c3aed\`, hoping they don't miss any. ==They always miss some==. And that one button stays blue forever, haunting them like a digital ghost.

==Color tokens solve this problem==. They're not just hex codes—they're ==semantic names that describe purpose, not appearance==. Instead of \`primaryBlue\`, use \`color.action.primary\`. Instead of \`darkGray\`, use \`color.text.secondary\`. It's like naming your pets by their personality instead of their color. "This is Fluffy" tells you nothing. "This is DestroysShoes" tells you everything.

**Why this matters:** When your brand changes, you ==update one file==. Your entire application adapts. It's the difference between ==rebuilding a house and flipping a switch==. One takes months and costs thousands. The other takes seconds and costs nothing. Your choice.

This semantic approach means your colors adapt to themes, contexts, and user preferences without breaking your components. Your dark mode isn't a separate codebase—it's ==the same tokens, different values==.

## Structuring Your Color Palette

Think of your color system like a Russian nesting doll—each layer contains the next, but serves a different purpose. A well-structured color system has four layers:

**Base colors** – Your raw palette: reds, blues, greens, grays. These are your source of truth. They're the pigments on your palette before you start painting. **Why start here?** Because every other layer builds on these. Change a base color, and you change everything downstream.

**Semantic colors** – Purpose-driven tokens: \`action.primary\`, \`status.success\`, \`text.heading\`. These map to your base colors but describe function, not appearance. **Why semantic?** Because "primary" means "main action" whether it's blue, purple, or green. Your components don't care about the color—they care about the purpose.

**Component colors** – Component-specific tokens: \`button.primary.background\`, \`card.border\`. These inherit from semantic colors but add component context. **Why this layer?** Because a button's primary color might need a slight variation from a link's primary color. Same purpose, different implementation.

**Theme colors** – Theme variations: \`light\`, \`dark\`, \`high-contrast\`. These override semantic colors to create different visual experiences. **Why themes?** Because your users work in different environments. Dark mode isn't a nice-to-have—it's a necessity for many users working late nights or in low-light environments.

Each layer serves a purpose. Skip a layer, and you'll pay for it later when you need to scale.

## React Implementation Patterns

**CSS Variables with React Context** – Use CSS custom properties for runtime theming. Wrap your app in a ThemeProvider that updates CSS variables based on context.

**Styled Components Theme** – If you're using styled-components, leverage their theme prop. Create a theme object with your color tokens and pass it through ThemeProvider.

**Tailwind CSS Custom Colors** – Define your color system in Tailwind's config. Use semantic names in your \`tailwind.config.js\` and Tailwind generates utility classes automatically.

**Design Tokens Library** – Use libraries like \`@design-tokens/core\` or \`style-dictionary\` to manage tokens and generate code for multiple platforms.

## The Component Architecture

Your color system should work at three levels:

**Global tokens** – Defined in your theme/design tokens file. These are your source of truth.

**Component tokens** – Mapped in your component files. Components reference semantic tokens, not base colors.

**Runtime overrides** – Allow theme switching, user preferences, and context-specific overrides.

## Accessibility by Default

I once watched a user struggle with a form. The error message appeared in red text on a red background. The user couldn't see it. They thought the form was broken. It wasn't broken—it was inaccessible. It was like trying to find a red car in a parking lot full of red cars. Technically possible, but why would you do that to yourself?

A scalable color system is ==accessible by default==. This isn't optional. It's foundational. Here's what that means:

**Contrast ratios** – Every color combination meets ==WCAG AA standards== (4.5:1 for text, 3:1 for UI components). **Why this matters:** Because 8% of men and 0.5% of women have color vision deficiencies. Low contrast isn't just hard to read—it's ==impossible to read for some users==.

**Colorblind-friendly** – ==Don't rely on color alone==. Use icons, patterns, or labels to convey meaning. **The story:** A red error icon and a green success icon look identical to someone with protanopia. Add a checkmark or X, and suddenly ==everyone understands==.

**High contrast mode** – Support system preferences for high contrast. Your color system should ==adapt automatically==. **Why this helps:** Users with low vision need higher contrast. Respect their system preferences, and your app becomes ==usable instead of frustrating==.

**Focus indicators** – Ensure focus states are visible regardless of color scheme. Use outline styles that work with any background. **The reality:** Keyboard users navigate your entire interface with Tab. If they can't see where they are, they're lost. A visible focus indicator isn't decoration—it's ==navigation==.

Accessibility isn't a feature you add. It's ==a foundation you build==.

## Building with TypeScript

TypeScript transforms your color system from a collection of strings into a type-safe architecture. Here's the story: imagine you're building a component library, and a designer asks you to change the primary button color. Without TypeScript, you might typo \`#7c3aed\` as \`#7c3ae\` and break your entire design system. With TypeScript, your editor catches the error before you even save.

But TypeScript does more than prevent typos—it teaches your IDE to understand your color system. When you type \`colors.action.\`, your editor suggests \`primary\` and \`secondary\`. It's like having a design system expert sitting next to you, whispering suggestions as you code.

Here's how to build a type-safe color system that scales:

\`\`\`typescript
// Step 1: Define your color tokens as a const object
// The 'as const' assertion tells TypeScript: "These values are literal types, not just strings"
// Why this matters: Without 'as const', TypeScript sees '#7c3aed' as a string.
// With 'as const', TypeScript sees it as the literal type '#7c3aed'—making it impossible to assign wrong values
const colors = {
  // Semantic color tokens—these describe purpose, not appearance
  // Why semantic? Because 'primary' means "main action" regardless of whether it's purple, blue, or green
  action: {
    primary: '#7c3aed',    // Main action color—used for primary buttons, links, and CTAs
    secondary: '#14b8a6',   // Secondary action—used for secondary buttons and alternative actions
  },
  // Text colors organized by hierarchy
  // Why organize by hierarchy? Because text colors change based on context, not just appearance
  text: {
    heading: '#1e293b',    // Headings need high contrast—this ensures readability
    body: '#64748b',       // Body text uses lower contrast—reduces visual weight
  },
  // Background colors for different surfaces
  background: {
    primary: '#ffffff',     // Main background—usually white or light gray
    secondary: '#f8fafc',   // Secondary background—for cards, panels, and elevated surfaces
  },
} as const  // This is the magic: 'as const' makes TypeScript treat these as literal types

// Step 2: Extract the type from the const object
// Why extract the type? Because now you can use it throughout your codebase
// This creates a single source of truth—change colors here, and TypeScript updates types everywhere
type ColorTokens = typeof colors

// Step 3: Create a helper type to get nested color paths
// This is advanced TypeScript—it creates a union type of all possible color paths
// Why this helps: You can now type-check color paths like 'action.primary' at compile time
type ColorPath = 
  | 'action.primary'
  | 'action.secondary'
  | 'text.heading'
  | 'text.body'
  | 'background.primary'
  | 'background.secondary'

// Step 4: Create a helper function to safely access colors
// This function ensures you can only access colors that exist
// Why this matters: It prevents runtime errors from typos like 'action.primry' (missing 'a')
function getColor(path: ColorPath): string {
  const [category, token] = path.split('.') as [keyof ColorTokens, string]
  return colors[category][token as keyof typeof colors[typeof category]]
}

// Step 5: Use it in your components
// Now your components are type-safe—TypeScript will error if you use a color that doesn't exist
const Button = ({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) => {
  // TypeScript knows 'action.primary' is valid, but 'action.invalid' will error
  // We construct the path dynamically, but TypeScript ensures variant can only be 'primary' or 'secondary'
  const colorPath = \`action.\${variant}\` as ColorPath
  const backgroundColor = getColor(colorPath)
  return <button style={{ backgroundColor }}>Click me</button>
}
\`\`\`

**Why this approach works:**

**Type safety** – TypeScript catches color typos at compile time, not runtime. You'll never ship a broken color to production.

**Autocomplete** – Your IDE suggests valid color paths as you type. It's like autocomplete for your design system.

**Refactoring confidence** – When you rename a color, TypeScript shows you every place that needs updating. No more searching through codebases.

**Documentation** – The types serve as living documentation. New developers can see all available colors just by typing \`colors.\`.

**Single source of truth** – Your colors live in one place, but TypeScript ensures consistency everywhere they're used.

This isn't just code—it's a safety net. It's the difference between a color system that breaks silently and one that fails loudly, at development time, when you can still fix it.

## Testing Your Color System

Test your color system at multiple levels:

**Unit tests** – Verify contrast ratios meet WCAG standards. Test that all color combinations are accessible.

**Visual regression** – Use tools like Chromatic or Percy to catch visual changes when you update colors.

**Component tests** – Ensure components render correctly with different themes. Test dark mode, high contrast, and custom themes.

**User testing** – Test with real users, especially those with visual impairments. Get feedback on readability and usability.

## The Scalability Challenge

As your product grows, your color system must scale. Here's how:

**Version your tokens** – When you need to change a color, create a new token version rather than breaking existing ones.

**Documentation** – Use Storybook or similar tools to document your color system. Show examples, use cases, and accessibility notes.

**Migration paths** – When deprecating colors, provide clear migration guides. Use linting rules to catch deprecated token usage.

**Design tooling** – Sync your design tokens with Figma or other design tools. Use plugins like Figma Tokens to keep design and code in sync.

## The React Advantage

React's component model makes color systems powerful. You can:

**Compose colors** – Create higher-order components that apply color themes. Wrap components with color providers.

**Dynamic theming** – Switch themes at runtime. React's reactivity makes theme changes instant.

**Context-based colors** – Use React Context to provide color tokens to any component in your tree.

**Server-side rendering** – Your color system works with Next.js and other SSR frameworks. CSS variables ensure colors render correctly on the server.

## Building for the Future

The future of React color systems is:

**CSS Color Module Level 4** – New color functions like \`color-mix()\` and \`color-contrast()\` will make color systems more powerful.

**Container queries** – Color systems that adapt to container size, not just viewport size.

**User preferences** – Systems that respect user preferences for reduced motion, high contrast, and color schemes.

**AI-assisted palettes** – Tools that generate accessible color palettes based on your brand colors.

## Start Building Today

Your color system is the foundation of your design system. Build it right, and everything else becomes easier. Build it wrong, and you'll fight it forever.

Start with semantic tokens. Build accessibility in from the start. Use TypeScript for type safety. Test everything. Document thoroughly.

The best color systems aren't just beautiful—they're scalable, accessible, and maintainable. Build yours with intention. Your future self will thank you.
    `,
  },
  {
    id: "7",
    slug: "the-color-world-of-accessibility",
    title: "The Color World of Accessibility",
    excerpt: "Exploring how color choices impact accessibility and how to build inclusive color systems that work for everyone.",
    image: "/color-world-accessibility.png",
    date: "August 5, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "Color Psychology", "Inclusive Design"],
    tldr: [
      "8% of men and 0.5% of women have color vision deficiencies—your color system must work for all of them",
      "Don't rely on color alone: combine color with icons, patterns, or labels to convey meaning",
      "Every color combination must meet WCAG AA standards: 4.5:1 for normal text, 3:1 for large text",
      "High contrast mode isn't just for visual impairments—it helps users in bright sunlight and with aging eyes",
      "Dark mode requires careful color choices: colors appear more saturated, so reduce saturation slightly for dark themes",
      "Accessible color isn't a constraint—it's an opportunity to create better experiences for everyone"
    ],
    content: `
# The Color World of Accessibility

Exploring how **color choices** impact **accessibility** and how to build **inclusive** color systems that work for everyone.

Color and accessibility aren't opposites—they're ==partners==. When you understand how color affects accessibility, you can create ==beautiful, inclusive experiences== that work for everyone. The color world of accessibility is ==rich, nuanced, and full of opportunity==.

## The Accessibility Spectrum

Accessibility isn't binary. It's ==a spectrum==. Some users have complete color vision. Others have color vision deficiencies. Some have low vision. Others have high contrast preferences. Your color system must work across ==this entire spectrum==.

## Color Vision Deficiencies

==8% of men and 0.5% of women== have some form of color vision deficiency. The most common types are:

**Protanopia** – Red-green color blindness where red appears darker. Reds look brown or black. It's like seeing the world through sepia filter, but permanent.

**Deuteranopia** – Red-green color blindness where green appears darker. Greens look brown or gray. Traffic lights become a guessing game. "Is that red or... brown? I'll just wait for the other cars to move."

**Tritanopia** – Blue-yellow color blindness. Blues appear green, yellows appear pink. The sky is green, bananas are pink. It's like living in an alternate universe where color physics work differently.

**Achromatopsia** – Complete color blindness. Everything appears in shades of gray. It's like watching old movies, but for life. Dramatic? Yes. Practical? Not always.

Your color system must work for all of these users. This doesn't mean avoiding color—it means ==not relying on color alone==. Add icons. Add labels. Add patterns. Make it work for everyone, not just people who see colors the way you do.

## The Contrast Imperative

Contrast is ==the foundation of accessible color==. WCAG guidelines specify:

**AA Standard** – ==4.5:1 for normal text== (16px and below), ==3:1 for large text== (18px+ or 14px+ bold).

**AAA Standard** – ==7:1 for normal text==, ==4.5:1 for large text==.

**UI Components** – ==3:1 for non-text content== like buttons, form controls, and icons.

But contrast isn't just about meeting standards—it's about ==readability==. Higher contrast improves readability for ==everyone==, not just users with visual impairments.

## Building Colorblind-Friendly Palettes

Colorblind-friendly doesn't mean colorless. It means:

**Use multiple cues** – ==Combine color with icons, patterns, labels, or shapes==. Don't rely on color alone to convey meaning. It's like having subtitles AND audio. Both work, but together they're unstoppable.

**Choose accessible color combinations** – Some color combinations work better for colorblind users. ==Blue and orange work well==. So do ==blue and yellow==. Red and green? ==Not so much==. It's like trying to tell apart two identical twins. Technically possible, but unnecessarily difficult.

**Test with simulators** – Use tools like Color Oracle or Chrome DevTools to ==simulate color vision deficiencies==. See your design through ==colorblind eyes==. It's like trying on someone else's glasses. Everything looks different, and you realize your design might need work.

**Provide alternatives** – If color is essential, provide alternative ways to access the information. Use labels, icons, or patterns. It's like having a backup plan. Because sometimes your main plan (color) doesn't work for everyone.

## The High Contrast Challenge

High contrast mode isn't just for users with visual impairments. It's also for users in bright sunlight, users with aging eyes, and users who prefer higher contrast.

Your color system should:

**Support system preferences** – Use \`prefers-contrast\` media query to detect high contrast preferences.

**Provide high contrast themes** – Create a high contrast theme that uses maximum contrast ratios.

**Test in high contrast** – View your design in Windows High Contrast Mode or macOS Increased Contrast. Ensure everything remains usable.

## Color and Cognitive Load

Color affects cognitive load. Too many colors overwhelm. Too few colors confuse. The right balance depends on your content and users.

**Limit your palette** – Use 3-5 primary colors. Add accent colors sparingly.

**Create hierarchy** – Use color to create visual hierarchy. Important elements get stronger colors. Secondary elements get muted colors.

**Be consistent** – Use the same colors for the same purposes throughout your interface. Consistency reduces cognitive load.

## Cultural Considerations

Color meanings vary by culture. Red means danger in Western cultures but prosperity in Eastern cultures. White means purity in Western cultures but mourning in Eastern cultures.

When building global products:

**Research cultural associations** – Understand how your target audience interprets colors.

**Test with diverse users** – Get feedback from users from different cultural backgrounds.

**Provide customization** – Allow users to customize colors to match their preferences and cultural context.

## The Dark Mode Opportunity

Dark mode isn't just trendy—it's accessible. It reduces eye strain, saves battery on OLED screens, and works better in low-light environments. Plus, it makes you look like a hacker from a 90s movie. Win-win.

But dark mode requires careful color choices:

**Maintain contrast** – Dark backgrounds don't automatically mean better contrast. Test contrast ratios in dark mode. Just because it's dark doesn't mean it's readable. Ask anyone who's tried to read white text on a slightly-less-white background. It's a nightmare.

**Avoid pure black** – Pure black (\`#000000\`) on pure white creates harsh contrast. Use dark grays (\`#121212\`) instead. It's like the difference between staring at the sun and looking at a cloudy sky. One hurts, one doesn't.

**Adjust saturation** – Colors appear more saturated on dark backgrounds. Reduce saturation slightly for dark mode. Otherwise your app looks like it's having a rave, and not everyone signed up for that.

**Test both modes** – Ensure your color system works in both light and dark modes. Some colors that work in light mode don't work in dark mode. It's like wearing sunglasses indoors. Technically possible, but why?

## Building Inclusive Color Systems

An inclusive color system:

**Meets WCAG standards** – All color combinations meet at least AA standards, preferably AAA.

**Works for colorblind users** – Doesn't rely on color alone. Uses multiple cues.

**Supports high contrast** – Provides high contrast themes and respects system preferences.

**Works in dark mode** – Maintains accessibility in both light and dark themes.

**Is customizable** – Allows users to adjust colors to meet their needs.

## Tools for Accessible Color

**Contrast checkers** – WebAIM Contrast Checker, Contrast Ratio, and Chrome DevTools help you verify contrast ratios.

**Colorblind simulators** – Color Oracle, Chrome DevTools, and Stark help you see your design through colorblind eyes.

**Palette generators** – Coolors, Adobe Color, and Accessible Palette generate accessible color palettes.

**Design tools** – Figma plugins like A11y Color Contrast Checker and Stark help you check accessibility during design.

## The Future of Accessible Color

The future of accessible color includes:

**CSS Color Module Level 4** – New functions like \`color-contrast()\` will make it easier to ensure accessible contrast.

**User preferences** – Better support for user preferences like \`prefers-contrast\` and \`prefers-color-scheme\`.

**AI assistance** – Tools that automatically generate accessible color palettes based on your brand colors.

**Better testing** – Automated tools that catch accessibility issues during development.

## Start Building Accessible Color Systems Today

Accessible color isn't a constraint—it's an opportunity. When you build with accessibility in mind, you create better experiences for everyone.

Start by understanding your users. Test with colorblind simulators. Verify contrast ratios. Support dark mode. Provide customization options.

The color world of accessibility is rich and full of possibility. Build your color system with intention, and you'll create experiences that work for everyone.

Color and accessibility aren't opposites. They're partners. Build them together, and you'll create something remarkable.
    `,
  },
  {
    id: "8",
    slug: "high-contrast-on-a-website",
    title: "High Contrast on a Website",
    excerpt: "High contrast on a website is really important for making the site more accessible. Discover how proper contrast ratios transform user experience.",
    image: "/high-contrast-accessibility.jpg",
    date: "December 30, 2025",
    author: "Coriano Harris",
    tags: ["Accessibility", "High Contrast", "WCAG", "Inclusive Design"],
    tldr: [
      "High contrast improves readability for everyone—especially users with visual impairments, color blindness, or aging eyes",
      "WCAG requires minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text, and 3:1 for UI components",
      "High contrast helps users navigate by making buttons, links, and interactive elements stand out clearly from the page",
      "Proper contrast guides attention to important sections like CTAs while maintaining aesthetic balance",
      "High contrast mode isn't just compliance—it's a competitive advantage that makes your site usable for millions more people"
    ],
    content: `
# High Contrast on a Website

High contrast on a website is ==really important== for making the site more accessible. But what does that actually mean? And why should you care? Well, if you've ever tried to read light gray text on a white background while squinting and questioning your life choices, you already know why.

## The Foundation: What is High Contrast?

High contrast means there's a ==significant difference== between text and background colors. Think black text on white paper—that's high contrast. Light gray text on a white background? That's low contrast, and it's ==harder to read== for everyone. It's like trying to read a book through fog. Technically possible, but why torture yourself?

But high contrast isn't just about readability. It's about ==inclusion==. It's about building websites that work for ==everyone==, regardless of their visual abilities. It's like making sure your party has both stairs and a ramp. Everyone gets in, everyone has fun.

## Why High Contrast Matters

### 1. Improved Readability

**Text and Background** – High contrast between text and background colors helps users read content more easily. For example, ==dark text on a light background== (like black on white) or ==light text on a dark background== (like white on black).

This is especially helpful for people with ==visual impairments== (like color blindness or low vision) or ==aged users== who might struggle with low contrast.

When text has sufficient contrast, reading becomes effortless. Users don't strain their eyes. They don't squint. They just ==read and understand==.

### 2. Better Navigation

High contrast elements, like buttons, links, and headings, make them ==stand out clearly== from the rest of the page, so users can navigate without confusion.

It helps users ==identify interactive elements== (like buttons, forms, and navigation bars) more easily. When everything blends together, users get lost. When elements have proper contrast, users know exactly where to click.

**The Navigation Advantage** – Users with low vision can't navigate a site where buttons blend into the background. High contrast ==solves this problem==. Every button, link, and interactive element becomes ==clearly visible==.

### 3. Enhanced Focus and Attention

High contrast can be used to ==guide the user's attention== to important sections of the site, like calls to action (e.g., "Buy Now" or "Subscribe").

You can use it strategically to make ==specific parts of the page pop== while keeping the rest more neutral. Important elements get high contrast. Secondary elements get lower contrast. This creates ==visual hierarchy==.

**The Attention Principle** – When everything has the same contrast, nothing stands out. When important elements have higher contrast, users ==naturally focus== on them first.

### 4. Accessibility Compliance

Many web accessibility guidelines (like the ==WCAG – Web Content Accessibility Guidelines==) require certain contrast ratios to make sure people with different abilities can access content. For example, the text-to-background contrast ratio should be at least ==4.5:1 for normal text== and ==3:1 for large text==.

**WCAG Standards** – Meeting these standards isn't just about compliance. It's about ==ensuring your content is accessible== to millions of users who need higher contrast to read effectively.

**The Legal Reality** – In many countries, websites that don't meet accessibility standards can face ==legal consequences==. But more importantly, they ==exclude users== who want to access your content.

### 5. Aesthetic Balance

While high contrast can improve usability, it's also important to ==balance it aesthetically==. Too much contrast or very harsh color combinations (like bright red on bright green) can become overwhelming. So, aim for contrast that's ==not just functional but also visually pleasing==.

**The Balance Challenge** – High contrast doesn't mean ==harsh colors==. It means ==sufficient difference== between foreground and background. You can achieve high contrast with ==sophisticated color palettes== that are both accessible and beautiful.

## The Numbers: Understanding Contrast Ratios

Contrast ratios measure the difference between two colors. The higher the ratio, the ==more accessible== the combination.

**WCAG AA Standards** (Minimum for most websites):
- Normal text: ==4.5:1 contrast ratio==
- Large text (18px+ or 14px+ bold): ==3:1 contrast ratio==
- UI components: ==3:1 contrast ratio==

**WCAG AAA Standards** (Enhanced accessibility):
- Normal text: ==7:1 contrast ratio==
- Large text: ==4.5:1 contrast ratio==

**Perfect Contrast** (Maximum):
- Black on white: ==21:1 contrast ratio==
- White on black: ==21:1 contrast ratio==

## Who Benefits from High Contrast?

**Users with Low Vision** – People with visual impairments need higher contrast to read text. Without it, your content is ==inaccessible==.

**Users with Color Blindness** – High contrast helps users distinguish between elements even when they can't see color differences.

**Aging Users** – As eyes age, contrast sensitivity decreases. High contrast makes content ==readable for older users==.

**Users in Bright Environments** – High contrast helps users read content in ==bright sunlight== or other challenging lighting conditions.

**Everyone** – High contrast improves readability for ==all users==, not just those with disabilities. It reduces eye strain and makes content easier to scan.

## Implementing High Contrast

### Start with Your Design System

Build contrast into your ==design system from the start==. Don't add it as an afterthought. Make it ==foundational==.

**Color Tokens** – Use semantic color tokens that ensure proper contrast ratios. Instead of arbitrary colors, use tokens like \`text.primary\` and \`background.primary\` that ==guarantee contrast==.

### Test Your Contrast Ratios

Use tools like ==WebAIM Contrast Checker== or ==Chrome DevTools== to verify your contrast ratios. Don't guess—==measure==.

**Automated Testing** – Include contrast checking in your ==automated testing pipeline==. Catch contrast issues before they reach production.

### Provide High Contrast Mode

Give users the option to ==enable high contrast mode==. Some users need maximum contrast, and you should ==provide that option==.

**System Preferences** – Respect system preferences like \`prefers-contrast\`. When users enable high contrast in their OS, ==your site should adapt==.

## The Business Case for High Contrast

High contrast isn't just the right thing to do—it's ==smart business==.

**Reach More Users** – By ensuring proper contrast, you make your site accessible to ==millions more users==. That's like having a party and actually inviting everyone, not just the people who can see well.

**Reduce Bounce Rate** – Users who can't read your content will ==leave immediately==. High contrast keeps them engaged. It's like having readable signs at your party. Otherwise people just leave confused and hungry.

**Legal Protection** – Meeting WCAG standards ==protects you from legal issues== while ensuring compliance. It's like wearing a seatbelt. You hope you never need it, but you're glad it's there.

**Better SEO** – Accessible sites often ==rank higher in search results== because they provide better user experiences. Google rewards sites that don't make users cry. Who knew?

**Competitive Advantage** – Most websites don't prioritize accessibility. By doing so, you ==stand out from competitors==. It's like being the only restaurant with a ramp. You get all the customers who use wheelchairs, strollers, or just prefer ramps. That's a lot of customers.

## Common High Contrast Mistakes

**Relying on Color Alone** – Don't use color as the only way to convey information. Add ==icons, patterns, or labels==.

**Ignoring Focus States** – Ensure focus indicators have ==sufficient contrast==. Keyboard users need to see where they are.

**Forgetting Interactive Elements** – Buttons, links, and form controls need ==high contrast borders== or backgrounds.

**Testing Only in Ideal Conditions** – Test your contrast in ==various lighting conditions== and on different devices.

## The Future of High Contrast

The future of web accessibility includes ==better high contrast support==:

**CSS Color Module Level 4** – New functions like \`color-contrast()\` will make it easier to ==ensure accessible contrast automatically==.

**System Integration** – Better integration with ==system preferences== and assistive technologies.

**AI Assistance** – Tools that ==automatically generate accessible color palettes== based on your brand colors.

## Start Building Accessible Contrast Today

High contrast on a website is ==really important== for making the site more accessible. It's not optional. It's ==essential==.

Start by ==auditing your current contrast ratios==. Test your text, buttons, links, and interactive elements. Fix what's broken. Then ==build contrast into your design system== so future work is automatically accessible.

The question isn't whether you should prioritize high contrast. The question is: ==How quickly can you make your site accessible?==

Every day you wait is another day ==excluding users== who want to access your content. Start today. Build with intention. Create experiences that ==work for everyone==.

High contrast isn't a constraint. It's an ==opportunity==. An opportunity to reach more users. An opportunity to create better experiences. An opportunity to ==build something remarkable==.
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  // Sort by date, most recent first
  return [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA // Most recent first
  })
}
