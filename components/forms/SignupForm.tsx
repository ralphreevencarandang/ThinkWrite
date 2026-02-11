import React from 'react'
import { useState } from 'react'
const SignupForm = () => {
    const [data, setData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",

    });


  return (
       <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Email:</label>
                                    <input 
                                    type="email" 
                                    value={data.email}
                                    placeholder="Enter your email"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    onChange={(e)=> setData({...data, email: e.target.value})}
                                    
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Firstname:</label>
                                    <input 
                                    type="text" 
                                    placeholder="Enter your Firstname"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    value={data.firstname}
                                    
                                    onChange={(e)=> setData({...data, firstname: e.target.value})}
                                    
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Lastname:</label>
                                    <input 
                                    type="text" 
                                    placeholder="Enter your Lastname"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    
                                    value={data.lastname}
                                    
                                    onChange={(e)=> setData({...data, lastname: e.target.value})}
                                    />
                                </div>
                             
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your Password"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    
                                    value={data.password}
                                    
                                    onChange={(e)=> setData({...data, password: e.target.value})}
                                    autoComplete='new-password'
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Confirm Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your Confirm Password"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                                    
                                     value={data.confirmPassword}
                                    
                                    onChange={(e)=> setData({...data, confirmPassword: e.target.value})}
                                    autoComplete='new-password'

                                    />
                                </div>

                                
                            
                                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                                    Sign Up
                                </button>
        </form>
  )
}

export default SignupForm