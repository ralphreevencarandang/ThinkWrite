'use server'
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

interface CreateCommentInput {
  postId: string;
  content: string;
}

export const createComment = async (data: CreateCommentInput) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Unauthorized. Authentication required to comment",
      };
    }

    const { postId, content } = data;

    // Validation
    if (!content || content.trim() === "") {
      return {
        success: false,
        message: "Comment cannot be empty",
      };
    }

    if (content.length > 5000) {
      return {
        success: false,
        message: "Comment is too long (max 5000 characters)",
      };
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: session.user.id,
        content: content.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    // Revalidate the post page to show new comment
    revalidatePath(`/stories/${post.slug}`);

    return {
      success: true,
      message: "Comment added successfully",
      comment,
    };
  } catch (error) {
    console.error("Error in createComment action:", error);
    return {
      success: false,
      message: "Internal server error. Failed to add comment",
    };
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: true,
      },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
      };
    }

    // Check if user is the comment author or post author
    if (comment.userId !== session.user.id && comment.post.authorId !== session.user.id) {
      return {
        success: false,
        message: "You don't have permission to delete this comment",
      };
    }

    // Delete comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    // Revalidate the post page
    revalidatePath(`/stories/${comment.post.slug}`);

    return {
      success: true,
      message: "Comment deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteComment action:", error);
    return {
      success: false,
      message: "Internal server error. Failed to delete comment",
    };
  }
};
