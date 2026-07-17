import { useEffect, useState } from 'react'
import { api } from '../api/client'

// Sensible fallbacks so the UI still works even if the API is unreachable.
export const DEFAULT_CONFIG = {
  email: 'info@m4movers.com',
  phone: '+971 56 184 2818',
  whatsapp: '971561842818',
  address: 'Al Marsa Street, Dubai, UAE',
  lat: 25.0783,
  lng: 55.1436,
}

let cached = null

export function useCompanyConfig() {
  const [config, setConfig] = useState(cached || DEFAULT_CONFIG)

  useEffect(() => {
    if (cached) return
    let active = true
    api.get('/public/config').then((res) => {
      if (active && res?.success && res.config) {
        cached = res.config
        setConfig(res.config)
      }
    })
    return () => { active = false }
  }, [])

  return config
}
