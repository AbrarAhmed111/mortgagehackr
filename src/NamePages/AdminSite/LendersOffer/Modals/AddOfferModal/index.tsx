import { useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { FiX } from 'react-icons/fi'

type AddOfferModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (offerData: {
    lenderName: string
    interestRate: number
    apr: number
    loanTerm: number
    eligibilityCriteria?: string
    ctaLink: string
    expirationDate: string
    status: 'active' | 'inactive'
  }) => void
}

export function AddOfferModal({ isOpen, onClose, onAdd }: AddOfferModalProps) {
  const [formData, setFormData] = useState({
    lenderName: '',
    interestRate: '',
    apr: '',
    loanTerm: '',
    eligibilityCriteria: '',
    ctaLink: '',
    expirationDate: '',
    status: 'active' as 'active' | 'inactive',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      await onAdd({
        lenderName: formData.lenderName,
        interestRate: parseFloat(formData.interestRate),
        apr: parseFloat(formData.apr),
        loanTerm: parseInt(formData.loanTerm),
        eligibilityCriteria: formData.eligibilityCriteria || undefined,
        ctaLink: formData.ctaLink,
        expirationDate: formData.expirationDate,
        status: formData.status,
      })

      setFormData({
        lenderName: '',
        interestRate: '',
        apr: '',
        loanTerm: '',
        eligibilityCriteria: '',
        ctaLink: '',
        expirationDate: '',
        status: 'active',
      })
      onClose()
    } catch (error) {
      console.error('Error adding offer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Offer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lender Name *
            </label>
            <input
              type="text"
              name="lenderName"
              value={formData.lenderName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate (%) *
              </label>
              <input
                type="number"
                step="0.01"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                APR (%) *
              </label>
              <input
                type="number"
                step="0.01"
                name="apr"
                value={formData.apr}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (months) *
            </label>
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eligibility Criteria
            </label>
            <textarea
              name="eligibilityCriteria"
              value={formData.eligibilityCriteria}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Link *
            </label>
            <input
              type="url"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date *
              </label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <BiLoaderCircle size={24} className="animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                'Add Offer'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
