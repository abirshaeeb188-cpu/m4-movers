import { useState } from 'react'
import { Edit2, Trash2, Ban, CheckCircle } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { users as seedUsers } from '../../data/adminData'

export default function AdminUsers() {
  const [users, setUsers] = useState(seedUsers)

  function toggleBlock(id) {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' } : u)))
  }

  function remove(id) {
    setUsers((list) => list.filter((u) => u.id !== id))
  }

  return (
    <DataTable
      title="User Management"
      columns={['User ID', 'Name', 'Email', 'Role', 'Status', 'Joined']}
      rows={users}
      searchKeys={['name', 'email', 'id']}
      renderRow={(u) => (
        <>
          <td className="px-2 py-3 font-medium text-navy">{u.id}</td>
          <td className="px-2 py-3">{u.name}</td>
          <td className="px-2 py-3 text-ink-soft">{u.email}</td>
          <td className="px-2 py-3">{u.role}</td>
          <td className="px-2 py-3"><StatusBadge status={u.status} /></td>
          <td className="px-2 py-3 text-ink-soft">{u.joined}</td>
        </>
      )}
      actions={(u) => (
        <div className="flex items-center justify-end gap-1.5">
          <button className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-brand" aria-label="Edit"><Edit2 size={14} /></button>
          <button onClick={() => toggleBlock(u.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-amber-600" aria-label="Toggle block">
            {u.status === 'Blocked' ? <CheckCircle size={14} /> : <Ban size={14} />}
          </button>
          <button onClick={() => remove(u.id)} className="h-8 w-8 rounded-lg hover:bg-mist flex items-center justify-center text-ink-soft hover:text-red-500" aria-label="Delete"><Trash2 size={14} /></button>
        </div>
      )}
    />
  )
}
