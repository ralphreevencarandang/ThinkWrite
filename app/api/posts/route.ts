import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { generateSlug } from "@/lib/utils";



export const POST = async (req: NextRequest)=>{
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(!session){
            return NextResponse.json({message: "Unauthorized. Authentication Required"}, {status: 401})
        }

        const formData = await req.formData();
        let post;

        try {
            post = Object.fromEntries(formData.entries());
        } catch (error) {
            console.log('Errpr parsing form data: ', error);
            return NextResponse.json({message: 'Invalid JSON format', success: false}, {status: 400})
            
        }

        const category = formData.get("category") as string;
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        
        const isPublishValue = formData.get("isPublish");
        const isPublish = isPublishValue === "on";

        const publishedAt = formData.get("publishedAt") as string;

        if (!title || !content) {
            return NextResponse.json(
                { message: "Title and content are required" , success: false},
                { status: 400 }
            );
        }

        const slug = generateSlug(title);



        const image = formData.get('featuredImage') as File;

        // if(!image){
        //     return NextResponse.json({message: 'File doesnt exist', success: false}, {status: 400})
        // }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'ThinkWrite'}, 
                                (error, results) => {
                                    if(error) return reject(error);
                                    resolve(results);
                                }).end(buffer)

        })
        

        const featuredImage = post.image = (uploadResult as {secure_url: string}).secure_url;
        

        const newPost = await prisma.post.create({
            data: {
                authorId: session.user.id,
                category: category,
                title: title,
                slug: slug,
                content: content,
                featuredImage: featuredImage,
                excerpt: excerpt,
            }
        })

      


        return NextResponse.json({message: "Post created succesfully.", post: newPost},{status:201})
        
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
            return NextResponse.json({message: "Unauthorized. Authenticatio Required", success: false}, {status: 401})
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

