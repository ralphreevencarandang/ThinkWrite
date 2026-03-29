'use client'

import React from 'react'
import { useGetLikedPosts } from '@/lib/react-queries/posts.query'
import PostCard from '@/components/ui/PostCard'
import { Loader } from '@/components/ui/Loader'
import { Heart } from 'lucide-react'

import { PostData } from '@/components/ui/PostCard'
const LikedPostsPage = () => {
  const { data: likedPosts, isLoading, error } = useGetLikedPosts()

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <Heart className='w-8 h-8 fill-red-500 text-red-500' />
          <h1 className='text-3xl font-bold'>Liked Posts</h1>
        </div>
        <p className='text-gray-500'>Posts you found inspiring or useful</p>
      </div>

      {isLoading && <Loader />}

      {!isLoading && likedPosts && likedPosts.length > 0 && (
        <div>
          <p className='text-sm text-gray-500 mb-4'>{likedPosts.length} post{likedPosts.length !== 1 ? 's' : ''} liked</p>
          <div className='space-y-0'>
            {likedPosts.map((post: PostData) => (
              <PostCard key={post.id} data={post} />
            ))}
          </div>
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