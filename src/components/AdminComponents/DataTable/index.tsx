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
  onSelect?: (selectedItems: T[]) => void
}

export function DataTable<T>({
  data,
  columns,
  itemsPerPage = 10,
  onEdit,
  onDelete,
  onSelect,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = data.slice(startIndex, endIndex)
  const toggleSelect = (item: T) => {
    const newSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter(selected => selected !== item)
      : [...selectedItems, item]
    setSelectedItems(newSelectedItems)
    onSelect?.(newSelectedItems)
  }

  const toggleSelectAll = () => {
    const newSelectedItems =
      selectedItems.length === currentItems.length ? [] : [...currentItems]
    setSelectedItems(newSelectedItems)
    onSelect?.(newSelectedItems)
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-[800px] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {onSelect && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === currentItems.length &&
                    currentItems.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
            )}
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
            <tr
              key={rowIndex}
              className={selectedItems.includes(item) ? 'bg-blue-50' : ''}
            >
              {onSelect && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleSelect(item)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.isImage && typeof column.accessor === 'string' ? (
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image
                        src={item[column.accessor] as string}
                        alt=""
                        width={column.imageWidth || 40}
                        height={column.imageHeight || 40}
                        className="rounded-full"
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
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(endIndex, data.length)}
                </span>{' '}
                of <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex  items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
