import { useState } from 'react'
import { FileDown, Printer, Truck } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { orders as seed } from '../../data/adminData'

export default function AdminOrders() {
  const [rows, setRows] = useState(seed)
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Pending', 'Completed', 'Cancelled']
  const filtered = filter === 'All' ? rows : rows.filter((r) => r.status === filter)

  function markCompleted(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Completed' } : r)))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              filter === f ? 'bg-navy text-white' : 'bg-white text-ink-soft border border-slate-200 hover:border-navy/20'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable
        title="Orders Management"
        columns={['Order ID', 'Customer', 'Service', 'Amount', 'Status', 'Date']}
        rows={filtered}
        searchKeys={['customer', 'service', 'id']}
        renderRow={(r) => (
          <>
            <td className="px-2 py-3 font-medium text-navy">{r.id}</td>
            <td className="px-2 py-3">{r.customer}</td>
            <td className="px-2 py-3">{r.service}</td>
            <td className="px-2 py-3 font-medium">{r.amount}</td>
            <td className="px-2 py-3"><StatusBadge status={r.status} /></td>
            <td className="px-2 py-3 text-ink-soft">{r.date}</td>
          </>
        )}
        actions={(r) => (
          <div className="flex items-center justify-end gap-1.5">
            {r.status === 'Pending' && (
              <button onClick={() => markCompleted(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Track status"><Truck size={14} /></button>
            )}
            <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Invoice"><FileDown size={14} /></button>
            <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Print"><Printer size={14} /></button>
          </div>
        )}
      />
    </div>
  )
}
