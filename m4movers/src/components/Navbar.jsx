import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, User, MessageSquare, Package } from 'lucide-react';
import { services } from '../data/services';
import { useAuth } from '../context/AuthContext';
import { useCompanyConfig } from '../hooks/useCompanyConfig';
import logo from '../assets/m4_logo.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', hasMega: true },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { user, logout } = useAuth();
  const config = useCompanyConfig();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(10,27,61,0.15)]'
          : 'bg-white/60 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="M4 Movers" className="h-10 w-15 rounded-xl" />
            <span className="font-display -ml-2 font-bold text-xl text-navy tracking-tight">
              M4 <span className="text-brand">Movers</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive ? 'text-brand' : 'text-ink hover:text-brand'
                      }`
                    }>
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                    />
                  </NavLink>
                  {megaOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[640px]">
                      <div className="glass-light rounded-2xl shadow-soft p-5 grid grid-cols-2 gap-1">
                        {services.slice(0, 8).map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-light transition-colors group">
                            <span className="h-9 w-9 rounded-lg bg-brand-light group-hover:bg-white flex items-center justify-center text-brand shrink-0">
                              <s.icon size={17} />
                            </span>
                            <span className="text-sm font-medium text-ink">
                              {s.title}
                            </span>
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="col-span-2 text-center text-sm font-semibold text-brand hover:text-brand-dark mt-1 py-2 border-t border-slate-100">
                          View all 15 services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive ? 'text-brand' : 'text-ink hover:text-brand'
                    }`
                  }>
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${config.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="h-9 w-9 rounded-full bg-brand-light flex items-center justify-center text-brand">
                <Phone size={16} />
              </span>
              {config.phone}
            </a>

            <NavLink
              to="/comments"
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-brand text-brand bg-brand-light'
                    : 'border-navy/15 text-navy hover:bg-slate-50'
                }`
              }>
              <MessageSquare size={16} />
              Comments
            </NavLink>

            {user && (
              <NavLink
                to="/store-product"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-brand text-brand bg-brand-light'
                      : 'border-navy/15 text-navy hover:bg-slate-50'
                  }`
                }>
                <Package size={16} />
                Store Product
              </NavLink>
            )}

            {user ? (
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-navy/15 text-navy text-sm font-semibold hover:bg-slate-50 transition-colors">
                <User size={16} />
                {user.name}
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold shadow-[0_10px_25px_-8px_rgba(255,122,41,0.6)] hover:bg-orange-600 transition-colors">
                <User size={16} />
                Login
              </Link>
            )}
          </div>

          <button
            className="lg:hidden text-navy"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu">
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pb-6 pt-2 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-xl text-sm font-semibold ${isActive ? 'text-brand bg-brand-light' : 'text-ink'}`
              }>
              {link.label}
            </NavLink>
          ))}

          <a
            href={`tel:${config.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold text-navy">
            <Phone size={16} />
            {config.phone}
          </a>

          <NavLink
            to="/comments"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl border border-navy/15 text-navy text-sm font-semibold">
            <MessageSquare size={16} />
            Comments
          </NavLink>

          {user && (
            <NavLink
              to="/store-product"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl border border-navy/15 text-navy text-sm font-semibold">
              <Package size={16} />
              Store Product
            </NavLink>
          )}

          {user ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/profile');
              }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl border border-navy/15 text-navy text-sm font-semibold">
              <User size={16} />
              {user.name}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-xl bg-accent text-white text-sm font-semibold">
              <User size={16} />
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
