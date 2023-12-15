'use client';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import ProfileClient from '../../components/profileClient/profileClient'
import React from 'react'
import NoteEntryBox from '@/app/components/noteEntryBox/NoteEntryBox';

export default withPageAuthRequired(function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-white'>
        <NoteEntryBox />
      </div>
    </div>
  )
})
