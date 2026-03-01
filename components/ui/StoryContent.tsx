"use client"

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import ReadOnlyEditor from '@/components/tiptap-templates/simple/read-only-editor'
import axios from '@/lib/axios'

const StoryContent = () => {
  const params = useParams()
  const slug = params.slug as string

  const { data, isPending, isError } = useQuery({
    queryKey: ['story', slug],
    queryFn: async () => {
      const { data } = await axios.get(`stories/${slug}`)
      return data
    },
    enabled: !!slug, // Only fetch when slug is available
  })

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading story</div>

  return <ReadOnlyEditor content={data?.content || ''} />
}

export default StoryContent