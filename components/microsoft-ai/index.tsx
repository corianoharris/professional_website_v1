"use client"

import { MaiHeader } from "./Header"
import { MaiHero } from "./Hero"
import { MaiSection } from "./Section"
import { MaiFooter } from "./Footer"
import { MaiNewsSection } from "./NewsSection"
import { MaiProductsSection } from "./ProductsSection"

export function MicrosoftAIPage() {
  return (
    <div className="min-h-screen">
      <MaiHeader />
      <main id="main-content">
        <MaiHero />

        {/* Mission */}
        <MaiSection id="about">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Microsoft AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We are a collective of builders, thinkers, and creators working to design technology
            that earns trust, amplifies human potential, and makes life meaningfully better.
          </p>
          <a
            href="https://microsoft.ai/team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-6 text-[#0066ff] font-semibold hover:underline"
          >
            MAI Team
          </a>
        </MaiSection>

        {/* Latest news */}
        <MaiNewsSection />

        {/* Careers */}
        <MaiSection id="careers" variant="muted">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Careers</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We have offices in cities across the globe.
            <br />
            Where will you join?
          </p>
          <a
            href="https://microsoft.ai/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[#0066ff] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0055dd] transition-colors"
          >
            Explore careers
          </a>
        </MaiSection>

        {/* Quote */}
        <MaiSection variant="dark">
          <blockquote className="max-w-3xl">
            <p className="text-2xl md:text-3xl font-medium text-background leading-relaxed">
              I want to create AI that makes us more human, that deepens our trust and understanding
              of one another, and that strengthens our connections to the real world.
            </p>
            <footer className="mt-8">
              <p className="text-background/90 font-semibold">Mustafa Suleyman</p>
              <p className="text-background/70 text-sm">CEO Microsoft AI</p>
            </footer>
          </blockquote>
          <a
            href="https://microsoft.ai/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-8 text-background/90 font-semibold hover:text-background underline"
          >
            More about MAI
          </a>
        </MaiSection>

        {/* Core products */}
        <MaiProductsSection />

        <MaiFooter />
      </main>
    </div>
  )
}
