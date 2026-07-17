import { useMemo, useState } from 'react'
import { Search, Download, Printer } from 'lucide-react'

export default function DataTable({ title, columns, rows, renderRow, searchKeys = [], actions }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) => searchKeys.some((k) => String(r[k]).toLowerCase().includes(q)))
  }, [query, rows, searchKeys])

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="font-display font-semibold text-lg text-navy">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <button className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-ink-soft hover:text-navy hover:border-navy/20" aria-label="Export">
            <Download size={15} />
          </button>
          <button className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-ink-soft hover:text-navy hover:border-navy/20" aria-label="Print">
            <Printer size={15} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-ink-soft">
              {columns.map((c) => <th key={c} className="px-2 pb-3 font-semibold">{c}</th>)}
              {actions && <th className="px-2 pb-3 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 hover:bg-mist/60">
                {renderRow(row)}
                {actions && <td className="px-2 py-3 text-right">{actions(row)}</td>}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="text-center py-10 text-ink-soft text-sm">No results found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
