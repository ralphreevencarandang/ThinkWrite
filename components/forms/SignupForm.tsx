import React from 'react'
import { useState } from 'react'
import * as z from 'zod'
import { signupSchema } from '@/validations/client/auth.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { signup } from '@/lib/actions/auth-actions'
import { useRouter } from 'next/navigation'

type SigninFormFields = z.infer<typeof signupSchema>

const SignupForm = () => {

    const router = useRouter();

    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SigninFormFields>({
        resolver: zodResolver(signupSchema)
    })

    const handleSignup = async(data: SigninFormFields)=>{
        try {

            const result = await signup(data.email, data.password, data.firstname, data.lastname, data.confirmPassword);

            if(!result || !result.success){
                toast.error( result.message || 'Something went wrong.')
                return
            }

            router.refresh();
            toast.success('Account created successfull.')
                        
        } catch (error: any) {
            console.log("Signup error:", error)
            toast.error(error.message || "Something went wrong")

        }
    }


  return (
       <form className="space-y-3" onSubmit={handleSubmit(handleSignup)}>

                                 <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">Email:</label>
                                        <input 
                                        type="email" 
                                        placeholder="Enter your email"
                                        className={`border  ${ errors.email &&  errors.email.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}
                                        {...register("email")}
                                        
                                        />

                                        {errors.email && 
                                            <p className='text-red-500 text-xs'>{errors.email.message}</p>
                                        }
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Firstname:</label>
                                    <input 
                                    type="text" 
                                    placeholder="Enter your Firstname"
                                    className={`border  ${ errors.firstname &&  errors.firstname.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}
                                    {...register("firstname")}
                                    />

                                    {errors.firstname && 
                                            <p className='text-red-500 text-xs'>{errors.firstname.message}</p>
                                    }
                                    
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Lastname:</label>
                                    <input 
                                    type="text" 
                                    placeholder="Enter your Lastname"
                                    className={`border  ${ errors.lastname &&  errors.lastname.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}
                                    {...register("lastname")}
                                    />

                                    {errors.lastname && 
                                            <p className='text-red-500 text-xs'>{errors.lastname.message}</p>
                                    }
                                </div>
                             
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your Password"
                                    className={`border  ${ errors.password &&  errors.password.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}
                                    {...register("password")}
                                    />

                                    {errors.password && 
                                            <p className='text-red-500 text-xs'>{errors.password.message}</p>
                                    }
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">Confirm Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your Confirm Password"
                                      className={`border  ${ errors.confirmPassword &&  errors.confirmPassword.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}
                                    {...register("confirmPassword")}
                                    />

                                    {errors.confirmPassword && 
                                            <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>
                                    }
                                </div>

                                
                            
                                <button className={`w-full bg-black text-white py-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ' opacity-100 hover:bg-gray-800'} rounded-md  cursor-pointer`}
                                type='submit'>
                                    {isSubmitting ? 'Submiting...' : 'Sign up'}
                                </button>
        </form>
  )
}

export default SignupForm