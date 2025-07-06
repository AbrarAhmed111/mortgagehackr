'use client'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calculator,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Percent,
  Calendar,
  RefreshCw,
  Download,
  Copy,
  Info,
  AlertCircle,
  Sparkles,
  Zap,
  BarChart3,
  CreditCard,
  Home,
} from "lucide-react"
import Link from "next/link"
import { toast } from "react-hot-toast"

interface LoanCalculation {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principal: number
  interestRate: number
  term: number
  amortizationSchedule: Array<{
    payment: number
    principal: number
    interest: number
    remainingBalance: number
  }>
}

export default function CalculatorsPage() {
  const [loanAmount, setLoanAmount] = useState(250000)
  const [interestRate, setInterestRate] = useState(5.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(50000)
  const [propertyTax, setPropertyTax] = useState(3000)
  const [insurance, setInsurance] = useState(1200)
  const [pmi, setPmi] = useState(0)
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showAmortization, setShowAmortization] = useState(false)

  const calculateLoan = useCallback(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) return null

    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    const amortizationSchedule = []
    let remainingBalance = principal

    for (let payment = 1; payment <= Math.min(numberOfPayments, 360); payment++) {
      const interestPayment = remainingBalance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      remainingBalance = remainingBalance - principalPayment

      amortizationSchedule.push({
        payment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      })
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
      interestRate,
      term: loanTerm,
      amortizationSchedule
    }
  }, [loanAmount, interestRate, loanTerm, downPayment])

  const calculateTotalMonthlyPayment = useCallback(() => {
    if (!calculation) return 0
    const monthlyTax = propertyTax / 12
    const monthlyInsurance = insurance / 12
    const monthlyPmi = pmi / 12
    return calculation.monthlyPayment + monthlyTax + monthlyInsurance + monthlyPmi
  }, [calculation, propertyTax, insurance, pmi])

  const calculateLTV = useCallback(() => {
    if (loanAmount <= 0) return 0
    return ((loanAmount - downPayment) / loanAmount) * 100
  }, [loanAmount, downPayment])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
        setIsCalculating(true)
        const result = calculateLoan()
        setCalculation(result)
        setIsCalculating(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [loanAmount, interestRate, loanTerm, downPayment, calculateLoan])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleReset = () => {
    setLoanAmount(250000)
    setInterestRate(5.5)
    setLoanTerm(30)
    setDownPayment(50000)
    setPropertyTax(3000)
    setInsurance(1200)
    setPmi(0)
    setShowAmortization(false)
    toast.success('Calculator reset!')
  }

  const handleCopyResults = () => {
    if (!calculation) return
    const results = `Loan Calculator Results:\nMonthly Payment: ${formatCurrency(calculation.monthlyPayment)}\nTotal Payment: ${formatCurrency(calculation.totalPayment)}\nTotal Interest: ${formatCurrency(calculation.totalInterest)}`
    navigator.clipboard.writeText(results)
    toast.success('Results copied to clipboard!')
  }

  const handleExportCSV = () => {
    if (!calculation) return
    const headers = ['Payment #', 'Payment', 'Principal', 'Interest', 'Remaining Balance']
    const csvData = calculation.amortizationSchedule.map(row => [
      row.payment,
      formatCurrency(row.principal + row.interest),
      formatCurrency(row.principal),
      formatCurrency(row.interest),
      formatCurrency(row.remainingBalance)
    ])
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'loan-amortization-schedule.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    toast.success('Amortization schedule exported!')
  }

  const totalMonthlyPayment = calculateTotalMonthlyPayment()
  const ltv = calculateLTV()
  const isPMIRequired = ltv > 80

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <Badge variant="secondary" className="bg-green-500 text-white border-0 animate-fade-in">
                <Sparkles className="w-3 h-3 mr-1" /> Financial Calculators
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-fade-in-up">
                Powerful calculators for every financial decision
              </h1>
              <p className="text-xl text-blue-100 animate-fade-in-up delay-200">
                From loan payments to savings goals, our comprehensive suite of calculators helps you plan your
                financial future with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-4">
                  <Badge className="bg-green-500 text-white">
                    <Zap className="w-3 h-3 mr-1" /> Interactive Calculator
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loan Payment Calculator</h2>
                  <p className="text-lg text-gray-600">
                    Calculate monthly payments, total interest, and amortization schedules for any loan.
                  </p>
                </div>

                <Card className="p-6 shadow-xl hover:shadow-2xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-[#8cc63f]" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="loanAmount" className="text-sm font-medium">Loan Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="loanAmount"
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="pl-10"
                            placeholder="250000"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="interestRate" className="text-sm font-medium">Interest Rate (%)</Label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="interestRate"
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="pl-10"
                            placeholder="5.5"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Loan Term</Label>
                        <Slider
                          value={[loanTerm]}
                          onValueChange={(value) => setLoanTerm(value[0])}
                          max={30}
                          min={15}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>15 years</span>
                          <span>30 years</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="downPayment" className="text-sm font-medium">Down Payment</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="downPayment"
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="pl-10"
                            placeholder="50000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleReset} variant="outline" className="flex-1">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                      <Button onClick={handleCopyResults} variant="outline" className="flex-1">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 animate-fade-in-up delay-200">
                <div className="space-y-4">
                  <Badge className="bg-blue-500 text-white">
                    <BarChart3 className="w-3 h-3 mr-1" /> Results
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Payment Summary</h2>
                  <p className="text-lg text-gray-600">
                    See your complete payment breakdown and total costs.
                  </p>
                </div>

                {isCalculating ? (
                  <Card className="p-6 shadow-xl">
                    <CardContent className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin text-[#8cc63f] mx-auto mb-2" />
                        <p className="text-gray-600">Calculating...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : calculation ? (
                  <div className="space-y-6">
                    <Card className="p-6 shadow-xl hover:shadow-2xl transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <DollarSign className="mr-2 h-5 w-5 text-[#8cc63f]" />
                          Monthly Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-[#8cc63f] mb-2">
                          {formatCurrency(calculation.monthlyPayment)}
                        </div>
                        <p className="text-sm text-gray-600">Principal & Interest</p>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="p-4 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {formatCurrency(totalMonthlyPayment)}
                          </div>
                          <p className="text-sm text-gray-600">Total Monthly Payment</p>
                        </CardContent>
                      </Card>

                      <Card className="p-4 shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {formatCurrency(calculation.totalInterest)}
                          </div>
                          <p className="text-sm text-gray-600">Total Interest</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="p-6 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Info className="mr-2 h-5 w-5 text-[#8cc63f]" />
                          Additional Costs
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property Tax (monthly)</span>
                          <span className="font-medium">{formatCurrency(propertyTax / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Insurance (monthly)</span>
                          <span className="font-medium">{formatCurrency(insurance / 12)}</span>
                        </div>
                        {isPMIRequired && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">PMI (monthly)</span>
                            <span className="font-medium">{formatCurrency(pmi / 12)}</span>
                          </div>
                        )}
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total Monthly Payment</span>
                            <span>{formatCurrency(totalMonthlyPayment)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {isPMIRequired && (
                      <Card className="p-4 border-orange-200 bg-orange-50">
                        <CardContent className="flex items-start space-x-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-orange-800">PMI Required</h4>
                            <p className="text-sm text-orange-700">
                              Your loan-to-value ratio is {ltv.toFixed(1)}%. You'll need to pay Private Mortgage Insurance (PMI) until your LTV drops below 80%.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setShowAmortization(!showAmortization)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {showAmortization ? 'Hide' : 'Show'} Amortization
                      </Button>
                      <Button onClick={handleExportCSV} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Card className="p-6 shadow-xl">
                    <CardContent className="text-center py-8">
                      <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Enter loan details to see your payment breakdown</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Amortization Schedule */}
        {showAmortization && calculation && (
          <section className="w-full py-16 bg-gray-50 animate-fade-in-up">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Amortization Schedule</h2>
                  <p className="text-lg text-gray-600">
                    See how your payments are applied to principal and interest over time.
                  </p>
                </div>

                <Card className="shadow-xl">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Payment #</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Principal</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Remaining Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {calculation.amortizationSchedule.slice(0, 12).map((row) => (
                            <TableRow key={row.payment}>
                              <TableCell className="font-medium">{row.payment}</TableCell>
                              <TableCell>{formatCurrency(row.principal + row.interest)}</TableCell>
                              <TableCell>{formatCurrency(row.principal)}</TableCell>
                              <TableCell>{formatCurrency(row.interest)}</TableCell>
                              <TableCell>{formatCurrency(row.remainingBalance)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Additional Tools */}
        <section className="w-full py-16 animate-fade-in-up">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">More Financial Tools</h2>
              <p className="text-xl text-gray-600">
                Explore our complete suite of mortgage and financial calculators.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/deal-analyzer">
                <Card className="p-6 text-center hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-[#8cc63f]" />
                    </div>
                    <CardTitle className="text-lg">Deal Analyzer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Analyze your current mortgage deal</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Zap className="mr-2 h-4 w-4" />
                      Start Analysis
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/marketplace">
                <Card className="p-6 text-center hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up delay-100">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Home className="h-8 w-8 text-[#8cc63f]" />
                    </div>
                    <CardTitle className="text-lg">Marketplace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Compare mortgage offers</p>
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      <Zap className="mr-2 h-4 w-4" />
                      Browse Offers
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/contact">
                <Card className="p-6 text-center hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up delay-200">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Get Help</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Contact our experts</p>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      <Zap className="mr-2 h-4 w-4" />
                      Contact Us
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
