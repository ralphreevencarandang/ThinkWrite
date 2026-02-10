import React from 'react'
import Button from '@/components/root/Button'
const Hero = () => {
  return (
    <section className='padding-x max-container h-full py-10 flex items-center  sm:flex sm:flex-col sm:justify-center flex-1'>
        <div className='space-y-5'>
            <h1 className='text-6xl'>Human stories & ideas</h1>
            <p>A place to read, write, and deepen your understanding</p>
            <Button label='Start reading'/>
        </div>
    </section>
  )
}

export default Hero