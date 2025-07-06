'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Home,
  Mail,
  ArrowRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { submitAnalyzerEmail } from '@/lib/actions/analyzerLeads'

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

const analyzeRate = (
  startDate: string,
  rate: number,
  term: number,
): AnalysisResult => {
  const year = Number.parseInt(startDate.split('-')[0])
  let historicalAverage: number

  if (year >= 2020 && year <= 2022) {
    historicalAverage = term === 30 ? 3.2 : 2.8
  } else if (year >= 2018 && year <= 2019) {
    historicalAverage = term === 30 ? 4.8 : 4.2
  } else if (year >= 2015 && year <= 2017) {
    historicalAverage = term === 30 ? 4.2 : 3.6
  } else {
    historicalAverage = term === 30 ? 5.5 : 4.8
  }

  const rateComparison = rate - historicalAverage

  let dealType: 'great' | 'fair' | 'poor'
  let explanation: string
  let recommendation: string

  if (rateComparison <= -0.5) {
    dealType = 'great'
    explanation = `Your rate is ${Math.abs(rateComparison).toFixed(2)}% below the historical average of ${historicalAverage.toFixed(2)}%. Excellent deal!`
    recommendation =
      'Consider exploring HELOC options to leverage your great rate.'
  } else if (rateComparison <= 0.5) {
    dealType = 'fair'
    explanation = `Your rate is ${rateComparison >= 0 ? rateComparison.toFixed(2) + '% above' : Math.abs(rateComparison).toFixed(2) + '% below'} the historical average of ${historicalAverage.toFixed(2)}%. This is a fair deal.`
    recommendation =
      'Your rate is competitive. Learn about refinancing options to potentially improve your terms.'
  } else {
    dealType = 'poor'
    explanation = `Your rate is ${rateComparison.toFixed(2)}% above the historical average of ${historicalAverage.toFixed(2)}%. You may be overpaying.`
    recommendation =
      'Consider refinancing to get a better rate and save money over the life of your loan.'
  }

  return {
    dealType,
    rateComparison,
    historicalAverage,
    explanation,
    recommendation,
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
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [userIp, setUserIp] = useState<string>('')
  const [userAgent, setUserAgent] = useState<string>('')
  const [ipFetched, setIpFetched] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

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

  const getBrowserName = () => {
    const userAgent = navigator.userAgent
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Unknown'
  }

  const mapResultType = (
    supabaseResult: 'Great' | 'Fair' | 'Poor',
  ): 'great' | 'fair' | 'poor' => {
    return supabaseResult.toLowerCase() as 'great' | 'fair' | 'poor'
  }

  useEffect(() => {
    console.log('Browser:', getBrowserName())
    setUserAgent(getBrowserName())
    getIpAddress()

    const storedQuickAnalysis = localStorage.getItem('quickAnalysisData')
    if (storedQuickAnalysis) {
      const parsed = JSON.parse(storedQuickAnalysis)
      if (Date.now() < parsed.expiry) {
        const quickData = parsed.data
        if (quickData.fromHomePage === true) {

          setFormData({
            loanStartDate: quickData.loanStartDate,
            loanAmount: quickData.loanAmount,
            interestRate: quickData.interestRate,
            loanTerm: quickData.loanTerm,
          })
        }
        if (quickData.userIp) {
          setUserIp(quickData.userIp)
          setIpFetched(true)
        }

        setTimeout(() => {
          handleAutoSubmit(quickData)
        }, 500)

        localStorage.removeItem('quickAnalysisData')
      }
    }

    // const storedResult = localStorage.getItem('analyzer_result')
    // if (storedResult) {
    //   setResult(JSON.parse(storedResult))
    // }
    // const storedResult = localStorage.getItem('analyzer_result')
    // if (storedResult) {
    //   const parsed = JSON.parse(storedResult)
    //   if (Date.now() < parsed.expiry) {
    //     setResult(parsed.data)
    //   } else {
    //     localStorage.removeItem('analyzer_result')
    //     localStorage.removeItem('analyzer_lead_id')
    //   }
    // }
    const storedResult = localStorage.getItem('analyzer_result')
    if (storedResult) {
      const parsed = JSON.parse(storedResult)
      const currentTime = Date.now()
      const timeLeft = parsed.expiry - currentTime

      console.log('Current time:', currentTime)
      console.log('Expiry time:', parsed.expiry)
      console.log('Time left (minutes):', timeLeft / (1000 * 60))

      if (currentTime < parsed.expiry) {
        setResult(parsed.data)
      } else {
        console.log('Data expired, removing...')
        localStorage.removeItem('analyzer_result')
        localStorage.removeItem('analyzer_lead_id')
      }
    }
  }, [])

  const handleAutoSubmit = async (quickData: any) => {
    setIsAnalyzing(true)

    try {
      const [year, month] = quickData.loanStartDate.split('-').map(Number)

      const leadData = {
        source: 'DealAnalyzer' as const,
        loan_start_month: month,
        loan_start_year: year,
        loan_amount: Number.parseFloat(quickData.loanAmount),
        interest_rate: Number.parseFloat(quickData.interestRate),
        loan_term: Number.parseInt(quickData.loanTerm) as 15 | 30,
        ip_address: quickData.userIp || '0.0.0.0',
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
        const userRate = Number.parseFloat(quickData.interestRate)
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
        // localStorage.setItem('analyzer_result', JSON.stringify(analysisResult))
        // localStorage.setItem('analyzer_lead_id', id)
        const expiryTime = Date.now() + (5 * 60 * 1000) // 5 minutes from now
        localStorage.setItem('analyzer_result', JSON.stringify({
          data: analysisResult,
          expiry: expiryTime
        }))
        localStorage.setItem('analyzer_lead_id', JSON.stringify({
          data: id,
          expiry: expiryTime
        }))

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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
        ip_address: userIp || '0.0.0.0',
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

        // setResult(analysisResult)
        // localStorage.setItem('analyzer_result', JSON.stringify(analysisResult))
        // localStorage.setItem('analyzer_lead_id', id)
        setResult(analysisResult)
        const expiryTime = Date.now() + (5 * 60 * 1000) // 5 minutes from now
        localStorage.setItem('analyzer_result', JSON.stringify({
          data: analysisResult,
          expiry: expiryTime
        }))
        localStorage.setItem('analyzer_lead_id', JSON.stringify({
          data: id,
          expiry: expiryTime
        }))
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // const id = localStorage.getItem('analyzer_lead_id')
    // if (!id) {
    //   toast.error('You need to analyze your deal first.')
    //   return
    // }
    const storedId = localStorage.getItem('analyzer_lead_id')
    if (!storedId) {
      toast.error('You need to analyze your deal first.')
      return
    }

    const parsed = JSON.parse(storedId)
    if (Date.now() >= parsed.expiry) {
      toast.error('Your session has expired. Please analyze your deal again.')
      localStorage.removeItem('analyzer_lead_id')
      localStorage.removeItem('analyzer_result')
      return
    }

    const id = parsed.data

    try {
      setLoading(true)
      // const res = await submitAnalyzerEmail({ analyzer_id: id, email })
      const res = await submitAnalyzerEmail({ analyzer_id: parsed.data, email })

      if (res.error) {
        toast.error(res.error)
        return
      }

      toast.success('Email submitted successfully!')
      setEmailSubmitted(true)
      localStorage.removeItem('analyzer_result')
      localStorage.removeItem('analyzer_lead_id')
    } catch (error) {
      console.error('Submit email error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    formData.loanStartDate &&
    formData.loanAmount &&
    formData.interestRate &&
    formData.loanTerm

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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Section 1: Page Intro */}
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

        {/* Section 2: Input Form */}
        {!result && (
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
                      {/* Loan Start Date */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Loan Start Date
                        </label>
                        <input
                          type="month"
                          value={formData.loanStartDate}
                          onChange={e =>
                            handleInputChange('loanStartDate', e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      {/* Loan Amount */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Loan Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={formData.loanAmount}
                            onChange={e =>
                              handleInputChange('loanAmount', e.target.value)
                            }
                            className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="400,000"
                            required
                          />
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Interest Rate
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.01"
                            value={formData.interestRate}
                            onChange={e =>
                              handleInputChange('interestRate', e.target.value)
                            }
                            className="w-full pr-8 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="6.75"
                            required
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            %
                          </span>
                        </div>
                      </div>

                      {/* Loan Term */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Loan Term</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
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
                          <label className="flex items-center space-x-2 cursor-pointer">
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

                      {/* Submit Button */}
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
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-500">
                      🛡️ We use data from FRED (Federal Reserve) for historical
                      averages.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Result Area */}
        {result && (
          <section className="w-full py-16 bg-gray-50">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <Card
                  className={`shadow-xl ${getResultColor(result.dealType)}`}
                >
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      {getResultIcon(result.dealType)}
                      {getResultBadge(result.dealType)}
                    </div>
                    <CardTitle className="text-2xl">
                      Analysis Complete
                    </CardTitle>
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
                          onClick={() => setShowEmailForm(true)}
                          className="bg-green-600 hover:bg-green-700"
                          size="lg"
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
                          onClick={() => setShowEmailForm(true)}
                          className="bg-red-600 hover:bg-red-700"
                          size="lg"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-5 w-5" />
                              Get Help With Refinance
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Email Form */}
        {showEmailForm && !emailSubmitted && (
          <section className="w-full py-16">
            <div className="container px-4 md:px-6">
              <div className="max-w-xl mx-auto">
                <Card className="shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                      {result?.dealType === 'great'
                        ? 'Get Exclusive Offers'
                        : 'Get Expert Help'}
                    </CardTitle>
                    <p className="text-gray-600">
                      {result?.dealType === 'great'
                        ? 'Enter your email to receive HELOC offers (optional)'
                        : 'Enter your email to get personalized refinancing assistance'}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your@email.com"
                          required={result?.dealType === 'poor'}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {result?.dealType === 'great'
                          ? 'Get Offers'
                          : 'Get Help'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Email Confirmation */}
        {emailSubmitted && (
          <section className="w-full py-16">
            <div className="container px-4 md:px-6">
              <div className="max-w-xl mx-auto text-center">
                <Card className="shadow-lg border-green-200 bg-green-50">
                  <CardContent className="p-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      We'll be in touch with personalized recommendations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default DealAnalyzer
