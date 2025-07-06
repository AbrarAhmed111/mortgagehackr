'use client'
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Home,
  Car,
  ArrowRight,
  CheckCircle,
  Star,
  PhoneCall,
  BarChart2,
  Loader2,
  Zap,
  Users,
  Award,
  Eye,
  Lock,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

const HomePage = () => {
  const [ipFetched, setIpFetched] = useState(false)
  const [userIp, setUserIp] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFormValid, setIsFormValid] = useState<any>(false)

  const router = useRouter()
  const [formData, setFormData] = useState({
    loanStartDate: '',
    loanTerm: '30',
    loanAmount: '',
    interestRate: '',
  })

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

  useEffect(() => {
    console.log('Browser:', getBrowserName())
    getIpAddress()
  }, [])

  // Validate form in real-time
  useEffect(() => {
    const isValid = formData.loanStartDate && 
                   formData.loanAmount && 
                   formData.interestRate &&
                   parseFloat(formData.loanAmount) > 0 &&
                   parseFloat(formData.interestRate) > 0
    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      toast.error('Please fill in all required fields with valid values')
      return
    }

    setIsLoading(true)

    try {
      const dataToStore = {
        ...formData,
        userIp: userIp || '0.0.0.0',
        fromHomePage: true,
      }

      const expiryTime = Date.now() + (5 * 60 * 1000)
      localStorage.setItem('quickAnalysisData', JSON.stringify({
        data: dataToStore,
        expiry: expiryTime
      }))

      toast.success('Redirecting to analysis...')
      
      // Simulate loading for better UX
      setTimeout(() => {
        router.push('/deal-analyzer')
      }, 1000)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: string) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - Enhanced */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
          
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col space-y-6">
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="w-fit bg-green-500 text-white border-0 animate-fade-in"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered Analysis • No Credit Impact
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl animate-fade-in-up">
                    Where smart loans meet{' '}
                    <span className="text-green-400">confident decisions</span>
                  </h1>
                  <p className="text-xl text-blue-100 max-w-[600px] animate-fade-in-up delay-200">
                    Get personalized loan insights, compare rates, and make
                    informed financial decisions. Our AI-powered analysis helps
                    you find the best loan options without affecting your credit
                    score.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                  <Link href="/deal-analyzer">
                    <Button
                      size="lg"
                      className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Analyze My Loan Options
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <Link href="/how-deal-analyzer-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 border-white text-black hover:bg-white hover:text-blue-900 transition-all duration-300"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      See How It Works
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-blue-100 animate-fade-in-up delay-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Always free</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span>No credit check</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-80 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
                      <p className="text-blue-100 text-sm">
                        AI-powered insights in seconds
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Market Rate:</span>
                          <span className="text-green-400">6.25%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Your Rate:</span>
                          <span className="text-yellow-400">6.75%</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Potential Savings:</span>
                          <span className="text-green-400">$45,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Trust Indicators */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 font-medium">
                Trusted by over 100,000+ borrowers nationwide
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
              <div className="text-2xl font-bold text-gray-400">INTUIT</div>
              <div className="text-2xl font-bold text-gray-400">EXPERIAN</div>
              <div className="text-2xl font-bold text-gray-400">EQUIFAX</div>
              <div className="text-2xl font-bold text-gray-400">TRANSUNION</div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Our Tools</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Everything you need to make smart loan decisions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From personal loans to mortgages, our comprehensive tools help
                you compare options, understand terms, and get the best rates
                available.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <Link href="/marketplace">
                <Card className="text-center md:min-h-[300px] p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <Home className="h-8 w-8 text-[#8cc63f] group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-lg">Mortgages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Find the best mortgage rates and calculate payments for your dream home.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/calculators">
                <Card className="text-center md:min-h-[300px] p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                      <Calculator className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-lg">Loan Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Calculate payments, interest, and total costs for any loan scenario.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/contact">
                <Card className="text-center md:min-h-[300px] p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <PhoneCall className="h-8 w-8 text-[#8cc63f] group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-lg">Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Reach out to us for personalized support and answers to your questions.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/deal-analyzer">
                <Card className="text-center md:min-h-[300px] p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <BarChart2 className="h-8 w-8 text-[#8cc63f] group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-lg">Deal Analyzer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Instantly analyze how your mortgage compares to market trends.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced Deal Analyzer CTA Section */}
        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-green-500 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    Featured Tool
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Smart Deal Analyzer
                  </h2>
                  <p className="text-lg text-gray-600">
                    Our AI-powered analyzer evaluates your loan terms and finds
                    better options. Just provide basic information and get
                    personalized recommendations in seconds.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#8cc63f]" />
                    <span>Flexible input - provide what you know</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#8cc63f]" />
                    <span>Instant analysis and recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#8cc63f]" />
                    <span>No credit check required</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/deal-analyzer">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600">
                      <Zap className="mr-2 h-4 w-4" />
                      Try Deal Analyzer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <Card className="w-full max-w-md p-6 shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg flex items-center justify-center">
                      <BarChart2 className="mr-2 h-5 w-5 text-green-500" />
                      Quick Analysis
                    </CardTitle>
                    <CardDescription>
                      Get started with basic loan info
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="loanStartDate" className="text-sm font-medium">
                          Loan Start Date
                        </Label>
                        <Input
                          id="loanStartDate"
                          type="month"
                          value={formData.loanStartDate}
                          onChange={e => handleInputChange('loanStartDate', e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loanAmount" className="text-sm font-medium">
                          Loan Amount
                        </Label>
                        <Input
                          id="loanAmount"
                          type="text"
                          value={formData.loanAmount ? formatCurrency(formData.loanAmount) : ''}
                          onChange={e => handleCurrencyInput(e.target.value)}
                          className="w-full"
                          placeholder="$400,000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interestRate" className="text-sm font-medium">
                          Interest Rate (%)
                        </Label>
                        <Input
                          id="interestRate"
                          type="number"
                          step="0.01"
                          value={formData.interestRate}
                          onChange={e => handleInputChange('interestRate', e.target.value)}
                          className="w-full"
                          placeholder="6.75"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Loan Term</Label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              value="15"
                              checked={formData.loanTerm === '15'}
                              onChange={e => handleInputChange('loanTerm', e.target.value)}
                              className="text-blue-600"
                            />
                            <span>15 years</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              value="30"
                              checked={formData.loanTerm === '30'}
                              onChange={e => handleInputChange('loanTerm', e.target.value)}
                              className="text-blue-600"
                            />
                            <span>30 years</span>
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Analyze My Deal
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Why Choose Us Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why millions trust our loan analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with financial expertise to
                give you the insights you need to make confident loan decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Shield className="h-8 w-8 text-[#8cc63f] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold">Bank-Level Security</h3>
                <p className="text-gray-600">
                  Your financial data is protected with 256-bit encryption and
                  never shared without your permission.
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-[#8cc63f] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze thousands of loan options to
                  find the best deals for your situation.
                </p>
              </div>

              <div className="text-center space-y-4 group">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Clock className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-gray-600">
                  Get personalized loan recommendations in seconds, not days. No
                  waiting, no paperwork required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-100 text-yellow-800">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Real stories from real borrowers
              </h2>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">
                  4.8/5 from 50,000+ reviews
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "Saved me $3,200 by finding a better refinance option. The
                    analysis was spot-on and the process was incredibly easy."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Maria Rodriguez</p>
                      <p className="text-sm text-gray-500">
                        Homeowner, Austin TX
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "Finally understood my loan terms and found out I was
                    overpaying. Got a better rate within a week!"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      J
                    </div>
                    <div>
                      <p className="font-medium">James Chen</p>
                      <p className="text-sm text-gray-500">
                        Small Business Owner
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "The deal analyzer showed me exactly what to expect. No
                    surprises, just honest analysis and great recommendations."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">
                        First-time Homebuyer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to make smarter loan decisions?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join over 100,000 borrowers who have saved money and gained
                confidence with our loan analysis tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/deal-analyzer">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Your Free Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8 transition-all duration-300"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span>No Credit Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
