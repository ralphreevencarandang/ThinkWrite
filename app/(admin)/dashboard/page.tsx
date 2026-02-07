'use client'

import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import DesktopSidebar from '@/components/admin/DesktopSidebar'
const Dashboard = () => {


  // Menu in Mobile
  const [isMobileMenu, setMobileMenu] = useState(false)

  // Should open in desktop
  const [isDesktopMenu, setDesktopMenu] = useState(true)

  return (
    <section className='w-full relative'>

        <Navbar onMobileMenuClick={()=> setMobileMenu(true)} onDesktopMenuClick={()=> setDesktopMenu(!isDesktopMenu)}/>

        <div className='flex '>
          <DesktopSidebar isDesktopMenu={isDesktopMenu}/>


          <div className=' w-full p-10'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
          </div>
          
          
        </div>

        <Sidebar onMobileMenuClick={()=>setMobileMenu(false) } isOpen={isMobileMenu}/>
        
    </section>
  )
}

export default Dashboard