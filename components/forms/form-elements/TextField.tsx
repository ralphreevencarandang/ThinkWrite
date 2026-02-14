import React from 'react'

const TextField = () => {
  return (
    <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Email:</label>
                                    <input 
                                    type="email" 
                             
                                    placeholder="Enter your email"
                                    className="border border-zinc-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                    
                                    
                                    />
    </div>
  )
}

export default TextField