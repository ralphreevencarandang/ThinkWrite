'use client'

import React from 'react'

import Button from '@/components/ui/Button'
import AuthModal from '../forms/AuthModal'
const Hero = () => {
  return (
    <section className='padding-x max-container h-full py-10 flex items-center  sm:flex sm:flex-col sm:justify-center flex-1'>
        <div className='space-y-5'>
            <h1 className='text-6xl'>Human stories & ideas</h1>
            <p>A place to read, write, and deepen your understanding</p>
            
            <AuthModal label='Start reading' btnClass='bg-black text-white text-sm px-3 py-2 rounded-full hover:bg-stone-950 cursor-pointer'/>
        </div>
    </section>
  )
}

export default Hero