import { useState } from 'react'
import { Mail, MessageCircle, Trash2, CheckCheck } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { contactRequests as seed } from '../../data/adminData'

export default function AdminContactRequests() {
  const [rows, setRows] = useState(seed)

  function markRead(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Read' } : r)))
  }
  function remove(id) {
    setRows((list) => list.filter((r) => r.id !== id))
  }

  return (
    <DataTable
      title="Contact Requests"
      columns={['ID', 'Name', 'Email', 'Subject', 'Status', 'Date']}
      rows={rows}
      searchKeys={['name', 'email', 'subject', 'id']}
      renderRow={(r) => (
        <>
          <td className="px-2 py-3 font-medium text-navy">{r.id}</td>
          <td className="px-2 py-3">{r.name}</td>
          <td className="px-2 py-3 text-ink-soft">{r.email}</td>
          <td className="px-2 py-3">{r.subject}</td>
          <td className="px-2 py-3"><StatusBadge status={r.status} /></td>
          <td className="px-2 py-3 text-ink-soft">{r.date}</td>
        </>
      )}
      actions={(r) => (
        <div className="flex items-center justify-end gap-1.5">
          <a href={`mailto:${r.email}`} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Reply via email"><Mail size={14} /></a>
          <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-green-600" aria-label="Reply via WhatsApp"><MessageCircle size={14} /></button>
          <button onClick={() => markRead(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Mark as read"><CheckCheck size={14} /></button>
          <button onClick={() => remove(r.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-red-500" aria-label="Delete"><Trash2 size={14} /></button>
        </div>
      )}
    />
  )
}
