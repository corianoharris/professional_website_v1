"use client"

interface MaiScrollSectionProps {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
  variant?: "default" | "muted" | "dark"
  layout?: "center" | "alternate"
}

/**
 * Page section: title, optional subtitle, content. Renders as-is, with no scroll animation.
 */
export function MaiScrollSection({
  id,
  title,
  subtitle,
  children,
  variant = "default",
  layout = "center",
}: MaiScrollSectionProps) {
  const bgClass =
    variant === "muted"
      ? "bg-muted/20"
      : variant === "dark"
        ? "bg-foreground text-background"
        : ""

  return (
    <section
      id={id}
      className={`py-16 md:py-24 px-6 scroll-mt-24 ${bgClass}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-balance mb-4 ${variant === "dark" ? "text-background" : "text-foreground"}`}
          style={{ fontFamily: "var(--font-baloo2), sans-serif" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`text-lg md:text-xl mb-12 max-w-2xl ${variant === "dark" ? "text-background/80" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
        <div>{children}</div>
      </div>
    </section>
  )
}
