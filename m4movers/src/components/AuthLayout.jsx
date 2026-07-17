import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <section className="min-h-[calc(100vh-72px)] bg-mist flex items-center py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-soft bg-white">
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="M4 Movers"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
            <div className="relative h-full flex flex-col justify-between p-9 text-white">
              <Link to="/" className="flex items-center gap-2">
                <img src="/truck-icon.svg" alt="M4 Movers" className="h-9 w-9 rounded-lg" />
                <span className="font-display font-bold text-lg">M4 Movers</span>
              </Link>
              <div>
                <p className="font-display font-semibold text-2xl leading-snug text-balance">
                  15+ years moving homes and businesses across the UAE.
                </p>
                <p className="text-white/60 text-sm mt-3">Trusted by 10,000+ customers and counting.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-navy">{title}</h1>
            {subtitle && <p className="text-sm text-ink-soft mt-2">{subtitle}</p>}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-sm text-center text-ink-soft">{footer}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
