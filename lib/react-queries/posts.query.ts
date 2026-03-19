import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

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
