import React from 'react'
import Link from 'next/link'
import { Menu, Search, SquarePen } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { NavbarProps } from '@/Types'


const Navbar = ({onMobileMenuClick, onDesktopMenuClick} : NavbarProps) => {

   

  return (

    <header>
         <div className='w-full bg-white  padding-x border-b border-zinc-300'>
            
            <nav className=" flex justify-between items-center py-4 text-sm font-semibold">

                {/* Container 1 */} 
                <div className='flex items-center gap-5'>
                   
                   {/*  Mobile Menu*/}
                    <button className='cursor-pointer xl:hidden' onClick={onMobileMenuClick} ><Menu  strokeWidth={1} className=' hover:text-black transition-all'/></button>
                    {/* Desktop Menu */}
                    <button className='cursor-pointer hidden xl:block' onClick={onDesktopMenuClick}><Menu  strokeWidth={1} className=' hover:text-black transition-all'/></button>
                  
                    <Link href={''} className='text-xl sm:text-2xl font-semibold text-black'>ThinkWrite.</Link>
            
                    
                    <div className='bg-stone-100 p-2 rounded-full sm:flex sm:items-center  gap-2 hidden '>
                        
                        <Search strokeWidth={1} />
                        <input type="text"  className=' focus:outline-0 '/>
                    </div>
                </div>

                {/* Container 2 */}
                <div className='flex items-center gap-5'>
                    
                    <button className='cursor-pointer hidden sm:block'>

                        <SquarePen strokeWidth={1} className='hover:text-black transition-all'/>
                    </button>

                     <button className='sm:hidden'>
                        <Search strokeWidth={1}/>
                    </button>
                    {/* Profile Icon */}
                    <div className='rounded-full w-10 h-10 bg-orange-300'>
                        
                    </div>
                </div>

            </nav>
       
        </div>

    </header>

        



  )
}

export default Navbar