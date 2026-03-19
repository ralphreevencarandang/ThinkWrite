'use client'

import React from 'react'
import EditPostForm from '@/components/forms/EditPostForm'
import { useParams } from 'next/navigation'
import { Loader } from '@/components/ui/Loader'
import { useGetPost } from '@/lib/react-queries/posts.query'

const EditStoryPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const { data: post, isPending, error } = useGetPost(slug)

  if (isPending) {
    return (
      <section className='relative overflow-hidden flex justify-center items-center h-screen'>
        <Loader />
      </section>
    )
  }

  if (error) {
    return (
      <section className='relative overflow-hidden'>
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700'>
          <p className='font-medium'>Failed to load story</p>
          <p className='text-sm'>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className='relative overflow-hidden'>
        <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700'>
          <p>Story not found</p>
        </div>
      </section>
    )
  }

  return (
    <section className='relative overflow-hidden'>
      <h1 className='font-normal capitalize text-3xl mb-10'>Edit Story</h1>
      <EditPostForm initialPost={post} />
    </section>
  )
}

export default EditStoryPage
