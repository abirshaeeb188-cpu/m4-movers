import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Star, Send } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from './SocialIcons'
import { services } from '../data/services'
import { useCompanyConfig } from '../hooks/useCompanyConfig'

export default function Footer() {
  const config = useCompanyConfig()
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/truck-icon.svg" alt="M4 Movers" className="h-10 w-10 rounded-xl" />
            <span className="font-display font-bold text-xl text-white">
              M4 <span className="text-brand">Movers</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-white/60 mb-5">
            Licensed movers and packers serving homes and businesses across the UAE for over 15 years.
          </p>
          <div className="flex items-center gap-1 text-accent mb-1">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
            <span className="text-white/70 text-xs ml-2">4.9 average on Google</span>
          </div>
          <div className="flex gap-3 mt-5">
            {[FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-brand transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
            <li><Link to="/login" className="hover:text-brand transition-colors">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-brand transition-colors">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Newsletter</h4>
          <p className="text-sm text-white/60 mb-4">Moving tips and offers, straight to your inbox.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 min-w-0 rounded-l-full bg-white/10 border border-white/10 px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button className="rounded-r-full bg-brand px-4 flex items-center justify-center hover:bg-brand-dark transition-colors">
              <Send size={16} />
            </button>
          </form>
          <ul className="space-y-2.5 text-sm mt-6">
            <li className="flex items-center gap-2"><Phone size={14} className="text-brand" /> {config.phone}</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-brand" /> {config.email}</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-brand" /> {config.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} M4 Movers. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
