
import * as z from 'zod';

import React from 'react'
import { signin } from '@/lib/actions/auth-actions';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form'
import { signinSchema } from '@/validations/client/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth.store';


type SigninFormFields = z.infer<typeof signinSchema>


const SigninForm =  () => {
        const router = useRouter();
        const {setSession} = useAuthStore();


        const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SigninFormFields>({
            // Connect schema to react hook form
            resolver: zodResolver(signinSchema)
        })


        const handleSigninEmail = async (data: SigninFormFields)=>{

            try {
         
                const result = await signin(data.email, data.password);

                if(!result || !result.success){
                    
                    toast.error(result.message);
                    return
                }

                // setSession(result.data);

                console.log('Result: ', result.data?.user);
                
               

                toast.success("Signed in successfully");

                
                router.refresh();
            } catch (error) {
                toast.error("Something went wrong");
                console.error("Signin error:", error);
            }
        }

    


  return (
                    <form className="space-y-3" onSubmit={handleSubmit(handleSigninEmail)}>

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
                                    <label className="text-sm font-medium">Password:</label>
                                    <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    className={`border  ${ errors.email &&  errors.email.message ? 'border-red-500' : 'border-zinc-400'} rounded-md px-3 py-2 outline-none  transition-all`}

                                    {...register("password")}
                                    />
                                     {errors.password && 
                                        <p className='text-red-500 text-xs'>{errors.password.message}</p>
                                    }
                                </div>

                                
                            
                                <button className={`w-full bg-black ${isSubmitting ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer hover:bg-gray-800'} text-white py-2 rounded-md  `}
                                disabled={isSubmitting}
                                type='submit'
                                >
                                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                                </button>
                            </form>
  )
}

export default SigninForm