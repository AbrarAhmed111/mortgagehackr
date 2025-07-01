import type React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, X } from 'lucide-react'

interface EmailConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}

const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <Card className="shadow-lg border-green-200 bg-green-50 border-0">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600">
                We'll be in touch with personalized recommendations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirmationModal
