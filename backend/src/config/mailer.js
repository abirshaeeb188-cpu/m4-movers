import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
})

export async function sendMail({ to, subject, html, text, replyTo }) {
  const from = process.env.SMTP_FROM || '"M4 Movers" <no-reply@m4movers.com>'
  try {
    await transporter.sendMail({ from, to, subject, html, text, replyTo })
  } catch (err) {
    // Never let email failures crash a request — log and continue.
    console.error(`Failed to send email to ${to}:`, err.message)
  }
}

export function otpEmailTemplate({ heading, code, intro }) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px;">
    <h2 style="color: #0f2942; margin-bottom: 8px;">${heading}</h2>
    <p style="color: #475569; font-size: 14px; line-height: 1.6;">${intro}</p>
    <div style="background: #f1f5f9; border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0;">
      <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #0f2942;">${code}</span>
    </div>
    <p style="color: #94a3b8; font-size: 12px;">This code expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes. If you didn't request this, you can safely ignore this email.</p>
    <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">M4 Movers &mdash; ${process.env.COMPANY_ADDRESS || 'Dubai, UAE'}</p>
  </div>`
}
