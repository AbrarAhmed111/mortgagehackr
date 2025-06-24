'use client'
import { useState, JSX, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { FiFilter } from 'react-icons/fi'
import { getAnalyzerDealsList } from '@/lib/actions/analyzerLeads'
import LeadsFilter from './Filter'
import DeleteLeadModal from './Modal'
import CSVExport from '@/components/AdminComponents/ExportCSV'
import { CSVColumn, leadAnalyzerCSVColumns } from '@/utils'
import { DataTableSkeleton } from '@/components/AdminComponents/Skeleton/DataTableSkeleton'
import { DealResultType, DealSourceType } from '@/lib/database.types'

// Lead type definition
interface Lead {
  id: string
  email?: string
  interest_rate: string
  source: string
  ip_address?: string
  loan_amount?: number
  loan_start_month: number
  loan_start_year: number
  loan_term: number
  result_type: string
  submitted_at: Date
}

interface LeadsColumn<T> {
  header: string
  accessor: keyof T
  render?: (item: T) => JSX.Element
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

const LeadsAnalyzer: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  })

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [sourceFilter, setSourceFilter] = useState<string>('All')
  const [dealResultFilter, setDealResultFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch leads from Supabase
  const fetchLeads = async (page: number = 1) => {
    setLoading(true)
    setError(null)

    try {
      const result = await getAnalyzerDealsList({
        page,
        limit: pagination.limit,
        result_type:
          dealResultFilter !== 'All'
            ? (dealResultFilter as DealResultType)
            : undefined,
        source:
          sourceFilter !== 'All' ? (sourceFilter as DealSourceType) : undefined,
      })
      console.log('result', result)
      if (result.error) {
        setError(result.error)
        return
      }

      if (result.success && result.data) {
        setLeads(result.data)
        setFilteredLeads(result.data)
        setPagination({
          ...pagination,
          page: result.pagination.page,
          total: result.pagination.total,
          totalPages: Math.ceil(result.pagination.total / pagination.limit),
        })
      }
    } catch (err) {
      setError('Failed to fetch leads')
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    fetchLeads(1)
  }, [sourceFilter, dealResultFilter])

  const filterLeads = () => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(
        lead =>
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.ip_address?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredLeads(filtered)
  }

  // Apply client-side filters
  useEffect(() => {
    filterLeads()
  }, [searchTerm, statusFilter, leads])

  const columns: LeadsColumn<Lead>[] = [
    {
      header: 'IP Address',
      accessor: 'ip_address',
      render: (lead: Lead) => <span>{lead.ip_address}</span>,
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">{lead.email || 'N/A'}</span>
      ),
    },
    {
      header: 'Interest Rate',
      accessor: 'interest_rate',
      render: (lead: Lead) => <span>{lead.interest_rate}</span>,
    },
    {
      header: 'Loan Amount',
      accessor: 'loan_amount',
      render: (lead: Lead) => <span>{lead.loan_amount}</span>,
    },
    {
      header: 'Loan Start Year',
      accessor: 'loan_start_year',
      render: (lead: Lead) => <span>{lead.loan_start_year}</span>,
    },
    {
      header: 'Loan Start Month',
      accessor: 'loan_start_month',
      render: (lead: Lead) => <span>{lead.loan_start_month}</span>,
    },
    {
      header: 'Loan Term',
      accessor: 'loan_term',
      render: (lead: Lead) => <span>{lead.loan_term}</span>,
    },
    {
      header: 'Type',
      accessor: 'result_type',
      render: (lead: Lead) => <span>{lead.result_type}</span>,
    },
    {
      header: 'Source',
      accessor: 'source',
      render: (lead: Lead) => <span>{lead.source}</span>,
    },

    {
      header: 'Submitted At',
      accessor: 'submitted_at',
      render: (lead: Lead) => (
        <span className="text-sm text-gray-600">
          {new Date(lead.submitted_at).toLocaleDateString()}
        </span>
      ),
    },
  ]

  const handleDelete = (lead: Lead) => {
    setLeadToDelete(lead)
    setShowDeleteModal(true)
  }

  const handleDeleteSuccess = () => {
    setLeads(prev => prev.filter(lead => lead.id !== leadToDelete?.id))
    setShowDeleteModal(false)
    setLeadToDelete(null)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    setSourceFilter('All')
    setDealResultFilter('All')
  }

  const handlePageChange = (newPage: number) => {
    fetchLeads(newPage)
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
          <CSVExport<Lead>
            columns={leadAnalyzerCSVColumns as CSVColumn<Lead>[]}
            data={filteredLeads}
            filename="leads-export"
            buttonText="Export CSV"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Filters Panel */}
        {showFilters && (
          <LeadsFilter
            searchTerm={searchTerm}
            sourceFilter={sourceFilter}
            dealResultFilter={dealResultFilter}
            onSearchTermChange={setSearchTerm}
            onSourceFilterChange={setSourceFilter}
            onDealResultFilterChange={setDealResultFilter}
            onClearFilters={clearFilters}
            loading={loading}
          />
        )}
      </div>

      {/* Data Table */}
      {loading ? (
        <DataTableSkeleton
          columns={columns}
          itemsPerPage={10}
          showActions={!!handleDelete}
        />
      ) : filteredLeads.length > 0 ? (
        <DataTable
          data={filteredLeads}
          columns={columns}
          onDelete={handleDelete}
          itemsPerPage={pagination.limit}
          // Server-side pagination props
          serverSide={true}
          currentPage={pagination.page}
          totalCount={pagination.total}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No Leads data available.</div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteLeadModal
        isOpen={showDeleteModal}
        lead={leadToDelete}
        onSuccess={handleDeleteSuccess}
        onCancel={() => {
          setShowDeleteModal(false)
          setLeadToDelete(null)
        }}
      />
    </div>
  )
}

export default LeadsAnalyzer
