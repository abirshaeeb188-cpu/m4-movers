import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
  register,
  verifyEmail,
  resendVerification,
  login,
  me,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from '../controllers/auth.controller.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Basic brute-force protection on sensitive endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false })

router.post('/register', authLimiter, register)
router.post('/verify-email', authLimiter, verifyEmail)
router.post('/resend-verification', authLimiter, resendVerification)
router.post('/login', authLimiter, login)
router.get('/me', requireAuth, me)

router.post('/forgot-password', authLimiter, forgotPassword)
router.post('/verify-reset-code', authLimiter, verifyResetCode)
router.post('/reset-password', authLimiter, resetPassword)

export default router
