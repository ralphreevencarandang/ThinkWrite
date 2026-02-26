'use client'

import React from 'react'
import Image from 'next/image'
import { postImg, profilePlaceholder } from '@/public/images'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import PostCard from '@/components/ui/PostCard'
import axios from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

const MainContent = () => {

    const {session} = useAuthStore();
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const response = await axios.get('/posts')
                return response.data.posts
                
            } catch (error) {
                console.log('Error fetching posts:', error);
                throw error;
            }
        }
    })

    if(data) {
        console.log('Fetched posts:', data)
    }

  return (
    <article className='max-w-3xl mx-auto'>

        {data?.length > 0 && data?.filter((post: any) => post.isPublish).map( (post: any) => (
            <PostCard key={post.id} data={post}/>
        ))}
          
            

    </article>
  )
}

export default MainContent