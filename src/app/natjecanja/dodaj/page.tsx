'use client';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import CompetitionEntryBox from '../../components/competitionEntryBox/CompetitionEntryBox'
import ProfileClient from '../../components/profileClient/profileClient'
import React from 'react'

export default withPageAuthRequired(function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-white'>
        <CompetitionEntryBox />
      </div>
      
    </div>
  )
})
