'use client'


import Navbar from '@/components/admin/Navbar'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import DesktopSidebar from '@/components/admin/DesktopSidebar'
import MobileSidebar from '@/components/admin/MobileSidebar'
const Dashboard = () => {


  // Menu in Mobile
  const [isMobileMenu, setMobileMenu] = useState(false)

  // Should open in desktop
  const [isDesktopMenu, setDesktopMenu] = useState(true)

  return (
    <section className='w-full relative'>

        <Navbar onMobileMenuClick={()=> setMobileMenu(true)} onDesktopMenuClick={()=> setDesktopMenu(!isDesktopMenu)}/>

        <div className='flex relative'>
          <DesktopSidebar isDesktopMenu={isDesktopMenu}/>


          <div className=' w-full p-10 h-full'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, est.</p>

            <div className='bg-red-300 h-70'>

            </div>
            <div className='bg-red-300 h-70'>

            </div>
            <div className='bg-red-300 h-70'>

            </div>
            <div className='bg-red-300 h-70'>

            </div>
          </div>
          
          
        </div>

        <MobileSidebar onMobileMenuClick={()=>setMobileMenu(false) } isOpen={isMobileMenu}/>
        
    </section>
  )
}

export default Dashboard