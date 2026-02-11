// "use client";
import gsap from 'gsap';
import { X } from 'lucide-react';
import React, { use, useState } from 'react';
import SigninForm from './SigninForm';
import OAuthButton from './OAuthButton';
import { facebookIcon, githubIcon,googleIcon } from '@/public/icons';
import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

const AuthModal = ({ label, btnClass }: { label: string; btnClass?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null)

    useGSAP(()=> {

        if(!modalRef.current) return

        gsap.set(modalRef.current, {
            opacity: 0,
            scale: 0.5,
            autoAlpha: 0
        })
        gsap.to(modalRef.current, {
            autoAlpha: isOpen ? 1 : 0,
        

            scale: isOpen ? 1 : 0.5,
            ease: 'power1.inOut',
            duration: 0.3
        })
    }, [isOpen])


  return (
    <div>
      <button className={btnClass} onClick={() => setIsOpen(true)}>
        {label}
      </button>

            {isOpen && (
                /* BACKDROP: Centering logic with flex */
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
                onClick={() => setIsOpen(false)}
                >
                    {/* MODAL BOX: stopPropagation prevents closing when clicking inside */}
                    <div 
                        className="bg-white p-8 rounded-lg relative w-full max-w-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()} 
                        ref={modalRef}
                    >
                        
                        {/* ABSOLUTE CLOSE BUTTON */}
                        <button 
                        onClick={() => setIsOpen(false)} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors cursor-pointer"
                        >
                        <X strokeWidth={1.5} size={24} />
                        </button>

                    
                        <div className="text-center space-y-2 mb-6 font-normal">
                            <h2 className="text-2xl font-semibold text-gray-800">Login your account</h2>
                            <p className="text-xs text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, beatae!
                            </p>
                        </div>


                        <div className='space-y-6'>
                            <SigninForm/>
                         
                            {/* DIVIDER */}
                            <div className='flex items-center gap-4'>
                                <div className='bg-zinc-400 w-full h-px'></div>
                                <span>or</span>
                                <div className='bg-zinc-400 w-full h-px'></div>
                            </div>

                            <div className='space-y-2'>
                                <OAuthButton label='Sign in with Google' icon={googleIcon}/>
                                <OAuthButton label='Sign in with Github' icon={githubIcon}/>
                                <OAuthButton label='Sign in with Facebook' icon={facebookIcon}/>
                            </div>

                            <div className='text-center font-normal text-xs'>
                               
                                Need an account?
                                <span> <Link href='' className='underline hover:text-blue-400'> Sign up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
};

export default AuthModal;