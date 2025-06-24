'use client'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { addBlog } from '@/lib/actions/addBlog'
import { BiLoaderCircle, BiPlus, BiTrash } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { Blog } from '@/utils/types'

type ContentBlock = {
  id: string
  description: string
  image?: File
  imagePreview?: string
}

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
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    defaultImage,
  )
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    { id: '1', description: '' },
  ])
  const [loading, setLoading] = useState(false)

  const addContentBlock = () => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      description: '',
    }
    setContentBlocks([...contentBlocks, newBlock])
  }

  const removeContentBlock = (id: string) => {
    if (contentBlocks.length > 1) {
      setContentBlocks(contentBlocks.filter(block => block.id !== id))
    }
  }

  const updateContentBlock = (
    id: string,
    field: keyof ContentBlock,
    value: any,
  ) => {
    setContentBlocks(
      contentBlocks.map(block =>
        block.id === id ? { ...block, [field]: value } : block,
      ),
    )
  }
  const handleContentImageUpload = (id: string, file: File) => {
    const reader = new FileReader()
    reader.onload = event => {
      if (event.target?.result) {
        setContentBlocks(prevBlocks =>
          prevBlocks.map(block =>
            block.id === id
              ? {
                  ...block,
                  imagePreview: event?.target?.result as string,
                  image: file,
                }
              : block,
          ),
        )
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = title.toLowerCase().replace(/\s+/g, '-')

      let profileImageBase64: string | undefined
      if (profileImageFile) {
        profileImageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(profileImageFile)
        })
      }

      const contentForSubmission = await Promise.all(
        contentBlocks.map(async block => {
          let imageBase64: string | undefined = undefined

          // Check if image exists and is a File object
          if (block.image) {
            imageBase64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => resolve(reader.result as string)
              reader.onerror = reject
              reader.readAsDataURL(block.image as File)
            })
          }

          return {
            description: block.description,
            image: imageBase64,
          }
        }),
      )

      const result = await addBlog({
        title,
        slug,
        profileImage: profileImageBase64,
        content: contentForSubmission,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      toast.success(result.success || 'Blog added successfully!')

      await onAdd({
        id: '',
        title,
        slug,
        publishDate,
        profileImage:
          profileImageBase64 ||
          (typeof defaultImage === 'string' ? defaultImage : defaultImage.src),
        content: contentForSubmission,
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
    setProfileImage(defaultImage)
    setProfileImageFile(null)
    setContentBlocks([{ id: '1', description: '' }])
    setPublishDate(new Date().toISOString().split('T')[0])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <div className="flex items-center">
              <Image
                src={profileImage}
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
                    setProfileImageFile(file)
                    const reader = new FileReader()
                    reader.onload = event => {
                      if (event.target?.result) {
                        setProfileImage(event.target.result as string)
                      }
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="text-sm"
              />
            </div>
          </div>

          {/* Title */}
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

          {/* Content Blocks */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Content Blocks
              </label>
              <button
                type="button"
                onClick={addContentBlock}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <BiPlus className="mr-1" />
                Add Block
              </button>
            </div>

            {contentBlocks.map((block, index) => (
              <div
                key={block.id}
                className="border rounded-lg p-4 mb-3 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Block {index + 1}</h4>
                  {contentBlocks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentBlock(block.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <BiTrash />
                    </button>
                  )}
                </div>

                {/* Block Image */}
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Image (Optional)
                  </label>
                  <div className="flex items-center space-x-3">
                    {block.imagePreview && (
                      <Image
                        src={block.imagePreview}
                        alt={`Block ${index + 1} preview`}
                        width={60}
                        height={60}
                        className="rounded w-15 h-15 object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleContentImageUpload(block.id, file)
                        }
                      }}
                      className="text-sm flex-1"
                    />
                  </div>
                </div>

                {/* Block Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={block.description}
                    onChange={e =>
                      updateContentBlock(
                        block.id,
                        'description',
                        e.target.value,
                      )
                    }
                    className="w-full p-2 border rounded"
                    rows={3}
                    placeholder="Enter description for this block..."
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Publish Date */}
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

          {/* Action Buttons */}
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
