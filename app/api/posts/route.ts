import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma";


export const POST = async (req: NextRequest)=>{
    try {

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

export const PUT = async(req: NextRequest) =>{
    try {

        const body = await req.json();

        const {id, authorId, title, slug, excerpt , content, featuredImage, published, publishedAt} = body

        if(!id){
            return NextResponse.json({message: 'Cannot find post.'}, {status: 404})
        }

        if(!authorId || !title || !slug || !content){
            return NextResponse.json({message: 'Missing required fields.'}, {status: 500})
        }

        const updatePost = await prisma.post.update({
            where: {slug: slug},
            data: {
                title,
                slug,
                excerpt,
                content,
                featuredImage,
                published,
                publishedAt
            } 
        })

        if(!updatePost){
            return NextResponse.json({message: 'Failed to update post'}, {status: 400})
        }
        
        return NextResponse.json({message: 'Update succesfull.' , post: updatePost}, {status: 400})

    } catch (error) {
        console.log('Error in updating post: ', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
        
    }
}
