/** What color confusion looks like from the inside. Each symptom is a full-bleed block in the intent it breaks. */
const symptoms = [
  {
    n: "01",
    where: "At the button",
    intent: "Trust · #0e7490 · 5.4:1",
    line: "Users pause before they click.",
    detail: "The main action looks like everything else, so they read instead of act.",
    bg: "var(--trust-s)",
  },
  {
    n: "02",
    where: "In support",
    intent: "Growth · #0f766e · 5.5:1",
    line: "The same question, every week.",
    detail: "Was that saved? Did it go through? Color was supposed to answer that.",
    bg: "var(--growth-s)",
  },
  {
    n: "03",
    where: "In the audit",
    intent: "Energy · #c2440c · 5.1:1",
    line: "The contrast check fails again.",
    detail: "Someone fixes one screen. The next release brings it back.",
    bg: "var(--energy-s)",
  },
]

export function ProofMai() {
  return (
    <section id="proof" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">
        Sound familiar?
      </h2>
      <div className="blocks">
        {symptoms.map((s) => (
          <div key={s.n} className="block" style={{ background: s.bg }}>
            <div className="wrap">
              <div className="meta label">
                <span className="big" aria-hidden>
                  {s.n}
                </span>
                <span>
                  {s.where}
                  <br />
                  {s.intent}
                </span>
              </div>
              <div>
                <h3>{s.line}</h3>
                <p>{s.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="verdict">
        <div className="wrap">
          <p>
            Sound familiar? <b>That pause shows up in tickets, and in deals that quietly don&apos;t close.</b>
          </p>
          <a className="btn btn-line" href="#palette-read">
            See it in your colors ↓
          </a>
        </div>
      </div>
    </section>
  )
}
