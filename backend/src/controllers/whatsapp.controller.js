import { pool } from '../config/db.js'
import { sendMail } from '../config/mailer.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// POST /api/whatsapp-click
// Called right before the site opens wa.me, so the admin gets the visitor's
// info by email even though the actual chat happens directly on WhatsApp.
export const logWhatsappClick = asyncHandler(async (req, res) => {
  const { name, email, phone, sourcePage } = req.body
  const userId = req.auth?.sub || null

  const { rows } = await pool.query(
    `INSERT INTO whatsapp_clicks (user_id, name, email, phone, source_page)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, name || null, email || null, phone || null, sourcePage || null]
  )
  const record = rows[0]

  await sendMail({
    to: process.env.ADMIN_NOTIFY_EMAIL,
    subject: `WhatsApp chat started${name ? ` — ${name}` : ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin:auto;">
        <h2 style="color:#0f2942;">Visitor opened WhatsApp</h2>
        <p style="color:#475569;font-size:14px;">Someone tapped the WhatsApp button on the website. Their known details:</p>
        <ul style="font-size:14px;color:#334155;">
          <li><strong>Name:</strong> ${name || 'Not provided (guest)'}</li>
          <li><strong>Email:</strong> ${email || 'Not provided (guest)'}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided (guest)'}</li>
          <li><strong>Page:</strong> ${sourcePage || 'Unknown'}</li>
        </ul>
      </div>`,
  })

  res.status(201).json({ success: true, id: record.id })
})
