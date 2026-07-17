import { useState } from 'react'
import { FileDown, Printer, UserPlus } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { quoteRequests as seed } from '../../data/adminData'

export default function AdminQuoteRequests() {
  const [rows, setRows] = useState(seed)

  function assign(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Assigned' } : r)))
  }

  return (
    <DataTable
      title="Quote Requests"
      columns={['ID', 'Customer', 'Service', 'Pickup', 'Destination', 'Move Date', 'Status']}
      rows={rows}
      searchKeys={['customer', 'service', 'id']}
      renderRow={(r) => (
        <>
          <td className="px-2 py-3 font-medium text-navy">{r.id}</td>
          <td className="px-2 py-3">{r.customer}</td>
          <td className="px-2 py-3">{r.service}</td>
          <td className="px-2 py-3 text-ink-soft">{r.from}</td>
          <td className="px-2 py-3 text-ink-soft">{r.to}</td>
          <td className="px-2 py-3 text-ink-soft">{r.date}</td>
          <td className="px-2 py-3"><StatusBadge status={r.status} /></td>
        </>
      )}
      actions={(r) => (
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => assign(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Assign team"><UserPlus size={14} /></button>
          <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Export PDF"><FileDown size={14} /></button>
          <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Print"><Printer size={14} /></button>
        </div>
      )}
    />
  )
}
