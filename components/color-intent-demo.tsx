"use client"

const heroIntents = [
  { name: "Trust", color: "#06b6d4", delay: "0s" },
  { name: "Growth", color: "#14b8a6", delay: "0.2s" },
  { name: "Energy", color: "#f97316", delay: "0.4s" },
  { name: "Belonging", color: "#7c3aed", delay: "0.6s" },
  { name: "Focus", color: "#1e40af", delay: "0.8s" },
]

const processIntents = [
  { name: "Clarity", color: "#06b6d4", delay: "0s" },
  { name: "Precision", color: "#14b8a6", delay: "0.2s" },
  { name: "Action", color: "#f97316", delay: "0.4s" },
  { name: "Confidence", color: "#7c3aed", delay: "0.6s" },
  { name: "Conviction", color: "#1e40af", delay: "0.8s" },
]

/** Visual spectrum colors mapped to intent words: red→Attention, orange→Energy, etc. */
const spectrumIntents = [
  { name: "Attention", color: "#ef4444", delay: "0s" },
  { name: "Energy", color: "#f97316", delay: "0.15s" },
  { name: "Clarity", color: "#eab308", delay: "0.3s" },
  { name: "Growth", color: "#22c55e", delay: "0.45s" },
  { name: "Trust", color: "#06b6d4", delay: "0.6s" },
  { name: "Focus", color: "#3b82f6", delay: "0.75s" },
  { name: "Belonging", color: "#8b5cf6", delay: "0.9s" },
]

/**
 * Animated Color Intent Demo. Visualizes semantic tokens → intent tokens.
 * Hero: Visual spectrum colors with intent words (Attention, Energy, Clarity, etc.).
 * Process (how it works): Clarity, Precision, Action, Confidence, Conviction.
 */
export function ColorIntentDemo({
  variant = "dark",
  preset = "spectrum",
}: {
  variant?: "dark" | "light"
  preset?: "hero" | "process" | "spectrum"
}) {
  const intents =
    preset === "process"
      ? processIntents
      : preset === "spectrum"
        ? spectrumIntents
        : heroIntents
  const label = preset === "process" ? "Chaos → Clarity" : "Semantic → Intent"

  const textClass = variant === "light" ? "text-foreground/70" : "text-white/70"
  return (
    <div className="flex flex-col items-center gap-4" aria-hidden>
      <p className={`text-xs uppercase tracking-widest font-medium ${textClass}`}>
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {intents.map((intent) => (
          <div
            key={intent.name}
            className="group relative"
            style={{
              animation: "color-intent-pulse 3s ease-in-out infinite",
              animationDelay: intent.delay,
            }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundColor: intent.color,
                boxShadow: `0 0 20px ${intent.color}40`,
              }}
            />
            <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${variant === "light" ? "text-foreground/90" : "text-white/90"}`}>
              {intent.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
