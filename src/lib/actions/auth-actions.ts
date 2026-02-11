import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";


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
    await auth.api.signOut({
        headers: await headers()
    })
}


