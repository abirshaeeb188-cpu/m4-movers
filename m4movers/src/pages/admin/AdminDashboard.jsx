import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { overviewCards, monthlyOrders, topServices, contactRequests, quoteRequests } from '../../data/adminData'
import StatusBadge from '../../components/StatusBadge'

const COLORS = ['#0B63F6', '#FF7A29', '#0A1B3D', '#7FA8FF', '#FFB27A']

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {overviewCards.map((c) => {
          const positive = c.change.startsWith('+')
          return (
            <div key={c.label} className="bg-white rounded-2xl shadow-card p-5">
              <p className="text-xs font-medium text-ink-soft">{c.label}</p>
              <p className="font-display font-bold text-2xl text-navy mt-2">{c.value}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-2 ${positive ? 'text-green-600' : 'text-red-500'}`}>
                {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {c.change}
              </span>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-navy">Monthly Orders & Revenue</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyOrders}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B63F6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0B63F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef1f6', fontSize: 13 }} />
              <Area type="monotone" dataKey="orders" stroke="#0B63F6" strokeWidth={2.5} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Top Services</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={topServices} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {topServices.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef1f6', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {topServices.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-ink-soft"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{s.name}</span>
                <span className="font-semibold text-navy">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-display font-semibold text-navy mb-4">Revenue by Month (AED)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyOrders}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef1f6', fontSize: 13 }} />
            <Bar dataKey="revenue" fill="#FF7A29" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Recent Contact Requests</h3>
          <div className="space-y-3">
            {contactRequests.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-navy">{c.name}</p>
                  <p className="text-xs text-ink-soft">{c.subject}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Recent Quote Requests</h3>
          <div className="space-y-3">
            {quoteRequests.slice(0, 4).map((q) => (
              <div key={q.id} className="flex items-center justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-navy">{q.customer}</p>
                  <p className="text-xs text-ink-soft">{q.service}</p>
                </div>
                <StatusBadge status={q.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
