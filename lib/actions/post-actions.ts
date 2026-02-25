'use server'
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";
import { generateSlug } from "@/lib/utils";

interface CreatePostInput {
  title: string
  excerpt: string
  content: string
  publishedAt: string
  featuredImage?: File
}

export const createPost = async (data: CreatePostInput) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized. Authentication Required" }
    }

    const { title, excerpt, content, publishedAt, featuredImage } = data

    // Validation
    if (!title || !content) {
      return { success: false, message: "Title and content are required" }
    }

    if (!excerpt) {
      return { success: false, message: "Excerpt is required" }
    }

    const slug = generateSlug(title)

    // Upload featured image if provided
    let uploadedImageUrl: string | null = null

    if (featuredImage) {
      try {
        const arrayBuffer = await featuredImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "ThinkWrite" },
            (error, result) => {
              if (error) return reject(error)
              resolve(result as { secure_url: string })
            }
          ).end(buffer)
        })

        uploadedImageUrl = uploadResult.secure_url
      } catch (imageError) {
        console.error("Image upload error:", imageError)
        return { success: false, message: "Failed to upload featured image" }
      }
    }

    // Create post in database
    const newPost = await prisma.post.create({
      data: {
        authorId: session.user.id,
        title,
        slug,
        content,
        excerpt,
        featuredImage: uploadedImageUrl || null,
      },
    })

    return {
      success: true,
      message: "Post created successfully",
      post: newPost,
    }
  } catch (error) {
    console.error("Error in createPost action:", error)
    return {
      success: false,
      message: "Internal server error. Failed to create post",
    }
  }
}
