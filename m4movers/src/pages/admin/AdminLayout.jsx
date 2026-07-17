import { useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Mail, ClipboardList, MessageSquareWarning, Building2,
  Wrench, PackageCheck, BarChart3, Bell, Settings, LogOut, Menu, X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/contact-requests', label: 'Contact Requests', icon: Mail },
  { to: '/admin/quote-requests', label: 'Quote Requests', icon: ClipboardList },
  { to: '/admin/complaints', label: 'Complaints', icon: MessageSquareWarning },
  { to: '/admin/company', label: 'Company', icon: Building2 },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/orders', label: 'Orders', icon: PackageCheck },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { isAdmin, adminLogout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  if (!isAdmin) return <Navigate to="/login" replace />

  function handleLogout() {
    adminLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-mist flex">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-navy/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-navy text-white z-50 transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-2 px-6 py-6">
          <img src="/truck-icon.svg" alt="M4 Movers" className="h-9 w-9 rounded-lg" />
          <span className="font-display font-bold text-lg">M4 <span className="text-brand">Admin</span></span>
          <button className="ml-auto lg:hidden text-white/70" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-none">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={17} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between">
          <button className="lg:hidden text-navy" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <div>
            <p className="font-display font-semibold text-navy">Admin Dashboard</p>
            <p className="text-xs text-ink-soft">Frontend demo — data shown is sample data</p>
          </div>
          <span className="h-9 w-9 rounded-full bg-brand-light text-brand flex items-center justify-center font-semibold text-sm">A</span>
        </header>
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
