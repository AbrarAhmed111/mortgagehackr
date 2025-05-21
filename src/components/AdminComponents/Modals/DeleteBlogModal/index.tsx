'use client'

import { Blog } from '@/utils/types'

type DeleteBlogModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  blogData: Blog | null
}

export function DeleteBlogModal({
  isOpen,
  onClose,
  onDelete,
  blogData,
}: DeleteBlogModalProps) {
  if (!isOpen || !blogData) return null

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
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete()
              onClose()
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
