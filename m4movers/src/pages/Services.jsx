import { Section } from '../components/Section'
import ServicesGrid from '../components/ServicesGrid'
import FaqAccordion from '../components/FaqAccordion'

export default function Services() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-brand-dark/40" />
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 300" aria-hidden="true">
          <path d="M -50 150 Q 300 50, 600 150 T 1250 150" stroke="#FF7A29" strokeWidth="2" fill="none" className="route-line" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-24 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full mb-6">
            Our Services
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight tracking-tight max-w-2xl mx-auto text-balance">
            Fifteen ways we help you move
          </h1>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            Every service below is delivered by the same trained crews, transparent pricing, and 24/7 support.
          </p>
        </div>
      </section>

      <ServicesGrid showHeading={false} />
      <FaqAccordion />
    </>
  )
}
