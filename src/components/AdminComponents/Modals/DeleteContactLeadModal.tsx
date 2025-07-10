'use client'
import { useState } from 'react'
import { contactLeadsApi } from '@/utils/api'
import { BiLoaderCircle } from 'react-icons/bi'

type ContactLead = {
  id: string
  name: string
  email: string
  message: string
  submitted_at: string
}

type DeleteContactLeadModalProps = {
  isOpen: boolean
  onClose: () => void
  onDeleteSuccess: () => void
  leadData: ContactLead | null
}

export function DeleteContactLeadModal({
  isOpen,
  onClose,
  onDeleteSuccess,
  leadData,
}: DeleteContactLeadModalProps) {
  if (!isOpen || !leadData) return null
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!leadData?.id) return
    setLoading(true)
    try {
      await contactLeadsApi.delete(leadData.id)
      onDeleteSuccess()
    } catch (error) {
      alert('Failed to delete contact lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Contact Lead</h2>
        <p className="mb-6">
          Are you sure you want to delete the lead from{' '}
          <strong>"{leadData.name}"</strong> ({leadData.email})?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <BiLoaderCircle className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
} 