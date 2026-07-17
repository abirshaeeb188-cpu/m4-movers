import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('m4_token')
    const storedUser = localStorage.getItem('m4_user')
    if (token && storedUser) {
      const parsed = JSON.parse(storedUser)
      setUser(parsed)
      setIsAdmin(parsed.role === 'admin')
    }
    setLoading(false)
  }, [])

  function persistSession(token, sessionUser) {
    localStorage.setItem('m4_token', token)
    localStorage.setItem('m4_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
    setIsAdmin(sessionUser.role === 'admin')
  }

  async function register({ name, email, phone, password }) {
    const res = await api.post('/auth/register', { fullName: name, email, phone, password })
    if (!res.success) return { success: false, message: res.message }
    persistSession(res.token, res.user)
    return { success: true, user: res.user }
  }

  async function verifyEmail({ email, code }) {
    const res = await api.post('/auth/verify-email', { email, code })
    if (res.success && user && user.email === email) {
      const updated = { ...user, isVerified: true }
      localStorage.setItem('m4_user', JSON.stringify(updated))
      setUser(updated)
    }
    return res
  }

  async function resendVerification({ email }) {
    return api.post('/auth/resend-verification', { email })
  }

  async function login({ email, password }) {
    const res = await api.post('/auth/login', { email, password })
    if (!res.success) return { success: false, message: res.message }
    if (res.user.role === 'admin') {
      return { success: false, message: 'Please use the Admin login option for this account.' }
    }
    persistSession(res.token, res.user)
    return { success: true, user: res.user }
  }

  async function adminLogin({ email, password }) {
    const res = await api.post('/auth/login', { email, password })
    if (!res.success) return { success: false, message: res.message }
    if (res.user.role !== 'admin') {
      return { success: false, message: 'Invalid admin email or password.' }
    }
    persistSession(res.token, res.user)
    return { success: true, user: res.user }
  }

  async function forgotPassword({ email }) {
    return api.post('/auth/forgot-password', { email })
  }

  async function verifyResetCode({ email, code }) {
    return api.post('/auth/verify-reset-code', { email, code })
  }

  async function resetPassword({ resetToken, newPassword }) {
    return api.post('/auth/reset-password', { resetToken, newPassword })
  }

  function logout() {
    setUser(null)
    setIsAdmin(false)
    localStorage.removeItem('m4_token')
    localStorage.removeItem('m4_user')
  }

  function adminLogout() {
    logout()
  }

  return (
    <AuthContext.Provider
      value={{
        user, isAdmin, loading,
        register, verifyEmail, resendVerification,
        login, adminLogin, logout, adminLogout,
        forgotPassword, verifyResetCode, resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
