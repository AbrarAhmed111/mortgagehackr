'use client'
import { useState, JSX, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { FiDownload, FiFilter, FiX } from 'react-icons/fi'

// Lead type definition
interface Lead {
  id: string
  name: string
  email?: string
  phone: string
  source: string
  dealAnalyzerResult?: 'Great' | 'Fair' | 'Poor'
  propertyAddress?: string
  estimatedValue?: number
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
  createdAt: string
  lastContact?: string
}

interface LeadsColumn<T> {
  header: string
  accessor: keyof T
  render?: (item: T) => JSX.Element
}

// Dummy leads data
const leadsData: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    source: 'Deal Analyzer',
    dealAnalyzerResult: 'Great',
    propertyAddress: '123 Main St, Austin, TX',
    estimatedValue: 450000,
    status: 'New',
    createdAt: '2024-01-15T10:30:00Z',
    lastContact: '2024-01-16T14:20:00Z',
  },
  {
    id: '2',
    name: 'Mike Wilson',
    email: 'mike.wilson@yahoo.com',
    phone: '+1 (555) 345-6789',
    source: 'Deal Analyzer',
    dealAnalyzerResult: 'Fair',
    propertyAddress: '456 Oak Ave, Dallas, TX',
    estimatedValue: 320000,
    status: 'Qualified',
    createdAt: '2024-01-13T16:45:00Z',
    lastContact: '2024-01-17T10:30:00Z',
  },
  {
    id: '3',
    name: 'Robert Brown',
    email: 'r.brown@hotmail.com',
    phone: '+1 (555) 567-8901',
    source: 'Deal Analyzer',
    dealAnalyzerResult: 'Poor',
    propertyAddress: '789 Pine St, Houston, TX',
    estimatedValue: 180000,
    status: 'Lost',
    createdAt: '2024-01-11T08:30:00Z',
    lastContact: '2024-01-12T15:15:00Z',
  },
  {
    id: '4',
    name: 'David Martinez',
    email: 'david.m@gmail.com',
    phone: '+1 (555) 789-0123',
    source: 'Deal Analyzer',
    dealAnalyzerResult: 'Great',
    propertyAddress: '321 Elm St, San Antonio, TX',
    estimatedValue: 520000,
    status: 'Qualified',
    createdAt: '2024-01-09T11:15:00Z',
    lastContact: '2024-01-16T16:45:00Z',
  },
]

const LeadsManagement: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadsData)
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leadsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [sourceFilter, setSourceFilter] = useState<string>('All')
  const [dealResultFilter, setDealResultFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for filter options
  const uniqueStatuses = Array.from(new Set(leads.map(lead => lead.status)))
  const uniqueSources = Array.from(new Set(leads.map(lead => lead.source)))
  const uniqueDealResults = Array.from(
    new Set(leads.map(lead => lead.dealAnalyzerResult).filter(Boolean)),
  )

  // Filter leads based on search and filters
  const filterLeads = () => {
    let filtered = leads

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.phone.includes(searchTerm) ||
          lead.propertyAddress
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    // Source filter
    if (sourceFilter !== 'All') {
      filtered = filtered.filter(lead => lead.source === sourceFilter)
    }

    // Deal result filter
    if (dealResultFilter !== 'All') {
      filtered = filtered.filter(
        lead => lead.dealAnalyzerResult === dealResultFilter,
      )
    }

    setFilteredLeads(filtered)
  }

  // Apply filters whenever search term or filters change
  useEffect(() => {
    filterLeads()
  }, [searchTerm, statusFilter, sourceFilter, dealResultFilter])

  const columns: LeadsColumn<Lead>[] = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">{lead.email || 'N/A'}</span>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Source',
      accessor: 'source',
      render: (lead: Lead) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            lead.source === 'Deal Analyzer'
              ? 'bg-blue-100 text-blue-800'
              : lead.source === 'Website Contact'
                ? 'bg-green-100 text-green-800'
                : lead.source === 'Referral'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
          }`}
        >
          {lead.source}
        </span>
      ),
    },
    {
      header: 'Deal Result',
      accessor: 'dealAnalyzerResult',
      render: (lead: Lead) => (
        <span>
          {lead.dealAnalyzerResult ? (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                lead.dealAnalyzerResult === 'Great'
                  ? 'bg-green-100 text-green-800'
                  : lead.dealAnalyzerResult === 'Fair'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {lead.dealAnalyzerResult}
            </span>
          ) : (
            <span className="text-sm text-gray-400">N/A</span>
          )}
        </span>
      ),
    },
    {
      header: 'Property Value',
      accessor: 'estimatedValue',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">
          {lead.estimatedValue
            ? `$${lead.estimatedValue.toLocaleString()}`
            : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (lead: Lead) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            lead.status === 'New'
              ? 'bg-blue-100 text-blue-800'
              : lead.status === 'Contacted'
                ? 'bg-yellow-100 text-yellow-800'
                : lead.status === 'Qualified'
                  ? 'bg-purple-100 text-purple-800'
                  : lead.status === 'Converted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
          }`}
        >
          {lead.status}
        </span>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">
          {new Date(lead.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ]

  const handleEdit = (lead: Lead) => {
    console.log('Edit lead:', lead)
    // Implement edit functionality
  }

  const handleDelete = (lead: Lead) => {
    console.log('Delete lead:', lead)
    // Implement delete functionality
  }

  const handleSelection = (selected: Lead[]) => {
    console.log('Selected leads:', selected)
  }

  const exportLeads = () => {
    const csvContent = [
      // CSV Headers
      [
        'Name',
        'Email',
        'Phone',
        'Source',
        'Deal Result',
        'Property Address',
        'Estimated Value',
        'Status',
        'Created Date',
        'Last Contact',
      ].join(','),
      // CSV Data
      ...filteredLeads.map(lead =>
        [
          lead.name,
          lead.email || '',
          lead.phone,
          lead.source,
          lead.dealAnalyzerResult || '',
          lead.propertyAddress || '',
          lead.estimatedValue || '',
          lead.status,
          new Date(lead.createdAt).toLocaleDateString(),
          lead.lastContact
            ? new Date(lead.lastContact).toLocaleDateString()
            : '',
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setSourceFilter('All')
    setDealResultFilter('All')
  }

  return (
    <div className="px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Leads Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FiFilter className="text-lg" />
            Filters
          </button>
          <button
            onClick={exportLeads}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FiDownload className="text-lg" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
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
                  value={sourceFilter}
                  onChange={e => setSourceFilter(e.target.value)}
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
                  Deal Result
                </label>
                <select
                  value={dealResultFilter}
                  onChange={e => setDealResultFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Results</option>
                  {uniqueDealResults.map(result => (
                    <option key={result} value={result}>
                      {result}
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
      </div>
      {/* Data Table */}
      <DataTable
        data={filteredLeads}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelection}
        itemsPerPage={10}
      />
    </div>
  )
}

export default LeadsManagement
