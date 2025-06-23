'use client'
import { useState, JSX, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { FiFilter } from 'react-icons/fi'
import LeadsFilter from '@/components/AdminComponents/LeadsFIlter'
import CSVExport from '@/components/AdminComponents/ExportCSV'

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

const LeadsAnalyzer: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadsData)
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leadsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [sourceFilter, setSourceFilter] = useState<string>('All')
  const [dealResultFilter, setDealResultFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

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
          <CSVExport
            data={filteredLeads}
            filename="leads-export"
            buttonText="Export CSV"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Filters Panel */}
        {showFilters && (
          <LeadsFilter
            leads={leads}
            statusFilter={statusFilter}
            sourceFilter={sourceFilter}
            dealResultFilter={dealResultFilter}
            onStatusFilterChange={setStatusFilter}
            onSourceFilterChange={setSourceFilter}
            onDealResultFilterChange={setDealResultFilter}
            onClearFilters={clearFilters}
          />
        )}
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredLeads}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
      />
    </div>
  )
}

export default LeadsAnalyzer
