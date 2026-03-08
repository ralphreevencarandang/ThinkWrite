import { postPlaceholder } from '@/public/images'
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface StoryCardProps {
  id: string
  title: string
  excerpt?: string
  featuredImage?: string
  createdAt: string
  content: string
}

const StoryCard = ({ id, title, excerpt, featuredImage, createdAt, content }: StoryCardProps) => {
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200) // 200 words per minute
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className='flex flex-col md:justify-between md:flex-row md:items-center border-b border-gray-200 py-4'>
      <div className='flex items-center gap-5'>
       
          <Image 
            src={featuredImage 
                || postPlaceholder
            } 
            alt={title} 
            width={160}
            height={80}
            className='w-40 h-20 hidden md:block object-cover rounded'
          />

        <div className='space-y-2 flex-1'>
          <h3 className='font-medium text-gray-900 line-clamp-2'>{title}</h3>
          <p className='text-xs text-gray-400'>{readTime} min read • {wordCount} words • {formattedDate}</p>
        </div>
      </div>
      <button className='mt-3 md:mt-0 cursor-pointer'>
        <Ellipsis className='max-sm:self-end' size={20}/>
      </button>
    </div>
  )
}

export default StoryCard