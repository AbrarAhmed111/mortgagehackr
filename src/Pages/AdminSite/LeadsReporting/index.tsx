// 'use client'
// import { leadAttributionData } from '@/constants'
// import {
//   AnalyticsSummary,
//   AttributionColumn,
//   DataTableProps,
//   LeadAttribution,
// } from '@/utils/types'
// import { useState, useEffect, JSX } from 'react'
// import {
//   FiDownload,
//   FiTrendingUp,
//   FiUsers,
//   FiMousePointer,
//   FiDollarSign,
//   FiFilter,
//   FiX,
//   FiEdit,
//   FiTrash2,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi'

// // Lead Attribution data types

// function DataTable<T extends { id: string }>({
//   data,
//   columns,
//   onEdit,
//   onDelete,
//   onSelect,
//   itemsPerPage,
// }: DataTableProps<T>) {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

//   const totalPages = Math.ceil(data.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const currentData = data.slice(startIndex, endIndex)

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       const allIds = new Set(currentData.map(item => item.id))
//       setSelectedItems(allIds)
//       onSelect(currentData)
//     } else {
//       setSelectedItems(new Set())
//       onSelect([])
//     }
//   }

//   const handleSelectItem = (id: string, checked: boolean) => {
//     const newSelected = new Set(selectedItems)
//     if (checked) {
//       newSelected.add(id)
//     } else {
//       newSelected.delete(id)
//     }
//     setSelectedItems(newSelected)

//     const selectedData = data.filter(item => newSelected.has(item.id))
//     onSelect(selectedData)
//   }

//   const isAllSelected =
//     currentData.length > 0 &&
//     currentData.every(item => selectedItems.has(item.id))
//   const isIndeterminate =
//     currentData.some(item => selectedItems.has(item.id)) && !isAllSelected

//   return (
//     <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="px-4 py-3 text-left">
//                 <input
//                   type="checkbox"
//                   checked={isAllSelected}
//                   ref={el => {
//                     if (el) el.indeterminate = isIndeterminate
//                   }}
//                   onChange={e => handleSelectAll(e.target.checked)}
//                   className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//               </th>
//               {columns.map((column, index) => (
//                 <th
//                   key={index}
//                   className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {column.header}
//                 </th>
//               ))}
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentData.map((item, index) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.has(item.id)}
//                     onChange={e => handleSelectItem(item.id, e.target.checked)}
//                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                 </td>
//                 {columns.map((column, colIndex) => (
//                   <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
//                     {column.render
//                       ? column.render(item)
//                       : String(item[column.accessor])}
//                   </td>
//                 ))}
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => onEdit(item)}
//                       className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
//                       title="Edit"
//                     >
//                       <FiEdit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => onDelete(item)}
//                       className="p-1 text-gray-400 hover:text-red-600 transition-colors"
//                       title="Delete"
//                     >
//                       <FiTrash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{' '}
//             {data.length} results
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FiChevronLeft className="w-4 h-4" />
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage(prev => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FiChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Dummy lead attribution data

// export function LeadsReporting() {
//   const [attributions, setAttributions] =
//     useState<LeadAttribution[]>(leadAttributionData)
//   const [filteredAttributions, setFilteredAttributions] =
//     useState<LeadAttribution[]>(leadAttributionData)
//   const [selectedDateRange, setSelectedDateRange] = useState<string>('7days')
//   const [selectedLender, setSelectedLender] = useState<string>('All')
//   const [selectedStatus, setSelectedStatus] = useState<string>('All')
//   const [selectedSource, setSelectedSource] = useState<string>('All')
//   const [selectedDevice, setSelectedDevice] = useState<string>('All')
//   const [showFilters, setShowFilters] = useState(false)

//   // Get unique values for filters
//   const uniqueLenders = Array.from(
//     new Set(attributions.map(attr => attr.lenderName)),
//   )
//   const uniqueStatuses = Array.from(
//     new Set(attributions.map(attr => attr.conversionStatus)),
//   )
//   const uniqueSources = Array.from(
//     new Set(attributions.map(attr => attr.leadSource)),
//   )
//   const uniqueDevices = Array.from(
//     new Set(attributions.map(attr => attr.deviceType)),
//   )

//   // Calculate analytics summary
//   const calculateAnalytics = (data: LeadAttribution[]): AnalyticsSummary => {
//     const totalClicks = data.length
//     const conversions = data.filter(
//       attr => attr.conversionStatus === 'Converted',
//     )
//     const totalConversions = conversions.length
//     const conversionRate =
//       totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0
//     const totalRevenue = conversions.reduce(
//       (sum, attr) => sum + (attr.leadValue || 0),
//       0,
//     )
//     const averageLeadValue =
//       totalConversions > 0 ? totalRevenue / totalConversions : 0

//     // Find top performing lender
//     const lenderStats = uniqueLenders.map(lender => {
//       const lenderData = data.filter(attr => attr.lenderName === lender)
//       const lenderConversions = lenderData.filter(
//         attr => attr.conversionStatus === 'Converted',
//       ).length
//       return { lender, conversions: lenderConversions }
//     })
//     const topPerformingLender = lenderStats.reduce(
//       (max, current) => (current.conversions > max.conversions ? current : max),
//       { lender: 'N/A', conversions: 0 },
//     ).lender

//     return {
//       totalClicks,
//       totalConversions,
//       conversionRate,
//       totalRevenue,
//       averageLeadValue,
//       topPerformingLender,
//     }
//   }

//   // Apply filters
//   const applyFilters = () => {
//     let filtered = attributions

//     // Date range filter
//     if (selectedDateRange !== 'all') {
//       const days =
//         selectedDateRange === '7days'
//           ? 7
//           : selectedDateRange === '30days'
//             ? 30
//             : 90
//       const cutoffDate = new Date()
//       cutoffDate.setDate(cutoffDate.getDate() - days)

//       filtered = filtered.filter(attr => new Date(attr.clickDate) >= cutoffDate)
//     }

//     // Other filters
//     if (selectedLender !== 'All') {
//       filtered = filtered.filter(attr => attr.lenderName === selectedLender)
//     }
//     if (selectedStatus !== 'All') {
//       filtered = filtered.filter(
//         attr => attr.conversionStatus === selectedStatus,
//       )
//     }
//     if (selectedSource !== 'All') {
//       filtered = filtered.filter(attr => attr.leadSource === selectedSource)
//     }
//     if (selectedDevice !== 'All') {
//       filtered = filtered.filter(attr => attr.deviceType === selectedDevice)
//     }

//     setFilteredAttributions(filtered)
//   }

//   // Apply filters when dependencies change - FIXED: Using useEffect instead of useState
//   useEffect(() => {
//     applyFilters()
//   }, [
//     selectedDateRange,
//     selectedLender,
//     selectedStatus,
//     selectedSource,
//     selectedDevice,
//     attributions,
//   ])

//   const analytics = calculateAnalytics(filteredAttributions)

//   const columns: AttributionColumn<LeadAttribution>[] = [
//     {
//       header: 'Date & Time',
//       accessor: 'clickDate',
//       render: (attr: LeadAttribution) => (
//         <div className="text-sm">
//           <div className="font-medium">
//             {new Date(attr.clickDate).toLocaleDateString()}
//           </div>
//           <div className="text-gray-500">{attr.clickTime}</div>
//         </div>
//       ),
//     },
//     {
//       header: 'Lender',
//       accessor: 'lenderName',
//       render: (attr: LeadAttribution) => (
//         <div className="text-sm">
//           <div className="font-medium">{attr.lenderName}</div>
//           <div className="text-gray-500">ID: {attr.lenderOfferId}</div>
//         </div>
//       ),
//     },
//     {
//       header: 'Source',
//       accessor: 'leadSource',
//       render: (attr: LeadAttribution) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             attr.leadSource === 'Deal Analyzer'
//               ? 'bg-blue-100 text-blue-800'
//               : attr.leadSource === 'Lender Comparison'
//                 ? 'bg-green-100 text-green-800'
//                 : attr.leadSource === 'Organic Search'
//                   ? 'bg-yellow-100 text-yellow-800'
//                   : 'bg-gray-100 text-gray-800'
//           }`}
//         >
//           {attr.leadSource}
//         </span>
//       ),
//     },
//     {
//       header: 'Device',
//       accessor: 'deviceType',
//       render: (attr: LeadAttribution) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             attr.deviceType === 'Desktop'
//               ? 'bg-purple-100 text-purple-800'
//               : attr.deviceType === 'Mobile'
//                 ? 'bg-pink-100 text-pink-800'
//                 : 'bg-indigo-100 text-indigo-800'
//           }`}
//         >
//           {attr.deviceType}
//         </span>
//       ),
//     },
//     {
//       header: 'Status',
//       accessor: 'conversionStatus',
//       render: (attr: LeadAttribution) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-medium ${
//             attr.conversionStatus === 'Converted'
//               ? 'bg-green-100 text-green-800'
//               : attr.conversionStatus === 'Pending'
//                 ? 'bg-yellow-100 text-yellow-800'
//                 : 'bg-red-100 text-red-800'
//           }`}
//         >
//           {attr.conversionStatus}
//         </span>
//       ),
//     },
//     {
//       header: 'Lead Value',
//       accessor: 'leadValue',
//       render: (attr: LeadAttribution) => (
//         <span className="text-sm font-medium">
//           {attr.leadValue ? `$${attr.leadValue.toLocaleString()}` : 'N/A'}
//         </span>
//       ),
//     },
//     {
//       header: 'Location',
//       accessor: 'location',
//       render: (attr: LeadAttribution) => (
//         <span className="text-sm text-gray-600">
//           {attr.location || 'Unknown'}
//         </span>
//       ),
//     },
//     {
//       header: 'Contact Info',
//       accessor: 'leadEmail',
//       render: (attr: LeadAttribution) => (
//         <div className="text-xs">
//           {attr.leadEmail && (
//             <div className="text-gray-600">{attr.leadEmail}</div>
//           )}
//           {attr.leadPhone && (
//             <div className="text-gray-600">{attr.leadPhone}</div>
//           )}
//           {!attr.leadEmail && !attr.leadPhone && (
//             <span className="text-gray-400">N/A</span>
//           )}
//         </div>
//       ),
//     },
//   ]

//   const handleEdit = (attribution: LeadAttribution) => {
//     console.log('Edit attribution:', attribution)
//   }

//   const handleDelete = (attribution: LeadAttribution) => {
//     console.log('Delete attribution:', attribution)
//   }

//   const handleSelection = (selected: LeadAttribution[]) => {
//     console.log('Selected attributions:', selected)
//   }

//   const exportReport = () => {
//     const csvContent = [
//       // CSV Headers
//       [
//         'Date',
//         'Time',
//         'Lender Name',
//         'Lender ID',
//         'Lead Source',
//         'Device Type',
//         'Conversion Status',
//         'Lead Value',
//         'Lead Email',
//         'Lead Phone',
//         'Location',
//         'User IP',
//         'Referrer URL',
//         'Session ID',
//       ].join(','),
//       // CSV Data
//       ...filteredAttributions.map(attr =>
//         [
//           attr.clickDate,
//           attr.clickTime,
//           attr.lenderName,
//           attr.lenderOfferId,
//           attr.leadSource,
//           attr.deviceType,
//           attr.conversionStatus,
//           attr.leadValue || '',
//           attr.leadEmail || '',
//           attr.leadPhone || '',
//           attr.location || '',
//           attr.userIp,
//           attr.referrerUrl || '',
//           attr.sessionId,
//         ].join(','),
//       ),
//     ].join('\n')

//     const blob = new Blob([csvContent], { type: 'text/csv' })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = `lead-attribution-report-${new Date().toISOString().split('T')[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)
//   }

//   const clearFilters = () => {
//     setSelectedDateRange('7days')
//     setSelectedLender('All')
//     setSelectedStatus('All')
//     setSelectedSource('All')
//     setSelectedDevice('All')
//   }

//   return (
//     <div className="w-full px-4 py-8">
//       <div className="flex flex-row justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Lead Attribution Reporting</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//           >
//             <FiFilter className="text-lg" />
//             Filters
//           </button>
//           <button
//             onClick={exportReport}
//             className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           >
//             <FiDownload className="text-lg" />
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Analytics Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiMousePointer className="text-blue-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Total Clicks
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             {analytics.totalClicks}
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiUsers className="text-green-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Conversions
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             {analytics.totalConversions}
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiTrendingUp className="text-purple-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Conv. Rate
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             {analytics.conversionRate.toFixed(1)}%
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiDollarSign className="text-yellow-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Total Revenue
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             ${analytics.totalRevenue.toLocaleString()}
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiDollarSign className="text-orange-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Avg Lead Value
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-gray-900">
//             ${analytics.averageLeadValue.toFixed(0)}
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg border shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <FiTrendingUp className="text-red-600" />
//             <span className="text-sm font-medium text-gray-600">
//               Top Lender
//             </span>
//           </div>
//           <div className="text-sm font-bold text-gray-900 truncate">
//             {analytics.topPerformingLender}
//           </div>
//         </div>
//       </div>

//       {/* Filters Panel */}
//       {showFilters && (
//         <div className="bg-gray-50 p-4 rounded-lg border mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date Range
//               </label>
//               <select
//                 value={selectedDateRange}
//                 onChange={e => setSelectedDateRange(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="7days">Last 7 Days</option>
//                 <option value="30days">Last 30 Days</option>
//                 <option value="90days">Last 90 Days</option>
//                 <option value="all">All Time</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Lender
//               </label>
//               <select
//                 value={selectedLender}
//                 onChange={e => setSelectedLender(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="All">All Lenders</option>
//                 {uniqueLenders.map(lender => (
//                   <option key={lender} value={lender}>
//                     {lender}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 value={selectedStatus}
//                 onChange={e => setSelectedStatus(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="All">All Statuses</option>
//                 {uniqueStatuses.map(status => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Source
//               </label>
//               <select
//                 value={selectedSource}
//                 onChange={e => setSelectedSource(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="All">All Sources</option>
//                 {uniqueSources.map(source => (
//                   <option key={source} value={source}>
//                     {source}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Device
//               </label>
//               <select
//                 value={selectedDevice}
//                 onChange={e => setSelectedDevice(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="All">All Devices</option>
//                 {uniqueDevices.map(device => (
//                   <option key={device} value={device}>
//                     {device}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={clearFilters}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 <FiX className="text-lg" />
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Results Summary */}
//       <div className="mb-4 text-sm text-gray-600">
//         Showing {filteredAttributions.length} of {attributions.length}{' '}
//         attribution records
//       </div>

//       {/* Data Table */}
//       <DataTable
//         data={filteredAttributions}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onSelect={handleSelection}
//         itemsPerPage={10}
//       />
//     </div>
//   )
// }

import React from 'react'

const LeadsReporting = () => {
  return <div></div>
}

export default LeadsReporting
