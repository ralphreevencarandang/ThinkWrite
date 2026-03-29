import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const GET = async () => {
    try {
        // Get current user session if available
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        const posts = await prisma.post.findMany({
            where: {
                isPublish: true
            },
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
            },
            orderBy: {
                publishedAt: 'desc'
            }
        });

        // For authenticated users, fetch their likes
        let userLikes: { [postId: string]: boolean } = {}
        if (session?.user?.id) {
            const userLikedPosts = await prisma.like.findMany({
                where: {
                    userId: session.user.id,
                    postId: {
                        in: posts.map(p => p.id)
                    }
                },
                select: {
                    postId: true
                }
            })
            userLikes = Object.fromEntries(
                userLikedPosts.map(like => [like.postId, true])
            )
        }

        // Transform posts to include like information
        const postsWithLikes = posts.map((post: any) => ({
            ...post,
            isLikedByCurrentUser: userLikes[post.id] ?? false,
        }));

        return NextResponse.json({ posts: postsWithLikes }, { status: 200 })
    } catch (error) {
        console.log('Error fetching all posts: ', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
