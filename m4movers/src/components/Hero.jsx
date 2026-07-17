import { Link } from 'react-router-dom'
import { ArrowRight, PhoneCall, ShieldCheck, Clock, Users, BadgeCheck } from 'lucide-react'
import { features } from '../data/content'

const featureIcons = { '24/7 Support': Clock, 'Licensed Company': ShieldCheck, 'Experienced Staff': Users, 'Affordable Pricing': BadgeCheck }

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
        alt="Professional movers carrying furniture"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />

      {/* signature route-line motif */}
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M -50 550 C 200 500, 300 620, 500 480 S 800 300, 1000 340 S 1250 200, 1350 150"
          fill="none"
          stroke="#0B63F6"
          strokeWidth="2"
          className="route-line"
        />
        <circle r="5" fill="#FF7A29" className="route-dot">
          <animateMotion dur="14s" repeatCount="indefinite" path="M -50 550 C 200 500, 300 620, 500 480 S 800 300, 1000 340 S 1250 200, 1350 150" />
        </circle>
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full mb-6">
            Trusted across all 7 Emirates
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight text-balance">
            Professional Moving &amp; Packing Services Across UAE
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
            Safe, fast and affordable home, office and villa moving services with professional packers — booked in minutes.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold shadow-[0_15px_35px_-10px_rgba(255,122,41,0.7)] hover:bg-orange-600 transition-colors"
            >
              Get Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+971500000000"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-semibold hover:bg-white/15 transition-colors"
            >
              <PhoneCall size={18} /> Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((f) => {
            const Icon = featureIcons[f.title]
            return (
              <div key={f.title} className="glass rounded-2xl p-4 sm:p-5">
                <Icon size={20} className="text-accent mb-3" />
                <p className="text-white font-semibold text-sm">{f.title}</p>
                <p className="text-white/50 text-xs mt-1 leading-relaxed hidden sm:block">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
