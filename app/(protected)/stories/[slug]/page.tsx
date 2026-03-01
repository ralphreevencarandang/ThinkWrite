'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import ReadOnlyEditor from '@/components/tiptap-templates/simple/read-only-editor'
import axios from '@/lib/axios'
const page = ( ) => {
  
  const params = useParams()
    const slug = params.slug as string
  const {data, isPending, isError} = useQuery({
    queryKey: ['story', slug],
    queryFn: async () => { 

      try {
           
      const { data } = await axios.get(`posts/${slug}`)
      console.log('Result: ', data);
      
      return data
      } catch (error) {
        console.log('Failed to fetch post: ', error);
        
      }
    }
  })


  return (
    <section className='max-w-3xl mx-auto'>

        this is the stories slug page for {slug}
        <ReadOnlyEditor content={data?.post?.content }/>
    </section>
  )
}

export default page