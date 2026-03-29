'use server'
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";

interface UpdateProfileInput {
  firstname: string
  lastname: string
  profileImage?: File
}

export const updateProfile = async (data: UpdateProfileInput) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return { success: false, message: "Unauthorized. Authentication Required" }
    }

    const { firstname, lastname, profileImage } = data

    // Validation
    if (!firstname || firstname.trim().length < 2) {
      return { success: false, message: "Firstname must be at least 2 characters" }
    }

    if (!lastname || lastname.trim().length < 2) {
      return { success: false, message: "Lastname must be at least 2 characters" }
    }

    // Handle profile image upload
    let uploadedImageUrl: string | null = null

    if (profileImage) {
      try {
        const arrayBuffer = await profileImage.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "ThinkWrite/profiles" },
            (error, result) => {
              if (error) return reject(error)
              resolve(result as { secure_url: string })
            }
          ).end(buffer)
        })

        uploadedImageUrl = uploadResult.secure_url

        // Delete old image if exists
        const currentUser = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { image: true }
        })

        if (currentUser?.image) {
          try {
            const imageUrl = currentUser.image
            const publicId = imageUrl.split('/').pop()?.split('.')[0]
            if (publicId) {
              await cloudinary.uploader.destroy(`ThinkWrite/profiles/${publicId}`)
            }
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError)
          }
        }
      } catch (imageError) {
        console.error("Image upload error:", imageError)
        return { success: false, message: "Failed to upload profile image" }
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: `${firstname.trim()} ${lastname.trim()}`,
        ...(uploadedImageUrl && { image: uploadedImageUrl }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      }
    })

    return {
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    }
  } catch (error) {
    console.error("Error in updateProfile action:", error)
    return {
      success: false,
      message: "Internal server error. Failed to update profile",
    }
  }
}
