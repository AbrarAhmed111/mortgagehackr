import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col min-h-screen">

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
                    <DollarSign className="h-5 w-5 text-[#8cc63f]" />
                    <span>Monthly payment calculations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-[#8cc63f]" />
                    <span>Total interest and cost analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#8cc63f]" />
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
                      <div className="text-2xl font-bold text-[#8cc63f]">$475.78</div>
                      <div className="text-sm text-gray-600">Monthly Payment</div>
                    </div>
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

    </div>
  )
}
