'use client'
import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
const Dashboard = () => {

  const [isOpen, setIsOpen] = useState(false)




  return (
    <section className='w-full relative'>
        <Navbar fn={ setIsOpen} isOpen={isOpen}/>

        <div className='max-container padding-x'>
          <h1>Blog 1</h1>
          
        </div>

      
          <Sidebar fn={ setIsOpen} isOpen={isOpen}/>
        



     
        
    </section>
  )
}

export default Dashboard