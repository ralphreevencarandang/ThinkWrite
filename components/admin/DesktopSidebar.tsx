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

        let tl = gsap.timeline();

        tl.to(desktopSidebarRef.current, {
                x: isDesktopMenu ? 0 : -300,
                duration: 0.8,
                ease: "back.inOut",
                opacity: 1,
                width: isDesktopMenu ? '256px' : 0
        })


    },[isDesktopMenu])
  return (
        <div  ref={desktopSidebarRef} className=' w-3xs hidden xl:block border-r border-gray-400 padding-x py-10 '>
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
  )
}

export default DesktopSidebar