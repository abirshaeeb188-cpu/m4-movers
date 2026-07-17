import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { complaints as seed } from '../../data/adminData'

export default function AdminComplaints() {
  const [rows, setRows] = useState(seed)

  function resolve(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r)))
  }
  function close(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Closed' } : r)))
  }

  return (
    <DataTable
      title="Complaint Management"
      columns={['Complaint ID', 'Customer', 'Priority', 'Status', 'Assigned Staff', 'Date']}
      rows={rows}
      searchKeys={['customer', 'id', 'assigned']}
      renderRow={(r) => (
        <>
          <td className="px-2 py-3 font-medium text-navy">{r.id}</td>
          <td className="px-2 py-3">{r.customer}</td>
          <td className="px-2 py-3"><StatusBadge status={r.priority} /></td>
          <td className="px-2 py-3"><StatusBadge status={r.status} /></td>
          <td className="px-2 py-3 text-ink-soft">{r.assigned}</td>
          <td className="px-2 py-3 text-ink-soft">{r.date}</td>
        </>
      )}
      actions={(r) => (
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => resolve(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-green-600" aria-label="Resolve"><CheckCircle2 size={14} /></button>
          <button onClick={() => close(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-red-500" aria-label="Close"><XCircle size={14} /></button>
        </div>
      )}
    />
  )
}
