'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { postImg, profilePlaceholder } from '@/public/images'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import PostCard from '@/components/ui/PostCard'
import { Loader } from '@/components/ui/Loader'
import axios from '@/lib/axios'
import { useInfiniteQuery } from '@tanstack/react-query'

const POSTS_PER_PAGE = 10

const MainContent = () => {

    const {session} = useAuthStore();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryKey: ['all-posts'],
        queryFn: async ({ pageParam = 0 }) => {
            try {
                const response = await axios.get(`/posts/all?page=${pageParam}&limit=${POSTS_PER_PAGE}`)
                return {
                    posts: response.data.posts,
                    page: pageParam,
                    hasMore: response.data.posts.length === POSTS_PER_PAGE
                }
                
            } catch (error) {
                console.log('Error fetching posts:', error);
                throw error;
            }
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.page + 1 : undefined
        },
        initialPageParam: 0
    })

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current)
            }
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const allPosts = data?.pages.flatMap(page => page.posts) || []
    const sortedPosts = [...allPosts].sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <article className='max-w-3xl mx-auto'>

        {isLoading && <Loader />}

        {!isLoading && sortedPosts.length > 0 && sortedPosts.map( (post: any) => (
            <PostCard key={post.id} data={post}/>
        ))}

        {/* Sentinel element for infinite scroll trigger */}
        <div ref={sentinelRef} className='h-10' />

        {isFetchingNextPage && (
            <div className='flex justify-center py-8'>
                <Loader />
            </div>
        )}

        {!isLoading && sortedPosts.length === 0 && (
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