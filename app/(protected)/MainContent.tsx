import React from 'react'
import Image from 'next/image'
import { postImg, profilePlaceholder } from '@/public/images'
import { MessageCircle, ThumbsUp } from 'lucide-react'

const MainContent = () => {
  return (
    <article className='max-w-3xl mx-auto'>
           {/* <p>{session.user.name}</p> */}
            

              <div className=' space-y-5 border-b border-zinc-400 py-4'>

                    <div className='flex flex-nowrap items-center gap-2'>

                        <Image src={profilePlaceholder} alt='profile-img' className='rounded-full w-10 object-contain'/>
                        <p className='text-sm'>Author</p>
                        
                    </div>

                    <div className='flex flex-col gap-3 lg:flex-row'>

                        <div className='lg:order-2 lg:w-100'>
                            <Image src={postImg} alt='post-image'  className='object-contain rounded w'/>
                        </div>

                        <div className='space-y-2'>
                            <h2 className='font-bold text-xl text-black'>Title: Lorem ipsum dolor sit, amet ?</h2>
                            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, architecto?...   </p>
                        </div>
                    </div>

                

                    <div className='flex justify-between text-sm items-center'>
                        <div className='space-x-2'>
                            <button className='cursor-pointer'><ThumbsUp strokeWidth={1} className='w-5'/></button>
                            <button className='cursor-pointer'><MessageCircle strokeWidth={1} className='w-5'/></button>
                        </div>
                        <p className='text-xs text-zinc-500'>Nov 11, 2025</p>
                    </div>



              </div>
    </article>
  )
}

export default MainContent