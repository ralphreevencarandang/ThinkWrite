import React from 'react'
import Navbar from "@/components/root/Navbar";

import Hero from '@/sections/root/Hero';
import Footer from '@/sections/root/Footer';

const LandingPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
        <Navbar/>
        <Hero/>
        <Footer/>
    </main>
  )
}

export default LandingPage