export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-background/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="space-y-2">
            <p className="text-sm text-background/70">Dare greatly.</p>
            <p className="text-sm text-background/70">Start with WHY.</p>
            <p className="text-sm text-background/70">Be remarkable.</p>
            <p className="text-sm text-background/70">Color as millions in connection and value.</p>
          </div>
          <div className="pt-4 border-t border-background/20 w-full max-w-md">
            <p className="text-sm text-background/70">
              © {new Date().getFullYear()} Your Name — Human-Driven Color Product Technologist
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
