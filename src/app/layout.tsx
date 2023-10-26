import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import ProfileClient from './components/profileClient/profileClient'
import Navbar from './components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Natjecanja',
  description: 'Natjecanja',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
        <Navbar />
        <div className='px-20 py-28'>
          {children}
        </div>
          
        </body>
    </UserProvider>
    </html>
  )
}
