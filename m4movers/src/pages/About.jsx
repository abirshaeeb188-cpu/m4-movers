import { Link } from 'react-router-dom'
import { Target, Eye, HeartHandshake, ShieldCheck, Award, Users2, ArrowRight } from 'lucide-react'
import { Section, SectionHeading } from '../components/Section'
import Stats from '../components/Stats'
import WhyChooseUs from '../components/WhyChooseUs'
import FaqAccordion from '../components/FaqAccordion'

const values = [
  { icon: HeartHandshake, title: 'Care', desc: 'We handle every box like it holds something irreplaceable — because to you, it does.' },
  { icon: ShieldCheck, title: 'Trust', desc: 'Licensed, insured, and transparent about pricing from the very first quote.' },
  { icon: Award, title: 'Excellence', desc: 'Trained crews and repeatable processes, refined over 35,000+ moves.' },
  { icon: Users2, title: 'Community', desc: 'Proudly built by movers who call the UAE home too.' },
]

const team = [
  { name: 'Khalid Rahman', role: 'Founder & CEO', image: 'https://i.pravatar.cc/200?img=68' },
  { name: 'Aisha Malik', role: 'Head of Operations', image: 'https://i.pravatar.cc/200?img=47' },
  { name: 'Bilal Khan', role: 'Fleet & Logistics Manager', image: 'https://i.pravatar.cc/200?img=33' },
  { name: 'Nadia Suleiman', role: 'Customer Success Lead', image: 'https://i.pravatar.cc/200?img=29' },
]

const timeline = [
  { year: '2011', title: 'M4 Movers founded', desc: 'Started with a single truck serving Dubai neighborhoods.' },
  { year: '2015', title: 'Fleet expansion', desc: 'Grew to 20+ trucks and opened our first storage facility.' },
  { year: '2019', title: 'UAE-wide coverage', desc: 'Extended services to all seven Emirates.' },
  { year: '2023', title: 'International relocation', desc: 'Launched door-to-door international moving services.' },
  { year: '2026', title: '35,000+ moves', desc: 'Crossed 10,000 happy customers and a 4.9 star rating.' },
]

const certifications = ['Dubai Economy Licensed', 'DMCC Approved Vendor', 'ISO 9001:2015 Certified', 'Fully Insured Fleet']

export default function About() {
  return (
    <>
      <section className="relative bg-navy overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1800&auto=format&fit=crop" alt="M4 Movers team" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 sm:pt-28 sm:pb-32 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full mb-6">
            About M4 Movers
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight tracking-tight max-w-3xl mx-auto text-balance">
            Fifteen years of moving the UAE, one careful trip at a time
          </h1>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            From a single truck in 2011 to a UAE-wide fleet — here's the story, the people, and the standards behind every move.
          </p>
        </div>
      </section>

      <Stats />

      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-brand bg-brand-light px-3 py-1.5 rounded-full mb-4">
              Who We Are
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy tracking-tight text-balance">
              A UAE moving company built on word-of-mouth
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              M4 Movers is a professional moving and packing company serving homes, offices, and businesses across
              the Emirates. What started as a single truck and driver has grown into a full-service operation —
              but the way we treat every customer's belongings hasn't changed since day one.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Today our crews complete hundreds of moves every month, from studio apartments to full villa and
              office relocations, backed by GPS-tracked trucks, trained packers, and transparent, fixed-price quotes.
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="p-5 rounded-2xl bg-brand-light flex items-start gap-3">
                <Target size={22} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-navy mb-1">Our Mission</p>
                  <p className="text-sm text-ink-soft leading-relaxed">Make relocation stress-free through reliable, affordable and careful service.</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-accent-light flex items-start gap-3">
                <Eye size={22} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-navy mb-1">Our Vision</p>
                  <p className="text-sm text-ink-soft leading-relaxed">To be the UAE's most trusted name in home and office relocation.</p>
                </div>
              </div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" alt="Movers packing boxes" className="rounded-3xl shadow-card w-full h-[480px] object-cover" />
        </div>
      </Section>

      <Section className="bg-mist">
        <SectionHeading eyebrow="Our Values" title="What guides every move" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-card">
              <span className="h-12 w-12 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-4">
                <v.icon size={22} />
              </span>
              <h3 className="font-display font-semibold text-navy">{v.title}</h3>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Team" title="The people behind every move" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="text-center group">
              <div className="rounded-2xl overflow-hidden mb-4">
                <img src={m.image} alt={m.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="font-display font-semibold text-navy">{m.name}</p>
              <p className="text-sm text-ink-soft">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-navy relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 400" aria-hidden="true">
          <path d="M -50 200 Q 300 100, 600 200 T 1250 200" stroke="#0B63F6" strokeWidth="2" fill="none" className="route-line" />
        </svg>
        <div className="relative">
          <SectionHeading eyebrow="Our Journey" title="Milestones along the way" />
          <div className="max-w-2xl mx-auto space-y-8">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="h-10 w-10 rounded-full bg-accent text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                    {t.year.slice(2)}
                  </span>
                  {i < timeline.length - 1 && <span className="w-px flex-1 bg-white/15 mt-2" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs text-accent font-semibold">{t.year}</p>
                  <p className="font-display font-semibold text-white mt-1">{t.title}</p>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Certifications" title="Licensed and accountable" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((c) => (
            <div key={c} className="flex items-center gap-3 bg-mist rounded-2xl p-5">
              <ShieldCheck size={20} className="text-brand shrink-0" />
              <p className="text-sm font-semibold text-navy">{c}</p>
            </div>
          ))}
        </div>
      </Section>

      <WhyChooseUs />
      <FaqAccordion />

      <Section className="bg-white">
        <div className="bg-gradient-to-br from-brand to-brand-dark rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white text-balance">Ready to experience the M4 Movers difference?</h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">Get a free, no-obligation quote in minutes.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand font-semibold hover:bg-mist transition-colors">
            Get Free Quote <ArrowRight size={17} />
          </Link>
        </div>
      </Section>
    </>
  )
}
