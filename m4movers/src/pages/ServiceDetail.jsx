import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Section, SectionHeading } from '../components/Section'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!service) return <Navigate to="/services" replace />

  const related = services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <section className="relative bg-navy overflow-hidden">
        <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
            <ArrowLeft size={15} /> All Services
          </Link>
          <span className="h-14 w-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-accent mb-5">
            <service.icon size={26} />
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white max-w-2xl text-balance">{service.title}</h1>
          <p className="mt-4 text-white/70 max-w-xl leading-relaxed">{service.short}</p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <img src={service.image} alt={service.title} className="rounded-3xl w-full h-72 sm:h-96 object-cover shadow-card mb-8" />
            <h2 className="font-display font-bold text-2xl text-navy mb-4">Overview</h2>
            <p className="text-ink-soft leading-relaxed">{service.description}</p>

            <h3 className="font-display font-semibold text-xl text-navy mt-9 mb-4">What's included</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 bg-mist rounded-xl p-4">
                  <CheckCircle2 size={18} className="text-brand shrink-0" />
                  <span className="text-sm font-medium text-ink">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-navy rounded-3xl p-7 sticky top-24">
              <h3 className="font-display font-semibold text-lg text-white mb-2">Get a price for this service</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">Tell us your move details and we'll send a fixed quote — usually within the hour.</p>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors"
              >
                Request Price <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl glass text-white font-semibold py-3.5 hover:bg-white/15 transition-colors"
              >
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <SectionHeading eyebrow="Related Services" title="You might also need" center={false} />
        <div className="grid sm:grid-cols-3 gap-6">
          {related.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-card transition-shadow">
              <div className="h-36 overflow-hidden">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h4 className="font-display font-semibold text-navy">{s.title}</h4>
                <p className="text-sm text-ink-soft mt-1.5 line-clamp-2">{s.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
