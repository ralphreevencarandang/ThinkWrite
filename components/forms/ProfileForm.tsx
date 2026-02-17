'use client'

import React from 'react'
import * as z from 'zod';

import Image from 'next/image'
import { profilePlaceholder } from '@/public/images'
import { Session } from '@/types'
import {useForm} from 'react-hook-form'

import { signupSchema } from '@/validations/client/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'

type SignupFormFields = z.infer<typeof signupSchema>

const ProfileForm = ({session} : {session:Session }) => {

  
          const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignupFormFields>({
              // Connect schema to react hook form
              resolver: zodResolver(signupSchema),
              defaultValues:{
                 email: session.user.email,
                 firstname: session.user.name.split(' ')[0],
                 lastname: session.user.name.split(' ')[1]
              }
          })

          
console.log('Session: ', session);

  return (
        <form className="space-y-5">
            
              <div className="flex  items-center flex-col mt-5 gap-2">

                    <div className=''>
                        
                        <Image src={session.user.image || profilePlaceholder} alt="profile image" width={100} height={100}  className="rounded-full object-cover   "/> 
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
                      <input {...register('email')}  type="email" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm  focus:bg-white focus:border focus:border-zinc-200 transition-all" />
                  </div>
                  <div>
                      <label htmlFor="" className="text-sm">Firstname</label>
                      <input {...register('firstname')} type="text" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm  focus:bg-white focus:border focus:border-zinc-200 transition-all" />
                  </div>
                  <div>
                      <label htmlFor="" className="text-sm">Lastname</label>
                      <input {...register('lastname')} type="text" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm  focus:bg-white focus:border focus:border-zinc-200 transition-all" />
                  </div>
                 
                  <div>
                      <label htmlFor="" className="text-sm">Password</label>
                      <input {...register('password')} type="password" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm  focus:bg-white focus:border focus:border-zinc-200 transition-all" />
                  </div>
                  <div>
                      <label htmlFor="" className="text-sm">Confirm Password</label>
                      <input {...register('confirmPassword')} type="password" className=" w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm  focus:bg-white focus:border focus:border-zinc-200 transition-all" />
                  </div>

                  <div className="mt-5">
                    <button className="w-full text-sm bg-black text-white py-2 rounded">Update profile</button>
                  </div>
              </div>

                <p className="text-sm mt-5 text-end italic">Member since {new Date(session.user.createdAt.getMonth()).toLocaleString('en-US', {month: 'short'}) } {session.user.createdAt.getDate() },  {session.user.createdAt.getFullYear() }</p>



          </form>
  )
}

export default ProfileForm