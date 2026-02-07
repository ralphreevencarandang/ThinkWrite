import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='border-t border-zinc-300 padding-x  py-4 text-gray-500 '>
        <div className='max-container  text-xs flex justify-center gap-4'>
            <Link href="">Link 1</Link>
            <Link href="">Link 2</Link>
            <Link href="">Link 3</Link>
            <Link href="">Link 4</Link>
        </div>

    </footer>
  )
}

export default Footer