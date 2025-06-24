import React, { useState } from 'react'
import { FiX, FiTrash2, FiAlertTriangle } from 'react-icons/fi'
import { deleteAnalyzerLead } from '@/lib/actions/analyzerLeads'
import { BiLoaderCircle } from 'react-icons/bi'

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

interface DeleteLeadModalProps {
  isOpen: boolean
  lead: Lead | null
  onSuccess: () => void
  onCancel: () => void
}

const DeleteLeadModal: React.FC<DeleteLeadModalProps> = ({
  isOpen,
  lead,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirmDelete = async () => {
    if (!lead) return

    setLoading(true)
    setError(null)

    try {
      const result = await deleteAnalyzerLead({ id: lead.id })

      if (result.error) {
        setError(result.error)
        return
      }

      if (result.success) {
        onSuccess()
      }
    } catch (err) {
      setError('Failed to delete lead')
      console.error('Error deleting lead:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !lead) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Modal Content */}
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FiAlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Delete Lead
                  </h3>
                </div>
              </div>
              <button
                onClick={onCancel}
                disabled={loading}
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                {error && (
                  <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">
                    Are you sure you want to delete this lead? This action
                    cannot be undone.
                  </p>

                  {/* Lead Information */}
                  <div className="bg-gray-50 rounded-md p-4 space-y-2">
                    {lead.email && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Email:
                        </span>
                        <span className="text-sm text-gray-900">
                          {lead.email || 'N/A'}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        IP Address:
                      </span>
                      <span className="text-sm text-gray-900">
                        {lead.ip_address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Interest Rate:
                      </span>
                      <span className="text-sm text-gray-900">
                        {lead.interest_rate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Source:
                      </span>
                      <span className="text-sm text-gray-900">
                        {lead.source}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Submitted At:
                      </span>
                      <span className="text-sm text-gray-900">
                        {new Date(lead.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={loading}
              className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed sm:ml-3 sm:w-auto"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <BiLoaderCircle size={25} className="animate-spin" />
                  Deleting...
                </div>
              ) : (
                <>
                  <FiTrash2 className="h-4 w-4" />
                  Delete Lead
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteLeadModal
