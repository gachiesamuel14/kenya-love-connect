'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Discover() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    // Request location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        (err) => console.error(err)
      )
    }

    // TODO: Fetch nearby users via supabase.rpc('nearby_users', { ... })
    // For now, mock data
    setUsers([
      { id: 1, name: 'Amina from Nairobi', age: 26, bio: 'Love hiking and Sheng vibes', county: 'Nairobi' },
      { id: 2, name: 'Brian from Mombasa', age: 29, bio: 'Beach lover, professional', county: 'Mombasa' },
    ])
    setLoading(false)
  }, [])

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Discover Nearby</h1>
      {location && (
        <p className="text-sm text-gray-600 mb-4 text-center">
          Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
      )}
      {loading ? (
        <p>Loading matches...</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold">{user.name}, {user.age}</h2>
              <p className="text-sm text-kenya-green">{user.county}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="flex gap-4 mt-4 justify-center">
                <button className="bg-gray-200 px-6 py-2 rounded-full">Pass</button>
                <button className="bg-kenya-green text-white px-6 py-2 rounded-full">Like</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
