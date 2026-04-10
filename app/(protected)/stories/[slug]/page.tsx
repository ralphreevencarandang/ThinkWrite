'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import ReadOnlyEditor from '@/components/tiptap-templates/simple/read-only-editor'
import CommentsSection from '@/components/CommentsSection'
import axios from '@/lib/axios'

const page = () => {
  const params = useParams()
  const slug = params.slug as string

  const { data, isPending, isError } = useQuery({
    queryKey: ['story', slug],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`posts/${slug}`)
        console.log('Result: ', data)
        return data
      } catch (error) {
        console.log('Failed to fetch post: ', error)
      }
    },
  })

  if (isPending) {
    return (
      <section className='max-w-3xl mx-auto'>
        <div className='animate-pulse'>
          <div className='h-10 bg-gray-200 rounded mb-4'></div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded'></div>
            <div className='h-4 bg-gray-200 rounded'></div>
            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          </div>
        </div>
      </section>
    )
  }

  if (isError || !data?.post) {
    return (
      <section className='max-w-3xl mx-auto'>
        <div className='text-center py-10'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Post not found</h2>
          <p className='text-gray-600'>The post you're looking for doesn't exist.</p>
        </div>
      </section>
    )
  }

  return (
    <section className='max-w-3xl mx-auto'>
      <article>
        <h1 className='font-bold capitalize text-3xl mb-4'>{data?.post?.title}</h1>
        
        {/* Post metadata */}
        <div className='text-sm text-gray-600 mb-6'>
          <time dateTime={data?.post?.publishedAt}>
            {new Date(data?.post?.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Featured image */}
        {data?.post?.featuredImage && (
          <img
            src={data?.post?.featuredImage}
            alt={data?.post?.title}
            className='w-full h-96 object-cover rounded-lg mb-8'
          />
        )}

        {/* Post content */}
        <ReadOnlyEditor content={data?.post?.content} />
      </article>

      <hr className='my-8' />

      {/* Comments Section */}
      <CommentsSection postId={data?.post?.id} />
    </section>
  )
}

export default page