export function SectionHeading({ eyebrow, title, description, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-brand bg-brand-light px-3 py-1.5 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy tracking-tight text-balance">{title}</h2>
      {description && <p className="mt-4 text-ink-soft leading-relaxed">{description}</p>}
    </div>
  )
}

export function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
