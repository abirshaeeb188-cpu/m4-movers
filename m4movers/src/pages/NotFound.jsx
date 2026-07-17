import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-mist px-4">
      <div className="text-center">
        <p className="font-display font-bold text-7xl text-brand">404</p>
        <h1 className="font-display font-semibold text-2xl text-navy mt-4">Looks like this page moved out</h1>
        <p className="text-ink-soft mt-2">The page you're looking for doesn't exist or has been relocated.</p>
        <Link to="/" className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
