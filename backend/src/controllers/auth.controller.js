import bcrypt from 'bcryptjs'
import { pool } from '../config/db.js'
import { sendMail, otpEmailTemplate } from '../config/mailer.js'
import { generateOtp, otpExpiryDate, isExpired } from '../utils/otp.js'
import { signAuthToken, signResetToken, verifyResetToken } from '../utils/jwt.js'
import { asyncHandler } from '../utils/asyncHandler.js'

function publicUser(u) {
  return {
    id: u.id,
    name: u.full_name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    isVerified: u.is_verified,
  }
}

const emailRe = /^\S+@\S+\.\S+$/

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'Full name, email, phone and password are required.' })
  }
  if (!emailRe.test(email)) {
    return res.status(400).json({ success: false, message: 'Enter a valid email address.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' })
  }

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
  if (existing.rowCount > 0) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const code = generateOtp()
  const expires = otpExpiryDate()

  const { rows } = await pool.query(
    `INSERT INTO users (full_name, email, phone, password_hash, verification_code, verification_code_expires)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [fullName, email.toLowerCase(), phone, passwordHash, code, expires]
  )
  const user = rows[0]

  await sendMail({
    to: user.email,
    subject: 'Verify your M4 Movers account',
    html: otpEmailTemplate({
      heading: 'Verify your email',
      code,
      intro: `Hi ${fullName}, welcome to M4 Movers! Use the code below to verify your email address.`,
    }),
  })

  const token = signAuthToken(user)

  res.status(201).json({
    success: true,
    message: 'Account created. We sent a 6-digit verification code to your email.',
    token,
    user: publicUser(user),
  })
})

// POST /api/auth/verify-email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body
  if (!email || !code) {
    return res.status(400).json({ success: false, message: 'Email and verification code are required.' })
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
  const user = rows[0]
  if (!user) return res.status(404).json({ success: false, message: 'No account found for this email.' })
  if (user.is_verified) return res.json({ success: true, message: 'Email already verified.' })

  if (user.verification_code !== String(code) || isExpired(user.verification_code_expires)) {
    return res.status(400).json({ success: false, message: 'Invalid or expired verification code.' })
  }

  await pool.query(
    `UPDATE users SET is_verified = TRUE, verification_code = NULL, verification_code_expires = NULL, updated_at = now()
     WHERE id = $1`,
    [user.id]
  )

  res.json({ success: true, message: 'Email verified successfully.' })
})

// POST /api/auth/resend-verification
export const resendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' })

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
  const user = rows[0]
  if (!user) return res.status(404).json({ success: false, message: 'No account found for this email.' })
  if (user.is_verified) return res.json({ success: true, message: 'Email already verified.' })

  const code = generateOtp()
  const expires = otpExpiryDate()
  await pool.query(
    'UPDATE users SET verification_code = $1, verification_code_expires = $2 WHERE id = $3',
    [code, expires, user.id]
  )

  await sendMail({
    to: user.email,
    subject: 'Your new M4 Movers verification code',
    html: otpEmailTemplate({
      heading: 'Verify your email',
      code,
      intro: `Hi ${user.full_name}, here is your new verification code.`,
    }),
  })

  res.json({ success: true, message: 'A new verification code has been sent to your email.' })
})

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter your email and password.' })
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
  const user = rows[0]
  if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password.' })

  if (user.status === 'blocked') {
    return res.status(403).json({ success: false, message: 'This account has been blocked. Contact support.' })
  }

  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) return res.status(401).json({ success: false, message: 'Invalid email or password.' })

  const token = signAuthToken(user)
  res.json({ success: true, message: 'Logged in successfully.', token, user: publicUser(user) })
})

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [req.auth.sub])
  const user = rows[0]
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' })
  res.json({ success: true, user: publicUser(user) })
})

// POST /api/auth/forgot-password  -> sends a 6-digit reset code by email
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' })

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
  const user = rows[0]

  // Always respond success (don't leak which emails are registered), but only
  // actually send the email if the account exists.
  if (user) {
    const code = generateOtp()
    const expires = otpExpiryDate()
    await pool.query('UPDATE users SET reset_code = $1, reset_code_expires = $2 WHERE id = $3', [code, expires, user.id])

    await sendMail({
      to: user.email,
      subject: 'Reset your M4 Movers password',
      html: otpEmailTemplate({
        heading: 'Reset your password',
        code,
        intro: `Hi ${user.full_name}, use the code below to reset your password.`,
      }),
    })
  }

  res.json({ success: true, message: 'If an account exists for this email, a reset code has been sent.' })
})

// POST /api/auth/verify-reset-code -> validates the code, returns a short-lived reset token
export const verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body
  if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code are required.' })

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
  const user = rows[0]
  if (!user || user.reset_code !== String(code) || isExpired(user.reset_code_expires)) {
    return res.status(400).json({ success: false, message: 'Invalid or expired code.' })
  }

  const resetToken = signResetToken(user)
  res.json({ success: true, message: 'Code verified.', resetToken })
})

// POST /api/auth/reset-password -> { resetToken, newPassword }
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body
  if (!resetToken || !newPassword) {
    return res.status(400).json({ success: false, message: 'Reset token and new password are required.' })
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' })
  }

  let payload
  try {
    payload = verifyResetToken(resetToken)
  } catch {
    return res.status(400).json({ success: false, message: 'Reset session expired. Please start again.' })
  }

  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [payload.sub])
  const user = rows[0]
  if (!user || user.reset_code === null) {
    return res.status(400).json({ success: false, message: 'Reset session expired. Please start again.' })
  }

  const passwordHash = await bcrypt.hash(newPassword, 10)
  await pool.query(
    `UPDATE users SET password_hash = $1, reset_code = NULL, reset_code_expires = NULL, updated_at = now() WHERE id = $2`,
    [passwordHash, user.id]
  )

  res.json({ success: true, message: 'Password updated successfully. You can now log in.' })
})
