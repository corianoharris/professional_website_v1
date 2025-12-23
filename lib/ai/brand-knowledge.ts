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
- Product Strategy & Web Strategy
- Color Strategy & Psychology
- Product Design & UX Research
- UI Design & Design Systems
- Front-End Development (Full-Stack)
- Design Technology & Tools (Figma, Design Systems)
- Technology Integration
- Brand Identity

Key Achievements:
- Recovered $2.3M revenue (onboarding 34% → 81%) for Healthcare SaaS
- Reduced support tickets by 47% ($180K saved yearly) for Fintech app
- Increased conversion 2% → 11% (340% standout gain) for E-commerce brand
- Shipped enterprise project in 3 weeks (ended 8-month stall)

Services:
- Product Strategy: End-to-end product strategy and planning
- Web Strategy: Comprehensive web strategy and digital presence
- Color Strategy: Psychology-based color systems that drive measurable results
- Product Design: Human-centered design that builds trust and belonging
- UX Research: Evidence-based user experience research and insights
- UI Design: Intuitive, accessible interface design using Figma and modern design tools
- Front-End Development: Full-stack development capabilities
- Design Systems: Scalable, accessible design systems and component libraries
- Design Technology: Expertise in Figma, design tools, and design tech stack
- Technology Integration: Implementing color systems and design in modern tech stacks
- UX Consultation: Evidence-based UX improvements
- Brand Identity: Remarkable brand differentiation through color and design
- Speaking & Workshops: Sharing vulnerability and ideas on stages

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
- Product Strategy: End-to-end product strategy, roadmapping, and planning
- Web Strategy: Comprehensive web strategy, digital presence, and online experience optimization
- Color Strategy: Psychology-based color systems that drive measurable results
- Product Design: Human-centered design that builds trust and belonging
- UX Research: User research, usability testing, and evidence-based insights
- UI Design: Intuitive, accessible interface design using Figma and modern design tools
- Front-End Development: Full-stack development with expertise in modern web technologies
- Design Systems: Scalable, accessible design systems and component libraries
- Design Technology: Expertise in Figma, design tools, design tokens, and design tech stack
- Technology Integration: Implementing color systems and design in modern tech stacks
- UX Consultation: Evidence-based UX improvements and optimization
- Brand Identity: Remarkable brand differentiation through color and design
- Speaking & Workshops: Sharing vulnerability and ideas on stages`,
    metadata: {
      title: 'Services & Deliverables',
      tags: ['services', 'deliverables', 'pricing']
    }
  },
  {
    id: 'conversations-with-coriano-harris',
    source: 'blog',
    content: `Local Stories March 25, 2025 Conversations with Coriano Harris Local Stories Share Tweet Pin Today we'd like to introduce you to Coriano Harris Alright, so thank you so much for sharing your story and insight with our readers. To kick things off, can you tell us a bit about how you got started? My journey into tech wasn't a straight line—it was a series of curiosity-fueled leaps. It all started when I was a tech support rep, troubleshooting issues and helping users navigate their digital roadblocks. One day, I got the opportunity to be a game tester, and that's when everything changed. As I worked alongside developers and designers, I couldn't help but ask question after question. Why are you doing it this way? How does that work? The logic, creativity, and problem-solving behind their work fascinated me—it was like a tattoo on my heart. I couldn't ignore it. I had to dive in. That drive led me to a seven-month intensive UX/UI technical program. Learning design thinking, user research, and interface design was eye-opening. But then, I saw developers typing what looked like magical symbols in a text editor, turning ideas into reality. And I thought, I want to do that too. I wasn't satisfied with just handing off designs—I wanted to bring them to life myself. That hunger pushed me into another seven-month full-stack development technical program, where I was hit with a flood of WTF moments—data structures, algorithms, and the MERN (MongoDB, Express, React, Node) stack. It was intense, but I thrived on the challenge. Right after that, I landed my first tech job at a small startup as a front-end developer. But my insatiable curiosity didn't stop there. I started blending UX/UI into my workflow, using FullStory to analyze user behavior and improve experiences. That's when I realized my true superpower: combining strategy, research, design, and code to solve problems. I got to where I am by asking questions, standing up for myself, showing up, and constantly trying to understand why—why users behave the way they do, why technologies work the way they do. And here's the most interesting part: "I'm a better designer because of my strategy, research, and development experience." "I'm a better developer because of my strategy, research, and design background." Balancing both worlds takes energy and effort, but as long as I have the grit, I'll keep pushing forward—because this journey is far from over. Would you say it's been a smooth road, and if not what are some of the biggest challenges you've faced along the way? The biggest challenge on my journey wasn't learning UX, UI, or development—it was convincing others that I could excel in all of them. Many companies wanted to box me in: You're either a designer or a developer—pick one. I understood their hesitation, so I didn't push back outright. Instead, I strategically played the long game. I agreed to be an onlooker, observing and absorbing as much as I could. But with my sales chops, I made a compelling case: if I stayed exposed to both design and development, I'd be even more valuable in my role. Over time, I proved that specialization doesn't have to mean limitation. My ability to bridge strategy, research, design, and code made me an asset, not an outlier. By constantly seeking knowledge, asking the right questions, and demonstrating how these disciplines complement each other, I carved out a unique space for myself—one where I didn't have to choose between my passions. The truth is, I thrive at the intersection of design and development. And while it takes energy to stay sharp in both worlds, I wouldn't have it any other way. Appreciate you sharing that. What else should we know about what you do? I'm a Full-Stack Creative Technologist who thrives at the intersection of design, development, and strategy. I specialize in: Design Systems & Front-End Architecture – Bridging the gap between UX/UI and engineering to create scalable, cohesive component libraries. UI Design – Crafting intuitive, accessible, and visually engaging user interfaces that enhance digital experiences. UX Research & Data-Driven Design – Leveraging user behavior insights (e.g., FullStory) to inform design and development decisions. Full-Stack Development (MERN & Angular) – Writing clean, efficient code to bring designs to life while optimizing performance and accessibility. Storybook & Developer Experience – Implementing best practices to improve documentation, collaboration, and UI consistency across teams. What I'm Known For I'm known for my insatiable curiosity and ability to connect the dots across disciplines. I ask why—constantly. Whether it's understanding user behavior, refining a component's usability, or optimizing front-end performance, I dig deep to find the best solution. What I'm Most Proud Of I'm most proud of carving my own path in tech, despite the pressure to fit into a single role. From tech support to game testing, UX`,
    metadata: {
      title: 'Conversations with Coriano Harris - Voyage Memphis Magazine',
      date: '2025-03-25',
      url: 'https://memphisvoyager.com/interview/conversations-with-coriano-harris',
      tags: ['blog', 'interview', 'career-journey'],
    }
  },
  {
    id: 'colorcode-events-speaker',
    source: 'blog',
    content: `Hue Got This! Using Coloristic to Drive Action in UI Designs and Interfaces ColorCode: Buffalo 2025 Color isn't just about aesthetics—it's a powerful tool for guiding user behavior and driving action. In this engaging and interactive session, we'll explore how color psychology influences decision-making, how to drive action through strategic color choices in UI designs and interfaces.`,
    metadata: {
      title: 'Coriano Harris | ColorCode Events',
      date: '2025-12-23',
      url: 'https://colorcode.events/speaker/coriano-harris/',
      tags: ['blog', 'speaking', 'color-psychology'],
    }
  },
]

/**
 * Add your LinkedIn content here
 * You can export your LinkedIn profile or manually add key content
 * 
 * To add your LinkedIn profile:
 * 1. Go to your LinkedIn profile
 * 2. Copy your "About" section text
 * 3. Copy key posts/articles that showcase your expertise
 * 4. Add them below with proper metadata
 */
export const linkedinContent: BrandKnowledge[] = [
  {
    id: 'linkedin-profile',
    source: 'linkedin',
    content: `Contact
corianoharrispro@gmail.com
www.linkedin.com/in/corianoharris
(LinkedIn)
Top Skills
Teaching
JavaServer Pages (JSP)
Mentoring
Languages
Japanese (Elementary)
English (Native or Bilingual)
Certifications
Programming in HTML5 with
JavaScript and CSS3 - Exam 70-480
Enterprise Design Thinking
User Experience Design
Full-Stack Development (Front-End
Programming)
Publications
First Non-Synidcated Cartoonist
to be accepted in Charles Schulz
Museum Archive
Stand By Me Comics
Coriano Harris
Founder of SpeciNate (beta SaaS for endangered wildlife) • Product-
minded Full-Stack Product Technologist • 40% faster workflows for
cities, investors & conservation • Open to FT roles or fixed-price
projects
United States
Summary
Cut the time it takes founders to meet the right investors by 40%
Help the resolve blight cases 30% faster, bringing millions back to
neighborhoods
Boost engagement 40% by replacing a painful 15–year–old financial
portal
Currently leading — the hub we hope will become the home for
endangered–species conservation (launching 2026)
Whether it's a broken platform losing trust, a legacy system that's
holding you back, or a vision that keeps getting stuck in meetings
— I get in the trenches, simplify the complexity, and ship something
clean, fast, and impactful.
Fixed-price, outcome-focused projects (6–12 months) where we
agree on the result upfront and I deliver it — no hourly billing, no
surprises.
The right full-time role (Product Technologist, Design Technologist,
UX Researcher, UI Designer, Frontend Developer, etc.) at a mission-
aligned organization where I can own the product stack and its real-
world impact for years to come.
If you're working on something that matters and you're tired of slow
progress or "it's good enough" solutions, I'd love to hear what you're
trying to make happen.
Drop me a message and tell me the one outcome you care about
most in the next year. Happy to hop on a quick call and see if there's
a way I can help — even if it's just some free advice.
@. | DMs open
Experience
SpeciNate
Founder // CEO // CTO // CXO
March 2025 - Present (10 months)
Memphis, Tennessee, United States
Conservation orgs, researchers, and donors waste hours hunting scattered
data and can't turn insight into fast action.
40%+ in private beta (measured via workflow analytics). Public launch 2026.
I lead everything end-to-end: strategy, UX, design system, full-stack product.
Launching publicly 2026.
Technologies: Next.js, TypeScript, React.js, Supabase, SQL, Tailwind, Figma
Invest Intros
Founding Full Stack Product Technologist
July 2025 - October 2025 (4 months)
40% → more deals closed, faster (measured pre/post launch).
Founders and investors drowned in back-and-forth emails and Calendly ping-
pong.
Built the entire platform from zero: real-time availability, smart matching, one-
click booking. No more "what times work for you?" hell.
Technologies: Next.js, React.js, TypeScript, MongoDB, AWS, Tailwind, Figma
City of Memphis
Founding Full-Stack Product Technologist
April 2025 - August 2025 (5 months)
Memphis, Tennessee, United States
Paper-based, siloed reporting made blight drag on for months.
Single-handedly designed and shipped an accessible, API-connected portal
that unified reporting, tracking, and dashboards for city staff.
Technologies: Next.js, React.js, TypeScript, REST APIs, Figma, Tailwind, Neon, Google Maps API
Memphis Technology Foundation
Lead Product Engineer
November 2024 - February 2025 (4 months)
Memphis, Tennessee, United States
Local auto repair shop was invisible online. No website, no booking system, no
reviews — customers had to drive by or hear about them from a friend.
Led a tiny team (2 UX/UI designers + 1 full-stack developer)
Designed the entire experience in Figma (mobile-first, trust-heavy, dead-
simple booking flow)
Built transparent service + pricing pages, before/after gallery, review
integration
Added one-click appointment booking and local SEO so they now dominate
"auto repair Bartlett" searches
Outcome: Shop owner went from 2–3 random calls per week to multiple
bookings per day and had to hire another mechanic.
Technologies: Figma, Next.js, React.js, TypeScript, Tailwind, Vercel, CallRail
Cetera Financial Group
Lead Design Technologist
October 2023 - August 2024 (11 months)
Design–dev handoff was chaos; every team built their own buttons.
Audited, rebuilt, and documented an enterprise component library in Storybook
and Figma. Trained 10+ engineers and designers.
Technologies: Angular, MUI ( Angular ), Storybook, Figma, Zeplin, Design Tokens, NPM
Ally
Senior Front End Developer
January 2022 - April 2023 (1 year 4 months)
Slow, outdated Ember.js apps made users hate logging in.
Led migration to React micro-frontends, shipped new Alerts experience, and
optimized performance end-to-end.
Technologies: React, Redux, Ember.js → React, Jest, Cypress
St. Jude Children's Research Hospital - ALSAC
Mid Front End Developer
November 2020 - December 2021 (1 year 2 months)
Memphis, Tennessee, United States
Fragmented donor journeys across five separate portals.
Built reusable component library and centralized "My Support Account"
experience for millions in donations.
Technologies: React, Ember, HTML5, CSS3, JavaScript, Figma, AEM, Java
FedEx
Senior User Experience Designer
November 2019 - August 2020 (10 months)
Cross-team handoffs were a 3-day mess because every designer used
different tools and assets. Rework was constant, morale was low, and projects
kept slipping.
Co-led the creation and adoption of a unified, scalable design system.
Consolidated InVision, Sketch, and Adobe XD libraries into one single source
of truth. Standardized components, tokens, and handoff process
Technologies: Sketch, InVision DSM, Adobe XD, Figma (migration prep), Angular, UserTesting.com
CodeCrew
Web Design Instructor
August 2019 - October 2019 (3 months)
Greater Memphis Area
Taught project-based web & mobile development to underrepresented
students. Created the entire curriculum from scratch.
Technologies: HTML5, CSS3, JavaScript, Node.js, Swift, App Inventor
FedEx Corporation
Core Contributor Product Developer
June 2019 - August 2019 (3 months)
Greater Memphis Area
Multi-day email chains and SharePoint nightmares for document workflows.
Designed and shipped PDOM portal + modern filtering experiences that
actually worked.
Technologies: HTML5, CSS3, JavaScript, SharePoint
C4 Atlanta
Founding Product Designer/Developer
February 2019 - June 2019 (5 months)
Greater Atlanta Area
Artists abandoned the old subscription flow because it felt clunky, unclear, and
disconnected from their creative workflow.
Owned the entire rebuild end-to-end
Ran user research + usability testing with real artists
Designed clean, intuitive flows in Adobe XD
Built the front-end with reusable JSP templates, HTML, CSS, and Ruby on
Rails integration
Collaborated daily with 1 dev and 3 stakeholders
Technologies: Adobe XD, JSP Templates, Ruby on Rails, HTML/CSS, Google Analytics
PartCycle Technologies
UX Researcher/Frontend Developer
January 2018 - January 2019 (1 year 1 month)
Florence, Alabama
Rebuilt e-commerce dashboard and ran continuous UX testing with FullStory.
Technologies: Ember.js, QUnit, CSS3, FullStory, Adobe XD
The Cloverleaf School
Enrichment/CS Teacher
November 2016 - December 2017 (1 year 2 months)
Decatur, GA
Students with different learning needs were disengaged in one-size-fits-all
lessons, and teachers wasted 20–30 minutes per class wrestling with books,
supplies, and broken devices.
Designed and taught adaptive, high-energy enrichment classes (project-based,
multi-modal learning)
Built and ran a virtual library + supply checkout system so everything was
ready in <2 minutes
Kept 40+ Macs and iPads classroom-ready (imaging, updates, repairs, MDM)
Trained teachers on quick tech workflows that actually stuck
Technologies: Apple School Manager, Mosyle MDM, Google Workspace, project-based learning frameworks
Education
The Iron Yard
Full-Stack Engineering Certification , Full-Stack Development
Mentor Memphis Grizziles
Mentor Training · (2019 - 2019)
General Assembly
User Experience Design Certification, UX/UI Research and Design
Dominican University of California
Bachelor of Fine Arts - BFA, Graphic Design
Dominican University of California
Bachelor of Science - BS, Coloristic`,
    metadata: {
      title: 'Coriano Harris LinkedIn Profile',
      date: '2025-12-23',
      url: 'https://www.linkedin.com/in/corianoharris/',
      tags: ['linkedin', 'profile', 'resume'],
    }
  },
  {
    id: 'auto-layout-figma-without-headache-coriano-harris-cfshc-2',
    source: 'linkedin',
    content: `Auto-Layout in Figma (Without the Headache) Report this article Coriano H. Coriano H. Published Apr 8, 2025 + Follow Auto layout in Figma can feel a bit intimidating —especially when you're trying to explain your design decisions to stakeholders or developers. If bridging the gap between design and code feels challenging, you're definitely not alone. This guide is here to support you by breaking down how the auto layout panel tools works and how its tools translate to CSS3. We'll walk through it together. Sizing & Positioning (How Big & Where Things Go) This is where you control width, height, and placement of elements inside a frame. Figma Auto-Layout Controls Fill → Expands to take up all available space Hug → Shrinks to fit the content Fixed → Stays the same size no matter what Absolute Positioning → Moves freely without affecting other elements Clip Content → Hides anything that goes outside the frame CSS Equivalent Rules width: auto | 100px | 100%; height: auto | 50px | 100%; position: absolute | relative; overflow: hidden | visible; If an element isn't resizing correctly, check if it's set to Hug, Fill, or Fixed —this controls how flexible it is. Layout & Spacing (How Elements Are Arranged & Spaced Out) This controls how elements inside a frame are positioned and spaced. Figma Auto-Layout Controls Direction: Horizontal (side by side) or Vertical (stacked) Padding: Space inside the frame Spacing Between Items: The gap between elements Alignment: Controls how items are positioned within the frame Packed vs. Space Between: I tems stay close together vs Items spread out evenly CSS Equivalent Rules display: flex; flex-direction: row | column; justify-content: space-between | flex-start; align-items: center; padding: 16px; gap: 8px; If spacing looks off, check whether the alignment is Packed or Space Between —this can make a huge difference. Advanced Settings (Fine-Tuning Your Layout) For more precise control over stacking order, border behavior, and text alignment. Figma Auto-Layout Controls Strokes & Borders: Choose whether borders take up space Canvas Stacking Order: Controls which item appears on top Align Text Baseline: Ensures text aligns properly with other elements CSS Equivalent Rules box-shadow: inset 0 0 0 1px; z-index: 1; vertical-align: baseline; If text alignment looks strange, try using Align Text Baseline to keep everything visually balanced. Additional Tips for Working with Auto-Layout Use Frames, Not Groups. Auto-Layout only works inside frames. If something breaks, check if it's a group. If an option is missing, check your selection. Some settings only appear based on what element you're editing. Experiment with Fill vs. Hug. This is the key to making sure your layouts adapt properly. Once you get the hang of it, Auto-Layout makes your designs behave similar to real code , saving you time and effort. Let me know if you have any questions! #Figma #AutoLayout #UXDesign #WebDesign`,
    metadata: {
      title: 'Auto-Layout in Figma (Without the Headache)',
      date: '2025-04-08',
      url: 'https://www.linkedin.com/pulse/auto-layout-figma-without-headache-coriano-harris-cfshc',
      tags: ['linkedin', 'figma', 'design', 'tutorial'],
    }
  },
]

/**
 * Add your UX Research findings here
 * Include research studies, methodologies, insights, and findings
 */
export const uxResearchContent: BrandKnowledge[] = [
  {
    id: 'ux-research-overview',
    source: 'case-study',
    content: `Coriano Harris – UX Research Overview
I've done UX research in every role—Founder/CEO, Lead UX/UI Engineer, and
Full-Stack Product Technologist. My focus is understanding users, testing solutions in
real situations, and turning what I learn into clear actions for teams. I'm certified in
UX Research and UI Design from General Assembly.
My professional work was under NDA, but I can share safe examples that show my
approach and impact.
Relevant Experience & How It Helped
SpeciNate – Founder & CEO
● What I did: Watched people use the app and tested new designs with them
one-on-one.
● What happened: People had trouble with a task. I simplified the steps, and it
became much easier.
● How I shared it: Showed to the designer and developer exactly what I
observed so we could fix it quickly.
● UX Tools & Methods: One-on-one prototype testing, guerrilla interviews, live
workflow observation.
● Products Used: Figma, Google Meet, Zoom.
A+ Automotive – Lead UX/UI Engineer
● What I did: Observed users clicking around the app and tracked where they
got confused.
● What happened: Some sections were skipped. We updated labels and
improved the app right away.
● How I shared it: Reports and live sessions for the team.
● UX Tools & Methods: Usability testing, tree testing, live observation, focus
groups.
● Products Used: Figma, Excel, Word, Google Docs
Cetera – Design Technologist
● What I did: Organized feedback and ran card sorting to simplify dashboards.
● What happened: Navigation became easier, and people made fewer mistakes.
● How I shared it: Created clear boards and reports for the team.
● UX Tools & Methods: Analytics, card sorting, affinity mapping, surveys, small
focus groups (~10 and ~25 participants).
● Products Used: Miro, Figma.
FedEx – UX/UI Designer / Frontend Developer
● What I did: Observed staff using the PDOM dashboard to see what slowed
them down.
● What happened: Small changes saved about 20% of their time.
● How I shared it: Showed managers and staff exactly what I observed.
● UX Tools & Methods: Live workflow observation.
● Products Used: Word, Excel, UserTesting.com, Adobe XD
Partcycle – Frontend / UX/UI Designer
● What I did: Watched users online and noted where they got stuck.
● What happened: Found patterns in navigation, suggested improvements.
● How I shared it: Created dashboards and reports for the team.
● UX Tools & Methods: Remote usability testing, session recordings, guerrilla
interviews.
● Products Used: FullStory, UserTesting.com, Figma, Miro, Zoom.
How I Build Trust & Get Honest Feedback
● Start interviews casually—no wrong answers.
● Ask open-ended questions and let users show their natural workflow.
● Work with designers and developers onsite to immediately apply insights.
● Example: At PartCycle, savage yard staff pointed out confusing inventory
labels, and designers sketched fixes in real time.
Research Approaches & Tools
● In-Person / One-on-One Interviews: Build trust and get deep insights.
● Usability & Prototype Testing: Test ideas before development.
● Surveys: Collect feedback from many users.
● Tree Testing / Card Sorting: Make navigation clear and intuitive.
● Affinity Mapping: Organize qualitative data into patterns and actions.
● Analytics & Behavior Observation: Confirm patterns with numbers.
Example Non-Leading Questions I might ask in this role.
● "Can you walk me through how you usually do this task?"
● "Which parts feel slow or confusing?"
● "Is there info you wish was easier to find?"
● "If you could change something here, what would it be?"
● "Can you show me how you would do this task?"
Impact (NDA-Safe)
● Improved workflows for PartCycle, SpeciNate, and others.
● Reduced friction, increased task completion, and simplified navigation.
● Synthesized findings with card sorting and affinity mapping to create
actionable insights.
Tools & Products Used: FullStory, UserTesting.com, Figma, Miro, Mural, Google Forms,
Excel, Word, Zoom, Google Meets, Teams.
Summary
I weave UX research into every part of product development—from prototypes to live
workflows. I focus on building trust, getting deep feedback, and working with teams
to turn insights into action. While most of my work is under NDA, I can talk in detail
about methods, approaches, and results. My goal is to improve usability, efficiency,
and trust for every user.`,
    metadata: {
      title: 'Coriano Harris – UX Research Overview',
      date: '2025-12-23',
      tags: ['ux-research', 'user-research', 'usability', 'case-study'],
    }
  },
]

/**
 * Add your talk transcripts/summaries here
 */
export const talkContent: BrandKnowledge[] = [
  // Add your talk content here
  // {
  //   id: 'talk-1',
  //   source: 'talk',
  //   content: `Talk transcript or detailed summary...
  //   
  //   Key points covered:
  //   - Point 1
  //   - Point 2
  //   - Point 3
  //   
  //   Main takeaways:
  //   - Takeaway 1
  //   - Takeaway 2`,
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
  ...uxResearchContent,
  ...talkContent
]

