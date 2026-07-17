import { verifyAuthToken } from '../utils/jwt.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated.' })

  try {
    req.auth = verifyAuthToken(token)
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' })
  }
}

export function requireAdmin(req, res, next) {
  if (!req.auth || req.auth.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access only.' })
  }
  next()
}

// Attaches req.auth if a valid token is present, but doesn't fail the request
// if it's missing/invalid. Useful for endpoints usable by guests and members alike.
export function attachAuthIfPresent(req, _res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (token) {
    try {
      req.auth = verifyAuthToken(token)
    } catch {
      req.auth = null
    }
  }
  next()
}
