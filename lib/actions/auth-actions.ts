'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";


export const signin = async (email: string, password: string)=>{
    try {

        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
                // call back url
                callbackURL: '/'
            }
        })
        
        return result;
        
    } catch (error) {
        console.log('Error in signin actions: ', error);
    }
}


export const signup = async (email:string, password:string, name:string)=>{
    try {
        
        const result = await auth.api.signUpEmail({
            body:{
                email,
                password,
                name
            }
        })

        return result
    } catch (error) {
        console.log('Error in signup actions: ', error);
        
    }
}


export const signout = async ()=>{

    try {
         await auth.api.signOut({
        headers: await headers()
    })
    } catch (error) {
        console.log('Error in signout action: ', error);
        
    }
   
}



export const signinSocial = async (provider : 'github' | 'google' | 'facebook')=>{
    try {

        const {url} = await auth.api.signInSocial({
            body: {
                provider: provider,
                callbackURL: '/'

            }
        });

   
        return url; // just return it

            
        
    } catch (error) {
        console.log('Error in sign in social server action: ', error);
        
    }
}