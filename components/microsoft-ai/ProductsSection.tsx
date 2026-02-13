"use client"

import { useState } from "react"
import { MaiSection } from "./Section"

const products = [
  {
    id: "copilot",
    name: "Copilot",
    description:
      "Copilot is your AI companion that helps you think, create, and get things done, whether you're solving problems, exploring ideas, or just having a great conversation.",
  },
  {
    id: "bing",
    name: "Bing",
    description:
      "Bing is your AI-powered search engine and ally in generative search for quick answers, rewards, news, and more.",
  },
  {
    id: "edge",
    name: "Edge",
    description:
      "Microsoft Edge is the browser at the apex of performance and security, driving individuated experiences in AI-powered search, task completion, content creation, shopping, and gaming.",
  },
  {
    id: "groupme",
    name: "GroupMe",
    description:
      "GroupMe makes it easy to stay connected and organized with friends, family, classmates, or coworkers.",
  },
]

export function MaiProductsSection() {
  const [activeProduct, setActiveProduct] = useState("copilot")
  const product = products.find((p) => p.id === activeProduct) ?? products[0]

  return (
    <MaiSection id="products">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Core products and experiences
      </h2>
      <p className="text-muted-foreground mb-10 max-w-3xl">
        Our major consumer AI products include Copilot, Bing, GroupMe, Edge, and MSN. We also have
        teams working on Data, Security, Privacy, Monetization, Health, Responsible AI, Commerce,
        and Microsoft Advertising. Our mission is to build state of the art AI models, and create
        an AI companion for everyone.
      </p>

      {/* Product tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProduct(p.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeProduct === p.id
                ? "bg-[#0066ff] text-white"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Active product content */}
      <div className="rounded-xl border border-border bg-muted/30 p-8 min-h-[200px]">
        <h3 className="text-xl font-semibold text-foreground mb-4">{product.name}</h3>
        <p className="text-muted-foreground">{product.description}</p>
      </div>
    </MaiSection>
  )
}
