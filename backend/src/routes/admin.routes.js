import { Router } from 'express'
import { pool } from '../config/db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()
router.use(requireAuth, requireAdmin)

router.get(
  '/contact-requests',
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM contact_requests ORDER BY created_at DESC LIMIT 200')
    res.json({ success: true, requests: rows })
  })
)

router.get(
  '/whatsapp-clicks',
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM whatsapp_clicks ORDER BY created_at DESC LIMIT 200')
    res.json({ success: true, clicks: rows })
  })
)

router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query(
      `SELECT id, full_name, email, phone, role, is_verified, status, created_at
       FROM users ORDER BY created_at DESC LIMIT 500`
    )
    res.json({ success: true, users: rows })
  })
)

export default router
