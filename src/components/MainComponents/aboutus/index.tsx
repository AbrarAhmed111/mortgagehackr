import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Target,
  Award,
  Shield,
  TrendingUp,
  Calculator,
  Database,
  BarChart3,
  MessageSquare,
  DollarSign,
  ArrowRight,
  Eye,
  Compass,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About MortgageHackr │ Our Mission & Story",
  description:
    "We turn complex mortgage math into simple, actionable insights—so every borrower negotiates with confidence.",
  openGraph: {
    title: "About MortgageHackr",
  },
  twitter: {
    title: "About MortgageHackr",
  },
}


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                About MortgageHackr.net
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Unlock Better Deals</h1>
              <p className="text-xl text-blue-100">
                We're former automotive executives who bring data-driven deal-making expertise to the mortgage industry,
                helping homeowners get the agility that car shoppers enjoy.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">About Us</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl mb-8">
                  We're a group of former automotive executives who mastered data-driven deal-making and negotiations.
                  When we looked at our own mortgages, we noticed home-buyers lack the agility car shoppers enjoy: you
                  can walk out of one dealership and straight into another, but refinancing or switching lenders
                  involves weeks of paperwork, credit pulls, and underwriting—so most people won't even try and simply
                  settle for the rate they're handed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Mission & Vision</h2>
                <p className="text-xl text-gray-600">
                  Driving our commitment to empowering borrowers with data and insights.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Vision */}
                <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-blue-100">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-2xl text-blue-900">Our Vision</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Empower every borrower with transparent data and peer-driven insights—so they navigate the
                      mortgage decision with confidence and unlock tens of thousands of dollars in savings over the life
                      of their loan.
                    </p>
                  </CardContent>
                </Card>

                {/* Mission */}
                <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-green-100">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Compass className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-2xl text-green-900">Our Mission</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Turn 50+ years of mortgage-rate data and peer insight into simple, actionable tools—empowering
                      every borrower to explore offers, compare options, and confidently make the mortgage decision
                      that's right for them.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What We Built */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What We Built</h2>
                <p className="text-xl text-gray-600">
                  Powerful tools that give you the data and community support you need to get better mortgage deals.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Mortgage Deal Analyzer */}
                <Card className="p-8 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calculator className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-2xl">Mortgage Deal Analyzer</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Database className="h-5 w-5 text-[#8cc63f] mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">50+ Years of Rate Data</h4>
                          <p className="text-gray-600">Pulls daily rate data going back to 1971</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <BarChart3 className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Market Comparison</h4>
                          <p className="text-gray-600">
                            Compares any quote—or your closed loan from years ago—against the market on that exact date
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Savings Calculator</h4>
                          <p className="text-gray-600">
                            Calculates how much you overpaid or saved, and projects today's savings if you refinance or
                            renegotiate
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Try Deal Analyzer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Independent Consumer Forum */}
                <Card className="p-8 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <CardTitle className="text-2xl">Independent Consumer Forum</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-[#8cc63f] mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Bias-Free Community</h4>
                          <p className="text-gray-600">No ads, no sponsored content—just honest discussions</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Real Stories & Strategies</h4>
                          <p className="text-gray-600">
                            Homeowners share actual experiences and successful negotiation tactics
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Success Tips</h4>
                          <p className="text-gray-600">
                            Learn from others who've successfully saved thousands on their mortgages
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Join Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why It Matters</h2>

              <div className="bg-gradient-to-r from-red-50 to-green-50 p-8 rounded-lg border">
                <div className="text-6xl font-bold text-gray-800 mb-4">0.25%</div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  A <strong>0.25% rate gap</strong> can cost—or save—<strong>tens of thousands</strong> over 30 years.
                  We give you the hard numbers and peer insight so you can approach your lender with confidence.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mt-12">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Know Your Position</h3>
                  <p className="text-gray-600">Understand exactly where you stand compared to market rates</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-[#8cc63f]" />
                  </div>
                  <h3 className="text-lg font-semibold">Negotiate with Confidence</h3>
                  <p className="text-gray-600">Armed with data and community insights for better outcomes</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="h-8 w-8 text-[#8cc63f]" />
                  </div>
                  <h3 className="text-lg font-semibold">Save Thousands</h3>
                  <p className="text-gray-600">Small rate improvements compound to massive long-term savings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Background */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Background</h2>
                <p className="text-xl text-gray-600">Bringing automotive industry expertise to mortgage deal-making</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-6 w-6 text-[#8cc63f]" />
                      <CardTitle className="text-lg">Automotive Expertise</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Years of experience in automotive sales and negotiations taught us how data-driven approaches and
                      competitive shopping create better outcomes for consumers.
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-[#8cc63f]" />
                      <CardTitle className="text-lg">Consumer Advocacy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We believe every homeowner deserves the same negotiating power and market transparency that savvy
                      car buyers have enjoyed for decades.
                    </p>
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to MortgageHackr.net</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Ready to unlock better deals? Start with our Deal Analyzer and join thousands of homeowners who've taken
                control of their mortgage costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  Analyze Your Deal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                >
                  Join Our Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
