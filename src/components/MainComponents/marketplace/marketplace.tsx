"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Filter,
  SortAsc,
  ExternalLink,
  Calendar,
} from "lucide-react"
import { getOffers } from "@/lib/actions/lenderOffers"
import LenderCardSkeleton from "@/components/ui/LenderCardSkeleton"

// Mock data for mortgage offers
const mortgageOffers = [
  {
    id: 1,
    lender_name: "Wells Fargo",
    lenderLogo: "WF",
    interest_rate: 6.875,
    apr: 7.125,
    loan_term: 30,
    eligibility: "Credit Score 620+",
    applyUrl: "/#",
    expiration_date: "2024-02-15",
    status: true,
    rating: 4.2,
    reviews: 1250,
    features: ["No PMI options", "First-time buyer programs", "Online application"],
    minLoanAmount: 100000,
    maxLoanAmount: 2000000,
  },
  {
    id: 2,
    lender_name: "Rocket Mortgage",
    lenderLogo: "RM",
    interest_rate: 6.75,
    apr: 6.95,
    loan_term: 30,
    eligibility: "Credit Score 580+",
    applyUrl: "/#",
    expiration_date: "2024-02-20",
    status: true,
    rating: 4.5,
    reviews: 2100,
    features: ["Fast approval", "Digital process", "Rate lock guarantee"],
    minLoanAmount: 50000,
    maxLoanAmount: 3000000,
  },
  {
    id: 3,
    lender_name: "Bank of America",
    lenderLogo: "BOA",
    interest_rate: 6.95,
    apr: 7.2,
    loan_term: 15,
    eligibility: "Credit Score 640+",
    applyUrl: "/#",
    expiration_date: "2024-02-10",
    status: true,
    rating: 4.1,
    reviews: 890,
    features: ["Preferred rewards discount", "No origination fee", "Local support"],
    minLoanAmount: 75000,
    maxLoanAmount: 1500000,
  },
  {
    id: 4,
    lender_name: "Chase Bank",
    lenderLogo: "CB",
    interest_rate: 6.825,
    apr: 7.075,
    loan_term: 30,
    eligibility: "Credit Score 600+",
    applyUrl: "/#",
    expiration_date: "2024-02-25",
    status: true,
    rating: 4.3,
    reviews: 1680,
    features: ["Relationship discounts", "Jumbo loan options", "Construction loans"],
    minLoanAmount: 80000,
    maxLoanAmount: 2500000,
  },
  {
    id: 5,
    lender_name: "Quicken Loans",
    lenderLogo: "QL",
    interest_rate: 7.125,
    apr: 7.35,
    loan_term: 15,
    eligibility: "Credit Score 620+",
    applyUrl: "/#",
    expiration_date: "2024-01-30",
    status: false,
    rating: 4.4,
    reviews: 1950,
    features: ["YOURgage program", "Expert guidance", "Technology-driven"],
    minLoanAmount: 60000,
    maxLoanAmount: 2000000,
  },
  {
    id: 6,
    lender_name: "Better Mortgage",
    lenderLogo: "BM",
    interest_rate: 6.625,
    apr: 6.825,
    loan_term: 30,
    eligibility: "Credit Score 600+",
    applyUrl: "/#!",
    expiration_date: "2024-03-01",
    status: true,
    rating: 4.6,
    reviews: 750,
    features: ["No origination fees", "Digital-first", "One-day verified approval"],
    minLoanAmount: 100000,
    maxLoanAmount: 3000000,
  },
]

// Click tracking function
const trackApplyClick = (lender: string, offerId: number) => {
  const clickData = {
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString(),
    lender: lender,
    offerId: offerId,
    timestamp: new Date().getTime(),
  }

  // Store in localStorage for demo purposes (in production, send to analytics service)
  const existingClicks = JSON.parse(localStorage.getItem("mortgageClickTracking") || "[]")
  existingClicks.push(clickData)
  localStorage.setItem("mortgageClickTracking", JSON.stringify(existingClicks))

  console.log("Click tracked:", clickData)
}


 
export default function MarketplacePage() {
  const [showInactive, setShowInactive] = useState(false)
  const [sortBy, setSortBy] = useState("rate")
  const [filterRate, setFilterRate] = useState({ min: 0, max: 10 })
  const [filterTerm, setFilterTerm] = useState("all")
  const [filterLender, setFilterLender] = useState("")
  const [offers, setOffers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    const loadOffers = async () => {
      const data = await getOffers()
      setOffers(data)
      setLoading(false)
    }

    loadOffers()
  }, [])


console.log("Market Data",offers)
console.log("Loading Market Data",loading)

  // Filter and sort offers
  const filteredAndSortedOffers = useMemo(() => {
    const filtered = offers.filter((offer) => {
      // Active/Inactive filter
      if (!showInactive && !offer.status) return false

      // Interest rate filter
      if (offer.interest_rate < filterRate.min || offer.interest_rate > filterRate.max) return false

      // Loan term filter
      if (filterTerm !== "all" && offer.loan_term.toString() !== filterTerm) return false

      // Lender name filter
      if (filterLender && !offer.lender_name.toLowerCase().includes(filterLender.toLowerCase())) return false

      return true
    })

    // Sort offers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rate":
          return a.interest_rate - b.interest_rate
        case "newest":
          return b.id - a.id // Assuming higher ID = newer
        case "expiration":
          return new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [showInactive, sortBy, filterRate, filterTerm, filterLender,offers])

  const handleApplyClick = (offer: any) => {
    trackApplyClick(offer.lender_name, offer.id)
    window.open(offer.applyUrl || "/#", "_blank")
  }

 

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                Mortgage Marketplace
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Compare mortgage rates from top lenders</h1>
              <p className="text-xl text-blue-100">
                Find the best mortgage deals with competitive rates and terms. Compare offers from trusted lenders and
                apply directly through our marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  View Current Rates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-900 h-14 px-8"
                >
                  Get Pre-Qualified
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search Section */}
        <section className="w-full py-8 bg-gray-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="space-y-6">
              {/* Search and Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold">Mortgage Offers</h2>
                  <Badge variant="outline">{filteredAndSortedOffers.length} offers available</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showInactive}
                      onChange={(e) => setShowInactive(e.target.checked)}
                      className="rounded"
                    />
                    <span>Show inactive offers</span>
                  </label>
                </div>
              </div>

              {/* Filters */}
              <div className="grid gap-4 md:grid-cols-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    Interest Rate Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.1"
                      value={filterRate.min}
                      onChange={(e) =>
                        setFilterRate((prev) => ({ ...prev, min: Number.parseFloat(e.target.value) || 0 }))
                      }
                      className="w-full p-2 border rounded text-sm"
                      placeholder="Min %"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={filterRate.max}
                      onChange={(e) =>
                        setFilterRate((prev) => ({ ...prev, max: Number.parseFloat(e.target.value) || 10 }))
                      }
                      className="w-full p-2 border rounded text-sm"
                      placeholder="Max %"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Term</label>
                  <select
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="all">All Terms</option>
                    <option value="15">15 Years</option>
                    <option value="30">30 Years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Lender Name</label>
                  <input
                    type="text"
                    value={filterLender}
                    onChange={(e) => setFilterLender(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Search lenders..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <SortAsc className="h-4 w-4 mr-1" />
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="rate">Lowest Interest Rate</option>
                    <option value="newest">Newest Offers</option>
                    <option value="expiration">Soonest Expiration</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterRate({ min: 0, max: 10 })
                      setFilterTerm("all")
                      setFilterLender("")
                      setSortBy("rate")
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mortgage Offers */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            {loading === true ? 
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
               {[...Array(6)].map((_, index) => (
        <LenderCardSkeleton key={index} />
      ))}
            </div> : 
            filteredAndSortedOffers.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No offers match your criteria</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterRate({ min: 0, max: 10 })
                    setFilterTerm("all")
                    setFilterLender("")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {filteredAndSortedOffers.map((offer) => (
                  <Card
                    key={offer.id}
                    className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
                      !offer.status ? "opacity-60 bg-gray-50" : ""
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {!offer.status ? (
                        <Badge variant="secondary" className="bg-gray-400 text-white">
                          Inactive
                        </Badge>
                      ) : new Date(offer.expiration_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? (
                        <Badge variant="destructive">Expires Soon</Badge>
                      ) : (
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      )}
                    </div>

                    <CardHeader className="pb-4">
                      {/* Lender Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {offer.lenderLogo}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{offer.lender_name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(offer?.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {offer?.rating || 0} ({offer?.reviews?.toLocaleString() || 0} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rate Information */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#8cc63f]">{offer.interest_rate}%</div>
                          <div className="text-sm text-gray-600">Interest Rate</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-[#8cc63f]">{offer.apr}%</div>
                          <div className="text-sm text-gray-600">APR</div>
                        </div>
                      </div>

                      {/* Loan Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Term:</span>
                          <span className="font-medium">{offer.loan_term} years</span>
                        </div>
                        {offer.eligibility && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">eligibility:</span>
                            <span className="font-medium">{offer.eligibility}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Range:</span>
                          <span className="font-medium">
                            ${(offer.minLoanAmount / 1000).toFixed(0)}K - ${(offer.maxLoanAmount / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expires:</span>
                          <span className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(offer.expiration_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Features */}
                      {/* <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        <div className="space-y-1">
                          {offer.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-[#8cc63f]" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div> */}

                      {/* Apply Button */}
                      <Button
                        className={`w-full h-12 ${
                          offer.status ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!offer.status}
                        onClick={() => handleApplyClick(offer)}
                      >
                        {offer.status ? (
                          <>
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          "Offer Expired"
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Clicking "Apply Now" will redirect to {offer.lender_name}'s website
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
            }
          </div>
        </section>

        {/* Trust & Security */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Our Marketplace</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We work only with reputable, licensed lenders and protect your information with bank-level security.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#8cc63f]" />
                </div>
                <h3 className="text-xl font-semibold">Verified Lenders Only</h3>
                <p className="text-gray-600">
                  All lenders in our marketplace are licensed, regulated, and thoroughly vetted for your protection.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-[#8cc63f]" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Rates</h3>
                <p className="text-gray-600">
                  Our rates are updated daily to ensure you're seeing the most current offers available in the market.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Always Free</h3>
                <p className="text-gray-600">
                  Our marketplace is completely free to use. We're compensated by lenders, never by borrowers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your perfect mortgage?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Compare rates from top lenders and find the mortgage that fits your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  Get Pre-Qualified Now
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
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
