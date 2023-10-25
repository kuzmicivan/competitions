import Image from 'next/image'
import Link from 'next/link'
import ProfileClient from './components/profileClient/profileClient'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-white'>
        <Link href="/stvori-natjecanje">
          <div className='bg-blue-800 rounded text-white hover:bg-blue-700 px-4 py-2'>
            Stvori natjecanje
          </div>
          </Link>
      </div>
      
    </main>
  )
}
