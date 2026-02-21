import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Link from 'next/link'
import { Bookmark, House, NotepadText, Settings } from 'lucide-react'

const DesktopSidebar = ( {isDesktopMenu} : {isDesktopMenu : boolean}) => {

    const desktopSidebarRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        if(!desktopSidebarRef.current) return

        

        gsap.to(desktopSidebarRef.current, {
                x: isDesktopMenu ? 0 : -300,
                duration: 0.8,
                ease: "back.inOut",
                opacity: 1,
                width: isDesktopMenu ? '256px' : 0
        })


    },[isDesktopMenu])
  return (
        <div  ref={desktopSidebarRef} className=' w-3xs hidden xl:block border-r border-zinc-300 padding-x py-10 sticky top-[73.4px] h-[calc(100vh-73.4px)]
       '>

            <ul className='space-y-5'>
              <li>
                <Link href={'/'} className='flex gap-2 items-center hover:text-black '> <House  strokeWidth={1} />Home</Link>
              </li>
       

        
              <li>
                <Link href={'/library'} className='flex gap-2 items-center hover:text-black '> <Bookmark  strokeWidth={1} />Like</Link>
              </li>
              <li>
                <Link href={'/stories'} className='flex gap-2 items-center hover:text-black '> <NotepadText  strokeWidth={1} />Stories</Link>
              </li>

              <li>
                <Link href={'/settings'} className='flex gap-2 items-center hover:text-black '> <Settings  strokeWidth={1}  />Settings</Link>
              </li>
            </ul>

          </div>
  )
}

export default DesktopSidebar