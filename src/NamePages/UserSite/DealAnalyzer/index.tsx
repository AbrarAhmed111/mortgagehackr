'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
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
  Sparkles,
  Shield,
  Clock,
  DollarSign,
  Zap,
  Loader2,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  ChevronRight,
  Star,
  Users,
  Lock,
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
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [focusField, setFocusField] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const emailFormRef = useRef<HTMLDivElement | null>(null)

  const formatCurrencyInput = (value: string) => {
    if (!value) return ''
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  const handleCurrencyInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    handleInputChange('loanAmount', numericValue)
  }
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

  const validateForm = () => {
    const errors: Partial<FormData> = {}

    if (!formData.loanStartDate) {
      errors.loanStartDate = 'Loan start date is required'
    }

    if (!formData.loanAmount || Number(formData.loanAmount) <= 0) {
      errors.loanAmount = 'Valid loan amount is required'
    }

    if (!formData.interestRate || Number(formData.interestRate) <= 0 || Number(formData.interestRate) > 20) {
      errors.interestRate = 'Valid interest rate is required (0-20%)'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isFormValid = formData.loanStartDate && formData.loanAmount && formData.interestRate && formData.loanTerm

  useEffect(() => {
    console.log('Browser:', getBrowserName())
    setUserAgent(getBrowserName())
    getIpAddress()

    // Check localStorage availability
    if (!checkLocalStorageAvailability()) {
      console.warn('localStorage is not available, some features may not work properly')
      return
    }

    // Handle quick analysis data from home page
    const storedQuickAnalysis = getFromLocalStorage('quickAnalysisData')
    if (storedQuickAnalysis) {
      // Check if data is still valid
      if (storedQuickAnalysis.expiry && Date.now() < storedQuickAnalysis.expiry) {
        const quickData = storedQuickAnalysis.data

        if (quickData && quickData.fromHomePage === true) {
          // Set form data
          setFormData({
            loanStartDate: quickData.loanStartDate || '',
            loanAmount: quickData.loanAmount || '',
            interestRate: quickData.interestRate || '',
            loanTerm: quickData.loanTerm || '30',
          })

          // Set IP if available
          if (quickData.userIp) {
            setUserIp(quickData.userIp)
            setIpFetched(true)
          }

          // Auto-submit after a short delay
          setTimeout(() => {
            handleAutoSubmit(quickData)
          }, 500)

          // Clean up quick analysis data
          removeFromLocalStorage('quickAnalysisData')
        }
      } else {
        // Data expired, clean it up
        removeFromLocalStorage('quickAnalysisData')
      }
    }

    // Handle stored analysis result (with versioning and validation)
    const STORAGE_VERSION = 2;
    const storedResult = getFromLocalStorage('analyzer_result')
    if (storedResult) {
      // If version is missing or old, clear it
      if (!storedResult.version || storedResult.version < STORAGE_VERSION) {
        removeFromLocalStorage('analyzer_result')
        removeFromLocalStorage('analyzer_lead_id')
        return
      }
      if (storedResult.expiry && storedResult.data) {
        const currentTime = Date.now()
        if (currentTime < storedResult.expiry) {
          // Defensive: Only restore if dealType is valid
          if (["great","fair","poor"].includes(storedResult.data.dealType)) {
            setResult(storedResult.data)
            console.log('[Frontend] Restored from localStorage:', storedResult.data);
          } else {
            removeFromLocalStorage('analyzer_result')
            removeFromLocalStorage('analyzer_lead_id')
          }
        } else {
          removeFromLocalStorage('analyzer_result')
          removeFromLocalStorage('analyzer_lead_id')
        }
      } else {
        removeFromLocalStorage('analyzer_result')
        removeFromLocalStorage('analyzer_lead_id')
      }
    }
  }, [])

  const handleAutoSubmit = async (quickData: any) => {
    // Clear any existing analysis data before auto-submitting
    clearAnalysisData()

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

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
        if (response.error.toLowerCase().includes('rate limit')) {
          toast.error("You've reached the analysis limit. Please try again in an hour or contact support for assistance.")
        } else {
          toast.error(response.error)
        }
        setIsAnalyzing(false)
        setAnalysisProgress(0)
        return
      }

      if (response.success) {
        // Use backend result_type for dealType
        const dealType = (response.result_type || '').toLowerCase();
        console.log('[API response] result_type:', response.result_type, '-> dealType:', dealType);
        const analysisResult: AnalysisResult = {
          dealType: dealType as 'great' | 'fair' | 'poor',
          rateComparison: Number.parseFloat(quickData.interestRate) - response.fredRate,
          historicalAverage: response.fredRate,
          explanation: '',
          recommendation: '',
          leadId: response.id,
        };
        if (dealType === 'great') {
          analysisResult.explanation = `Your rate is excellent compared to the historical average of ${response.fredRate.toFixed(2)}%.`;
          analysisResult.recommendation = 'Consider exploring HELOC options to leverage your great rate.';
        } else if (dealType === 'fair') {
          analysisResult.explanation = `Your rate is fair compared to the historical average of ${response.fredRate.toFixed(2)}%.`;
          analysisResult.recommendation = 'Your rate is competitive. Learn about refinancing options to potentially improve your terms.';
        } else {
          analysisResult.explanation = `Your rate is above the historical average of ${response.fredRate.toFixed(2)}%. You may be overpaying.`;
          analysisResult.recommendation = 'Consider refinancing to get a better rate and save money over the life of your loan.';
        }
        setResult(analysisResult);
        console.log('[Frontend] setResult:', analysisResult);
        const resultData = {
          data: analysisResult,
          expiry: Date.now() + 30 * 60 * 1000, // 30 minutes
          version: 2,
        };
        localStorage.setItem('analyzer_result', JSON.stringify(resultData));
        localStorage.setItem('analyzer_lead_id', response.id);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisProgress(0);
        }, 500);
        toast.success('Analysis complete!');
        scrollToResults();
      }
    } catch (error) {
      console.error('Error submitting analysis:', error)
      toast.error('Failed to analyze deal. Please try again.')
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasInteracted(true)

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleInputFocus = (field: string) => {
    setFocusField(field)
  }

  const handleInputBlur = (field: keyof FormData) => {
    setFocusField(null)
    // Validate field on blur if user has interacted
    if (hasInteracted) {
      validateField(field)
    }
  }

  const validateField = (field: keyof FormData) => {
    const errors: Partial<FormData> = {}

    switch (field) {
      case 'loanStartDate':
        if (!formData.loanStartDate) {
          errors.loanStartDate = 'Loan start date is required'
        }
        break
      case 'loanAmount':
        if (!formData.loanAmount || Number(formData.loanAmount) <= 0) {
          errors.loanAmount = 'Valid loan amount is required'
        }
        break
      case 'interestRate':
        if (!formData.interestRate || Number(formData.interestRate) <= 0 || Number(formData.interestRate) > 20) {
          errors.interestRate = 'Valid interest rate is required (0-20%)'
        }
        break
    }

    setFormErrors(prev => ({ ...prev, ...errors }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      // Focus on first error field
      const firstErrorField = Object.keys(formErrors)[0] as keyof FormData
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.focus()
      }
      return
    }

    // Clear previous analysis data when starting new analysis
    clearAnalysisData()

    setIsAnalyzing(true)
    setIsSubmitting(true)
    setAnalysisProgress(0)

    // Scroll to loading section
    setTimeout(() => {
      const loadingSection = document.getElementById('loading-section')
      if (loadingSection) {
        loadingSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 100)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

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
        if (response.error.toLowerCase().includes('rate limit')) {
          toast.error("You've reached the analysis limit. Please try again in an hour or contact support for assistance.")
        } else {
          toast.error(response.error)
        }
        setIsAnalyzing(false)
        setIsSubmitting(false)
        setAnalysisProgress(0)
        return
      }

      if (response.success) {
        // Use backend result_type for dealType
        const dealType = (response.result_type || '').toLowerCase();
        console.log('[API response] result_type:', response.result_type, '-> dealType:', dealType);
        const analysisResult: AnalysisResult = {
          dealType: dealType as 'great' | 'fair' | 'poor',
          rateComparison: Number.parseFloat(formData.interestRate) - response.fredRate,
          historicalAverage: response.fredRate,
          explanation: '',
          recommendation: '',
          leadId: response.id,
        };
        if (dealType === 'great') {
          analysisResult.explanation = `Your rate is excellent compared to the historical average of ${response.fredRate.toFixed(2)}%.`;
          analysisResult.recommendation = 'Consider exploring HELOC options to leverage your great rate.';
        } else if (dealType === 'fair') {
          analysisResult.explanation = `Your rate is fair compared to the historical average of ${response.fredRate.toFixed(2)}%.`;
          analysisResult.recommendation = 'Your rate is competitive. Learn about refinancing options to potentially improve your terms.';
        } else {
          analysisResult.explanation = `Your rate is above the historical average of ${response.fredRate.toFixed(2)}%. You may be overpaying.`;
          analysisResult.recommendation = 'Consider refinancing to get a better rate and save money over the life of your loan.';
        }
        setResult(analysisResult);
        console.log('[Frontend] setResult:', analysisResult);
        const resultData = {
          data: analysisResult,
          expiry: Date.now() + 30 * 60 * 1000, // 30 minutes
          version: 2,
        };
        localStorage.setItem('analyzer_result', JSON.stringify(resultData));
        localStorage.setItem('analyzer_lead_id', response.id);
        setAnalysisProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          setIsSubmitting(false);
          setAnalysisProgress(0);
        }, 500);
        toast.success('Analysis complete!');
        scrollToResults();
      }
    } catch (error) {
      console.error('Error submitting analysis:', error)
      toast.error('Failed to analyze deal. Please try again.')
      setIsAnalyzing(false)
      setIsSubmitting(false)
      setAnalysisProgress(0)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!result?.leadId) {
      toast.error('Analysis data not found. Please run the analysis again.')
      return
    }

    if (!email.trim()) {
      toast.error('Please enter a valid email address.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.')
      return
    }

    setLoading(true)

    try {
      const response = await submitAnalyzerEmail({
        email: email.trim(),
        analyzer_id: result.leadId,
      })

      if (response.success) {
        setEmailSubmitted(true)
        // Clear localStorage after successful email submission
        clearAnalysisData()
        toast.success('Email submitted successfully! We\'ll be in touch soon.')
      } else {
        toast.error(response.error || 'Failed to submit email. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const getResultIcon = (dealType: string) => {
    switch (dealType) {
      case 'great':
        return <Award className="h-12 w-12 text-green-500" />
      case 'fair':
        return <Target className="h-12 w-12 text-yellow-500" />
      case 'poor':
        return <AlertTriangle className="h-12 w-12 text-red-500" />
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
        return <Badge className="bg-green-500 text-white text-sm px-3 py-1">🟢 Great Deal</Badge>
      case 'fair':
        return <Badge className="bg-yellow-500 text-white text-sm px-3 py-1">🟡 Fair Deal</Badge>
      case 'poor':
        return <Badge className="bg-red-500 text-white text-sm px-3 py-1">🔴 Poor Deal</Badge>
      default:
        return null
    }
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount))
  }

  // Safe localStorage utilities
  const saveToLocalStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      console.log(`Successfully saved ${key} to localStorage`)
      return true
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)

      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.log('localStorage quota exceeded, cleaning up old data...')
        // Try to clear some old data and retry
        clearAnalysisData()
        try {
          localStorage.setItem(key, JSON.stringify(value))
          console.log(`Successfully saved ${key} to localStorage after cleanup`)
          return true
        } catch (retryError) {
          console.error(`Still failed to save ${key} after cleanup:`, retryError)
          return false
        }
      }

      return false
    }
  }

  const getFromLocalStorage = (key: string) => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      return null
    } catch (error) {
      console.error(`Failed to get ${key} from localStorage:`, error)
      localStorage.removeItem(key) // Clean up corrupted data
      return null
    }
  }

  const removeFromLocalStorage = (key: string) => {
    try {
      localStorage.removeItem(key)
      console.log(`Successfully removed ${key} from localStorage`)
      return true
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error)
      return false
    }
  }

  const clearAnalysisData = () => {
    removeFromLocalStorage('analyzer_result')
    removeFromLocalStorage('analyzer_lead_id')
    removeFromLocalStorage('quickAnalysisData')
  }

  const resetAnalysisState = () => {
    setResult(null)
    setShowEmailForm(false)
    setEmailSubmitted(false)
    setEmail('')
    setIsSubmitting(false)
    setIsAnalyzing(false)
    setAnalysisProgress(0)
    setFormErrors({})
    clearAnalysisData()
    // Reset form data
    setFormData({
      loanStartDate: '',
      loanAmount: '',
      interestRate: '',
      loanTerm: '30',
    })
  }

  const checkLocalStorageAvailability = () => {
    try {
      const testKey = '__test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      return true
    } catch (error) {
      console.error('localStorage is not available:', error)
      return false
    }
  }

  // Scroll to results after analysis
  const scrollToResults = () => {
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 200)
  }

  // Scroll to email form
  const scrollToEmailForm = () => {
    setTimeout(() => {
      if (emailFormRef.current) {
        emailFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip link for accessibility */}
      <a href="#results-section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
        Skip to results
      </a>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="h-8 w-8" />
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white border-0 animate-fade-in"
                >
                  <Sparkles className="w-3 h-3 mr-1" /> Deal Analyzer
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-white relative z-10 tracking-tight sm:text-5xl animate-fade-in-up">
                Is Your Mortgage a Good Deal?
              </h1>
              <p className="text-xl text-blue-100 animate-fade-in-up delay-200">
                Compare your rate against historical averages and get personalized recommendations.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-200 animate-fade-in-up delay-300">
                <Shield className="h-4 w-4" />
                <span>Data sourced from FRED (Federal Reserve Economic Data)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Historical Analysis</h3>
                <p className="text-sm text-gray-600">Compare against market averages</p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Smart Recommendations</h3>
                <p className="text-sm text-gray-600">Get personalized advice</p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Secure & Private</h3>
                <p className="text-sm text-gray-600">Your data is protected</p>
              </div>
            </div>
          </div>
        </section>

        {/* Input Form */}
        {!result && !isAnalyzing && (
          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Calculator className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      Analyze Your Mortgage
                    </CardTitle>
                    <p className="text-gray-600">
                      Enter your loan details to get started
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      <fieldset>
                        <legend className="sr-only">Mortgage Analysis Form</legend>
                        {/* Loan Start Date */}
                        <div className="space-y-3">
                          <Label htmlFor="loanStartDate" className="text-sm font-medium">Loan Start Date <span className="text-red-500">*</span></Label>
                          <Input
                            id="loanStartDate"
                            type="month"
                            value={formData.loanStartDate}
                            onChange={e => handleInputChange('loanStartDate', e.target.value)}
                            onFocus={() => handleInputFocus('loanStartDate')}
                            onBlur={() => handleInputBlur('loanStartDate')}
                            className={`h-12 px-4 border-2 rounded-lg w-full transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${formErrors.loanStartDate ? 'border-red-500 ring-red-200' : focusField === 'loanStartDate' ? 'border-blue-500 ring-blue-200' : 'border-gray-300'} bg-white text-base`}
                            required
                            aria-describedby={formErrors.loanStartDate ? 'loanStartDate-error' : undefined}
                            aria-invalid={!!formErrors.loanStartDate}
                            autoComplete="off"
                          />
                          {formErrors.loanStartDate && (
                            <p id="loanStartDate-error" className="text-sm text-red-600 flex items-center font-medium mt-1" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.loanStartDate}
                            </p>
                          )}
                        </div>

                        {/* Loan Amount */}
                        <div className="space-y-3">
                          <Label htmlFor="loanAmount" className="text-sm font-medium">Loan Amount <span className="text-red-500">*</span></Label>
                          <div className="relative">
                            <Input
                              id="loanAmount"
                              type="text"
                              inputMode="decimal"
                              min="1"
                              step="any"
                              value={formData.loanAmount ? formatCurrencyInput(formData.loanAmount) : ''}
                              // onChange={e => handleInputChange('loanAmount', e.target.value)}
                              onChange={e => handleCurrencyInput(e.target.value)}
                              onFocus={() => handleInputFocus('loanAmount')}
                              onBlur={() => handleInputBlur('loanAmount')}

                              className={`h-12 px-4 border-2 rounded-lg w-full transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 pr-12 ${formErrors.loanAmount ? 'border-red-500 ring-red-200' : focusField === 'loanAmount' ? 'border-blue-500 ring-blue-200' : 'border-gray-300'} bg-white text-base`}
                              required
                              aria-describedby={formErrors.loanAmount ? 'loanAmount-error' : undefined}
                              aria-invalid={!!formErrors.loanAmount}
                              autoComplete="off"
                            />
                            {/* <Input
                              id="loanAmount"
                              type="text"
                              inputMode="decimal"
                              value={formatWithCommas(formData.loanAmount)}
                              onChange={e => handleLoanAmountChange(e.target.value)}
                              onFocus={() => handleInputFocus('loanAmount')}
                              onBlur={() => handleInputBlur('loanAmount')}
                              className={`h-12 px-4 border-2 rounded-lg w-full transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 pr-12 ${formErrors.loanAmount ? 'border-red-500 ring-red-200' : focusField === 'loanAmount' ? 'border-blue-500 ring-blue-200' : 'border-gray-300'} bg-white text-base`}
                              required
                              aria-describedby={formErrors.loanAmount ? 'loanAmount-error' : undefined}
                              aria-invalid={!!formErrors.loanAmount}
                              autoComplete="off"
                            /> */}
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none">$</span>
                          </div>
                          {formErrors.loanAmount && (
                            <p id="loanAmount-error" className="text-sm text-red-600 flex items-center font-medium mt-1" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.loanAmount}
                            </p>
                          )}
                        </div>

                        {/* Interest Rate */}
                        <div className="space-y-3">
                          <Label htmlFor="interestRate" className="text-sm font-medium">Interest Rate <span className="text-red-500">*</span></Label>
                          <div className="relative">
                            <Input
                              id="interestRate"
                              type="number"
                              inputMode="decimal"
                              min="0.01"
                              max="20"
                              step="any"
                              value={formData.interestRate}
                              onChange={e => handleInputChange('interestRate', e.target.value)}
                              onFocus={() => handleInputFocus('interestRate')}
                              onBlur={() => handleInputBlur('interestRate')}
                              className={`h-12 px-4 border-2 rounded-lg w-full transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 pr-12 ${formErrors.interestRate ? 'border-red-500 ring-red-200' : focusField === 'interestRate' ? 'border-blue-500 ring-blue-200' : 'border-gray-300'} bg-white text-base`}
                              required
                              aria-describedby={formErrors.interestRate ? 'interestRate-error' : undefined}
                              aria-invalid={!!formErrors.interestRate}
                              autoComplete="off"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium pointer-events-none">%</span>
                          </div>
                          {formErrors.interestRate && (
                            <p id="interestRate-error" className="text-sm text-red-600 flex items-center font-medium mt-1" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.interestRate}
                            </p>
                          )}
                        </div>

                        {/* Loan Term */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Loan Term <span className="text-red-500">*</span></Label>
                          <RadioGroup
                            value={formData.loanTerm}
                            onValueChange={(value: string) => handleInputChange('loanTerm', value)}
                            className="flex space-x-4"
                            aria-label="Loan Term"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="15" id="term-15" />
                              <Label htmlFor="term-15" className="cursor-pointer">15 years</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="30" id="term-30" />
                              <Label htmlFor="term-30" className="cursor-pointer">30 years</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Summary Preview */}
                        {isFormValid && (
                          <div className="p-4 mt-5 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                              <Calculator className="h-4 w-4 mr-2" />
                              Analysis Summary
                            </h4>
                            <div className="grid gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Loan Amount:</span>
                                <span className="font-medium">{formData.loanAmount ? formatCurrency(formData.loanAmount) : 'Not specified'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Interest Rate:</span>
                                <span className="font-medium">{formData.interestRate ? `${formData.interestRate}%` : 'Not specified'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Loan Term:</span>
                                <span className="font-medium">{formData.loanTerm} years</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Start Date:</span>
                                <span className="font-medium">{formData.loanStartDate ? new Date(formData.loanStartDate + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Not specified'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full h-14 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!isFormValid || isAnalyzing || isSubmitting}
                          aria-describedby={!isFormValid ? 'form-validation-error' : undefined}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                              <span>Analyzing your mortgage...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="mr-2  h-5 w-5" aria-hidden="true" />
                              <span>Analyze My Deal</span>
                            </>
                          )}
                        </Button>

                        {!isFormValid && (
                          <p id="form-validation-error" className="text-sm text-gray-500 text-center mt-2">
                            Please fill in all required fields to continue
                          </p>
                        )}

                        {/* Progress Bar */}
                        {isAnalyzing && (
                          <div className="space-y-2">
                            <Progress value={analysisProgress} className="h-2" />
                            <p className="text-sm text-gray-500 text-center">
                              Analyzing your mortgage data...
                            </p>
                          </div>
                        )}
                      </fieldset>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Your data is secure</p>
                          <p>We use data from FRED (Federal Reserve) for historical averages and never store sensitive information.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Loading State */}
        {isAnalyzing && !result && (
          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Analyzing Your Mortgage</h3>
                        <p className="text-gray-600">We're comparing your rate against historical data...</p>
                        <Progress value={analysisProgress} className="h-2" />
                        <p className="text-sm text-gray-500">{analysisProgress}% complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Result Area */}
        {result && (
          // Log result before rendering
          console.log('[Frontend] Rendering result:', result),
          <section id="results-section" ref={resultsRef} className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <Card className={`shadow-2xl border-0 overflow-hidden ${getResultColor(result.dealType)}`}>
                  <CardHeader className="text-center pb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                      {getResultIcon(result.dealType)}
                      {getResultBadge(result.dealType)}
                    </div>
                    <CardTitle className="text-3xl font-bold mb-2">
                      Analysis Complete
                    </CardTitle>
                    <p className="text-gray-600">
                      Here's what we found about your mortgage
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Rate Comparison */}
                    <div className="bg-white/80 rounded-lg p-6 border">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {Number(formData.interestRate).toFixed(2)}%
                          </div>
                          <div className="text-sm text-gray-600">Your Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-600 mb-2">
                            {result.historicalAverage.toFixed(2)}%
                          </div>
                          <div className="text-sm text-gray-600">Historical Average</div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className={`text-lg font-semibold ${result.rateComparison <= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {result.rateComparison <= 0 ? '↓' : '↑'} {Math.abs(result.rateComparison).toFixed(2)}%
                          {result.rateComparison <= 0 ? ' below' : ' above'} average
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="text-center space-y-4">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {result.explanation}
                      </p>
                      <div className="bg-white/60 rounded-lg p-4 border">
                        <p className="text-gray-700 font-medium">{result.recommendation}</p>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="text-center space-y-4">
                      {result.dealType === 'great' && (
                        <div className="space-y-3">
                          <Button
                            onClick={() => {
                              setShowEmailForm(true)
                              scrollToEmailForm()
                            }}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-14 px-8 text-lg"
                            size="lg"
                          >
                            <Home className="mr-2 h-5 w-5" />
                            Explore HELOC Offers
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                          <p className="text-sm text-gray-600">
                            Tap into your home equity with competitive HELOC rates
                          </p>
                        </div>
                      )}
                      {result.dealType === 'fair' && (
                        <div className="space-y-3">
                          <Button
                            onClick={() => {
                              setShowEmailForm(true)
                              scrollToEmailForm()
                            }}
                            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 h-14 px-8 text-lg"
                            size="lg"
                          >
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Learn About Refinancing
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                          <p className="text-sm text-gray-600">
                            Discover if refinancing could save you money
                          </p>
                        </div>
                      )}
                      {result.dealType === 'poor' && (
                        <div className="space-y-3">
                          <Button
                            onClick={() => {
                              setShowEmailForm(true)
                              scrollToEmailForm()
                            }}
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-14 px-8 text-lg"
                            size="lg"
                          >
                            {loading ? (
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                              <Mail className="mr-2 h-5 w-5" />
                            )}
                            Get Help With Refinance
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </Button>
                          <p className="text-sm text-gray-600">
                            Connect with experts who can help you refinance
                          </p>
                        </div>
                      )}
                    </div>

                    {/* New Analysis Button */}
                    <div className="text-center pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={resetAnalysisState}
                        className="hover:bg-gray-100"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Analyze Another Deal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Email Form */}
        {showEmailForm && !emailSubmitted && (
          <section ref={emailFormRef} className="w-full py-16 bg-white">
            <div className="container px-4 md:px-6">
              <div className="max-w-xl mx-auto">
                <Card className="shadow-xl border-0">
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {result?.dealType === 'great'
                        ? 'Get Exclusive Offers'
                        : result?.dealType === 'fair'
                        ? 'Get Refinancing Info'
                        : 'Get Expert Help'}
                    </CardTitle>
                    <p className="text-gray-600">
                      {result?.dealType === 'great'
                        ? 'Enter your email to receive personalized HELOC offers'
                        : result?.dealType === 'fair'
                        ? 'Enter your email to get refinancing information and personalized recommendations'
                        : 'Enter your email to get personalized refinancing assistance'}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email Address
                          {(result?.dealType === 'poor' || result?.dealType === 'fair') && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="transition-all duration-200 focus:border-blue-500"
                          placeholder="your@email.com"
                          required={result?.dealType === 'poor' || result?.dealType === 'fair'}
                          disabled={loading}
                          aria-describedby={(result?.dealType === 'poor' || result?.dealType === 'fair') ? 'email-required' : undefined}
                        />
                        {(result?.dealType === 'poor' || result?.dealType === 'fair') && (
                          <p id="email-required" className="text-sm text-gray-500">
                            Email is required to get refinancing assistance
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            {result?.dealType === 'great' ? 'Get Offers' : result?.dealType === 'fair' ? 'Get Info' : 'Get Help'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
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
          <section className="w-full py-16 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container px-4 md:px-6">
              <div className="max-w-xl mx-auto text-center">
                <Card className="shadow-xl border-green-200 bg-white">
                  <CardContent className="p-12">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      We'll be in touch with personalized recommendations tailored to your situation.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Our experts will review your case within 24 hours</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Trust Indicators */}
        <section className="w-full py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Trust Our Analysis?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use reliable data and proven methodologies to give you accurate insights.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Federal Reserve Data</h3>
                <p className="text-gray-600">
                  Our analysis uses official FRED data from the Federal Reserve Bank of St. Louis.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Proven Methodology</h3>
                <p className="text-gray-600">
                  Our analysis compares your rate against historical averages for your loan term.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="text-gray-600">
                  Your information is protected with bank-level security and never shared.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Action Button */}
        {result && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => {
                resetAnalysisState()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Calculator className="h-6 w-6" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default DealAnalyzer
