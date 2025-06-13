import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { BiLoaderCircle } from 'react-icons/bi'

type LenderOffer = {
  id: string
  lender_name: string
  interest_rate: number
  apr: number
  loan_term: number
  eligibility?: string
  cta_link: string
  expiration_date: string
  status: boolean
  click_count?: number
}

type UpdateOfferFormData = {
  lenderName: string
  interestRate: number
  apr: number
  loanTerm: number
  eligibility: string
  ctaLink: string
  expirationDate: string
  status: 'active' | 'inactive'
}

type UpdateOfferModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (offerData: UpdateOfferFormData & { id: string }) => void
  offer: LenderOffer | null
}

export function UpdateOfferModal({
  isOpen,
  onClose,
  onUpdate,
  offer,
}: UpdateOfferModalProps) {
  const [formData, setFormData] = useState<UpdateOfferFormData>({
    lenderName: '',
    interestRate: 0,
    apr: 0,
    loanTerm: 0,
    eligibility: '',
    ctaLink: '',
    expirationDate: '',
    status: 'active',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateOfferFormData, string>>
  >({})
  useEffect(() => {
    if (offer) {
      const expirationDate = new Date(offer.expiration_date)
        .toISOString()
        .split('T')[0]

      setFormData({
        lenderName: offer.lender_name,
        interestRate: offer.interest_rate,
        apr: offer.apr,
        loanTerm: offer.loan_term,
        eligibility: offer.eligibility || '',
        ctaLink: offer.cta_link,
        expirationDate,
        status: offer.status ? 'active' : 'inactive',
      })
    }
    setErrors({})
  }, [offer])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UpdateOfferFormData, string>> = {}

    if (!formData.lenderName.trim()) {
      newErrors.lenderName = 'Lender name is required'
    }

    if (formData.interestRate <= 0) {
      newErrors.interestRate = 'Interest rate must be greater than 0'
    }

    if (formData.apr <= 0) {
      newErrors.apr = 'APR must be greater than 0'
    }

    if (formData.loanTerm <= 0) {
      newErrors.loanTerm = 'Loan term must be greater than 0'
    }

    if (!formData.ctaLink.trim()) {
      newErrors.ctaLink = 'CTA link is required'
    } else {
      // Basic URL validation
      try {
        new URL(formData.ctaLink)
      } catch {
        newErrors.ctaLink = 'Please enter a valid URL'
      }
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required'
    } else {
      const selectedDate = new Date(formData.expirationDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate <= today) {
        newErrors.expirationDate = 'Expiration date must be in the future'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!offer || !validateForm()) return

    setIsSubmitting(true)

    try {
      await onUpdate({
        id: offer.id,
        ...formData,
      })

      onClose()
    } catch (error) {
      console.error('Error updating offer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof UpdateOfferFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  if (!isOpen || !offer) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Update Offer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lender Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lender Name *
            </label>
            <input
              type="text"
              name="lenderName"
              value={formData.lenderName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lenderName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lenderName && (
              <p className="text-red-500 text-sm mt-1">{errors.lenderName}</p>
            )}
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%) *
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.interestRate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.interestRate && (
              <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
            )}
          </div>

          {/* APR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              APR (%) *
            </label>
            <input
              type="number"
              name="apr"
              value={formData.apr}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.apr ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.apr && (
              <p className="text-red-500 text-sm mt-1">{errors.apr}</p>
            )}
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (months) *
            </label>
            <input
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              min="1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.loanTerm ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.loanTerm && (
              <p className="text-red-500 text-sm mt-1">{errors.loanTerm}</p>
            )}
          </div>

          {/* Status */}
          <div>
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

          {/* Expiration Date */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date *
            </label>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expirationDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expirationDate}
              </p>
            )}
          </div>

          {/* Eligibility */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eligibility Requirements
            </label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional eligibility requirements..."
            />
          </div>

          {/* CTA Link */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTA Link *
            </label>
            <input
              type="url"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.ctaLink ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com"
            />
            {errors.ctaLink && (
              <p className="text-red-500 text-sm mt-1">{errors.ctaLink}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-6 mt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
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
              <div className="flex items-center justify-center gap-2">
                <BiLoaderCircle size={20} className="animate-spin" />
                <span>Updating...</span>
              </div>
            ) : (
              'Update Offer'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
