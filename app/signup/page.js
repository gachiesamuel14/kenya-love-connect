'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for confirmation link!')
      // Optionally redirect after confirmation
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  )
}
