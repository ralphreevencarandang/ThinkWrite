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
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
