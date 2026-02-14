import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
export const POST = async (req:NextRequest)=>{
    try {
        
        const body = await req.json();

        const {email, password} = body;

        const result = await auth.api.signInEmail({
            body:{
                email: email,
                password: password
            }
        })

        return NextResponse.json({message: 'User logged in successfully', result: result}, {status: 201})



    } catch (error) {
        console.log('Error in signin api: ', error)
        return NextResponse.json({message: 'Internal Server Error', error: error}, {status: 500})
    }
}