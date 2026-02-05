'use client'

import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <section className='w-full relative'>
        <Navbar onMenuClick={()=> setIsSidebarOpen(true)} isOpen={isSidebarOpen}/>

        <div className='max-container padding-x'>
          <h1>Blog 1</h1>
          
        </div>

        <Sidebar onMenuClick={()=>setIsSidebarOpen(false) } isOpen={isSidebarOpen}/>
        
    </section>
  )
}

export default Dashboard