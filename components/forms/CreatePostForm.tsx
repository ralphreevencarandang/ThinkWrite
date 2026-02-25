'use client'

import React, { FormEvent } from 'react'
import Image from 'next/image'
import { postPlaceholder } from '@/public/images'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import z from 'zod'
import { createPostSchema } from '@/validations/client/post.schema'
import { useMutation } from '@tanstack/react-query'
import { createPost } from '@/lib/actions/post-actions'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

type CreatePostFormFields = z.infer<typeof createPostSchema>

const CreatePostForm = () => {
  const today = new Date().toISOString().split("T")[0]
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      publishedAt: today
    }
  })

  const [editor, setEditor] = useState<Editor | null>(null)
  const [editorError, setEditorError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const excerptValue = watch("excerpt", "")

  // TanStack Query Mutation with Server Action
  const createPostMutation = useMutation({
    mutationFn: async (data: CreatePostInput) => {
      const result = await createPost(data)
      if (!result.success) {
        throw new Error(result.message)
      }
      return result
    },
    onSuccess: (data) => {
      console.log('Post created successfully:', data)
      alert('Post published successfully!')
      router.push('/posts')
    },
    onError: (error: any) => {
      console.error('Error creating post:', error)
      alert(error.message || 'Failed to create post')
    },
  })

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit handler
  const onSubmit = async (data: CreatePostFormFields) => {
    const editorContent = editor?.getHTML() || ''

    // Validate editor content
    if (!editorContent || editorContent === '<p></p>') {
      setEditorError('Body content is required')
      return
    }

    setEditorError(null)

    // Get featured image file
    const fileInput = document.querySelector('input[id="featuredImage"]') as HTMLInputElement
    const featuredImageFile = fileInput?.files?.[0]

    // Call mutation with server action
    createPostMutation.mutate({
      title: data.title,
      excerpt: data.excerpt,
      content: editorContent,
      publishedAt: data.publishedAt || today,
      featuredImage: featuredImageFile,
    })
  }

  return (
    <form className='flex flex-col gap-10 md:flex-row' onSubmit={handleSubmit(onSubmit)}>

      <div className='space-y-5 md:w-[60%] lg:w-[70%] h-full'>
        <div className='space-y-2'>
          <p className='font-semibold text-black'>Title </p>
          <input 
            {...register('title')} 
            type="text" 
            className={`w-full px-2 py-2 border rounded outline-0 ${errors.title ? 'border-red-500' : 'border-zinc-400'}`} 
            placeholder="Enter post title"
          />
          {errors.title && <p className='text-red-500 text-xs'>{errors.title.message}</p>}
        </div>

        <div className='space-y-2 '>
          <p className='font-semibold text-black'>Body</p>
          <div className=' w-full '>
            <SimpleEditor onEditorReady={setEditor} />
          </div>
          {editorError && <p className='text-red-500 text-xs'>{editorError}</p>}
        </div>

      </div>

      {/* COLUMN 2 */}

      <div className='md:w-[40%] lg:w-[30%] sticky top-0 h-full space-y-4'>

        <div className='space-y-2'>
          <p className='font-semibold text-black'>Featured Image </p>
          <div className='border border-zinc-400 relative overflow-hidden rounded'>
            <label htmlFor="featuredImage" className='h-full cursor-pointer block'>
              <Image 
                src={uploadedImage || postPlaceholder} 
                alt='Featured image'
                width={400}
                height={300}
                className='w-full h-full   md:h-45 object-cover ' 
              />
            </label>
            <input 
              {...register('featuredImage')} 
              type="file" 
              accept="image/jpeg, image/png" 
              className='hidden' 
              id='featuredImage'
              onChange={handleImageChange}
            />
            {uploadedImage && (
              <button
                type='button'
                onClick={() => {
                  setUploadedImage(null)
                  const fileInput = document.querySelector('input[id="featuredImage"]') as HTMLInputElement
                  if (fileInput) fileInput.value = ''
                }}
                className='absolute top-2 right-2 bg-gray-600 text-white p-2 rounded-full text-xs hover:bg-black cursor-pointer'
              > 
               
                <X size={15}/>
              </button>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <p className='font-semibold text-black'>Excerpt </p>
          <div>
            <textarea 
              {...register('excerpt')} 
              maxLength={100} 
              className={`w-full h-20 border ${errors.excerpt ? 'border-red-500' : 'border-zinc-400'} outline-0 px-2 py-2 resize-none`}
              placeholder="Write a brief excerpt..."
            />
            <div className={`flex ${errors.excerpt ? 'justify-between' : 'justify-end'}`}>
              {errors.excerpt && <p className='text-red-500 text-xs'>{errors.excerpt.message}</p>}
              <p className={`text-xs text-right ${excerptValue && excerptValue.length < 100 ? 'text-zinc-500' : 'text-red-400'}`}>
                {excerptValue ? excerptValue.length : '0'}/100
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='font-semibold text-black' htmlFor='publishedAt'>Published At</label>
          <input 
            {...register('publishedAt')} 
            type="date" 
            className={`w-full px-2 py-2 border ${errors.publishedAt ? 'border-red-500' : 'border-zinc-400'} outline-0`} 
            id='publishedAt' 
          />
          {errors.publishedAt && <p className='text-red-500 text-xs'>{errors.publishedAt.message}</p>}
        </div>

        <div className='flex flex-col gap-2'>
          <button 
            className='px-4 py-2 rounded cursor-pointer border disabled:opacity-50' 
            type='button' 
            disabled={createPostMutation.isPending}
          >
            Draft
          </button>
          <button
            className='border px-4 py-2 bg-black text-white rounded cursor-pointer disabled:opacity-50'
            type='submit'
            disabled={createPostMutation.isPending || isSubmitting}
          >
            {createPostMutation.isPending ? 'Publishing...' : 'Publish'}
          </button>
        </div>

      </div>

    </form>
  )
}

interface CreatePostInput {
  title: string
  excerpt: string
  content: string
  publishedAt: string
  featuredImage?: File
}

export default CreatePostForm