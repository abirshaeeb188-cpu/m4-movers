import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { testimonials } from '../data/content'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  function next() { setIndex((i) => (i + 1) % testimonials.length) }
  function prev() { setIndex((i) => (i - 1 + testimonials.length) % testimonials.length) }

  return (
    <Section className="bg-white">
      <SectionHeading eyebrow="Testimonials" title="What our customers say" />
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-mist rounded-3xl p-8 sm:p-12 text-center">
          <Quote className="mx-auto text-brand/30 mb-4" size={40} />
          <p className="text-lg sm:text-xl text-navy font-medium leading-relaxed text-balance">"{t.review}"</p>
          <div className="flex items-center justify-center gap-1 mt-6 text-accent">
            {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-semibold text-navy text-sm">{t.name}</p>
              <p className="text-xs text-ink-soft">{t.country}</p>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-navy hover:text-brand transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-navy hover:text-brand transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
