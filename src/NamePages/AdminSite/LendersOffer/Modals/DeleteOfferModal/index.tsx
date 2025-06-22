import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { FiX, FiAlertTriangle } from 'react-icons/fi'

type LenderOffer = {
  id: string
  lender_name: string
  interest_rate: number
  apr: number
  loan_term: number
  eligibility_criteria?: string
  cta_link: string
  expiration_date: string
  status: boolean
  click_count?: number
}

type DeleteOfferModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: (offerId: string) => void
  offer: LenderOffer | null
}

export function DeleteOfferModal({
  isOpen,
  onClose,
  onDelete,
  offer,
}: DeleteOfferModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!offer) return

    setIsDeleting(true)

    try {
      await onDelete(offer.id)
      onClose()
    } catch (error) {
      console.error('Error deleting offer:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isOpen || !offer) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">Delete Offer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="flex items-center mb-4">
          <FiAlertTriangle className="text-red-500 text-2xl mr-3" />
          <div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this offer?
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Offer Details:</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Lender:</span> {offer.lender_name}
            </p>
            <p>
              <span className="font-medium">Interest Rate:</span>{' '}
              {offer.interest_rate}%
            </p>
            <p>
              <span className="font-medium">APR:</span> {offer.apr}%
            </p>
            <p>
              <span className="font-medium">Loan Term:</span> {offer.loan_term}{' '}
              months
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              {offer.status ? 'Active' : 'Inactive'}
            </p>
            {offer.click_count !== undefined && (
              <p>
                <span className="font-medium">Total Clicks:</span>{' '}
                {offer.click_count}
              </p>
            )}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-red-800">
            <span className="font-medium">Warning:</span> This action cannot be
            undone. All data associated with this offer will be permanently
            deleted.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <BiLoaderCircle size={24} className="animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              'Delete Offer'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
