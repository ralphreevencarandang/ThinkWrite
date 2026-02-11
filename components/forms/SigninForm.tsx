

import React from 'react'
import { signin } from '@/lib/actions/auth-actions';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const SigninForm =  () => {
        const router = useRouter();
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')


        const handleSigninEmail = async (e : React.FormEvent)=>{
            try {
                e.preventDefault()
                const result = await signin(email, password);

                if(!result?.user){
                    console.log('Invalid username or password');
                    
                }
                router.refresh();
            } catch (error) {
                console.log('Error in handle Sign in Email: ', error);
            }
        }
  return (
       <form className="space-y-3" onSubmit={(e) => handleSigninEmail(e)}>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Email:</label>
                                    <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    autoComplete='email'
                                    
                                    
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                    autoComplete='current-password'
                                    
                                    />
                                </div>

                                
                            
                                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                                    Sign In
                                </button>
                            </form>
  )
}

export default SigninForm