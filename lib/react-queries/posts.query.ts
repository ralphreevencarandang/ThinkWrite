import axios from '@/lib/axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePost } from '@/lib/actions/post-actions'

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
