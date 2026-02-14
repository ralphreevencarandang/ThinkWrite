'use client'
import Link from 'next/link'
import { LogOut, Menu, Search, Settings, SquarePen } from 'lucide-react'
import { NavbarProps } from '@/types'
import Image from 'next/image'
import { profilePlaceholder } from '@/public/images'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signout } from '@/lib/actions/auth-actions'


const ProtectedNavbar = ({onMobileMenuClick, onDesktopMenuClick, user} : NavbarProps) => {


    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);

    const handleSignout = async ()=>{
        try {

            const result = await signout();

            router.refresh();
            
        } catch (error) {
            console.log('Error in signout function: ', error)
        }
    }



      // Initial setup
    useGSAP(() => {
        gsap.set(backdropRef.current, { opacity: 0, display: 'none' });
    }, []);


    useGSAP(()=>{

        if(!menuRef.current) return

        

        gsap.to(menuRef.current, {
            autoAlpha: isSettingOpen ? 1 : 0,
            opacity: isSettingOpen ? 1 : 0,
            duration: 0.3,
            ease: "power1.inOut"
        })

         // Backdrop Animation
            gsap.to(backdropRef.current, {
            opacity: isSettingOpen ? 1 : 0,
            display: isSettingOpen ? 'block' : 'none',
            duration: 0.3,
            });

    }, [isSettingOpen])

   

  return (
<>

   <div
        ref={backdropRef}
        onClick={()=> setIsSettingOpen(false)} // Closes when clicking outside
        className="fixed inset-0  z-6 "
      />

    <header className='sticky top-0 z-7'>
         <div className='w-full bg-white  padding-x border-b border-zinc-300'>
            
            <nav className=" flex justify-between items-center py-4 text-sm font-semibold">

                {/* Container 1 */} 
                <div className='flex items-center gap-5'>
                   
                   {/*  Mobile Menu*/}
                    <button className='cursor-pointer xl:hidden' onClick={onMobileMenuClick} ><Menu  strokeWidth={1} className=' hover:text-black transition-all'/></button>
                    
                    {/* Desktop Menu */}
                    <button className='cursor-pointer hidden xl:block' onClick={onDesktopMenuClick}><Menu  strokeWidth={1} className=' hover:text-black transition-all'/></button>
                  
                    <Link href={'/'} className='text-xl sm:text-2xl font-semibold text-black'>ThinkWrite.</Link>
            
                    
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

                    <div className='relative'>
                        <div className='rounded-full '>
                            <button className='cursor-pointer ' onClick={()=>setIsSettingOpen(!isSettingOpen)}>
                                    <Image src={ user.image || profilePlaceholder } width={35} height={35} alt="Profile Image" className='object-contain rounded-full'/>
                            </button>
                        </div>

                        <div ref={menuRef} className=' w-50 absolute right-0 top-12 border border-zinc-300 bg-white shadow opacity-0 px-4 py-6 space-y-5 rounded ' >

                                <div className='flex items-center gap-2'>
                                    <div className=' '>
                                        <Image src={ user.image || profilePlaceholder } width={40} height={40} alt='profile-image' className='object-contain rounded-full'></Image>
                                    </div>

                                    <div>
                                        <p className='text-sm font-medium'>{user.name.split(' ')[0]}</p>
                                        <Link href={''} className='text-xs font-light hover:text-black'>View Profile</Link>
                                    </div>
                                </div>

                                <div className='font-normal space-y-4 '>
                                    <Link href={''} className='flex items-center gap-2 hover:text-black xl:hidden'>
                                        <SquarePen strokeWidth={1}/>
                                        <p>Write</p>
                                    </Link>

                                    <Link href={''} className='flex items-center gap-2 hover:text-black'>
                                        <Settings strokeWidth={1}/>
                                        <p>Settings</p>
                                    </Link>

                                    <button className='flex items-center gap-2 hover:text-black cursor-pointer' onClick={handleSignout}>
                                        <LogOut strokeWidth={1}/>
                                        <p>Logout</p>
                                    </button>
                                   
                                </div>

                        </div>

                    </div>
                   
                </div>

            </nav>
       
        </div>

    </header>

        

</>

  )
}

export default ProtectedNavbar