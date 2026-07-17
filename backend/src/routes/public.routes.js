import { Router } from 'express'

const router = Router()

// GET /api/public/config
// Single source of truth for contact details so the frontend never
// hardcodes the phone/WhatsApp/address in multiple places.
router.get('/config', (req, res) => {
  res.json({
    success: true,
    config: {
      email: process.env.COMPANY_EMAIL,
      phone: process.env.COMPANY_PHONE,
      whatsapp: process.env.COMPANY_WHATSAPP,
      address: process.env.COMPANY_ADDRESS,
      lat: Number(process.env.COMPANY_LAT),
      lng: Number(process.env.COMPANY_LNG),
    },
  })
})

export default router
