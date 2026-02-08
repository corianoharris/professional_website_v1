export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-background/10" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="space-y-2">
            <p className="text-sm text-background/70" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Dare greatly.</p>
            <p className="text-sm text-background/70" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Start with WHY.</p>
            <p className="text-sm text-background/70" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Be remarkable.</p>
            <p className="text-sm text-background/70" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>Color as millions in connection and value.</p>
          </div>
          <div className="pt-4 border-t border-background/20 w-full max-w-md space-y-1">
            <p className="text-sm text-background/70" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
              © {new Date().getFullYear()} Coriano Harris, Color Intent Technologist™
            </p>
            <p className="text-xs text-background/60" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
              Intent-Driven Color Model™ | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
