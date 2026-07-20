import { MessageCircle, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCompanyConfig } from '../hooks/useCompanyConfig'
import { openWhatsApp } from '../utils/whatsapp'

export default function FloatingActions() {
  const { user } = useAuth()
  const config = useCompanyConfig()

  function handleClick(e) {
    e.preventDefault()
    openWhatsApp({ whatsappNumber: config.whatsapp, user, sourcePage: 'floating-button' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      <a
        href={`tel:${config.phone.replace(/\s/g, '')}`}
        aria-label="Call us"
        className="h-14 w-14 rounded-full bg-brand text-white shadow-[0_15px_35px_-10px_rgba(15,41,66,0.6)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Phone size={24} fill="white" strokeWidth={0} />
      </a>

      <a
        href={`https://wa.me/${config.whatsapp}`}
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,0.6)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </a>
    </div>
  )
}
