import React from 'react'
import Navbar from "@/components/root/Navbar";

import Hero from '@/Sections/root/Hero';
import Footer from '@/Sections/root/Footer';

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