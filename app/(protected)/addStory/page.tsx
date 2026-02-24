
import React from 'react'
import CreatePostForm from '@/components/forms/CreatePostForm'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const page =  async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  

  if(!session){
    redirect('/')
  }




 


  return (
    <section className='  relative overflow-hidden'>

      {/* COLUMN 1 */}

      <CreatePostForm/>


    </section>
  )
}

export default page