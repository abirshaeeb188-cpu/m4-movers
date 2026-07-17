const styles = {
  Active: 'bg-green-50 text-green-600',
  Completed: 'bg-green-50 text-green-600',
  Resolved: 'bg-green-50 text-green-600',
  Replied: 'bg-green-50 text-green-600',
  Assigned: 'bg-blue-50 text-blue-600',
  Pending: 'bg-amber-50 text-amber-600',
  'In Progress': 'bg-amber-50 text-amber-600',
  Unread: 'bg-amber-50 text-amber-600',
  Open: 'bg-amber-50 text-amber-600',
  Read: 'bg-slate-100 text-slate-600',
  Inactive: 'bg-slate-100 text-slate-600',
  Blocked: 'bg-red-50 text-red-600',
  Cancelled: 'bg-red-50 text-red-600',
  High: 'bg-red-50 text-red-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-slate-100 text-slate-600',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}
