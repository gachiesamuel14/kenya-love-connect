import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold text-kenya-green mb-4">Kenya Love Connect</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Find your match nearby in Nairobi, Mombasa, Kisumu and across Kenya. 
        Location-based dating made for Kenyans.
      </p>
      <div className="flex gap-4">
        <Link href="/signup" className="bg-kenya-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition">
          Get Started
        </Link>
        <Link href="/login" className="border-2 border-kenya-red text-kenya-red px-8 py-3 rounded-full font-semibold hover:bg-kenya-red hover:text-white transition">
          Login
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">📍 Nearby Matches</h3>
          <p>Connect with people in your county or within a set distance.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">👌 Swipe & Match</h3>
          <p>Like profiles and chat when it's mutual.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">🇰🇪 Made for Kenya</h3>
          <p>Counties, local vibes, and future M-Pesa support.</p>
        </div>
      </div>
    </main>
  )
}
