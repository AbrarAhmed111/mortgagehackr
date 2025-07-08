'use client'
import { useState, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { FiPlus } from 'react-icons/fi'
import ProfileIcon from '@/assets/Images/image.png'
import { AddBlogModal } from '@/components/AdminComponents/Modals/AddBlogModal'
import { DeleteBlogModal } from '@/components/AdminComponents/Modals/DeleteBlogModal'
import { blogsApi } from '@/utils/api'
import toast from 'react-hot-toast'
import { DataTableSkeleton } from '@/components/AdminComponents/Skeleton/DataTableSkeleton'
import { Blog, BlogsColumn } from '@/utils/types'

const BlogsManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const itemsPerPage = 8

  useEffect(() => {
    getBlogs()
  }, [currentPage])

  const getBlogs = async (refresh = false) => {
    setLoading(true)
    try {
      const response = refresh
        ? await blogsApi.refreshBlogs({ page: currentPage, limit: itemsPerPage })
        : await blogsApi.getBlogs({ page: currentPage, limit: itemsPerPage })
      const blogsData = response.data
      const transformedBlogs: Blog[] = blogsData?.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        content: blog.content || [],
        profileImage: blog.profile_image || ProfileIcon,
        publishDate: blog.created_at || new Date().toISOString(),
      }))
      setBlogs(transformedBlogs)
      setTotalCount(response.pagination?.total || 0)
    } catch (error) {
      console.error('Error loading blogs:', error)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const columns: BlogsColumn<Blog>[] = [
    {
      header: 'Image',
      accessor: 'profileImage',
      isImage: true,
      imageWidth: 40,
      imageHeight: 40,
    },
    { header: 'Title', accessor: 'title' },
    {
      header: 'Content',
      accessor: (blog: Blog) => (
        <div className="text-sm text-gray-600 max-w-xs">
          {blog.content && blog.content.length > 0
            ? blog.content[0]?.description
              ? `${blog.content[0].description.substring(0, 100)}${blog.content[0].description.length > 100 ? '...' : ''}`
              : 'No content'
            : 'No content'}
        </div>
      ),
    },
    {
      header: 'Publish Date',
      accessor: (blog: Blog) => (
        <span className="text-sm text-gray-600">
          {new Date(blog.publishDate).toLocaleDateString()}
        </span>
      ),
    },
  ]

  // Handlers
  const handleAdd = async () => {
    setIsAddModalOpen(false)
    setCurrentPage(1)
    await getBlogs()
  }

  const handleDelete = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSuccess = async () => {
    setIsDeleteModalOpen(false)
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    if (blogs.length === 1 && currentPage > 1 && currentPage === totalPages) {
      setCurrentPage(currentPage - 1)
    } else {
      await getBlogs(true)
    }
    toast.success('Blog deleted successfully')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
        <DataTableSkeleton
          columns={columns}
          itemsPerPage={10}
          showActions={!!handleDelete}
        />
      ) : blogs.length > 0 ? (
        <DataTable
          data={blogs}
          columns={columns}
          onDelete={handleDelete}
          itemsPerPage={itemsPerPage}
          serverSide={true}
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
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
