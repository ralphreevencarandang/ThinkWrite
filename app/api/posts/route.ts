import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const POST = async (req: NextRequest)=>{
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authenticatio Required"}, {status: 401})
        }

       

        const body = await req.json();
        const {authorId, title, slug, excerpt, content, featuredImage, publishedAt} = body;

        if(!authorId || !title || !slug || !content ){
            return NextResponse.json({message: 'Missing required fields.'} , {status: 400})
        }

        const post = await prisma.post.create({
            data:{
                 authorId,
                 title,
                 slug,
                 excerpt,
                 content,
                 featuredImage,
                 publishedAt
            }
        })

        if(!post){
            return NextResponse.json({message: "Failed to create posts."}, {status: 400 })
        }

        return NextResponse.json({message: "Post created succesfully.", post: post},{status:201})
        
    } catch (error) {
         console.log('Error in Posts get: ', error);
        return NextResponse.json({message: 'Internal Server Error', error: error}, {status: 500})
    }
}


export const GET = async ()=>{
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authenticatio Required"}, {status: 401})
        }

  


        const posts = await prisma.post.findMany();

        if(!posts){
            return NextResponse.json({message: 'Failed to fetch post'}, {status: 404})
        }

        return NextResponse.json({posts: posts }, {status: 200})
        
    } catch (error) {
        console.log('Error in Posts get: ', error);
        
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}

