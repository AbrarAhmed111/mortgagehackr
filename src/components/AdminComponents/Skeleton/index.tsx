import React from 'react'

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex space-x-2">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(item => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-200 animate-pulse">
                <div className="h-6 w-6"></div>
              </div>
            </div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid Skeleton - Now only 2 charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Offer Status Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="h-80 bg-gray-100 rounded-md animate-pulse"></div>
          <div className="space-y-2 mt-4">
            {[1, 2].map(item => (
              <div key={item} className="flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Leads by Source Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="h-80 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Top Offers Table Skeleton - Full width */}
      <div className="w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className="flex justify-between">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton
