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
    <section className=''>
          <MainContent/>
    </section>
  )
}

export default ProtectedClient