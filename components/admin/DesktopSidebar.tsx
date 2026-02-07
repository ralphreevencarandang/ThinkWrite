import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
const DesktopSidebar = ( {isDesktopMenu} : {isDesktopMenu : boolean}) => {

    const desktopSidebarRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        if(!desktopSidebarRef.current) return

        gsap.to(desktopSidebarRef.current, {
                x: isDesktopMenu ? 0 : -300,
                autoAlpha: isDesktopMenu ? 1 : 0,
                display: isDesktopMenu ? 'block' : 'none',
                duration: 0.4,
                ease: 'power1.inOut',
                opacity: 1
        })


    },[isDesktopMenu])
  return (
        <div  ref={desktopSidebarRef} className='bg-red-300 w-3xs hidden xl:block'>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Browse</li>
              <li>Settings</li>s
            </ul>
          </div>
  )
}

export default DesktopSidebar