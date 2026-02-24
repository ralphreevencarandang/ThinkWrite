'use client'

import React, { FormEvent } from 'react'
import Image from 'next/image'
import { postPlaceholder } from '@/public/images'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor} from   '@tiptap/react';
import { useState } from 'react'

const CreatePostForm = () => {
    
      const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm({
             
        })

        const [editor, setEditor] = useState<Editor | null>(null)

        const excerptValue = watch("excerpt", "");

        
    
      const handleSubmitPost = (e : FormEvent)=>{
        try {
            e.preventDefault();
          console.log(editor?.getHTML());
          
        } catch (error) {
          console.log('Error in submit post: ', error);
          
        }
      }
     
  return (
    <form className='flex flex-col gap-10 md:flex-row' onSubmit={(e) => handleSubmitPost(e)}>


        <div className='space-y-5 md:w-[60%] lg:w-[70%] h-full'>
            <div className='space-y-2'>
                <p className='font-semibold text-black'>Title </p>
                <input {...register('title')} type="text" className='w-full px-2 py-2 border rounded border-zinc-400' />
            </div>
          
            <div className='space-y-2 '>
              <p className='font-semibold text-black'>Body</p>
              <div className=' w-full '>
                  <SimpleEditor onEditorReady={ setEditor}/>
              </div>
            </div>


        </div>

        {/* COLUMN 2 */}

        <div className='md:w-[40%] lg:w-[30%] sticky top-0 h-full   space-y-4'>

            <div className='space-y-2'>

                <p className='font-semibold text-black'>Featured Image </p>

                <div className='border border-zinc-400 '>
                    <label htmlFor="featuredImage" className='h-full'>
                        <Image src={postPlaceholder} alt='Featured image placeholder' className='w-full h-full object-cover rounded '/>
                    </label>
                    <input {...register('featuredImage')} type="file" accept="image/jpeg, image/png" className='hidden' id='featuredImage'/>
                </div>

          
            </div>

            <div className='space-y-2'>
              <p className='font-semibold text-black'>Excerpt </p>
              <div>

                <textarea {...register('excerpt')} maxLength={100} className='w-full h-20 border border-zinc-400 outline-0 px-2 py-2 resize-none'></textarea>
                <p className={`text-xs text-right ${excerptValue.length < 100 ? 'text-zinc-500' : 'text-red-400'} `}>{excerptValue.length}/100</p>
              </div>
           
            
            </div>

            <div className='space-y-2'> 
                <label className='font-semibold text-black' htmlFor='publishedAt'>Published At</label>
                <input {...register('publishedAt')} type="date" className='w-full px-2 py-2 border border-zinc-400 outline-0' id='publishedAt' />
            </div>

            <div className='flex flex-col gap-2'>
              <button className=' px-4 py-2   rounded cursor-pointer border'>Draft</button>
              <button className='border px-4 py-2 bg-black text-white rounded cursor-pointer '  type='submit'>Publish</button>
            </div>



        </div>

      </form>

  )
}

export default CreatePostForm