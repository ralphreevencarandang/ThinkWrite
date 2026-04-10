import axios from '@/lib/axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost, likePost } from '@/lib/actions/post-actions'

export const getPosts = async (isPublish?: boolean) => {
    try {
        const params = new URLSearchParams();
        if (isPublish !== undefined) {
            params.append('isPublish', String(isPublish));
        }

        const res = await axios.get(`/posts?${params.toString()}`)
        return res.data.posts
    } catch (error) {
        console.log('Error fetching posts: ', error)
        throw error
    }
}

export const useGetPosts = (isPublish?: boolean) => {
    return useQuery({
        queryKey: ['posts', isPublish],
        queryFn: () => getPosts(isPublish),
        // staleTime: 1000 * 60 * 2, // 2 minutes
    })
}

export const getPost = async (slug: string) => {
    try {
        const res = await axios.get(`/posts/${slug}`)
        return res.data.post
    } catch (error) {
        console.log('Error fetching post: ', error)
        throw error
    }
}

export const useGetPost = (slug: string) => {
    return useQuery({
        queryKey: ['post', slug],
        queryFn: () => getPost(slug),
        enabled: !!slug, // Only run query if slug exists
    })
}

export const getLikedPosts = async () => {
    try {
        const res = await axios.get('/posts/liked')
        return res.data.posts
    } catch (error) {
        console.log('Error fetching liked posts: ', error)
        throw error
    }
}

export const useGetLikedPosts = () => {
    return useQuery({
        queryKey: ['liked-posts'],
        queryFn: () => getLikedPosts(),
    })
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

export const useUpdatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, data }: { postId: string; data: UpdatePostInput }) =>
            updatePost(postId, data),
        onSuccess: (result) => {
            if (result.success && result.post) {
                // Invalidate related queries to refetch
                queryClient.invalidateQueries({ queryKey: ['post'] })
                queryClient.invalidateQueries({ queryKey: ['posts'] })
            }
        },
    })
}

interface LikePostInput {
    postId: string
    userId: string
}

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId, userId }: LikePostInput) =>
            likePost(postId, userId),
        onMutate: async ({ postId, userId }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['all-posts'] })
            await queryClient.cancelQueries({ queryKey: ['liked-posts'] })

            // Get previous data - need to handle infinite query structure
            const previousAllPostsData = queryClient.getQueryData(['all-posts']) as any
            const previousLikedPostsData = queryClient.getQueryData(['liked-posts']) as any

            // Update all-posts (infinite query)
            if (previousAllPostsData?.pages) {
                queryClient.setQueryData(['all-posts'], (old: any) => ({
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        posts: page.posts.map((post: any) => {
                            if (post.id === postId) {
                                return {
                                    ...post,
                                    isLikedByCurrentUser: !post.isLikedByCurrentUser,
                                    _count: {
                                        ...post._count,
                                        likes: post.isLikedByCurrentUser
                                            ? (post._count?.likes || 1) - 1
                                            : (post._count?.likes || 0) + 1,
                                    },
                                }
                            }
                            return post
                        })
                    }))
                }))
            }

            // Update liked-posts (infinite query)
            if (previousLikedPostsData?.pages) {
                queryClient.setQueryData(['liked-posts'], (old: any) => {
                    const wasLiked = old.pages.some((page: any) =>
                        page.posts.some((post: any) => post.id === postId)
                    )

                    if (wasLiked) {
                        // Remove from liked posts if user is unliking
                        return {
                            ...old,
                            pages: old.pages.map((page: any) => ({
                                ...page,
                                posts: page.posts.filter((post: any) => post.id !== postId)
                            }))
                        }
                    } else {
                        // Add to liked posts if user is liking
                        const likedPost = previousAllPostsData?.pages
                            ?.flatMap((p: any) => p.posts)
                            .find((p: any) => p.id === postId)

                        if (likedPost) {
                            return {
                                ...old,
                                pages: [
                                    {
                                        ...old.pages[0],
                                        posts: [
                                            {
                                                ...likedPost,
                                                isLikedByCurrentUser: true,
                                            },
                                            ...old.pages[0].posts
                                        ]
                                    },
                                    ...old.pages.slice(1)
                                ]
                            }
                        }
                    }
                    return old
                })
            }

            return { previousAllPostsData, previousLikedPostsData }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousAllPostsData) {
                queryClient.setQueryData(['all-posts'], context.previousAllPostsData)
            }
            if (context?.previousLikedPostsData) {
                queryClient.setQueryData(['liked-posts'], context.previousLikedPostsData)
            }
        },
        onSuccess: () => {
            // Refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['all-posts'] })
            queryClient.invalidateQueries({ queryKey: ['liked-posts'] })
        },
    })
}
