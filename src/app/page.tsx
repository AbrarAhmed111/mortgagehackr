import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
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
} from "lucide-react"
import Image from "next/image"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit bg-green-500 text-white border-0">
                    ✓ Free Analysis • No Credit Impact
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                    Where smart loans meet confident decisions
                  </h1>
                  <p className="text-xl text-blue-100 max-w-[600px]">
                    Get personalized loan insights, compare rates, and make informed financial decisions. Our AI-powered
                    analysis helps you find the best loan options without affecting your credit score.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white font-semibold">
                    Analyze My Loan Options
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 border-white text-black hover:bg-white hover:text-blue-900"
                  >
                    See How It Works
                  </Button>
                </div>
                <div className="flex items-center space-x-6 text-sm text-blue-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Always free</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>No credit check</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Instant results</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=500&width=300"
                    width="300"
                    height="500"
                    alt="Loan Analysis Dashboard"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 font-medium">Trusted by over 100,000+ borrowers nationwide</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
              <div className="text-2xl font-bold text-gray-400">INTUIT</div>
              <div className="text-2xl font-bold text-gray-400">EXPERIAN</div>
              <div className="text-2xl font-bold text-gray-400">EQUIFAX</div>
              <div className="text-2xl font-bold text-gray-400">TRANSUNION</div>
            </div>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Everything you need to make smart loan decisions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From personal loans to mortgages, our comprehensive tools help you compare options, understand terms,
                and get the best rates available.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Personal Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Compare rates from top lenders for debt consolidation, home improvement, and more.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Mortgages</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Find the best mortgage rates and calculate payments for your dream home.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Car className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Auto Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get pre-qualified for auto financing and compare dealer vs. bank rates.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Loan Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Calculate payments, interest, and total costs for any loan scenario.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Deal Analyzer CTA Section */}
        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-green-500 text-white">Featured Tool</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Smart Deal Analyzer</h2>
                  <p className="text-lg text-gray-600">
                    Our AI-powered analyzer evaluates your loan terms and finds better options. Just provide basic
                    information and get personalized recommendations in seconds.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Flexible input - provide what you know</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Instant analysis and recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No credit check required</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600">
                    Try Deal Analyzer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    See Example Analysis
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <Card className="w-full max-w-md p-6 shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg">Quick Analysis</CardTitle>
                    <CardDescription>Get started with basic loan info</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Start Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        placeholder="When did your loan start?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loan Term (months)</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="e.g., 60" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Monthly Payment</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="$0.00" />
                    </div>
                    <div className="text-center text-sm text-gray-500">+ Loan Amount OR Interest Rate (optional)</div>
                    <Button className="w-full bg-green-500 hover:bg-green-600">Analyze My Deal</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why millions trust our loan analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine cutting-edge technology with financial expertise to give you the insights you need to make
                confident loan decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Bank-Level Security</h3>
                <p className="text-gray-600">
                  Your financial data is protected with 256-bit encryption and never shared without your permission.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Our advanced algorithms analyze thousands of loan options to find the best deals for your situation.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-gray-600">
                  Get personalized loan recommendations in seconds, not days. No waiting, no paperwork required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Real stories from real borrowers</h2>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-semibold">4.8/5 from 50,000+ reviews</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "Saved me $3,200 by finding a better refinance option. The analysis was spot-on and the process was
                    incredibly easy."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Maria Rodriguez</p>
                      <p className="text-sm text-gray-500">Homeowner, Austin TX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "Finally understood my loan terms and found out I was overpaying. Got a better rate within a week!"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      J
                    </div>
                    <div>
                      <p className="font-medium">James Chen</p>
                      <p className="text-sm text-gray-500">Small Business Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700">
                    "The deal analyzer showed me exactly what to expect. No surprises, just honest analysis and great
                    recommendations."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">First-time Homebuyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to make smarter loan decisions?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join over 100,000 borrowers who have saved money and gained confidence with our loan analysis tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  Start Your Free Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No Credit Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
