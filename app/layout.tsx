import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SignatureMicroInteractionsProvider } from './components/SignatureMicroInteractions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Avada Portfolio - Digital Excellence',
  description: 'Creating unforgettable digital experiences through innovative technology solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SignatureMicroInteractionsProvider>
          {children}
        </SignatureMicroInteractionsProvider>
      </body>
    </html>
  )
}
