'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useGetComments, useCreateComment, useDeleteComment } from '@/lib/react-queries/comments.query'
// import { format } from 'date-fns'
// import format
import Link from 'next/link'

interface CommentsSection {
  postId: string
}

const CommentsSection: React.FC<CommentsSection> = ({ postId }) => {
  const { session } = useAuthStore()
  const [commentContent, setCommentContent] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Queries and mutations
  const { data: comments = [], isLoading, isError, error } = useGetComments(postId)
  const { mutate: addComment, isPending: isCreating, isError: isCreateError, error: createError } = useCreateComment(postId)
  const { mutate: removeComment, isPending: isDeleting } = useDeleteComment()

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!session?.user) {
      setLocalError('You must be logged in to comment')
      return
    }

    if (!commentContent.trim()) {
      setLocalError('Comment cannot be empty')
      return
    }

    addComment(
      { content: commentContent },
      {
        onSuccess: () => {
          setCommentContent('')
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
          }
        },
        onError: (error: Error) => {
          setLocalError(error.message || 'Failed to add comment')
        },
      }
    )
  }

  // Handle delete comment
  const handleDeleteComment = (commentId: number) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      removeComment(commentId)
    }
  }

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px'
    }
  }

  return (
    <div className='pt-10'>
      <div className='mb-8'>
        <h3 className='text-xl font-semibold mb-6'>Comments ({comments.length})</h3>

        {/* Error Messages */}
        {(localError || isCreateError) && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm'>
            {localError || (createError instanceof Error ? createError.message : 'Failed to add comment')}
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className='mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200'>
          {!session?.user ? (
            <div className='text-center py-4'>
              <p className='text-gray-600 mb-3'>Sign in to comment</p>
              <button className='inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm' onClick={() => window.location.href = '/signin'}>
                Sign In
              </button>
            </div>
          ) : (
            <div>
              <div className='flex items-center gap-3 mb-3'>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className='w-8 h-8 rounded-full'
                  />
                )}
                <span className='text-sm font-medium text-gray-700'>{session.user.name}</span>
              </div>
              <textarea
                ref={textareaRef}
                value={commentContent}
                onChange={handleTextareaChange}
                placeholder='Share your thoughts...'
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                rows={2}
              />
              <div className='flex justify-end gap-2 mt-3'>
                <button
                  type='button'
                  onClick={() => {
                    setCommentContent('')
                    setLocalError(null)
                    if (textareaRef.current) {
                      textareaRef.current.style.height = 'auto'
                    }
                  }}
                  className='px-4 py-2 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium'
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isCreating || !commentContent.trim()}
                  className='px-4 py-2 cursor-pointer bg-black text-white rounded-md hover:bg-black disabled:bg-black text-sm font-medium'
                >
                  {isCreating ? 'Commenting...' : 'Comment'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Comments List */}
        <div className='space-y-4'>
          {isLoading ? (
            <div className='text-center py-8 text-gray-500'>Loading comments...</div>
          ) : isError ? (
            <div className='text-center py-8 text-red-500'>Failed to load comments</div>
          ) : comments.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>No comments yet. Be the first to comment!</div>
          ) : (
            comments.map((comment: any) => (
              <div
                key={comment.id}
                className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex items-center gap-3 flex-1'>
                    {comment.user?.image && (
                      <img
                        src={comment.user.image}
                        alt={comment.user.name || 'User'}
                        className='w-8 h-8 rounded-full flex-shrink-0'
                      />
                    )}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <span className='font-semibold text-sm'>{comment.user?.name || 'Anonymous'}</span>
                        <span className='text-xs text-gray-500'>
                          {/* {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')} */}
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                        </span>

                      </div>
                      <p className='text-gray-700 mt-2 text-sm break-words'>{comment.content}</p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  {session?.user && (comment.userId === session.user.id) && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={isDeleting}
                      className='ml-4 px-2 py-1 text-red-500 hover:bg-red-50 rounded text-xs font-medium flex-shrink-0'
                      title='Delete comment'
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
