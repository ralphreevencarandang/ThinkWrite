"use client";
import { X } from 'lucide-react';
import React, { useState } from 'react';

const AuthModal = ({ label, btnClass }: { label: string; btnClass?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

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
                    >
                    
                        <button 
                        onClick={() => setIsOpen(false)} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
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

                            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Email:</label>
                                    <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your email"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    />
                                </div>

                                
                            
                                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                    Sign In
                                </button>
                            </form>



                            {/* DIVIDER */}
                            <div className='flex items-center gap-4'>
                                <div className='bg-zinc-400 w-full h-px'></div>

                                <span>or</span>
                                <div className='bg-zinc-400 w-full h-px'></div>
                            </div>

                            <div>

                                <button className='border w-full py-2 rounded font-normal'>Sign in with Google</button>
                            </div>


                        </div>

                     
                    </div>
                </div>
            )}
        </div>
  );
};

export default AuthModal;