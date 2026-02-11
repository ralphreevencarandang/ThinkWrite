'use client'

import React from 'react'
import Link from 'next/link'
import AuthModal from './AuthModal'
const Navbar = () => {
  return (
    <header className='w-full bg-dirty  padding-x border-b border-zinc-300'>
        <div className="max-container flex justify-between items-center py-4 text-sm font-semibold">

            <div>
                <Link href={''} className='text-black text-lg'>ThinkWrite.</Link>
            </div>

            <nav>
                <ul className='flex items-center space-x-4'>
                    <li className='hidden sm:block'><Link href={''}>Browse</Link></li>
                    <li className='hidden sm:block'><Link href={''}>About Us</Link></li>
                    <li className='hidden sm:block'><AuthModal label='Sign in' btnClass='cursor-pointer'/></li>
                    <li><AuthModal label='Get started' btnClass='bg-black text-white px-2 py-1 rounded cursor-pointer hover:bg-stone-950'/></li>
                </ul>
            </nav>
        </div>
       
    </header>
  )
}

export default Navbar