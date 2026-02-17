'use client'


import ProtectedNavbar from '@/components/navigation/ProtectedNavbar'
import { useState } from 'react'
import DesktopSidebar from '@/components/navigation/DesktopSidebar'
import MobileSidebar from '@/components/navigation/MobileSidebar'

import MainContent from './MainContent'

const ProtectedClient = () => {


 

  // Menu in Mobile
  const [isMobileMenu, setMobileMenu] = useState(false)

  // Should open in desktop
  const [isDesktopMenu, setDesktopMenu] = useState(true)

  return (
    <section className='w-full relative'>

        <ProtectedNavbar  onMobileMenuClick={()=> setMobileMenu(true)} onDesktopMenuClick={()=> setDesktopMenu(!isDesktopMenu)}/>

        <div className='flex relative'>
          <DesktopSidebar isDesktopMenu={isDesktopMenu}/>


            <div className=' w-full p-10 h-full '>

                <MainContent/>
            

                <div className='h-screen'>

                </div>

           
            </div>
          
          
        </div>

        <MobileSidebar onMobileMenuClick={()=>setMobileMenu(false) } isOpen={isMobileMenu}/>
        
    </section>
  )
}

export default ProtectedClient