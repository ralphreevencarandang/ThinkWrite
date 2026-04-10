import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');

        if (!postId) {
            return NextResponse.json(
                { message: 'postId parameter is required' },
                { status: 400 }
            );
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
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
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        console.log('Failed to fetch comments: ', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};
