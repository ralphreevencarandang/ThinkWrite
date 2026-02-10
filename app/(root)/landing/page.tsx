import React from 'react'
import Navbar from "@/components/root/Navbar";
import Footer from "@/sections/root/Footer";
import Hero from "@/sections/root/Hero";

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