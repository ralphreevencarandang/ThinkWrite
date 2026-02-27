import React from 'react'

const page = async( {params}: {params: Promise<{slug: string}>}) => {
  const { slug } = await params

  return (
    <div>

        this is the stories slug page for {slug}
    </div>
  )
}

export default page