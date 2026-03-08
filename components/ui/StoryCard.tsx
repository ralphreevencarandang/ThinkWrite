'use client'

import { postPlaceholder } from '@/public/images'
import { Ellipsis, Trash2, Edit } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
interface StoryCardProps {
  id: string
  title: string
  excerpt?: string
  featuredImage?: string
  createdAt: string
  content: string
}

const StoryCard = ({ id, title, excerpt, featuredImage, createdAt, content }: StoryCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200) // 200 words per minute
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleEdit = () => {
    console.log('Edit story:', id)
    setIsMenuOpen(false)
  }

  const handleDelete = () => {
    console.log('Delete story:', id)
    setIsMenuOpen(false)
  }

  return (
    <Link href={'/'} className='flex flex-col md:justify-between md:flex-row md:items-center border-b border-gray-200 py-4'>
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
      <div className='relative mt-3 md:mt-0' ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors'
        >
          <Ellipsis className='max-sm:self-end' size={20}/>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className='absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 '>
            <button
              onClick={handleEdit}
              className='w-full cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left text-gray-700 hover:text-gray-900 border-b border-gray-100'
            >
              <Edit size={16} />
              <span className='text-sm font-light '>Edit Story</span>
            </button>

            <button
              onClick={handleDelete}
              className='w-full cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left text-red-600 hover:text-red-700'
            >
              <Trash2 size={16} />
              <span className='text-sm font-light cursor-pointer'>Delete Story</span>
            </button>

          </div>
        )}
      </div>
    </Link>
  )
}

export default StoryCard