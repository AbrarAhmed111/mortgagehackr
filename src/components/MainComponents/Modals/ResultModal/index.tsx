import type React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Home,
  Mail,
  X,
} from 'lucide-react'

interface AnalysisResult {
  dealType: 'great' | 'fair' | 'poor'
  rateComparison: number
  historicalAverage: number
  explanation: string
  recommendation: string
}

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  result: AnalysisResult | null
  onEmailFormOpen: () => void
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  result,
  onEmailFormOpen,
}) => {
  if (!isOpen || !result) return null

  const getResultIcon = (dealType: string) => {
    switch (dealType) {
      case 'great':
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case 'fair':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />
      case 'poor':
        return <XCircle className="h-8 w-8 text-red-500" />
      default:
        return null
    }
  }

  const getResultColor = (dealType: string) => {
    switch (dealType) {
      case 'great':
        return 'border-green-200 bg-green-50'
      case 'fair':
        return 'border-yellow-200 bg-yellow-50'
      case 'poor':
        return 'border-red-200 bg-red-50'
      default:
        return ''
    }
  }

  const getResultBadge = (dealType: string) => {
    switch (dealType) {
      case 'great':
        return <Badge className="bg-green-500 text-white">🟢 Great Deal</Badge>
      case 'fair':
        return <Badge className="bg-yellow-500 text-white">🟡 Fair Deal</Badge>
      case 'poor':
        return <Badge className="bg-red-500 text-white">🔴 Poor Deal</Badge>
      default:
        return null
    }
  }

  const handleCTAClick = () => {
    if (result.dealType === 'great' || result.dealType === 'poor') {
      onEmailFormOpen()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <Card
            className={`shadow-xl ${getResultColor(result.dealType)} border-0`}
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                {getResultIcon(result.dealType)}
                {getResultBadge(result.dealType)}
              </div>
              <CardTitle className="text-2xl">Analysis Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  {result.explanation}
                </p>
                <p className="text-gray-600">{result.recommendation}</p>
              </div>

              {/* CTA Buttons based on result */}
              <div className="text-center">
                {result.dealType === 'great' && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                    onClick={handleCTAClick}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Explore HELOC Offers
                  </Button>
                )}
                {result.dealType === 'fair' && (
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700"
                    size="lg"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Learn About Refinancing
                  </Button>
                )}
                {result.dealType === 'poor' && (
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    size="lg"
                    onClick={handleCTAClick}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Get Help With Refinance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResultsModal
