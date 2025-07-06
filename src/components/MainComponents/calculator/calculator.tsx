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
        const result = calculateLoan()
        setCalculation(result)
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
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                Financial Calculators
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Powerful calculators for every financial decision
              </h1>
              <p className="text-xl text-blue-100">
                From loan payments to savings goals, our comprehensive suite of calculators helps you plan your
                financial future with confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-green-500 text-white">Interactive Calculator</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loan Payment Calculator</h2>
                  <p className="text-lg text-gray-600">
                    Calculate monthly payments, total interest, and amortization schedules for any loan.
                  </p>
                </div>

                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Home Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          className="pl-10"
                          placeholder="250,000"
                        />
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={([value]: number[]) => setLoanAmount(value)}
                        max={1000000}
                        min={50000}
                        step={1000}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">${loanAmount.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="downPayment"
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="pl-10"
                          placeholder="50,000"
                        />
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={([value]: number[]) => setDownPayment(value)}
                        max={loanAmount}
                        min={0}
                        step={1000}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">
                        ${downPayment.toLocaleString()} ({((downPayment / loanAmount) * 100).toFixed(1)}%)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="interestRate"
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="pl-10"
                          placeholder="5.5"
                          step="0.1"
                        />
                      </div>
                      <Slider
                        value={[interestRate]}
                        onValueChange={([value]: number[]) => setInterestRate(value)}
                        max={15}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">{interestRate}%</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[15, 20, 30].map((term) => (
                          <Button
                            key={term}
                            variant={loanTerm === term ? "default" : "outline"}
                            onClick={() => setLoanTerm(term)}
                            className="w-full"
                          >
                            {term} years
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-semibold">Additional Monthly Costs</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="propertyTax">Property Tax (annual)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="propertyTax"
                              type="number"
                              value={propertyTax}
                              onChange={(e) => setPropertyTax(Number(e.target.value))}
                              className="pl-10"
                              placeholder="3,000"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="insurance">Insurance (annual)</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="insurance"
                              type="number"
                              value={insurance}
                              onChange={(e) => setInsurance(Number(e.target.value))}
                              className="pl-10"
                              placeholder="1,200"
                            />
                          </div>
                        </div>
                      </div>

                      {isPMIRequired && (
                        <div className="space-y-2">
                          <Label htmlFor="pmi" className="flex items-center gap-2">
                            PMI (annual)
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          </Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="pmi"
                              type="number"
                              value={pmi}
                              onChange={(e) => setPmi(Number(e.target.value))}
                              className="pl-10"
                              placeholder="0"
                            />
                          </div>
                          <p className="text-sm text-orange-600">
                            PMI is typically required when down payment is less than 20%
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button 
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1"
                      >
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {calculation ? (
                  <>
                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                          Payment Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {formatCurrency(calculation.monthlyPayment)}
                            </div>
                            <div className="text-sm text-gray-600">Principal & Interest</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(totalMonthlyPayment)}
                            </div>
                            <div className="text-sm text-gray-600">Total Monthly Payment</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Principal & Interest:</span>
                            <span className="font-semibold">{formatCurrency(calculation.monthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Property Tax:</span>
                            <span className="font-semibold">{formatCurrency(propertyTax / 12)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Insurance:</span>
                            <span className="font-semibold">{formatCurrency(insurance / 12)}</span>
                          </div>
                          {pmi > 0 && (
                            <div className="flex justify-between">
                              <span>PMI:</span>
                              <span className="font-semibold">{formatCurrency(pmi / 12)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-bold">
                              <span>Total Monthly Payment:</span>
                              <span>{formatCurrency(totalMonthlyPayment)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="h-5 w-5 text-blue-500" />
                          Loan Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Loan Amount:</span>
                          <span className="font-semibold">{formatCurrency(calculation.principal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span className="font-semibold">{calculation.interestRate.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loan Term:</span>
                          <span className="font-semibold">{calculation.term} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Loan-to-Value (LTV):</span>
                          <span className="font-semibold">{ltv.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">{formatCurrency(calculation.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Payment:</span>
                          <span className="font-semibold">{formatCurrency(calculation.totalPayment)}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => setShowAmortization(!showAmortization)}
                        variant="outline"
                        className="flex-1"
                      >
                        {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                      </Button>
                      <Button 
                        onClick={handleCopyResults}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Results
                      </Button>
                      <Button 
                        onClick={handleExportCSV}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                    </div>

                    {showAmortization && (
                      <Card className="p-6">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-purple-500" />
                            Amortization Schedule
                          </CardTitle>
                          <CardDescription>
                            First 12 payments of your loan
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
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
                                    <TableCell>{row.payment}</TableCell>
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
                    )}
                  </>
                ) : (
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Enter Loan Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Fill in the loan details on the left to see your payment calculations.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Need personalized analysis?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Our Deal Analyzer goes beyond basic calculations to provide personalized loan recommendations based on
                your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/deal-analyzer">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                    Try Deal Analyzer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
