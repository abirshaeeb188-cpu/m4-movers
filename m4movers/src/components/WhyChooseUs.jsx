import { ShieldCheck, BadgeCheck, PackageCheck, ShieldAlert, Zap, Headset, Navigation, Users } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { whyChooseUs } from '../data/content'

const icons = [Users, BadgeCheck, PackageCheck, ShieldAlert, Zap, Headset, Navigation, ShieldCheck]

export default function WhyChooseUs() {
  return (
    <Section className="bg-mist">
      <SectionHeading
        eyebrow="Why M4 Movers"
        title="Built for a smoother move"
        description="Every job is backed by the same standards, whether it's a studio apartment or a full warehouse."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {whyChooseUs.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
            >
              <span className="h-12 w-12 rounded-xl bg-brand-light flex items-center justify-center text-brand mb-4">
                <Icon size={22} />
              </span>
              <h3 className="font-display font-semibold text-navy">{item.title}</h3>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
