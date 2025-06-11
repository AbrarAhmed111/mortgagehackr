'use client'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { addBlog } from '@/lib/actions/addBlog'
import { BiLoaderCircle } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { Blog } from '@/utils/types'

type AddBlogModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (newBlog: Blog) => Promise<void>
  defaultImage: StaticImageData | string
}

export function AddBlogModal({
  isOpen,
  onClose,
  onAdd,
  defaultImage,
}: AddBlogModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [image, setImage] = useState<StaticImageData | string>(defaultImage)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = title.toLowerCase().replace(/\s+/g, '-')

      // Convert profile image to base64 if exists
      let profileImageBase64: string | undefined
      if (imageFile) {
        profileImageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(imageFile)
        })
      }

      const result = await addBlog({
        title,
        slug,
        profileImage: profileImageBase64,
        content: [{ description: content }],
      })

      if (result.error) {
        throw new Error(result.error)
      }

      toast.success(result.success || 'Blog added successfully!')

      await onAdd({
        id: '',
        title,
        content,
        image: profileImageBase64 || defaultImage,
        publishDate,
        slug,
      })

      onClose()
      resetForm()
    } catch (error) {
      console.error('Blog add failed:', error)
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTitle('')
    setContent('')
    setImage(defaultImage)
    setImageFile(null)
    setPublishDate(new Date().toISOString().split('T')[0])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <div className="flex items-center">
              <Image
                src={image}
                alt="Profile Preview"
                width={50}
                height={50}
                className="rounded-full mr-4 w-12 h-12 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setImageFile(file)
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <BiLoaderCircle size={20} className="animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                'Add Blog'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
