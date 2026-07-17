import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle2, Lock, ShieldCheck } from 'lucide-react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'

export default function ForgotPassword() {
  const { forgotPassword, verifyResetCode, resetPassword } = useAuth()

  const [step, setStep] = useState('request') // request -> code -> reset -> done
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleRequestSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const res = await forgotPassword({ email })
    setSubmitting(false)
    if (!res.success) { setError(res.message); return }
    setStep('code')
  }

  async function handleCodeSubmit(e) {
    e.preventDefault()
    setError('')
    if (code.length !== 6) { setError('Enter the 6-digit code sent to your email.'); return }
    setSubmitting(true)
    const res = await verifyResetCode({ email, code })
    setSubmitting(false)
    if (!res.success) { setError(res.message); return }
    setResetToken(res.resetToken)
    setStep('reset')
  }

  async function handleResetSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return }
    setSubmitting(true)
    const res = await resetPassword({ resetToken, newPassword: password })
    setSubmitting(false)
    if (!res.success) { setError(res.message); return }
    setStep('done')
  }

  if (step === 'code') {
    return (
      <AuthLayout title="Check your email" subtitle={`We sent a 6-digit code to ${email}.`}>
        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Verification Code</label>
            <div className="relative">
              <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                inputMode="numeric" maxLength={6} required value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm tracking-[0.4em] font-semibold focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors disabled:opacity-60">
            {submitting ? 'Verifying…' : 'Verify Code'}
          </button>
          <button type="button" onClick={() => setStep('request')} className="w-full text-xs font-semibold text-ink-soft hover:text-navy pt-1">
            Use a different email
          </button>
        </form>
      </AuthLayout>
    )
  }

  if (step === 'reset') {
    return (
      <AuthLayout title="Set a new password" subtitle="Choose a new password for your account.">
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors disabled:opacity-60">
            {submitting ? 'Updating…' : 'Reset Password'}
          </button>
        </form>
      </AuthLayout>
    )
  }

  if (step === 'done') {
    return (
      <AuthLayout title="Password updated" subtitle="You can now log in with your new password.">
        <div className="text-center py-6">
          <CheckCircle2 size={44} className="text-brand mx-auto mb-4" />
          <Link to="/login" className="w-full inline-block rounded-xl bg-navy text-white font-semibold py-3.5 hover:bg-navy-light transition-colors">
            Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot your password?" subtitle="Enter your email and we'll send you a 6-digit code." footer={<>Remembered it? <Link to="/login" className="text-brand font-semibold">Log in</Link></>}>
      <form onSubmit={handleRequestSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-ink-soft mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full rounded-xl bg-accent text-white font-semibold py-3.5 hover:bg-orange-600 transition-colors disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send Reset Code'}
        </button>
      </form>
    </AuthLayout>
  )
}
