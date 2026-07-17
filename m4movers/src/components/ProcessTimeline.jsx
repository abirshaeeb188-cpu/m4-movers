import { Section, SectionHeading } from './Section'
import { process } from '../data/content'

export default function ProcessTimeline() {
  return (
    <Section className="bg-navy relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 400" aria-hidden="true">
        <path d="M -50 200 Q 300 100, 600 200 T 1250 200" stroke="#0B63F6" strokeWidth="2" fill="none" className="route-line" />
      </svg>
      <div className="relative">
        <SectionHeading
          eyebrow="Our Process"
          title="How your move works"
          description="A simple, four-step journey from booking to setup — the same route, every time."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {process.map((p, i) => (
            <div key={p.step} className="relative">
              <div className="glass rounded-2xl p-7 h-full">
                <span className="font-display font-bold text-4xl text-accent/80">{p.step}</span>
                <h3 className="font-display font-semibold text-lg text-white mt-4">{p.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{p.desc}</p>
              </div>
              {i < process.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-white/20" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
