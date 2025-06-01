'use client'
import { useState, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { Blog, BlogsColumn } from '@/utils/types'
import { FiPlus } from 'react-icons/fi'
import ProfileIcon from '@/assets/Images/image.png'
import { AddBlogModal } from '@/components/AdminComponents/Modals/AddBlogModal'
import { DeleteBlogModal } from '@/components/AdminComponents/Modals/DeleteBlogModal'
import { getAllBlogs } from '@/lib/actions/blogs'
import { BiLoaderCircle } from 'react-icons/bi'
import toast from 'react-hot-toast'

const BlogsManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  useEffect(() => {
    getBlogs()
  }, [currentPage])

  const getBlogs = async () => {
    setLoading(true)
    try {
      const blogsData = await getAllBlogs(currentPage, 8)
      console.log('>>>>>>>>', blogsData)
      const transformedBlogs: Blog[] = blogsData.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        content:
          blog.content?.map((block: any) => block.description).join(' ') || '',
        image: blog.profile_image || ProfileIcon,
        publishDate: blog.created_at,
        slug: blog.slug,
      }))
      setBlogs(transformedBlogs)
    } catch (error) {
      console.error('Error loading blogs:', error)
    } finally {
      setLoading(false)
    }
  }

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
  const handleAdd = async () => {
    setIsAddModalOpen(false)
    await getBlogs()
  }

  // const handleEdit = (blog: Blog) => {
  //   setSelectedBlog(blog)
  //   setIsUpdateModalOpen(true)
  // }

  // const handleUpdate = async (updatedBlog: Blog) => {
  //   await getBlogs()
  //   setIsUpdateModalOpen(false)
  // }

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = async () => {
    setIsDeleteModalOpen(false)
    await getBlogs()
    toast.success('Blog deleted successfully')
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
      {loading ? (
        <div className="flex justify-center gap-4 items-center h-[50vh] border rounded-lg">
          <BiLoaderCircle size={40} className="animate-spin" />
          <span className="text-xl font-semibold">Loading blogs...</span>
        </div>
      ) : blogs.length > 0 ? (
        <DataTable
          data={blogs}
          columns={columns}
          // onEdit={handleEdit}
          onDelete={handleDelete}
          onSelect={handleSelection}
          itemsPerPage={8}
        />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No blogs data available.</div>
        </div>
      )}

      {/* Add Blog Modal */}
      <AddBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
        defaultImage={ProfileIcon}
      />

      {/* Update Blog Modal */}
      {/* <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdate}
        blogData={selectedBlog}
      /> */}

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteSuccess={handleDeleteSuccess}
        blogData={selectedBlog}
      />
    </div>
  )
}

export default BlogsManagement
