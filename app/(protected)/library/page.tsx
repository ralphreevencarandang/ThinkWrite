'use client'

import React, { useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import PostCard from '@/components/ui/PostCard'
import { Loader } from '@/components/ui/Loader'
import { Heart } from 'lucide-react'
import axios from '@/lib/axios'

import { PostData } from '@/components/ui/PostCard'

const POSTS_PER_PAGE = 10

const LikedPostsPage = () => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['liked-posts'],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const res = await axios.get(`/posts/liked?page=${pageParam}&limit=${POSTS_PER_PAGE}`)
        return {
          posts: res.data.posts,
          page: pageParam,
          hasMore: res.data.posts.length === POSTS_PER_PAGE
        }
      } catch (error) {
        console.log('Error fetching liked posts: ', error)
        throw error
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

  const likedPosts = data?.pages.flatMap(page => page.posts) || []

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='mb-8'>
        
        <h1 className='text-black font-semibold text-2xl '>Posts you found inspiring or useful</h1>
      </div>

      {isLoading && <Loader />}

      {!isLoading && likedPosts && likedPosts.length > 0 && (
        <div>
          <div className='space-y-0'>
            {likedPosts.map((post: PostData) => (
              <PostCard key={post.id} data={post} />
            ))}
          </div>

          {/* Sentinel element for infinite scroll trigger */}
          <div ref={sentinelRef} className='h-10' />

          {isFetchingNextPage && (
            <div className='flex justify-center py-8'>
              <Loader />
            </div>
          )}
        </div>
      )}

      {!isLoading && (!likedPosts || likedPosts.length === 0) && (
        <div className='text-center py-16'>
          <Heart className='w-16 h-16 text-gray-300 mx-auto mb-4 opacity-50' />
          <h2 className='text-xl font-semibold text-gray-600 mb-2'>No liked posts yet</h2>
          <p className='text-gray-500'>Start liking posts to add them to your collection</p>
        </div>
      )}

      {error && (
        <div className='text-center py-12'>
          <p className='text-red-500 font-semibold mb-2'>Failed to load liked posts</p>
          <p className='text-gray-500 text-sm'>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      )}
    </div>
  )
}

export default LikedPostsPage