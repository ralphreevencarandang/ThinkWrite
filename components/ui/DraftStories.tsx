'use client'

import React from 'react'
import { useGetPosts } from '@/lib/react-queries/posts.query'
import { Loader } from './Loader'
import StoryCard from './StoryCard'
const DraftStories = () => {
  const { data: drafts, isPending, error } = useGetPosts(false)

  if (isPending) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
        <p className='font-medium'>Failed to fetch draft stories</p>
        <p className='text-sm'>{error instanceof Error ? error.message : 'An error occurred'}</p>
      </div>
    )
  }

  if (!drafts || drafts.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-gray-500 text-lg'>No draft stories yet</p>
        <p className='text-gray-400 text-sm mt-1'>Start writing your first story</p>
      </div>
    )
  }

  return (
    <section>
      <p className='text-sm text-zinc-700 font-semibold mb-4'>Latest</p>
      <div className='space-y-0'>
        {drafts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((post: any) => (
          <StoryCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            featuredImage={post.featuredImage}
            createdAt={post.createdAt}
            content={post.content}
          />
        ))}
      </div>
    </section>
  )
}

export default DraftStories