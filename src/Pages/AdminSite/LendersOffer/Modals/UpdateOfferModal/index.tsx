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

type UpdateOfferModalProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (offerData: { id: string; ctaLink: string }) => void
  offer: LenderOffer | null
}

export function UpdateOfferModal({
  isOpen,
  onClose,
  onUpdate,
  offer,
}: UpdateOfferModalProps) {
  const [formData, setFormData] = useState({
    ctaLink: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (offer) {
      setFormData({
        ctaLink: offer.cta_link,
      })
    }
  }, [offer])

  const handleSubmit = async () => {
    if (!offer) return

    setIsSubmitting(true)

    try {
      await onUpdate({
        id: offer.id,
        ctaLink: formData.ctaLink,
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
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen || !offer) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Offer</h2>
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
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Offer'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
