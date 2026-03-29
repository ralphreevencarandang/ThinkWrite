'use client'

import React, { useState } from 'react'
import * as z from 'zod';

import Image from 'next/image'
import { profilePlaceholder } from '@/public/images'
import { Session } from '@/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { updateBasicProfileSchema } from '@/validations/client/post.schema';
import { useUpdateProfile } from '@/lib/react-queries/users.query'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

type updateFormFields = z.infer<typeof updateBasicProfileSchema>

const ProfileForm = ({ session }: { session: Session }) => {
  const { mutate: updateProfileMutate, isPending, error } = useUpdateProfile()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const fullName = session.user.name?.trim() ?? ""
  const nameParts = fullName.split(/\s+/) // handles multiple spaces

  const lastname = nameParts.pop() ?? ""
  const firstname = nameParts.join(" ")

  const { register, handleSubmit, formState: { errors } } = useForm<updateFormFields>({
    // Connect schema to react hook form
    resolver: zodResolver(updateBasicProfileSchema),
    defaultValues: {
      firstname,
      lastname
    }
  })

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Clear selected image
  const handleClearImage = () => {
    setSelectedImage(null)
    setImageFile(null)
    const fileInput = document.querySelector('input[id="profile"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  // Form submission handler
  const onSubmit = (data: updateFormFields) => {
    updateProfileMutate(
      {
        firstname: data.firstname,
        lastname: data.lastname,
        profileImage: imageFile || undefined,
      },
      {
        onSuccess: (result) => {
          if (result.success) {
            toast.success(result.message)
            handleClearImage() // Clear image preview after successful update
          } else {
            toast.error(result.message)
          }
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : 'Failed to update profile')
        }
      }
    )
  }

  console.log('Session: ', session);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

      {/* Error display */}
      {error && (
        <div className='p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 max-w-sm'>
          <p className='font-medium'>Update failed</p>
          <p className='text-sm'>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </div>
      )}

      <div className='flex gap-10 flex-col md:flex-row'>

        <div className="flex items-center flex-col mt-5 gap-2 md:w-[30%]">
          <label htmlFor="profile" className="relative w-50 h-50">
            <Image 
              src={selectedImage || session.user.image || profilePlaceholder} 
              alt="profile image"   
              fill

              className=" object-cover cursor-pointer hover:opacity-80 transition-opacity" 
            />
          </label>
          <input 
            type="file" 
            className="hidden" 
            id="profile" 
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
          <label htmlFor="profile" className="cursor-pointer text-sm hover:text-gray-700 transition-colors">
            {selectedImage ? 'Change Image' : 'Select Image'}
          </label>
          
          {selectedImage && (
            <button
              type='button'
              onClick={handleClearImage}
              className='text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors flex items-center gap-1'
            >
              <X size={12} />
              Clear
            </button>
          )}
          
          <p className="text-xs text-center">Recommended: Square JPG, or PNG, at least 200 pixels per side.</p>
        </div>

        <div className="space-y-2 md:w-[70%]">

          <div>
            <label htmlFor="" className="text-sm">Email</label>
            <input 
              type="email" 
              value={session.user.email}
              readOnly 
              className="w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm focus:bg-white focus:border focus:border-zinc-200 transition-all" 
            />
          </div>

          <div>
            <label htmlFor="" className="text-sm">Firstname</label>
            <input
              {...register('firstname')}
              type="text"
              className={`w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm focus:bg-white focus:border focus:border-zinc-200 transition-all ${errors.firstname ? 'border-red-500' : ''}`}
            />
            {errors.firstname && <p className='text-red-500 text-xs mt-1'>{errors.firstname.message}</p>}
          </div>

          <div>
            <label htmlFor="" className="text-sm">Lastname</label>
            <input
              {...register('lastname')}
              type="text"
              className={`w-full bg-stone-200 px-2 py-2 rounded outline-0 text-sm focus:bg-white focus:border focus:border-zinc-200 transition-all ${errors.lastname ? 'border-red-500' : ''}`}
            />
            {errors.lastname && <p className='text-red-500 text-xs mt-1'>{errors.lastname.message}</p>}
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full text-sm bg-black text-white py-2 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-800 transition-all"
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update profile'}
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs mt-5 text-end italic">
        Member since {new Date(session.user.createdAt.getMonth()).toLocaleString('en-US', { month: 'short' })} {session.user.createdAt.getDate()}, {session.user.createdAt.getFullYear()}
      </p>

    </form>
  )
}

export default ProfileForm