import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";



export const POST = async (req: NextRequest) =>{

    try {

       // Parse JSON body
        const body = await req.json();
        const { email, password, firstname, lastname } = body;
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: `${firstname}-${lastname}`,
                //   callbackURL: "/dashboard"
            }
        })

        return NextResponse.json({message: 'User created successfully', result: result}, {status: 201})
    } catch (error) {
        console.log('Error in signup API: ', error);
        return NextResponse.json({message: "Internal Server Error", error: error}, {status: 500})
    }

}