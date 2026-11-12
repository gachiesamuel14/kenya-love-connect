import './globals.css'

export const metadata = {
  title: 'Kenya Love Connect',
  description: 'Location-based dating for Kenya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
