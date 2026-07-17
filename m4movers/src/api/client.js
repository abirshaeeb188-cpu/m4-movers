const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('m4_token')
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let data = null
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    data = await res.json().catch(() => null)
    if (!res.ok) {
      const message = data?.message || `Request failed (${res.status})`
      return { success: false, message, status: res.status }
    }
    return data
  } catch {
    return { success: false, message: 'Could not reach the server. Please check your connection and try again.' }
  }
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
}

export { API_BASE_URL, getToken }
