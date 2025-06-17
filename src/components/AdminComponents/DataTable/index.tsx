'use client'
import { useState } from 'react'
import {
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import Image from 'next/image'

type Column<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  isImage?: boolean
  imageWidth?: number
  imageHeight?: number
}

type TableProps<T> = {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  // Server-side pagination props
  serverSide?: boolean
  currentPage?: number
  totalCount?: number
  onPageChange?: (page: number) => void
}

export function DataTable<T>({
  data,
  columns,
  itemsPerPage = 10,
  onEdit,
  onDelete,
  // Server-side pagination props
  serverSide = false,
  currentPage = 1,
  totalCount = 0,
  onPageChange,
}: TableProps<T>) {
  const [localCurrentPage, setLocalCurrentPage] = useState(1)

  // Use server-side pagination if enabled, otherwise use client-side
  const activePage = serverSide ? currentPage : localCurrentPage
  const activeItemsPerPage = itemsPerPage

  let totalPages: number
  let currentItems: T[]
  let startIndex: number
  let endIndex: number
  let totalItems: number

  if (serverSide) {
    // Server-side pagination
    totalPages = Math.ceil(totalCount / activeItemsPerPage)
    currentItems = data // Data is already paginated from server
    startIndex = (activePage - 1) * activeItemsPerPage
    endIndex = Math.min(startIndex + activeItemsPerPage, totalCount)
    totalItems = totalCount
  } else {
    // Client-side pagination
    totalPages = Math.ceil(data.length / activeItemsPerPage)
    startIndex = (activePage - 1) * activeItemsPerPage
    endIndex = startIndex + activeItemsPerPage
    currentItems = data.slice(startIndex, endIndex)
    totalItems = data.length
  }

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages))

    if (serverSide && onPageChange) {
      onPageChange(newPage)
    } else {
      setLocalCurrentPage(newPage)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto min-h-[40vh]">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.isImage && typeof column.accessor === 'string' ? (
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          src={item[column.accessor] as string}
                          alt=""
                          width={column.imageWidth || 50}
                          height={column.imageHeight || 50}
                          className="rounded-full w-14 h-10 object-cover"
                        />
                      </div>
                    ) : typeof column.accessor === 'function' ? (
                      column.accessor(item)
                    ) : (
                      <div className="text-sm text-gray-900">
                        {item[column.accessor] as React.ReactNode}
                      </div>
                    )}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="text-[#8cc63f] hover:text-white hover:cursor-pointer hover:bg-[#8cc63f]/50 px-2 py-1.5 rounded-lg"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="text-red-600 hover:text-white hover:cursor-pointer hover:bg-red-300 px-2 py-1.5 rounded-lg"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(activePage - 1)}
                  disabled={activePage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        activePage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-[#8cc63f]'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() => goToPage(activePage + 1)}
                  disabled={activePage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
