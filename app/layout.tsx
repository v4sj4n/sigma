import type { Metadata } from 'next'
import { Gabarito } from 'next/font/google'
import './globals.css'

const gabarito = Gabarito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sigma learning',
  description: 'Opening new possibilities for learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={gabarito.className}>{children}</body>
    </html>
  )
}
