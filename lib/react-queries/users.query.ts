import axios from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '@/lib/actions/profile-actions'

export const getUser = async(id : string)=>{
    try {
        const res = await axios.get(`/user/${id}`)
        console.log('Data: ', res)
        return res.data
    } catch (error) {
        console.log('Error in get user function: ', error)
    }
}

interface UpdateProfileInput {
    firstname: string
    lastname: string
    profileImage?: File
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateProfileInput) => updateProfile(data),
        onSuccess: (result) => {
            if (result.success) {
                // Invalidate user-related queries to refetch
                queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        },
    })
}