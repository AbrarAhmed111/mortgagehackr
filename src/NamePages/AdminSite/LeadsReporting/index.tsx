'use client'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { leadAttributionData } from '@/constants'
import { AttributionColumn, LeadAttribution } from '@/utils/types'
import { useState, useEffect } from 'react'
import { FiDownload, FiFilter, FiX } from 'react-icons/fi'

const LeadsReporting: React.FC = () => {
  const [attributions, setAttributions] =
    useState<LeadAttribution[]>(leadAttributionData)
  const [filteredAttributions, setFilteredAttributions] =
    useState<LeadAttribution[]>(leadAttributionData)

  const [selectedDateRange, setSelectedDateRange] = useState<string>('all')
  const [selectedLender, setSelectedLender] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedSource, setSelectedSource] = useState<string>('All')
  const [selectedDevice, setSelectedDevice] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for filters
  const uniqueLenders = Array.from(
    new Set(attributions.map(attr => attr.lenderName)),
  )
  const uniqueStatuses = Array.from(
    new Set(attributions.map(attr => attr.conversionStatus)),
  )
  const uniqueSources = Array.from(
    new Set(attributions.map(attr => attr.leadSource)),
  )
  const uniqueDevices = Array.from(
    new Set(attributions.map(attr => attr.deviceType)),
  )

  // Apply filters
  const applyFilters = () => {
    let filtered = attributions

    // Date range filter
    if (selectedDateRange !== 'all') {
      const days =
        selectedDateRange === '7days'
          ? 7
          : selectedDateRange === '30days'
            ? 30
            : 90
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)

      filtered = filtered.filter(attr => new Date(attr.clickDate) >= cutoffDate)
    }

    // Other filters
    if (selectedLender !== 'All') {
      filtered = filtered.filter(attr => attr.lenderName === selectedLender)
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(
        attr => attr.conversionStatus === selectedStatus,
      )
    }
    if (selectedSource !== 'All') {
      filtered = filtered.filter(attr => attr.leadSource === selectedSource)
    }
    if (selectedDevice !== 'All') {
      filtered = filtered.filter(attr => attr.deviceType === selectedDevice)
    }

    setFilteredAttributions(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [
    selectedDateRange,
    selectedLender,
    selectedStatus,
    selectedSource,
    selectedDevice,
    attributions,
  ])

  const columns: AttributionColumn<LeadAttribution>[] = [
    {
      header: 'Date & Time',
      accessor: 'clickDate',
      render: (attr: LeadAttribution) => {
        const date = new Date(attr.clickDate)
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        return (
          <div className="text-sm">
            <div className="font-medium">{formattedDate}</div>
            <div className="text-gray-500">{attr.clickTime}</div>
          </div>
        )
      },
    },
    {
      header: 'Lender',
      accessor: 'lenderName',
      render: (attr: LeadAttribution) => (
        <div className="text-sm">
          <div className="font-medium">{attr.lenderName}</div>
          <div className="text-gray-500">ID: {attr.lenderOfferId}</div>
        </div>
      ),
    },
    {
      header: 'Source',
      accessor: 'leadSource',
      render: (attr: LeadAttribution) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            attr.leadSource === 'Deal Analyzer'
              ? 'bg-blue-100 text-blue-800'
              : attr.leadSource === 'Lender Comparison'
                ? 'bg-green-100 text-green-800'
                : attr.leadSource === 'Organic Search'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
          }`}
        >
          {attr.leadSource}
        </span>
      ),
    },
    {
      header: 'Device',
      accessor: 'deviceType',
      render: (attr: LeadAttribution) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            attr.deviceType === 'Desktop'
              ? 'bg-purple-100 text-purple-800'
              : attr.deviceType === 'Mobile'
                ? 'bg-pink-100 text-pink-800'
                : 'bg-indigo-100 text-indigo-800'
          }`}
        >
          {attr.deviceType}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'conversionStatus',
      render: (attr: LeadAttribution) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            attr.conversionStatus === 'Converted'
              ? 'bg-green-100 text-green-800'
              : attr.conversionStatus === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {attr.conversionStatus}
        </span>
      ),
    },
    {
      header: 'Lead Value',
      accessor: 'leadValue',
      render: (attr: LeadAttribution) => (
        <span className="text-sm font-medium">
          {attr.leadValue ? `$${attr.leadValue.toLocaleString()}` : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (attr: LeadAttribution) => (
        <span className="text-sm text-gray-600">
          {attr.location || 'Unknown'}
        </span>
      ),
    },
    {
      header: 'Contact Info',
      accessor: 'leadEmail',
      render: (attr: LeadAttribution) => (
        <div className="text-xs">
          {attr.leadEmail && (
            <div className="text-gray-600">{attr.leadEmail}</div>
          )}
          {attr.leadPhone && (
            <div className="text-gray-600">{attr.leadPhone}</div>
          )}
          {!attr.leadEmail && !attr.leadPhone && (
            <span className="text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
  ]

  const handleEdit = (attribution: LeadAttribution) => {
    console.log('Edit attribution:', attribution)
  }

  const handleDelete = (attribution: LeadAttribution) => {
    console.log('Delete attribution:', attribution)
  }

  const handleSelection = (selected: LeadAttribution[]) => {
    console.log('Selected attributions:', selected)
  }

  const clearFilters = () => {
    setSelectedDateRange('7days')
    setSelectedLender('All')
    setSelectedStatus('All')
    setSelectedSource('All')
    setSelectedDevice('All')
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lead Attribution Reporting</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FiFilter className="text-lg" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <FiDownload className="text-lg" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={selectedDateRange}
                onChange={e => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lender
              </label>
              <select
                value={selectedLender}
                onChange={e => setSelectedLender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Lenders</option>
                {uniqueLenders.map(lender => (
                  <option key={lender} value={lender}>
                    {lender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <select
                value={selectedSource}
                onChange={e => setSelectedSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Sources</option>
                {uniqueSources.map(source => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Device
              </label>
              <select
                value={selectedDevice}
                onChange={e => setSelectedDevice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Devices</option>
                {uniqueDevices.map(device => (
                  <option key={device} value={device}>
                    {device}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FiX className="text-lg" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        data={filteredAttributions}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelection}
        itemsPerPage={8}
      />
    </div>
  )
}

export default LeadsReporting
