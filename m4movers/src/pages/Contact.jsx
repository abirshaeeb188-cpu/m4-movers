import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation2, CheckCircle2, X } from 'lucide-react'
import { Section } from '../components/Section'
import { services } from '../data/services'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useCompanyConfig } from '../hooks/useCompanyConfig'
import { openWhatsApp } from '../utils/whatsapp'

const initialForm = {
  fullName: '', email: '', phone: '', company: '', service: '',
  movingDate: '', pickup: '', destination: '', message: '', agree: false,
}

export default function Contact() {
  const { user } = useAuth()
  const config = useCompanyConfig()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!/^[\d+\s()-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (!form.service) e.service = 'Please select a service.'
    if (!form.pickup.trim()) e.pickup = 'Pickup address is required.'
    if (!form.destination.trim()) e.destination = 'Destination address is required.'
    if (!form.agree) e.agree = 'You must agree to the Privacy Policy.'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    setServerError('')
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setSubmitting(true)
    const res = await api.post('/contact', form, { auth: true })
    setSubmitting(false)

    if (!res.success) { setServerError(res.message); return }
    setSuccessMessage(res.message)
    setShowSuccess(true)
  }

  function handleReset() {
    setForm(initialForm)
    setErrors({})
    setServerError('')
  }

  function handleWhatsAppClick(e) {
    e.preventDefault()
    openWhatsApp({ whatsappNumber: config.whatsapp, user, sourcePage: 'contact-page' })
  }

  const mapBbox = [config.lng - 0.01, config.lat - 0.006, config.lng + 0.01, config.lat + 0.006].join('%2C')
  const mapEmbedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBbox}&layer=mapnik&marker=${config.lat}%2C${config.lng}`
  const mapExternalHref = `https://www.openstreetmap.org/?mlat=${config.lat}&mlon=${config.lng}#map=17/${config.lat}/${config.lng}`

  return (
    <>
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-brand-dark/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-white bg-white/10 border border-white/15 px-3 py-1.5 rounded-full mb-6">
            Contact Us
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight max-w-2xl mx-auto text-balance">
            Let's plan your move
          </h1>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            Fill out the form below or reach us directly — we respond to every request within the hour.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: company info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-navy rounded-3xl p-8 text-white">
              <h3 className="font-display font-semibold text-xl mb-6">Company Information</h3>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-accent mt-0.5 shrink-0" />
                  <div><p className="font-semibold">Working Hours</p><p className="text-white/60">Every day, 7:00 AM – 11:00 PM</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-accent mt-0.5 shrink-0" />
                  <div><p className="font-semibold">Phone</p><p className="text-white/60">{config.phone}</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-accent mt-0.5 shrink-0" />
                  <div><p className="font-semibold">Email</p><p className="text-white/60">{config.email}</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={18} className="text-accent mt-0.5 shrink-0" />
                  <div><p className="font-semibold">WhatsApp</p><p className="text-white/60">{config.phone}</p></div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                  <div><p className="font-semibold">Office Address</p><p className="text-white/60">{config.address}</p></div>
                </li>
              </ul>
              <div className="flex gap-3 mt-7 pt-6 border-t border-white/10">
                {['Facebook', 'Instagram', 'LinkedIn'].map((s) => (
                  <span key={s} className="h-9 px-4 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium hover:bg-brand transition-colors cursor-pointer">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <a href={`tel:${config.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 bg-mist rounded-2xl p-4 hover:bg-brand-light transition-colors">
                <span className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand shrink-0"><Phone size={17} /></span>
                <span className="text-sm font-semibold text-navy">Call us directly</span>
              </a>
              <a href={`https://wa.me/${config.whatsapp}`} onClick={handleWhatsAppClick} className="flex items-center gap-3 bg-mist rounded-2xl p-4 hover:bg-brand-light transition-colors">
                <span className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shrink-0"><MessageCircle size={17} /></span>
                <span className="text-sm font-semibold text-navy">Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-card p-6 sm:p-9">
              <h3 className="font-display font-semibold text-xl text-navy mb-1">Request a Free Quote</h3>
              <p className="text-sm text-ink-soft mb-6">Tell us the details of your move and we'll get back with pricing.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" error={errors.fullName}>
                    <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass(errors.fullName)} placeholder="John Smith" />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass(errors.email)} placeholder="john@example.com" />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" error={errors.phone}>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass(errors.phone)} placeholder="+971 5X XXX XXXX" />
                  </Field>
                  <Field label="Company Name (optional)">
                    <input value={form.company} onChange={(e) => update('company', e.target.value)} className={inputClass()} placeholder="Your Company LLC" />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Service Required" error={errors.service}>
                    <select value={form.service} onChange={(e) => update('service', e.target.value)} className={inputClass(errors.service)}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                    </select>
                  </Field>
                  <Field label="Moving Date">
                    <input type="date" value={form.movingDate} onChange={(e) => update('movingDate', e.target.value)} className={inputClass()} />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Pickup Address" error={errors.pickup}>
                    <input value={form.pickup} onChange={(e) => update('pickup', e.target.value)} className={inputClass(errors.pickup)} placeholder="e.g. JVC, Dubai" />
                  </Field>
                  <Field label="Destination Address" error={errors.destination}>
                    <input value={form.destination} onChange={(e) => update('destination', e.target.value)} className={inputClass(errors.destination)} placeholder="e.g. Al Reem Island, Abu Dhabi" />
                  </Field>
                </div>

                <Field label="Message">
                  <textarea rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} className={inputClass() + ' resize-none'} placeholder="Anything else we should know?" />
                </Field>

                <label className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer">
                  <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand shrink-0" />
                  I agree to the <span className="text-brand font-medium">Privacy Policy</span>.
                </label>
                {errors.agree && <p className="text-xs text-red-500 -mt-2">{errors.agree}</p>}
                {serverError && <p className="text-xs text-red-500">{serverError}</p>}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" disabled={submitting} className="flex-1 rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors disabled:opacity-60">
                    {submitting ? 'Sending…' : 'Send Quote'}
                  </button>
                  <button type="button" onClick={handleReset} className="flex-1 rounded-xl border border-slate-200 text-ink font-semibold py-3.5 hover:bg-mist transition-colors">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-mist pt-0">
        <div className="rounded-3xl overflow-hidden shadow-card relative">
          <iframe
            title="M4 Movers office location"
            src={mapEmbedSrc}
            className="w-full h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-4 left-4 right-4 sm:right-auto glass-light rounded-2xl p-4 flex items-center gap-3 shadow-soft max-w-sm">
            <span className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0"><MapPin size={18} /></span>
            <div className="text-sm">
              <p className="font-semibold text-navy">M4 Movers HQ</p>
              <p className="text-ink-soft text-xs">{config.address}</p>
            </div>
          </div>
          <a
            href={mapExternalHref}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white shadow-soft rounded-full px-4 py-2.5 text-sm font-semibold text-navy hover:bg-brand hover:text-white transition-colors"
          >
            <Navigation2 size={15} /> Open in Maps
          </a>
        </div>
      </Section>

      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSuccess(false)}>
          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSuccess(false)} className="absolute top-4 right-4 text-ink-soft hover:text-navy" aria-label="Close">
              <X size={20} />
            </button>
            <span className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center text-brand mx-auto mb-5">
              <CheckCircle2 size={32} />
            </span>
            <h3 className="font-display font-bold text-xl text-navy">Quote request sent!</h3>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              {successMessage || `Thanks ${form.fullName.split(' ')[0] || 'there'} — our team will contact you at ${form.email || 'your email'} within the hour.`}
            </p>
            <button
              onClick={() => { setShowSuccess(false); handleReset() }}
              className="mt-6 w-full rounded-xl bg-navy text-white font-semibold py-3 hover:bg-navy-light transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function inputClass(error) {
  return `w-full rounded-xl border px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${
    error ? 'border-red-300 focus:ring-red-300' : 'border-slate-200 focus:ring-brand'
  }`
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-soft mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
