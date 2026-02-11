import React from 'react'

const SigninForm = () => {
  return (
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

                                
                            
                                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                                    Sign In
                                </button>
                            </form>
  )
}

export default SigninForm