'use client'

import React from 'react'
import ProtectedNavbar from '@/components/navigation/ProtectedNavbar'
import { useState } from 'react'
import DesktopSidebar from '@/components/navigation/DesktopSidebar'
import MobileSidebar from '@/components/navigation/MobileSidebar'

const ProtectedLayout = ({children} : {children: React.ReactNode}) => {

    const [isMobileMenu, setMobileMenu] = useState(false)
  const [isDesktopMenu, setDesktopMenu] = useState(true)

  return (
    <div className='w-full relative'>


        <ProtectedNavbar  onMobileMenuClick={()=> setMobileMenu(true)} onDesktopMenuClick={()=> setDesktopMenu(!isDesktopMenu)}/>


        <div className='flex relative'>
          <DesktopSidebar isDesktopMenu={isDesktopMenu}/>
            <div className=' w-full p-10 h-full '>
                {children}
            </div>
        </div>

        <MobileSidebar onMobileMenuClick={()=>setMobileMenu(false) } isOpen={isMobileMenu}/>

    </div>
  )
}

export default ProtectedLayout