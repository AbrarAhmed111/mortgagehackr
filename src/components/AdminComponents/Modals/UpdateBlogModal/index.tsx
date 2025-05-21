'use client'

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Blog } from '@/utils/types'

type UpdateBlogModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (blog: Blog) => void
  blogData: Blog | null
}

export function UpdateBlogModal({
  isOpen,
  onClose,
  onUpdate,
  blogData,
}: UpdateBlogModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [image, setImage] = useState<string | StaticImageData>('')

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title)
      setContent(blogData.content)
      setPublishDate(blogData.publishDate)
      setImage(blogData.image)
    }
  }, [blogData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (blogData) {
      onUpdate({ title, content, image, publishDate })
      onClose()
    }
  }

  if (!isOpen || !blogData) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <div className="flex items-center">
              <Image
                src={image}
                alt="Profile Preview"
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <input
                type="file"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0]
                    const reader = new FileReader()
                    reader.onload = event => {
                      if (event.target?.result) {
                        setImage(event.target.result as string)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Publish Date
            </label>
            <input
              type="date"
              value={publishDate}
              onChange={e => setPublishDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
