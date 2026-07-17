import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { services as seed } from '../../data/services'

export default function AdminServices() {
  const [list, setList] = useState(seed)

  function remove(slug) {
    setList((l) => l.filter((s) => s.slug !== slug))
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg text-navy">Services Management</h2>
          <p className="text-xs text-ink-soft mt-1">{list.length} services listed on the website</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors">
          <Plus size={15} /> Add Service
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((s) => (
          <div key={s.slug} className="border border-slate-100 rounded-2xl overflow-hidden">
            <img src={s.image} alt={s.title} className="h-28 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">{s.title}</p>
                <s.icon size={16} className="text-brand shrink-0" />
              </div>
              <p className="text-xs text-ink-soft mt-1.5 line-clamp-2">{s.short}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-brand bg-brand-light px-2 py-1 rounded-full">Active</span>
                <div className="flex items-center gap-1">
                  <button className="h-7 w-7 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand"><Edit2 size={13} /></button>
                  <button onClick={() => remove(s.slug)} className="h-7 w-7 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-red-500"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
