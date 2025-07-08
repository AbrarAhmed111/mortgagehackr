'use client'
import { Blog } from '@/utils/types'
import { useState } from 'react'
import { blogsApi } from '@/utils/api'
import { BiLoaderCircle } from 'react-icons/bi'
import toast from 'react-hot-toast'

type DeleteBlogModalProps = {
  isOpen: boolean
  onClose: () => void
  onDeleteSuccess: () => void
  blogData: Blog | null
}

export function DeleteBlogModal({
  isOpen,
  onClose,
  onDeleteSuccess,
  blogData,
}: DeleteBlogModalProps) {
  if (!isOpen || !blogData) return null
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!blogData?.id) return

    setLoading(true)
    try {
      await blogsApi.deleteBlog(blogData.id)
      onDeleteSuccess()
    } catch (error) {
      toast.error('Failed to delete blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
        <p className="mb-6">
          Are you sure you want to delete the blog titled{' '}
          <strong>"{blogData.title}"</strong>?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <BiLoaderCircle className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
