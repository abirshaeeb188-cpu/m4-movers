import { useState } from 'react'

const tabs = ['General', 'SMTP Email', 'WhatsApp', 'Google Maps API', 'Social Links', 'SEO', 'Backup', 'Password']

export default function AdminSettings() {
  const [tab, setTab] = useState('General')

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="font-display font-semibold text-lg text-navy mb-5">Settings</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              tab === t ? 'bg-navy text-white' : 'bg-mist text-ink-soft hover:text-navy'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-lg space-y-4">
        {tab === 'General' && (
          <>
            <Field label="Website Name" defaultValue="M4 Movers" />
            <Field label="Theme Color" defaultValue="#0B63F6" />
            <Field label="Support Email" defaultValue="info@m4movers.com" />
          </>
        )}
        {tab === 'SMTP Email' && (
          <>
            <Field label="SMTP Host" defaultValue="smtp.m4movers.com" />
            <Field label="SMTP Port" defaultValue="587" />
            <Field label="SMTP Username" defaultValue="notifications@m4movers.com" />
            <Field label="SMTP Password" defaultValue="••••••••" type="password" />
          </>
        )}
        {tab === 'WhatsApp' && (
          <>
            <Field label="Business Number" defaultValue="+971 50 000 0000" />
            <Field label="API Token" defaultValue="••••••••••••" type="password" />
          </>
        )}
        {tab === 'Google Maps API' && <Field label="Maps API Key" defaultValue="••••••••••••" type="password" />}
        {tab === 'Social Links' && (
          <>
            <Field label="Facebook URL" defaultValue="https://facebook.com/m4movers" />
            <Field label="Instagram URL" defaultValue="https://instagram.com/m4movers" />
            <Field label="LinkedIn URL" defaultValue="https://linkedin.com/company/m4movers" />
          </>
        )}
        {tab === 'SEO' && (
          <>
            <Field label="Meta Title" defaultValue="M4 Movers | Moving & Packing Services UAE" />
            <Field label="Meta Description" defaultValue="Professional moving and packing services across the UAE." />
          </>
        )}
        {tab === 'Backup' && (
          <div className="bg-mist rounded-xl p-5 text-sm text-ink-soft">
            Last backup: <span className="font-semibold text-navy">July 14, 2026, 2:00 AM</span>
            <button className="block mt-4 px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors">Run Backup Now</button>
          </div>
        )}
        {tab === 'Password' && (
          <>
            <Field label="Current Password" type="password" />
            <Field label="New Password" type="password" />
            <Field label="Confirm New Password" type="password" />
          </>
        )}

        <button className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-600 transition-colors">Save Settings</button>
      </div>
    </div>
  )
}

function Field({ label, defaultValue, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-soft mb-1.5">{label}</label>
      <input type={type} defaultValue={defaultValue} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
    </div>
  )
}
