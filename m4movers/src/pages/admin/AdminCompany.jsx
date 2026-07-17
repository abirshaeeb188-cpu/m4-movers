import { Image as ImageIcon, Plus, Trash2 } from 'lucide-react'

const branches = [
  { name: 'Dubai HQ', address: 'Al Quoz Industrial Area 3, Dubai' },
  { name: 'Abu Dhabi Branch', address: 'Mussafah Industrial Area, Abu Dhabi' },
  { name: 'Sharjah Branch', address: 'Industrial Area 4, Sharjah' },
]

const vehicles = [
  { id: 'TRK-01', type: '3-Ton Box Truck', status: 'Active' },
  { id: 'TRK-02', type: '5-Ton Box Truck', status: 'Active' },
  { id: 'TRK-03', type: '7-Ton Box Truck', status: 'Maintenance' },
]

export default function AdminCompany() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-display font-semibold text-lg text-navy mb-5">Company Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Company Name" defaultValue="M4 Movers" />
          <FormField label="Trade License No." defaultValue="DED-2011-88421" />
          <FormField label="Support Email" defaultValue="info@m4movers.com" />
          <FormField label="Support Phone" defaultValue="+971 50 000 0000" />
        </div>
        <div className="mt-5 flex items-center gap-4">
          <span className="h-16 w-16 rounded-2xl bg-mist flex items-center justify-center text-ink-soft"><ImageIcon size={22} /></span>
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-ink hover:bg-mist">Upload Logo</button>
        </div>
        <button className="mt-6 px-6 py-3 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors">Save Changes</button>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-navy">Branches</h2>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-brand"><Plus size={15} /> Add Branch</button>
        </div>
        <div className="space-y-3">
          {branches.map((b) => (
            <div key={b.name} className="flex items-center justify-between bg-mist rounded-xl p-4">
              <div>
                <p className="text-sm font-semibold text-navy">{b.name}</p>
                <p className="text-xs text-ink-soft">{b.address}</p>
              </div>
              <button className="text-ink-soft hover:text-red-500"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-navy">Vehicles</h2>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-brand"><Plus size={15} /> Add Vehicle</button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-mist rounded-xl p-4">
              <p className="text-sm font-semibold text-navy">{v.id}</p>
              <p className="text-xs text-ink-soft mt-1">{v.type}</p>
              <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${v.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{v.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormField({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-soft mb-1.5">{label}</label>
      <input defaultValue={defaultValue} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
    </div>
  )
}
