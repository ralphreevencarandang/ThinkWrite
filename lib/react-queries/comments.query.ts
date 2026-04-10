import axios from '@/lib/axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment, deleteComment } from '@/lib/actions/comment-actions'

export const getComments = async (postId: string) => {
    try {
        const res = await axios.get(`/posts/comments?postId=${postId}`)
        return res.data.comments
    } catch (error) {
        console.log('Error fetching comments: ', error)
        throw error
    }
}

export const useGetComments = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        enabled: !!postId,
    })
}

interface CreateCommentInput {
    content: string
}

export const useCreateComment = (postId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateCommentInput) => {
            // Call the server action
            const result = await createComment({
                postId,
                content: data.content,
            })
            
            if (!result.success) {
                throw new Error(result.message)
            }

            return result.comment
        },
        onMutate: async (newComment) => {
            // Cancel outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['comments', postId] })

            // Snapshot the previous value
            const previousComments = queryClient.getQueryData(['comments', postId]) as any[]

            // Optimistically update the comments list
            if (previousComments) {
                const optimisticComment = {
                    id: -1,
                    postId,
                    userId: 'temp-user',
                    content: newComment.content,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    user: {
                        id: 'temp-user',
                        name: 'Loading...',
                        image: null,
                        email: '',
                    },
                }

                queryClient.setQueryData(['comments', postId], (old: any[]) => [
                    ...old,
                    optimisticComment,
                ])
            }

            return { previousComments }
        },
        onError: (err, variables, context) => {
            // Rollback to the previous value on error
            if (context?.previousComments) {
                queryClient.setQueryData(['comments', postId], context.previousComments)
            }
        },
        onSuccess: () => {
            // Refetch to ensure consistency with the server
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
        },
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (commentId: number) => {
            const result = await deleteComment(commentId)
            
            if (!result.success) {
                throw new Error(result.message)
            }

            return result
        },
        onSuccess: (_, commentId) => {
            // Invalidate all comments queries to refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })
}
