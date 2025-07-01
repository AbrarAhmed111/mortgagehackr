import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, X } from 'lucide-react'
import { submitAnalyzerEmail } from '@/lib/actions/analyzerLeads'

interface EmailFormModalProps {
  isOpen: boolean
  onClose: () => void
  dealType: 'great' | 'fair' | 'poor' | null
  onEmailSubmitted: () => void
  analyzerId?: string
}

const EmailFormModal: React.FC<EmailFormModalProps> = ({
  isOpen,
  onClose,
  dealType,
  onEmailSubmitted,
  analyzerId,
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen || !dealType) return null

  const handleEmailSubmit = async () => {
    if (!email || !analyzerId) {
      setError('Email and analyzer ID are required')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const result = await submitAnalyzerEmail({
        analyzer_id: analyzerId,
        email: email.trim(),
      })

      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }

      if (result.success) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('analyzer_lead_id')
            console.log(
              'Analyzer ID cleared from localStorage after email submission',
            )
          } catch (error) {
            console.error(
              'Failed to clear analyzer ID from localStorage:',
              error,
            )
          }
        }

        setIsSubmitting(false)
        onEmailSubmitted()
        onClose()
        setEmail('')
        setError('')
      }
    } catch (error) {
      console.error('Email submission error:', error)
      setError('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setEmail('')
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                {dealType === 'great'
                  ? 'Get Exclusive Offers'
                  : 'Get Expert Help'}
              </CardTitle>
              <p className="text-gray-600">
                {dealType === 'great'
                  ? 'Enter your email to receive HELOC offers (optional)'
                  : 'Enter your email to get personalized refinancing assistance'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {!analyzerId && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg text-sm">
                    Unable to process request. Please try analyzing your deal
                    again.
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  onClick={handleEmailSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting || !email.trim() || !analyzerId}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {dealType === 'great' ? 'Get Offers' : 'Get Help'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  By submitting, you agree to receive emails about mortgage
                  offers and services.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EmailFormModal
