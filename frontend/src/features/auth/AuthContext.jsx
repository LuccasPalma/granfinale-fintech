import { useMemo, useState } from 'react'
import api from '../../lib/api'
import { AuthContext } from './authContext'

const STORAGE_KEY = 'via_cartao_auth'
const TOKEN_KEY = 'via_cartao_token'
const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL
const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD

function getStoredAuth() {
  const rawAuth = localStorage.getItem(STORAGE_KEY)

  if (!rawAuth) return null

  try {
    return JSON.parse(rawAuth)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredAuth())

  async function login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      const token = response.data?.token || response.data?.accessToken
      const authenticatedUser = response.data?.user || { email: credentials.email }

      if (token) {
        localStorage.setItem(TOKEN_KEY, token)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser))
      setUser(authenticatedUser)
      return authenticatedUser
    } catch (error) {
      const isLocalDemo =
        DEMO_EMAIL &&
        DEMO_PASSWORD &&
        credentials.email === DEMO_EMAIL &&
        credentials.senha === DEMO_PASSWORD

      if (!isLocalDemo) {
        throw error
      }

      const demoUser = { email: credentials.email, nome: 'Administrador' }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
      localStorage.setItem(TOKEN_KEY, 'demo-token')
      setUser(demoUser)
      return demoUser
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
