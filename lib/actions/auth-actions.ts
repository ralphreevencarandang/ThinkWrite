import { headers } from "next/headers";
import { auth } from "../auth";
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


export const requireSession = async ()=>{
    try {
        
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authenticatio Required"}, {status: 401})
        }

        return session;
    } catch (error) {
        console.log('Error in getAuthSession: ', error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}