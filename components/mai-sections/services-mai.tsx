import type React from "react"

interface Offer {
  outcome: string
  name: string
  youGet: React.ReactNode
  price: string
  per: string
}

interface Rung {
  step: string
  /** The Color Code intent that names this kind of work */
  intent: string
  title: string
  solid: string
  text: string
  offers: Offer[]
}

const rungs: Rung[] = [
  {
    step: "Step 1",
    intent: "Trust · no risk",
    title: "Talk first",
    solid: "var(--trust-s)",
    text: "var(--trust)",
    offers: [
      {
        outcome: "Find the one thing to fix first.",
        name: "15-min Color Call",
        youGet: "a short screen-share where I show you where your color is costing you.",
        price: "Free",
        per: "15 minutes",
      },
    ],
  },
  {
    step: "Step 2",
    intent: "Energy · same day",
    title: "Get a report",
    solid: "var(--energy-s)",
    text: "var(--energy)",
    offers: [
      {
        outcome: "See what every color on a page tells users, including color-blind users.",
        name: "Page check report",
        youGet: "a PDF with the page's mood, every contrast failure, and the fix for each.",
        price: "$499",
        per: "per page",
      },
      {
        outcome: "Find the colors in your palette that work against the feeling you want.",
        name: "Palette mood report",
        youGet: "a PDF with the mood of every color, and a replacement for each one that needs work.",
        price: "$499",
        per: "per token file, up to 60 colors",
      },
    ],
  },
  {
    step: "Step 3",
    intent: "Growth · in your code",
    title: "Have it done",
    solid: "var(--growth-s)",
    text: "var(--growth)",
    offers: [
      {
        outcome: "Color names your whole team can read.",
        name: "The Color Naming Cleaner",
        youGet: (
          <>
            every color in your repo renamed for its job, so <code>slate-200</code> finally means something, plus a
            before-and-after clarity summary.
          </>
        ),
        price: "$1,500",
        per: "per repository",
      },
      {
        outcome: "A palette that makes users feel safe enough to act.",
        name: "Palette mood testing",
        youGet: "mood reports for every token file, plus my review of what to change and why.",
        price: "$2,500",
        per: "per repository",
      },
    ],
  },
]

const bundle = [
  { label: "Page check reports, 3 pages", price: "$1,497" },
  { label: "Color naming cleanup", price: "$1,500" },
  { label: "Palette mood testing", price: "$2,500" },
]

function OfferBlock({ o }: { o: Offer }) {
  return (
    <div className="offer">
      <p className="out">{o.outcome}</p>
      <h4>{o.name}</h4>
      <p className="get">
        <b>You get</b> {o.youGet}
      </p>
      <div className="pr">
        <b>{o.price}</b>
        <span>{o.per}</span>
      </div>
    </div>
  )
}

export function ServicesMai() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label" style={{ color: "var(--trust)" }}>
              Services · four steps
            </span>
            <h2>Where to start.</h2>
          </div>
          <p>
            Four steps, from a free call to a system built into your code. Each step&apos;s color tells you what kind
            of work it is.
          </p>
        </div>

        <ol className="ladder">
          {rungs.map((r, i) => (
            <li key={r.step} className="rung" style={{ "--c": r.solid, "--t": r.text } as React.CSSProperties}>
              <div className="rung-h">
                <span className="label">
                  {r.step} · {r.intent}
                </span>
                <h3>{r.title}</h3>
              </div>
              <div className="offers">
                {r.offers.map((o) => (
                  <OfferBlock key={o.name} o={o} />
                ))}
                {i === 0 && (
                  <a className="btn btn-hot rung-cta" href="#contact">
                    Book the call →
                  </a>
                )}
              </div>
            </li>
          ))}

          <li
            className="rung rung-top"
            style={{ "--c": "var(--belonging-s)", "--t": "var(--belonging)" } as React.CSSProperties}
          >
            <div className="rung-h">
              <span className="label">Step 4 · Belonging · built in</span>
              <h3>Install the system</h3>
            </div>
            <div className="offers">
              <div className="offer">
                <p className="out">Your whole color system, fixed and kept fixed.</p>
                <h4>The Color Code System</h4>
                <ul className="incl">
                  {bundle.map((b) => (
                    <li key={b.label}>
                      <span>{b.label}</span>
                      <span>{b.price}</span>
                    </li>
                  ))}
                  <li className="only">
                    <span>Naming rules in your code, so new colors follow them</span>
                    <span>Only here</span>
                  </li>
                </ul>
                <div className="pr">
                  <b>$3,999</b>
                  <span>per repository</span>
                </div>
                <p className="deal">
                  <s>$5,497</s>
                  <span className="save">Save $1,498</span>
                </p>
              </div>
            </div>
          </li>
        </ol>
        <p className="swipe label">Swipe for all four steps →</p>
      </div>
    </section>
  )
}
