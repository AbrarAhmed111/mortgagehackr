import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

type StatusDropdownProps = {
  currentStatus: boolean
  offerId: string
  onStatusChange: (offerId: string, newStatus: 'active' | 'inactive') => void
}

export function StatusDropdown({
  currentStatus,
  offerId,
  onStatusChange,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus: 'active' | 'inactive') => {
    setIsUpdating(true)
    try {
      await onStatusChange(offerId, newStatus)
      setIsOpen(false)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const statusText = currentStatus ? 'Active' : 'Inactive'
  const statusColor = currentStatus
    ? 'text-green-600 bg-green-100'
    : 'text-red-600 bg-red-100'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColor} hover:opacity-80 disabled:opacity-50`}
      >
        {isUpdating ? 'Updating...' : statusText}
        <FiChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1 flex flex-col">
            {' '}
            {/* Added flex-col here */}
            <button
              onClick={() => handleStatusChange('active')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentStatus ? 'text-gray-400' : 'text-gray-700'
              }`}
              disabled={currentStatus}
            >
              Active
            </button>
            <button
              onClick={() => handleStatusChange('inactive')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                !currentStatus ? 'text-gray-400' : 'text-gray-700'
              }`}
              disabled={!currentStatus}
            >
              Inactive
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
