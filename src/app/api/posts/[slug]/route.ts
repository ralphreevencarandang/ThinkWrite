import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const PUT = async(
    req: NextRequest, 
   { params }: { params: Promise<{ slug: string }> }) =>{
    try {

         const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authenticatio Required"}, {status: 401})
        }

        const {slug: postSlug} = await params
        console.log("slug from URL:", postSlug);
        const body = await req.json();

        const {id, authorId, title, slug, excerpt , content, featuredImage, published, publishedAt, category} = body

        const postExist = await prisma.post.findFirst({
            where: {
                slug: postSlug
            }
        })

        if(!postExist){
            return NextResponse.json({message: 'Cannot find post.'}, {status: 404})
        }


        if(  !title || !content){
            return NextResponse.json({message: 'Missing required fields.'}, {status: 400})
        }

        const updatePost = await prisma.post.update({
            where: {slug: postSlug},
            data: {
                title,
                slug,
                excerpt,
                content,
                featuredImage,
                published,
                publishedAt,
                category
            } 
        })

        if(!updatePost){
            return NextResponse.json({message: 'Failed to update post'}, {status: 404})
        }   
        
        return NextResponse.json({message: 'Update succesfull.' , post: updatePost}, {status: 201})

    } catch (error) {
        console.log('Error in updating post: ', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
        
    }
}

export const DELETE = async (
        req: NextRequest,
      { params }: { params: Promise<{ slug: string }> }
)=>{

    try {

         const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authenticatio Required"}, {status: 401})
        }

        const {slug} = await params; 

        console.log('Slug: ' , slug);
        
    


        const postExist = await prisma.post.findFirst({
            where: {
                slug: slug
            }
        })

         if(!postExist){
            return NextResponse.json({message: 'Cannot find post.'}, {status: 404})
        }

        const deletePost = await prisma.post.delete({
            where: {
                slug: slug
            }
        })

        return NextResponse.json({message: 'Post deleted succefully.'}, {status: 201})


    } catch (error) {
        console.log('Failed to delete post: ', error);
        return NextResponse.json({message: 'Internal Server Error', error: error}, {status: 500})
        
    }
}
