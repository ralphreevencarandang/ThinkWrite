'use client'
import Link from 'next/link'
import { Bookmark, House, Menu, NotepadText, Settings } from 'lucide-react'
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

          <div className='space-y-10'>

            <div className='flex gap-4'>
                <button onClick={onMobileMenuClick} className='cursor-pointer'>
                <Menu strokeWidth={1} />  
              </button>

              <Link href={''} className='text-black text-lg   '>ThinkWrite.</Link>


            </div>
        
            <div>

              <ul className='space-y-5'>
                <li>
                  <Link href={''} className='flex gap-2 items-center hover:text-black transition-all'> <House  strokeWidth={1} />Home</Link>
                </li>
                <li>
                  <Link href={''} className='flex gap-2 items-center hover:text-black transition-all'> <Bookmark  strokeWidth={1} />Like</Link>
                </li>
                <li>
                  <Link href={''} className='flex gap-2 items-center hover:text-black transition-all'> <NotepadText  strokeWidth={1} />Stories</Link>
                </li>
                <li>
                  <Link href={''} className='flex gap-2 items-center hover:text-black transition-all'> <Settings  strokeWidth={1} />Settings</Link>
                </li>
            

              </ul>
            </div>
          </div>

        </div>

    </nav>
  )
}

export default Sidebar