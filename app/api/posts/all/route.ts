import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export const GET = async () => {
    try {
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
                }
            },
            orderBy: {
                publishedAt: 'desc'
            }
        });

        return NextResponse.json({ posts: posts }, { status: 200 })
    } catch (error) {
        console.log('Error fetching all posts: ', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
