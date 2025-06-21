'use client'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export function DataTableSkeleton<T>({
  columns,
  itemsPerPage = 10,
  showActions = false,
}: {
  columns: Column<T>[]
  itemsPerPage?: number
  showActions?: boolean
}) {
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
              {showActions && (
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
            {Array.from({ length: itemsPerPage }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`h-4 bg-gray-200 rounded animate-pulse ${
                        column.isImage ? 'w-10 h-10 rounded-full' : 'w-3/4'
                      }`}
                    />
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Skeleton */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <div className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                <FiChevronLeft
                  className="h-5 w-5 text-gray-300"
                  aria-hidden="true"
                />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-300"
                >
                  {i + 1}
                </div>
              ))}
              <div className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500">
                <FiChevronRight
                  className="h-5 w-5 text-gray-300"
                  aria-hidden="true"
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

// Replicate the Column type from your original component
type Column<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  isImage?: boolean
  imageWidth?: number
  imageHeight?: number
}
