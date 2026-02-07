'use client'

import { Menu } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SidebarProps } from '@/Types'

const Sidebar = ({onMobileMenuClick, isOpen} : SidebarProps) => {

  const sidebarRef = useRef<HTMLDivElement>(null);


     // Initial setup (runs once)
    useGSAP(() => {
      if (!sidebarRef.current) return

      gsap.set(sidebarRef.current, {
        x: -300,
        display: 'none',

      })
    }, [])

    // Animate on state change
    useGSAP(() => {
      if (!sidebarRef.current) return

      gsap.to(sidebarRef.current, {
        x: isOpen ? 0 : -300,
    
        display: isOpen ? 'block':'none',
        duration: 0.4,
        ease: 'power1.inOut',
        opacity: 1
      })
    }, [isOpen])

    


  
  return (
    <nav ref={sidebarRef} className='h-screen bg-white px-7 py-8 border-r border-zinc-300 absolute top-0 opacity-0  '>

        <div>

          <div className='flex gap-4 items-center'>
            <button onClick={onMobileMenuClick} className='cursor-pointer'>
              <Menu strokeWidth={1} />
            </button>
            <p className='text-xl font-semibold'>ThinkWrite.</p>
          </div>

        </div>

    </nav>
  )
}

export default Sidebar