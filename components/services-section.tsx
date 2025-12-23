"use client"

export function ServicesSection() {
  const deliverables = [
    {
      title: "Building Communities",
      description: <>Creating spaces for <span className="highlighter">connection</span>, growth, and collaboration that bring people together around shared values and goals.</>,
      color: "bg-blue-500",
      category: "community",
    },
    {
      title: "Products that connect heart-first and stand out forever",
      description: <>Designing and developing products that resonate <span className="highlighter">emotionally</span> with users, creating lasting <span className="highlighter">connections</span> and memorable experiences.</>,
      color: "bg-purple-500",
      category: "product",
    },
    {
      title: "Millions in added revenue from trust and differentiation",
      description: <>Delivering solutions that build <span className="highlighter">trust</span>, differentiate brands, and drive measurable business results through strategic design and development.</>,
      color: "bg-cyan-500",
      category: "results",
    },
  ]

  const getCategoryColorHex = (category: string) => {
    switch (category) {
      case "community":
        return "#3b82f6" // blue-500
      case "product":
        return "#a855f7" // purple-500
      case "results":
        return "#06b6d4" // cyan-500
      default:
        return "#6b7280" // gray-500
    }
  }

  return (
    <section id="services" className="px-8 md:px-16 py-12 md:py-16 relative">
      {/* Top wave pattern */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: "80px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="servicesGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z" fill="url(#servicesGradientTop)" stroke="none" />
      </svg>

      <div className="relative max-w-6xl mx-auto mb-12 z-10 pt-4 overflow-hidden md:overflow-visible">
        <div className="mb-8 mt-0 md:-mt-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-4">DELIVERABLES</span>
        </div>
        
        <p className="text-xl md:text-2xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto font-semibold" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
          Brave, remarkable difference:
        </p>
        
        {/* Table of Contents Style Layout - No Borders */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto overflow-hidden md:overflow-visible">
          {deliverables.map((deliverable, index) => {
            const deliverableNumber = String(index + 1).padStart(2, '0')
            const isLeftColumn = index % 2 === 0
            const isThirdItem = index === 2
            
            return (
              <div
                key={index}
                className={`relative flex items-start gap-2 md:gap-3 min-h-[200px] ${isThirdItem ? 'md:col-span-2' : ''} md:overflow-visible`}
                style={{ overflow: 'visible' }}
              >
                {/* Large Vertical Number - Rotated Sideways with Color */}
                <div className={`hidden md:flex flex-shrink-0 items-center justify-center ${isLeftColumn ? 'order-1 md:-ml-32' : 'order-3 md:-mr-32'}`} style={{ overflow: 'visible' }}>
                  <div 
                    className="text-9xl lg:text-[10rem] font-black leading-none"
                    style={{ 
                      fontFamily: 'var(--font-baloo2), sans-serif',
                      fontWeight: 800,
                      transform: 'rotate(-90deg)',
                      transformOrigin: 'center',
                      whiteSpace: 'nowrap',
                      color: getCategoryColorHex(deliverable.category)
                    }}
                  >
                    {deliverableNumber}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLeftColumn ? 'order-2' : 'order-2'}`}>
                  <div className="mb-2 flex items-center gap-3">
                    {/* Mobile number - visible on mobile only */}
                    <span 
                      className="md:hidden text-4xl font-black leading-none"
                      style={{ 
                        fontFamily: 'var(--font-baloo2), sans-serif',
                        fontWeight: 800,
                        color: getCategoryColorHex(deliverable.category),
                        opacity: 0.3
                      }}
                    >
                      {deliverableNumber}
                    </span>
                    <span 
                      className={`${deliverable.color} px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider inline-block mb-2`}
                    >
                      {deliverable.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                    {deliverable.title}
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-foreground font-serif text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
                      {deliverable.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom wave pattern */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
        stroke="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="servicesGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        <path d="M0,40 Q300,20 600,40 T1200,40 L1200,60 L0,60 Z" fill="url(#servicesGradientBottom)" stroke="none" />
      </svg>
    </section>
  )
}
