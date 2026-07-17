import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { services } from '../data/services'

export default function ServicesGrid({ limit, showHeading = true }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <Section className="bg-white">
      {showHeading && (
        <SectionHeading
          eyebrow="What We Do"
          title="Moving services for every need"
          description="From a single sofa to a full villa or office, our teams are equipped and trained for it."
        />
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group relative rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="h-11 w-11 -mt-14 mb-4 relative rounded-xl bg-white shadow-card flex items-center justify-center text-brand">
                <s.icon size={20} />
              </span>
              <h3 className="font-display font-semibold text-lg text-navy">{s.title}</h3>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{s.short}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand mt-4 group-hover:gap-2.5 transition-all">
                Learn More <ArrowUpRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {limit && (
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white font-semibold hover:bg-navy-light transition-colors"
          >
            View All Services
          </Link>
        </div>
      )}
    </Section>
  )
}
