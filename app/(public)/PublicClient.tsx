import React from 'react'
import PublicNavbar from "@/components/navigation/PublicNavbar";

import Hero from '@/components/sections/Hero';

import Footer from '@/components/sections/Footer';

const PublicClient = () => {
  return (
    <main className='flex flex-col min-h-screen'>
        <PublicNavbar/>
        <Hero/>
        <Footer/>
    </main>
  )
}

export default PublicClient