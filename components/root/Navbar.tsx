import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='w-full bg-dirty  padding-x border-b'>
        <div className="max-container flex justify-between items-center py-4 text-sm font-semibold">

            <div>
                <h1>ThinkWrite.</h1>
            </div>

            <div>
                <ul className='flex items-center space-x-4'>
                    <Link href={''}><li className='hidden sm:block'>About Us</li></Link>
                    <Link href={''}><li className='hidden sm:block'>Compose</li></Link>
                    <Link href={''}><li className='hidden sm:block'>Sign in</li></Link>
                    <Link href={''}><li className='bg-black text-white px-2 py-1 rounded'>Get started</li></Link>
                </ul>
            </div>

        </div>
       
    </nav>
  )
}

export default Navbar