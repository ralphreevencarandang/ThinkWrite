'use client'

import React from 'react'
import Image from 'next/image'
import { postImg, profilePlaceholder } from '@/public/images'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import PostCard from '@/components/ui/PostCard'
import { Loader } from '@/components/ui/Loader'
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

        {isLoading && <Loader />}

        {!isLoading && data?.length > 0 && data?.filter((post: any) => post.isPublish).sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).map( (post: any) => (
            <PostCard key={post.id} data={post}/>
        ))}

        {!isLoading && data?.length === 0 && (
            <div className='text-center py-12'>
                <p className='text-gray-500'>No posts available</p>
            </div>
        )}

        {error && (
            <div className='text-center py-12'>
                <p className='text-red-500'>Error loading posts</p>
            </div>
        )}
          
            

    </article>
  )
}

export default MainContent