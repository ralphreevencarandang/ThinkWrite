import React from 'react'
import Image from 'next/image'
import { postImg, profilePlaceholder } from '@/public/images'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import PostCard from '@/components/ui/PostCard'


const MainContent = () => {

    const {session} = useAuthStore();

  return (
    <article className='max-w-3xl mx-auto'>
          
            

              <div className=' space-y-5 border-b border-zinc-300 py-4'>

                    <div className='flex flex-nowrap items-center gap-2'>

                        <Image src={session?.user.image || profilePlaceholder} alt='profile-img' width={30} height={30} className='rounded-full  object-contain'/>
                        <p className='text-sm'>{session?.user.name || 'asd'}</p>
                        
                    </div>

                   <div className='flex flex-col gap-3 lg:flex-row '>

                        <div className='lg:order-2 lg:w-100 '>
                            <Image src={postImg} alt='post-image'  className='object-cover rounded  lg:h-50  w-full'/>
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

              <PostCard/>
    </article>
  )
}

export default MainContent