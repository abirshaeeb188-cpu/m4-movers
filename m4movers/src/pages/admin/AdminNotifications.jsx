import { Mail, MessageCircle, AlertTriangle, Bell } from 'lucide-react'

const notifications = [
  { icon: Mail, title: 'Email delivery report', desc: '312 quote confirmation emails sent successfully today.', time: '10 min ago' },
  { icon: MessageCircle, title: 'WhatsApp notification', desc: 'Move reminder sent to 18 customers for tomorrow\'s bookings.', time: '42 min ago' },
  { icon: AlertTriangle, title: 'System alert', desc: 'Storage facility CCTV feed reconnected after brief outage.', time: '2 hours ago' },
  { icon: Bell, title: 'New complaint filed', desc: 'Complaint CMP-23 filed as High priority, unassigned.', time: '3 hours ago' },
]

export default function AdminNotifications() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg text-navy">Notifications</h2>
        <button className="text-sm font-semibold text-brand">Mark all as read</button>
      </div>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-4 bg-mist rounded-xl p-4">
            <span className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-brand shrink-0"><n.icon size={17} /></span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">{n.title}</p>
              <p className="text-xs text-ink-soft mt-0.5">{n.desc}</p>
            </div>
            <span className="text-xs text-ink-soft whitespace-nowrap">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
