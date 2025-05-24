import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import {
  Calculator,
  DollarSign,
  Home,
  Car,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowRight,
  Percent,
  Calendar,
  PiggyBank,
} from "lucide-react"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Featured Calculator */}
        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-green-500 text-white">Most Popular</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loan Payment Calculator</h2>
                  <p className="text-lg text-gray-600">
                    Calculate monthly payments, total interest, and amortization schedules for any loan. Perfect for
                    planning your budget and comparing loan options.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span>Monthly payment calculations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Total interest and cost analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span>Complete amortization schedule</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600">
                    Use Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    See Example
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Card className="w-full max-w-md p-6 shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg">Loan Payment Calculator</CardTitle>
                    <CardDescription>Calculate your monthly payment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Amount</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="$25,000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interest Rate (%)</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="5.5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Term (years)</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="5" />
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600">Calculate Payment</Button>
                    <div className="text-center p-4 bg-gray-50 rounded-md">
                      <div className="text-2xl font-bold text-green-600">$475.78</div>
                      <div className="text-sm text-gray-600">Monthly Payment</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Categories */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">All Calculators</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive collection of financial calculators, each designed to help you make
                informed decisions.
              </p>
            </div>

            {/* Loan Calculators */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                Loan Calculators
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Personal Loan Calculator</CardTitle>
                    <CardDescription>Calculate payments for personal loans and debt consolidation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <Home className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Mortgage Calculator</CardTitle>
                    <CardDescription>Calculate mortgage payments, taxes, and insurance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Car className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Auto Loan Calculator</CardTitle>
                    <CardDescription>Calculate car loan payments and total costs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                      <Percent className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Refinance Calculator</CardTitle>
                    <CardDescription>Compare refinancing options and potential savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">Amortization Calculator</CardTitle>
                    <CardDescription>Generate detailed payment schedules and breakdowns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <TrendingUp className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-lg">Extra Payment Calculator</CardTitle>
                    <CardDescription>See how extra payments reduce loan terms and interest</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Credit & Debt Calculators */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-green-600" />
                Credit & Debt Calculators
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Credit Card Payoff</CardTitle>
                    <CardDescription>Calculate time and interest to pay off credit cards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Debt Consolidation</CardTitle>
                    <CardDescription>Compare consolidation options and potential savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Debt Snowball</CardTitle>
                    <CardDescription>Plan your debt payoff strategy with snowball method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Savings & Investment Calculators */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center">
                <PiggyBank className="h-6 w-6 mr-2 text-purple-600" />
                Savings & Investment Calculators
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <PiggyBank className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Savings Goal Calculator</CardTitle>
                    <CardDescription>Calculate how much to save to reach your goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Compound Interest</CardTitle>
                    <CardDescription>See how your money grows with compound interest</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Retirement Calculator</CardTitle>
                    <CardDescription>Plan for retirement and calculate needed savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Use Calculator
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Need personalized analysis?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Our Deal Analyzer goes beyond basic calculations to provide personalized loan recommendations based on
                your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  Try Deal Analyzer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                >
                  View All Tools
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
