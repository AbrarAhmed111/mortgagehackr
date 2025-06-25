'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calculator, Info } from 'lucide-react'
import ResultsModal from '@/components/MainComponents/Modals/ResultModal'
import EmailFormModal from '@/components/MainComponents/Modals/EmailFormModal'
import EmailConfirmationModal from '@/components/MainComponents/Modals/EmailConfirmationModal'
import toast from 'react-hot-toast'

interface FormData {
  loanStartDate: string
  loanAmount: string
  interestRate: string
  loanTerm: string
}

interface AnalysisResult {
  dealType: 'great' | 'fair' | 'poor'
  rateComparison: number
  historicalAverage: number
  explanation: string
  recommendation: string
  leadId?: string
}

const getBrowserName = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

const getStoredAnalyzerId = () => {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('analyzer_lead_id')
  } catch (error) {
    console.error('Failed to retrieve analyzer ID from localStorage:', error)
    return null
  }
}

const DealAnalyzer = () => {
  const [formData, setFormData] = useState<FormData>({
    loanStartDate: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '30',
  })

  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [userIp, setUserIp] = useState<string>('')
  const [userAgent, setUserAgent] = useState<string>('')
  const [ipFetched, setIpFetched] = useState(false)
  const [storedId, setStoredId] = useState<string | null>(null)

  const getIpAddress = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setUserIp(data.ip)
      setIpFetched(true)
    } catch (error) {
      console.error('Error getting IP address:', error)
      setUserIp('0.0.0.0')
      setIpFetched(true)
    }
  }

  useEffect(() => {
    console.log('Browser:', getBrowserName())
    setUserAgent(getBrowserName())
    getIpAddress()
    const id = localStorage.getItem('analyzer_lead_id')
    setStoredId(id)
  }, [])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const mapResultType = (
    supabaseResult: 'Great' | 'Fair' | 'Poor',
  ): 'great' | 'fair' | 'poor' => {
    return supabaseResult.toLowerCase() as 'great' | 'fair' | 'poor'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    if (!ipFetched) {
      await getIpAddress()
    }

    try {
      const [year, month] = formData.loanStartDate.split('-').map(Number)

      const leadData = {
        source: 'DealAnalyzer' as const,
        loan_start_month: month,
        loan_start_year: year,
        loan_amount: Number.parseFloat(formData.loanAmount),
        interest_rate: Number.parseFloat(formData.interestRate),
        loan_term: Number.parseInt(formData.loanTerm) as 15 | 30,
        ip_address: userIp || '0.0.0.0', // Fallback IP
      }
      const res = await fetch('/api/saveAnalyzerLeads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(leadData),
        credentials: 'same-origin',
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('HTTP Error Response:', errorText)
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorText}`,
        )
      }
      const response = await res.json()
      if (response.error) {
        toast.error(response.error)
        setIsAnalyzing(false)
        return
      }

      if (response.success) {
        const { result_type, fredRate, id } = response
        const userRate = Number.parseFloat(formData.interestRate)
        const rateComparison = userRate - fredRate

        const dealType = mapResultType(result_type)

        let explanation: string
        let recommendation: string

        if (dealType === 'great') {
          explanation = `Your rate is ${Math.abs(rateComparison).toFixed(2)}% ${rateComparison <= 0 ? 'below' : 'above'} the historical average of ${fredRate.toFixed(2)}%. Excellent deal!`
          recommendation =
            'Consider exploring HELOC options to leverage your great rate.'
        } else if (dealType === 'fair') {
          explanation = `Your rate is ${rateComparison >= 0 ? rateComparison.toFixed(2) + '% above' : Math.abs(rateComparison).toFixed(2) + '% below'} the historical average of ${fredRate.toFixed(2)}%. This is a fair deal.`
          recommendation =
            'Your rate is competitive. Learn about refinancing options to potentially improve your terms.'
        } else {
          explanation = `Your rate is ${rateComparison.toFixed(2)}% above the historical average of ${fredRate.toFixed(2)}%. You may be overpaying.`
          recommendation =
            'Consider refinancing to get a better rate and save money over the life of your loan.'
        }

        const analysisResult: AnalysisResult = {
          dealType,
          rateComparison,
          historicalAverage: fredRate,
          explanation,
          recommendation,
          leadId: id,
        }

        setResult(analysisResult)
        setShowResultsModal(true)
        setFormData({
          loanStartDate: '',
          loanAmount: '',
          interestRate: '',
          loanTerm: '30',
        })
      }
    } catch (error) {
      console.error('Analysis error:', error)
      if (error instanceof Error) {
        toast.error(error?.message || 'An unexpected error occurred.')
      } else {
        toast.error('An unexpected error occurred. Try again!')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleEmailFormOpen = () => {
    setShowResultsModal(false)
    setShowEmailModal(true)
  }

  const handleEmailSubmitted = () => {
    setShowEmailModal(false)
    setShowConfirmationModal(true)
  }

  const isFormValid =
    formData.loanStartDate &&
    formData.loanAmount &&
    formData.interestRate &&
    formData.loanTerm &&
    ipFetched

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="h-8 w-8" />
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white border-0"
                >
                  Deal Analyzer
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Is Your Mortgage a Good Deal?
              </h1>
              <p className="text-xl text-blue-100">
                Use our analyzer to compare your rate against historical
                averages.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-200">
                <Info className="h-4 w-4" />
                <span>
                  Data sourced from FRED (Federal Reserve Economic Data)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    Analyze Your Mortgage
                  </CardTitle>
                  <p className="text-gray-600">
                    Enter your loan details to get started
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!ipFetched && (
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded text-center">
                        Loading user data...
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block font-medium">
                        Loan Start Date
                      </label>
                      <input
                        type="month"
                        value={formData.loanStartDate}
                        onChange={e =>
                          handleInputChange('loanStartDate', e.target.value)
                        }
                        className="w-full border p-2 rounded"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-medium">
                        Loan Amount ($)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.loanAmount}
                        onChange={e =>
                          handleInputChange('loanAmount', e.target.value)
                        }
                        className="w-full border p-2 rounded"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-medium">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={formData.interestRate}
                        onChange={e =>
                          handleInputChange('interestRate', e.target.value)
                        }
                        className="w-full border p-2 rounded"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-medium">Loan Term</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="15"
                            checked={formData.loanTerm === '15'}
                            onChange={e =>
                              handleInputChange('loanTerm', e.target.value)
                            }
                            className="text-blue-600"
                          />
                          <span>15 years</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="30"
                            checked={formData.loanTerm === '30'}
                            onChange={e =>
                              handleInputChange('loanTerm', e.target.value)
                            }
                            className="text-blue-600"
                          />
                          <span>30 years</span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                      disabled={!isFormValid || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        'Analyze My Deal'
                      )}
                    </Button>

                    <div className="mt-4 text-center text-sm text-gray-500">
                      🛡️ We use data from FRED (Federal Reserve) for historical
                      averages.
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <ResultsModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        result={result}
        onEmailFormOpen={handleEmailFormOpen}
      />
      <EmailFormModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        dealType={result?.dealType || null}
        onEmailSubmitted={handleEmailSubmitted}
        analyzerId={result?.leadId || getStoredAnalyzerId() || undefined}
      />
      <EmailConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
      />
    </div>
  )
}

export default DealAnalyzer
