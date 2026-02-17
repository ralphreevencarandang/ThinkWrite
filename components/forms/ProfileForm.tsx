import React from 'react'
import Image from 'next/image'
import { profilePlaceholder } from '@/public/images'
const ProfileForm = () => {
  return (
        <form className="space-y-5">
            
              <div className="flex  items-center flex-col mt-5 gap-2">

                    <div>
                        
                        <Image src={profilePlaceholder} alt="profile image" className="rounded-full w-20  "/> 
                    </div>
                    <input type="file" className="hidden" id="profile" accept="image/jpeg, image/png"> 
                    
                    </input>
                    <label htmlFor="profile">Select Image</label>
                    {/* <button className="text-sm  px-2 py-1 rounded">Select Image</button> */}
                    <p className="text-xs text-center">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                  
              </div>

              <div className="space-y-2 ">
                
                  <div>
                      <label htmlFor="" className="text-sm">Email</label>
                      <input type="email" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm" />
                  </div>
                  <div>
                      <label htmlFor="" className="text-sm">Fullname</label>
                      <input type="text" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm" />
                  </div>
                  <div>
                      <label htmlFor="" className="text-sm">Password</label>
                      <input type="password" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm" />
                  </div>

                  <div className="mt-5">
                    <button className="w-full text-sm bg-black text-white py-2 rounded">Update profile</button>
                  </div>
              </div>

                <p className="text-sm mt-5 text-end italic">Member since 1994</p>



          </form>
  )
}

export default ProfileForm