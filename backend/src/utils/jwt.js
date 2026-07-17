import jwt from 'jsonwebtoken'

export function signAuthToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

export function verifyAuthToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// Short-lived token proving the user verified a password-reset code,
// without needing to keep the raw code around in the client.
export function signResetToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, purpose: 'password-reset' },
    process.env.RESET_TOKEN_SECRET,
    { expiresIn: process.env.RESET_TOKEN_EXPIRES_IN || '15m' }
  )
}

export function verifyResetToken(token) {
  const payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET)
  if (payload.purpose !== 'password-reset') throw new Error('Invalid token purpose')
  return payload
}
