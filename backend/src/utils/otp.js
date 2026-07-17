export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000)) // 6-digit code
}

export function otpExpiryDate() {
  const minutes = Number(process.env.OTP_EXPIRES_MINUTES || 10)
  return new Date(Date.now() + minutes * 60 * 1000)
}

export function isExpired(expiryDate) {
  if (!expiryDate) return true
  return new Date(expiryDate).getTime() < Date.now()
}
