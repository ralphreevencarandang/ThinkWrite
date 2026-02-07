import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <header className='w-full bg-dirty  padding-x border-b border-zinc-300'>
        <div className="max-container flex justify-between items-center py-4 text-sm font-semibold">

            <div>
                <Link href={''} className='text-black text-lg'>ThinkWrite.</Link>
            </div>

            <nav>
                <ul className='flex items-center space-x-4'>
                    <Link href={''}><li className='hidden sm:block'>Browse</li></Link>
                    <Link href={''}><li className='hidden sm:block'>About Us</li></Link>
                    <Link href={''}><li className='hidden sm:block'>Sign in</li></Link>
                    <Link href={''}><li className='bg-black text-white px-2 py-1 rounded'>Get started</li></Link>
                </ul>
            </nav>

        </div>
       
    </header>
  )
}

export default Navbar