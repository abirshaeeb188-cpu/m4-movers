import { MessageCircle } from 'lucide-react'
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
    <a
      href={`https://wa.me/${config.whatsapp}`}
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,0.6)] flex items-center justify-center hover:scale-105 transition-transform"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  )
}
