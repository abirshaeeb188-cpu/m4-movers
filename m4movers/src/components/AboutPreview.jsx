import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Section } from './Section'

const points = ['Licensed & fully insured', 'Trained, background-checked crews', 'Transparent, fixed-price quotes']

export default function AboutPreview() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
            alt="M4 Movers team at work"
            className="rounded-3xl shadow-card w-full h-[420px] object-cover"
          />
          <div className="absolute -bottom-8 -right-4 sm:right-6 glass-light rounded-2xl shadow-soft p-5 max-w-[220px]">
            <p className="font-display font-bold text-2xl text-navy">15+ Years</p>
            <p className="text-xs text-ink-soft mt-1">Moving homes and businesses across the UAE since 2011</p>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-brand bg-brand-light px-3 py-1.5 rounded-full mb-4">
            About M4 Movers
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy tracking-tight text-balance">
            The UAE's trusted name in moving, since day one
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            M4 Movers began with a single truck and a promise: treat every customer's belongings like our own. Today
            we run a fleet of GPS-tracked vehicles and trained crews across all seven Emirates — but that promise
            hasn't changed.
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-brand-light">
              <p className="font-display font-semibold text-navy mb-1.5">Our Mission</p>
              <p className="text-sm text-ink-soft leading-relaxed">Make relocation stress-free with reliable, affordable, and careful moving services.</p>
            </div>
            <div className="p-5 rounded-2xl bg-accent-light">
              <p className="font-display font-semibold text-navy mb-1.5">Our Vision</p>
              <p className="text-sm text-ink-soft leading-relaxed">To be the UAE's most trusted moving company for homes and businesses alike.</p>
            </div>
          </div>

          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium text-ink">
                <CheckCircle2 size={18} className="text-brand shrink-0" /> {p}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-navy font-semibold border-b-2 border-accent pb-1 hover:gap-3 transition-all"
          >
            Read More About Us <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </Section>
  )
}
