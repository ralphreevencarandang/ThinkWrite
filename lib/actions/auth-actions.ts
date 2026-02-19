'use server'

import { headers } from "next/headers";
import { auth } from "../auth";
import prisma from "../prisma";




export const signin = async (email: string, password: string)=>{
    try {

        if(!email ){
            throw new Error("Email cannot be empty.")
        }
        if(!password ){
            throw new Error("Password cannot be empty.")
        }


        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
                // call back url
                callbackURL: '/'
            }
        })

        return {success: true, data: result}

        
    } catch (error: any) {
        console.log('Error in signin actions: ', error);
        return {  success: false,  message: error.message}

    }
}


export const signup = async (email:string, password:string, firstname:string, lastname: string,confirmPassword: string)=>{
    try {

        if (!email) throw new Error("Email cannot be empty.")
        if (!firstname) throw new Error("Firstname cannot be empty.")
        if (!lastname) throw new Error("Lastname cannot be empty.")
        // if (!password) throw new Error("Password cannot be empty.")
        if (password !== confirmPassword) throw new Error("Passwords do not match.")
        
        const result = await auth.api.signUpEmail({
            body:{
                email,
                password,
                name: `${firstname} ${lastname}`
            }
        })

        return {success: true, data: result}
        

 
    } catch (error: any) {
        console.log('Error in signup actions: ', error);
        return { success: false, message: error.message  } 
    }
}


export const signout = async ()=>{

    try {
         await auth.api.signOut({
        headers: await headers()
    })

    
    } catch (error:any) {
        console.log('Error in signout action: ', error);

        return {  success: false,  message: error.message}
      
     
     
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

            
        
    } catch (error: any) {
        console.log('Error in sign in social server action: ', error);
     

        
    }
}

{}
export const updateProfile = async({profileImage, firstname, lastname, password, confirmPassword} : {profileImage:string, firstname:string, lastname:string, password:string, confirmPassword:string})=>{

    try {

        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if(!session){
            return {message: 'Unauthorized. Authenticatio Required', success: false}
        }

        if (!firstname) throw new Error("Firstname cannot be empty.")
        if (!lastname) throw new Error("Lastname cannot be empty.")
        if (!password) throw new Error("Password cannot be empty.")
        if (password !== confirmPassword) throw new Error("Passwords do not match.")

        

            
        
    } catch (error) {
        console.log('Error in update Profile actions: ', error);
        
    }
}