'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      router.push('/discover')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-kenya-green text-white p-3 rounded font-semibold hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
      </form>
    </div>
  )
}
