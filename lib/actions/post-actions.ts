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
  isPublish: boolean
}

interface UpdatePostInput {
  title: string
  excerpt: string
  content: string
  publishedAt: string
  featuredImage?: File | string
  isPublish: boolean
  currentFeaturedImage?: string
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

    const { title, excerpt, content, publishedAt, featuredImage, isPublish } = data

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
        isPublish: isPublish,
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

export const deletePost = async (postId: string) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized. Authentication Required" }
    }

    // Verify post exists and user is the author
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, featuredImage: true }
    })

    if (!post) {
      return { success: false, message: "Post not found" }
    }

    if (post.authorId !== session.user.id) {
      return { success: false, message: "Unauthorized. You can only delete your own posts" }
    }

    // Delete featured image from Cloudinary if it exists
    if (post.featuredImage) {
      try {
        const imageUrl = post.featuredImage
        const publicId = imageUrl.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`ThinkWrite/${publicId}`)
        }
      } catch (imageError) {
        console.error("Error deleting image from Cloudinary:", imageError)
        // Continue with post deletion even if image deletion fails
      }
    }

    // Delete post from database
    await prisma.post.delete({
      where: { id: postId }
    })

    return {
      success: true,
      message: "Post deleted successfully",
    }
  } catch (error) {
    console.error("Error in deletePost action:", error)
    return {
      success: false,
      message: "Internal server error. Failed to delete post",
    }
  }
}


export const updatePost = async (postId: string, data: UpdatePostInput) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized. Authentication Required" }
    }

    const { title, excerpt, content, publishedAt, featuredImage, isPublish, currentFeaturedImage } = data

    // Validation
    if (!title || !content) {
      return { success: false, message: "Title and content are required" }
    }

    if (!excerpt) {
      return { success: false, message: "Excerpt is required" }
    }

    // Verify post exists and user is the author
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, slug: true, featuredImage: true }
    })

    if (!post) {
      return { success: false, message: "Post not found" }
    }

    if (post.authorId !== session.user.id) {
      return { success: false, message: "Unauthorized. You can only update your own posts" }
    }

    // Generate new slug if title changed
    const newSlug = post.slug !== generateSlug(title) ? generateSlug(title) : post.slug

    // Handle featured image
    let uploadedImageUrl: string | null = currentFeaturedImage || null

    if (featuredImage && typeof featuredImage !== 'string') {
      // New image was uploaded
      try {
        // Delete old image if it exists and is different from the current one
        if (post.featuredImage && post.featuredImage !== currentFeaturedImage) {
          try {
            const imageUrl = post.featuredImage
            const publicId = imageUrl.split('/').pop()?.split('.')[0]
            if (publicId) {
              await cloudinary.uploader.destroy(`ThinkWrite/${publicId}`)
            }
          } catch (deleteError) {
            console.error("Error deleting old image from Cloudinary:", deleteError)
          }
        }

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
    } else if (!featuredImage || (typeof featuredImage === 'string' && !featuredImage)) {
      // Image was removed
      if (post.featuredImage) {
        try {
          const imageUrl = post.featuredImage
          const publicId = imageUrl.split('/').pop()?.split('.')[0]
          if (publicId) {
            await cloudinary.uploader.destroy(`ThinkWrite/${publicId}`)
          }
        } catch (deleteError) {
          console.error("Error deleting image from Cloudinary:", deleteError)
        }
      }
      uploadedImageUrl = null
    }

    // Update post in database
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug: newSlug,
        content,
        excerpt,
        featuredImage: uploadedImageUrl,
        isPublish,
        publishedAt: new Date(publishedAt),
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    }
  } catch (error) {
    console.error("Error in updatePost action:", error)
    return {
      success: false,
      message: "Internal server error. Failed to update post",
    }
  }
}