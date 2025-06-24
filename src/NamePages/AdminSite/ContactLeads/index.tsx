'use client'
import { useState, JSX, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import CSVExport from '@/components/AdminComponents/ExportCSV'
import { getContactLeads } from '@/lib/actions/contactLeads'
import { DataTableSkeleton } from '@/components/AdminComponents/Skeleton/DataTableSkeleton'
import { contactLeadCSVColumns } from '@/utils'

interface ContactLeads {
  name: string
  email: string
  message: string
  submitted_at: string
}

interface LeadsColumn<T> {
  header: string
  accessor: keyof T
  render?: (item: T) => JSX.Element
}

const ContactLeads: React.FC = () => {
  const [leads, setLeads] = useState<ContactLeads[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchLeads = async (page = 1) => {
    try {
      setLoading(true)
      const result = await getContactLeads(page, itemsPerPage)

      if (result.data) {
        setLeads(result.data)
        setTotal(result.total)
        setError('')
      } else {
        setError('Failed to load leads')
      }
    } catch (err) {
      setError('Failed to load leads')
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchLeads(page)
  }

  useEffect(() => {
    fetchLeads(currentPage)
  }, [currentPage])

  const columns: LeadsColumn<ContactLeads>[] = [
    {
      header: 'Name',
      accessor: 'name',
      render: lead => (
        <div className="font-medium text-gray-900">{lead.name}</div>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
      render: lead => (
        <span className="text-sm text-gray-600">{lead.email}</span>
      ),
    },
    {
      header: 'Message',
      accessor: 'message',
      render: lead => (
        <div
          className="max-w-xs truncate text-sm text-gray-600"
          title={lead.message}
        >
          {lead.message}
        </div>
      ),
    },
    {
      header: 'Submitted',
      accessor: 'submitted_at',
      render: lead => (
        <span className="text-sm text-gray-600">
          {new Date(lead.submitted_at).toLocaleDateString()}
        </span>
      ),
    },
  ]

  return (
    <div className="px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Leads Management</h1>
        <div className="flex items-center gap-3">
          <CSVExport
            columns={contactLeadCSVColumns}
            data={leads}
            filename="leads-export"
            buttonText="Export CSV"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && leads.length === 0 ? (
        <DataTableSkeleton columns={columns} itemsPerPage={10} />
      ) : leads.length > 0 ? (
        <DataTable
          data={leads}
          columns={columns}
          itemsPerPage={itemsPerPage}
          serverSide={true}
          currentPage={currentPage}
          totalCount={total}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No leads data available.</div>
        </div>
      )}
    </div>
  )
}

export default ContactLeads
