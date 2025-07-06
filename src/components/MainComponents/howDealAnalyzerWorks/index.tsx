import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Database,
  BarChart3,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  Users,
  FileText,
  Globe,
  Search,
  PieChart,
  LineChart,
  Award,
  Info,
} from "lucide-react"
import Link from "next/link"

export default function HowDealAnalyzerWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                How It Works
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How Deal Analyzer Works</h1>
              <p className="text-xl text-blue-100">
                Discover how our advanced algorithm compares your mortgage rate against 50+ years of historical data 
                to give you an accurate assessment of your deal quality.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">The Science Behind Your Analysis</h2>
                <p className="text-xl text-gray-600">
                  Our Deal Analyzer uses real Federal Reserve data to give you an objective assessment of your mortgage rate.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl mb-8 text-center">
                  When you submit your mortgage details, our system doesn't just guess—it pulls actual historical 
                  interest rate data from the Federal Reserve Economic Data (FRED) database. This gives you a 
                  data-driven comparison that's based on real market conditions from your loan's start date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Process */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">The 4-Step Analysis Process</h2>
                <p className="text-xl text-gray-600">
                  From your input to your personalized results in seconds
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-4">
                {/* Step 1 */}
                <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-blue-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calculator className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-xl text-blue-900">Step 1: Input Your Data</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Enter your loan amount, interest rate, loan term (15 or 30 years), and when your loan started. 
                      We need this to compare against the right historical period.
                    </p>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-green-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Database className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-xl text-green-900">Step 2: Fetch Historical Data</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Our system queries the Federal Reserve database for the actual average mortgage rates during 
                      your loan's start month and year.
                    </p>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-purple-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-xl text-purple-900">Step 3: Calculate the Difference</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      We compare your rate against the historical average and calculate exactly how much better 
                      or worse your deal is compared to the market.
                    </p>
                  </CardContent>
                </Card>

                {/* Step 4 */}
                <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-orange-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-xl text-orange-900">Step 4: Get Your Rating</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Based on the difference, you receive a "Great," "Fair," or "Poor" rating with specific 
                      recommendations for your situation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Rating System */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Understanding Your Rating</h2>
                <p className="text-xl text-gray-600">
                  What "Great," "Fair," and "Poor" really mean for your mortgage
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Great Rating */}
                <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-green-200">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle className="text-2xl text-green-900">Great Deal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">Rate Difference</h4>
                          <p className="text-gray-600">0.25% or less above historical average</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">What It Means</h4>
                          <p className="text-gray-600">You got an excellent rate for your time period</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-800">Recommendation</h4>
                          <p className="text-gray-600">Consider HELOC options to leverage your great rate</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Fair Rating */}
                <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-yellow-200">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <CardTitle className="text-2xl text-yellow-900">Fair Deal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Rate Difference</h4>
                          <p className="text-gray-600">0.25% to 1.0% above historical average</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">What It Means</h4>
                          <p className="text-gray-600">Your rate is competitive but could be better</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Recommendation</h4>
                          <p className="text-gray-600">Explore refinancing options to potentially improve terms</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Poor Rating */}
                <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-red-200">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <XCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <CardTitle className="text-2xl text-red-900">Poor Deal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800">Rate Difference</h4>
                          <p className="text-gray-600">More than 1.0% above historical average</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800">What It Means</h4>
                          <p className="text-gray-600">You may be significantly overpaying on your mortgage</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800">Recommendation</h4>
                          <p className="text-gray-600">Strongly consider refinancing to save thousands</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powered by Real Federal Data</h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg border">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Database className="h-12 w-12 text-blue-600" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-gray-800">Federal Reserve Economic Data (FRED)</div>
                    <p className="text-lg text-gray-600">Official U.S. government mortgage rate data</p>
                  </div>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our analysis uses the same data that economists, policymakers, and financial institutions rely on. 
                  We pull from the <strong>MORTGAGE30US</strong> and <strong>MORTGAGE15US</strong> series, which track 
                  the average commitment rate for conventional 30-year and 15-year fixed-rate mortgages.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mt-12">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">50+ Years of Data</h3>
                  <p className="text-gray-600">Historical rates going back to 1971</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-[#8cc63f]" />
                  </div>
                  <h3 className="text-lg font-semibold">Real-Time Updates</h3>
                  <p className="text-gray-600">Fresh data from the Federal Reserve</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Government Verified</h3>
                  <p className="text-gray-600">Official U.S. government data source</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why This Analysis Matters</h2>
                <p className="text-xl text-gray-600">Small rate differences can have massive long-term impacts</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-6 w-6 text-[#8cc63f]" />
                      <CardTitle className="text-lg">The Power of 0.25%</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      A 0.25% rate difference on a $300,000 mortgage can save or cost you over $15,000 over 30 years. 
                      Our analysis helps you understand exactly where you stand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-[#8cc63f]" />
                      <CardTitle className="text-lg">Informed Decisions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Armed with real data, you can approach lenders with confidence, knowing exactly how your rate 
                      compares to historical market conditions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Example Analysis */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Example Analysis</h2>
                <p className="text-xl text-gray-600">See how the Deal Analyzer works with real numbers</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Sample Loan Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount</p>
                        <p className="text-lg font-semibold">$350,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p className="text-lg font-semibold">4.25%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Loan Term</p>
                        <p className="text-lg font-semibold">30 years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="text-lg font-semibold">March 2019</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl">Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Historical Average (March 2019)</span>
                        <span className="font-semibold">4.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Rate</span>
                        <span className="font-semibold">4.25%</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate Difference</span>
                          <span className="font-semibold text-green-600">-0.55% (Better)</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">Great Deal!</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          You got a rate 0.55% below the market average for March 2019.
                        </p>
                      </div>
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Analyze Your Deal?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Get your personalized mortgage analysis in seconds. Compare your rate against real historical data 
                and discover if you're getting a great deal or overpaying.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/deal-analyzer">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                    Analyze Your Deal Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                  >
                    Learn More About Us
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