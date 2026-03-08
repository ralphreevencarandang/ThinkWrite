'use client'

import React, { useState } from 'react'
import DraftStories from '@/components/ui/DraftStories'

const page = () => {
  const [activeTab, setActiveTab] = useState<'drafts' | 'published'>('drafts')

  return (
    <section>
      <h1 className='font-normal capitalize text-3xl mb-10'>Stories</h1>

      {/* Tabs Navigation */}
      <div className='flex gap-8 border-b border-gray-200 mb-8'>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`pb-3 px-2 font-medium transition-colors relative cursor-pointer ${
            activeTab === 'drafts'
              ? 'text-black'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Drafts
          {activeTab === 'drafts' && (
            <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black'></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`pb-3 px-2 font-medium transition-colors relative cursor-pointer ${
            activeTab === 'published'
              ? 'text-black'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Published
          {activeTab === 'published' && (
            <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-black'></div>
          )}
        </button>
      </div>

      {/* Drafts Tab Content */}
      {activeTab === 'drafts' && <DraftStories />}

      {/* Published Tab Content */}
      {activeTab === 'published' && (
        <div className='py-12 text-center'>
          <p className='text-gray-500 text-lg'>No published stories yet</p>
          <p className='text-gray-400 text-sm mt-1'>Publish a draft to see it here</p>
        </div>
      )}
    </section>
  )
}

export default page