import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load (if a token + user were saved previously)
  useEffect(() => {
    const token = localStorage.getItem('m4_token');
    const storedUser = localStorage.getItem('m4_user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('m4_token');
        localStorage.removeItem('m4_user');
      }
    }
    setLoading(false);
  }, []);

  function persistSession(token, sessionUser) {
    localStorage.setItem('m4_token', token);
    localStorage.setItem('m4_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
  }

  // login(email, password) -> throws on failure, matches Login.jsx usage
  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    if (!res.token) {
      throw new Error(res.message || 'Login failed.');
    }
    persistSession(res.token, res.user);
    return res.user;
  }

  // signup(name, email, password) -> throws on failure, matches Signup.jsx usage
  async function signup(name, email, password) {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword: password,
    });
    if (!res.token) {
      throw new Error(res.message || 'Registration failed.');
    }
    persistSession(res.token, res.user);
    return res.user;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('m4_token');
    localStorage.removeItem('m4_user');
  }

  // Merge and persist partial user updates (e.g. after uploading an avatar)
  function updateUser(partialUser) {
    setUser((prev) => {
      const updated = { ...prev, ...partialUser };
      localStorage.setItem('m4_user', JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
