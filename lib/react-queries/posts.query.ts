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
            // Cancel outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['all-posts'] })
            await queryClient.cancelQueries({ queryKey: ['liked-posts'] })

            // Snapshot the previous values
            const previousAllPosts = queryClient.getQueryData(['all-posts']) as any[]
            const previousLikedPosts = queryClient.getQueryData(['liked-posts']) as any[]

            // Optimistically update all-posts
            if (previousAllPosts) {
                queryClient.setQueryData(['all-posts'], (old: any[]) => {
                    return old.map((post: any) => {
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
                })
            }

            // Optimistically update liked-posts
            if (previousLikedPosts) {
                queryClient.setQueryData(['liked-posts'], (old: any[]) => {
                    const wasLiked = old.some((post: any) => post.id === postId)
                    if (wasLiked) {
                        // Remove from liked posts if user is unliking
                        return old.filter((post: any) => post.id !== postId)
                    } else {
                        // Add to liked posts if user is liking (find the post from all-posts)
                        const likedPost = previousAllPosts?.find((p: any) => p.id === postId)
                        if (likedPost) {
                            return [
                                {
                                    ...likedPost,
                                    isLikedByCurrentUser: true,
                                },
                                ...old
                            ]
                        }
                    }
                    return old
                })
            }

            // Return a context object with the snapshotted values
            return { previousAllPosts, previousLikedPosts }
        },
        onError: (err, variables, context) => {
            // Rollback to the previous values on error
            if (context?.previousAllPosts) {
                queryClient.setQueryData(['all-posts'], context.previousAllPosts)
            }
            if (context?.previousLikedPosts) {
                queryClient.setQueryData(['liked-posts'], context.previousLikedPosts)
            }
        },
        onSuccess: () => {
            // Refetch to ensure consistency with the server
            queryClient.invalidateQueries({ queryKey: ['all-posts'] })
            queryClient.invalidateQueries({ queryKey: ['liked-posts'] })
        },
    })
}
