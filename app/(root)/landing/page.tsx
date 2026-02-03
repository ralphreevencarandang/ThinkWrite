import React from 'react'
import Navbar from "@/components/root/Navbar";
import Footer from "@/Sections/root/Footer";
import Hero from "@/Sections/root/Hero";

const LandingPage = () => {
  return (
    <div className='flex flex-col h-screen'>
        <Navbar/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default LandingPage