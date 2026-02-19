

import { profilePlaceholder } from "@/public/images"
import Image from "next/image"
import ProfileForm from "@/components/forms/ProfileForm"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
const page = async () => {


  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect('/')
    
  }


  return (
    <section className="max-w-3xl mx-auto space-y-15">

        <div>
          <h1 className="text-3xl md:text-5xl font-semibold text-black mb-2">Settings</h1>
          <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, unde.</p>

        </div>

  

          <div className="">
            <ProfileForm session={session}/>
          

          </div>




      

    </section>
  )
}

export default page