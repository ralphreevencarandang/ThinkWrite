'use client'

import { Menu } from 'lucide-react'
import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const Sidebar = () => {

  const sidebarRef = useRef<HTMLDivElement>(null);


    useGSAP(()=>{
      gsap.set(sidebarRef.current,{
        autoAlpha: 0,
      })
    }, [])

    


  
  return (
    <nav ref={sidebarRef} className='h-screen bg-white px-7 py-8 border-r border-zinc-300 absolute top-0 opacity-0  '>

        <div>

          <div className='flex gap-4 items-center'>
            <button >
              <Menu strokeWidth={1} />
            </button>
            <p className='text-xl font-semibold'>ThinkWrite.</p>
          </div>

        </div>

    </nav>
  )
}

export default Sidebar