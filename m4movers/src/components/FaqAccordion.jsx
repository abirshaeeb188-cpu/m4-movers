import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { faqs } from '../data/content'

export default function FaqAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <Section className="bg-mist">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" description="Can't find your answer? Reach out to our team anytime." />
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
              >
                <span className="font-semibold text-navy text-sm sm:text-base">{f.q}</span>
                <Plus size={18} className={`text-brand shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm text-ink-soft leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
