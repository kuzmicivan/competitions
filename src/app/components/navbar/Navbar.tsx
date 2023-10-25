'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import ProfileClient from '../profileClient/profileClient';

export default function Navbar() {
  return (
      <div className='fixed w-full bg-blue-800 h-20 flex items-center justify-end'>
        <ProfileClient />
      </div>
  );
}