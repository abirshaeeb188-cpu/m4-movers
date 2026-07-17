import { pool } from '../config/db.js'
import { sendMail } from '../config/mailer.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const emailRe = /^\S+@\S+\.\S+$/

function adminNotificationHtml(r) {
  const rows = [
    ['Full Name', r.full_name],
    ['Email', r.email],
    ['Phone', r.phone],
    ['Company', r.company || '—'],
    ['Service Required', r.service || '—'],
    ['Moving Date', r.moving_date || '—'],
    ['Pickup Address', r.pickup_address || '—'],
    ['Destination Address', r.destination_address || '—'],
    ['Message', r.message || '—'],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#0f2942;border-bottom:1px solid #e2e8f0;">${label}</td><td style="padding:8px 12px;color:#334155;border-bottom:1px solid #e2e8f0;">${value}</td></tr>`
    )
    .join('')

  return `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
    <h2 style="color:#0f2942;">New Quote / Contact Request</h2>
    <p style="color:#475569;font-size:14px;">A new request was submitted on the M4 Movers website.</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
  </div>`
}

// POST /api/contact  (Request a Free Quote form on the Contact page)
export const createContactRequest = asyncHandler(async (req, res) => {
  const {
    fullName, email, phone, company, service,
    movingDate, pickup, destination, message,
  } = req.body

  if (!fullName || !fullName.trim()) return res.status(400).json({ success: false, message: 'Full name is required.' })
  if (!emailRe.test(email || '')) return res.status(400).json({ success: false, message: 'Enter a valid email address.' })
  if (!phone || !/^[\d+\s()-]{7,}$/.test(phone)) return res.status(400).json({ success: false, message: 'Enter a valid phone number.' })

  const userId = req.auth?.sub || null

  const { rows } = await pool.query(
    `INSERT INTO contact_requests
      (user_id, full_name, email, phone, company, service, moving_date, pickup_address, destination_address, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [userId, fullName, email, phone, company || null, service, movingDate || null, pickup, destination, message || null]
  )
  const record = rows[0]

  await sendMail({
    to: process.env.ADMIN_NOTIFY_EMAIL,
    subject: `New Quote Request from ${fullName}`,
    replyTo: email,
    html: adminNotificationHtml(record),
  })

  res.status(201).json({
    success: true,
    message: `Thanks ${fullName.split(' ')[0]} — our team will contact you at ${email} within the hour.`,
    requestId: record.id,
  })
})
