import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";



export const POST = async (req: NextRequest) =>{

    try {
       // Parse JSON body
        const body = await req.json();
        const { email, password, name } = body;

        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                // callbackURL: ''
            }
        })

        return NextResponse.json({message: 'User created successfully', result: result}, {status: 201})
    } catch (error) {
        console.log('Error in signup API: ', error);
        return NextResponse.json({message: error}, {status: 500})
        
    }

}