import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const GET = async () => {
    try {
        // Get current user session
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized. Authentication Required", success: false },
                { status: 401 }
            )
        }

        // Fetch all posts liked by the current user
        const likedPosts = await prisma.like.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                post: {
                    include: {
                        author: {
                            select: {
                                name: true,
                                image: true,
                                id: true
                            }
                        },
                        _count: {
                            select: {
                                likes: true,
                                comments: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Transform the response to return posts with like information
        const posts = likedPosts.map((like) => ({
            ...like.post,
            isLikedByCurrentUser: true, // User has liked these posts
            _count: like.post._count
        }))

        return NextResponse.json(
            { posts, success: true },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error fetching liked posts:', error)
        return NextResponse.json(
            { message: 'Internal Server Error', success: false },
            { status: 500 }
        )
    }
}
