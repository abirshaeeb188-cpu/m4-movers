import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2 } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { api } from '../api/client'
import { useCompanyConfig } from '../hooks/useCompanyConfig'

const initialForm = { fullName: '', email: '', phone: '', message: '' }

export default function ContactPreview() {
  const config = useCompanyConfig()
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) { setForm((f) => ({ ...f, [field]: value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const res = await api.post('/contact', form, { auth: true })
    setSubmitting(false)
    if (!res.success) { setError(res.message); return }
    setSent(true)
  }

  return (
    <Section className="bg-white">
      <SectionHeading eyebrow="Get In Touch" title="Ready to plan your move?" description="Send a quick message and our team will call you back within the hour." />
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-navy rounded-3xl p-8 sm:p-10 text-white">
          <h3 className="font-display font-semibold text-xl mb-6">Contact Information</h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-accent mt-0.5" />
              <div><p className="font-semibold">Phone</p><p className="text-white/60">{config.phone}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={18} className="text-accent mt-0.5" />
              <div><p className="font-semibold">WhatsApp</p><p className="text-white/60">{config.phone}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-accent mt-0.5" />
              <div><p className="font-semibold">Email</p><p className="text-white/60">{config.email}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent mt-0.5" />
              <div><p className="font-semibold">Address</p><p className="text-white/60">{config.address}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-accent mt-0.5" />
              <div><p className="font-semibold">Working Hours</p><p className="text-white/60">Every day, 7:00 AM – 11:00 PM</p></div>
            </li>
          </ul>
        </div>

        <div className="bg-mist rounded-3xl p-8 sm:p-10">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={44} className="text-brand mb-4" />
              <p className="font-display font-semibold text-lg text-navy">Message received</p>
              <p className="text-sm text-ink-soft mt-2">We'll call you back within the hour.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Full Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email Address" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white" />
                <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone Number" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white" />
              </div>
              <textarea required rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help?" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-white resize-none" />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
