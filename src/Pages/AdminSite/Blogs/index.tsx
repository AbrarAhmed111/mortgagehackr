'use client'
import { useState } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { Blog, BlogsColumn } from '@/utils/types'
import { blogsData } from '@/constants'
import { FiPlus } from 'react-icons/fi'
import ProfileIcon from '@/assets/Images/image.png'
import { AddBlogModal } from '@/components/AdminComponents/Modals/AddBlogModal'
import { UpdateBlogModal } from '@/components/AdminComponents/Modals/UpdateBlogModal'
import { DeleteBlogModal } from '@/components/AdminComponents/Modals/DeleteBlogModal'

const BlogsManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(blogsData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  const columns: BlogsColumn<Blog>[] = [
    {
      header: 'Image',
      accessor: 'image',
      isImage: true,
      imageWidth: 40,
      imageHeight: 40,
    },
    { header: 'Title', accessor: 'title' },
    { header: 'Content', accessor: 'content' },
    {
      header: 'Publish Date',
      accessor: 'publishDate',
      render: (blog: Blog) => (
        <span className="text-sm text-gray-600">
          {new Date(blog.publishDate).toLocaleDateString()}
        </span>
      ),
    },
  ]

  // Handlers
  const handleAdd = (newBlog: Blog) => {
    setBlogs([...blogs, newBlog])
    setIsAddModalOpen(false)
  }

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsUpdateModalOpen(true)
  }

  const handleUpdate = (updatedBlog: Blog) => {
    setBlogs(
      blogs.map(blog =>
        blog.title === selectedBlog?.title ? updatedBlog : blog,
      ),
    )
    setIsUpdateModalOpen(false)
  }

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (selectedBlog) {
      setBlogs(blogs.filter(blog => blog.title !== selectedBlog.title))
      setIsDeleteModalOpen(false)
    }
  }

  const handleSelection = (selectedBlogs: Blog[]) => {
    console.log('Selected blogs:', selectedBlogs)
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blogs Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          Add Blog
        </button>
      </div>

      <DataTable
        data={blogs}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelection}
        itemsPerPage={8}
      />

      {/* Add Blog Modal */}
      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
        defaultImage={ProfileIcon}
      />

      {/* Update Blog Modal */}
      <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdate}
        blogData={selectedBlog}
      />

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
        blogData={selectedBlog}
      />
    </div>
  )
}
export default BlogsManagement
