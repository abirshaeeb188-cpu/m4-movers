import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { monthlyOrders, topServices } from '../../data/adminData'

const visitors = [
  { month: 'Jan', visitors: 32000 }, { month: 'Feb', visitors: 36500 }, { month: 'Mar', visitors: 41200 },
  { month: 'Apr', visitors: 38900 }, { month: 'May', visitors: 47800 }, { month: 'Jun', visitors: 53400 },
  { month: 'Jul', visitors: 58930 },
]

const locations = [
  { name: 'Dubai', value: 48 }, { name: 'Abu Dhabi', value: 26 }, { name: 'Sharjah', value: 14 }, { name: 'Other Emirates', value: 12 },
]

const COLORS = ['#0B63F6', '#FF7A29', '#0A1B3D', '#7FA8FF']

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Monthly Visitors</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitors}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef1f6', fontSize: 13 }} />
              <Line type="monotone" dataKey="visitors" stroke="#0B63F6" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">User Growth vs Orders</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#55617a' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eef1f6', fontSize: 13 }} />
              <Bar dataKey="orders" fill="#0B63F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Most Requested Locations</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={locations} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {locations.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {locations.map((l, i) => (
                <div key={l.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-ink-soft"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{l.name}</span>
                  <span className="font-semibold text-navy">{l.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <h3 className="font-display font-semibold text-navy mb-4">Complaint Statistics</h3>
          <div className="space-y-4 mt-2">
            {[{ label: 'Resolved', value: 68, color: 'bg-green-500' }, { label: 'In Progress', value: 22, color: 'bg-amber-500' }, { label: 'Open', value: 10, color: 'bg-red-500' }].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-ink-soft font-medium">{s.label}</span>
                  <span className="font-semibold text-navy">{s.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-mist overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
