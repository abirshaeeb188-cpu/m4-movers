import { api } from '../api/client'

// Sends whatever info we have about the visitor to the backend (which emails
// the admin), then opens the WhatsApp chat. We give the notify call a short
// timeout so a slow/offline API never blocks the user from opening WhatsApp.
export async function openWhatsApp({ whatsappNumber, user, sourcePage }) {
  const payload = {
    name: user?.name || null,
    email: user?.email || null,
    phone: user?.phone || null,
    sourcePage: sourcePage || window.location.pathname,
  }

  const notify = api.post('/whatsapp-click', payload, { auth: true })
  const timeout = new Promise((resolve) => setTimeout(resolve, 1200))
  await Promise.race([notify, timeout])

  window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer')
}
