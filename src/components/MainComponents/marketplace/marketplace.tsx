"use client"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Star,
  Shield,
  Clock,
  DollarSign,
  ArrowRight,
  Filter,
  SortAsc,
  ExternalLink,
  Calendar,
  Loader2Icon,
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react"
import { logApplyNowClick } from "@/lib/actions/lenderOffers"
import { lenderOffersApi } from "@/utils/api"
import LenderCardSkeleton from "@/components/ui/LenderCardSkeleton"
import toast from "react-hot-toast"
import { Offer } from "@/utils/types"
import { useRouter } from "next/navigation";
import Link from "next/link"
import PreQualificationModal from "@/components/MainComponents/Modals/PreQualificationModal"

// Mock data for mortgage offers

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
  const [showInactive, setShowInactive] = useState(true)
  const [sortBy, setSortBy] = useState("rate")
  const [filterRate, setFilterRate] = useState({ min: 0, max: 20 })
  const [filterTerm, setFilterTerm] = useState("0")
  const [filterLender, setFilterLender] = useState("")
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingOfferId, setLoadingOfferId] = useState("")
  const [userIp, setuserIp] = useState("")
  const [userAgent, setUserAgent] = useState("")

  const [showPreQualModal, setShowPreQualModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        
        // Build filters object
        const filters: any = {}
        
        // Only add filters if they have meaningful values
        if (filterRate.min > 0 || filterRate.max < 20) {
          filters.interestRateMin = filterRate.min
          filters.interestRateMax = filterRate.max
        }
        
        if (filterLender.trim()) {
          filters.lenderName = filterLender.trim()
        }
        
        if (filterTerm !== "0") {
          filters.loanTerm = parseInt(filterTerm, 10)
        }
        
        // Status filter - showInactive controls whether to show inactive offers
        // If showInactive is true, we want to show ALL offers (both active and inactive)
        // If showInactive is false, we only want to show active offers (status: true)
        if (!showInactive) {
          filters.status = true
        }

        let data = await lenderOffersApi.getOffers(filters);
        
        console.log('Filters applied:', filters);
        console.log('Data received:', data);

        // Apply sorting on the frontend
        data.sort((a: any, b: any) => {
          switch (sortBy) {
            case "rate":
              return a.interest_rate - b.interest_rate;
            case "newest":
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case "expiration":
              return new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime();
            default:
              return 0;
          }
        });

        setOffers(data);
      } catch (error) {
        console.error("Failed to load offers:", error);
        toast.error("Failed to load mortgage offers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, [showInactive, filterRate, filterTerm, filterLender, sortBy]);

  console.log("Market Data", offers)

  //Apply Offer Functions
  const handleApplyClick = async (offer: Offer) => {
    try {
      setLoadingOfferId(offer.id); // Show loading spinner for the clicked offer

      trackApplyClick(offer.lender_name, parseInt(offer.id, 10));

      const lenderOfferId = offer.id;

      const data = await logApplyNowClick({ lenderOfferId, userIp, userAgent });

      if (data?.success === true) {
        toast.success(data.message || "Application submitted successfully.");
        setTimeout(() => {
          window.open(offer.cta_link, '_blank'); // replace with your actual route
        }, 2000);

      } else {
        toast.error(data?.message || "Something went wrong while applying.");
      }
    } catch (error: any) {
      console.error("Error applying for offer:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoadingOfferId(""); // Always reset loading state
    }
  };

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) {
      return "Chrome";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      return "Safari";
    } else if (userAgent.includes("Firefox")) {
      return "Firefox";
    } else if (userAgent.includes("Edg")) {
      return "Edge";
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
      return "Opera";
    } else {
      return "Unknown";
    }
  };

  const getIpAddress = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      console.log("IP Address:", data.ip);
      setuserIp(data.ip)
    } catch (error) {
      console.error("Error getting IP address:", error);
    }
  };

  useEffect(() => {
    console.log("Browser:", getBrowserName());
    setUserAgent(getBrowserName())
    getIpAddress();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <Badge variant="secondary" className="bg-green-500 text-white border-0 animate-fade-in">
                <Sparkles className="w-3 h-3 mr-1" /> Mortgage Marketplace
              </Badge>
              <h1 className="text-4xl capitalize relative z-10 font-bold tracking-tight sm:text-5xl animate-fade-in-up">
                Compare mortgage rates from top lenders
              </h1>
              <p className="text-xl text-blue-100 animate-fade-in-up delay-200">
                Find the best mortgage deals with competitive rates and terms. Compare offers from trusted lenders and
                apply directly through our marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="w-full py-8 bg-gray-50 border-b animate-fade-in-up">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rate">Lowest Rate</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="expiration">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showInactive"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="showInactive" className="text-sm">
                    Show inactive offers
                  </Label>
                </div>
                <Badge variant="outline">
                  {offers.length} offers available
                </Badge>
                <Button
                  onClick={() => setShowPreQualModal(true)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Get Pre-Qualified
                </Button>
             
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Interest Rate Range (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[filterRate.min, filterRate.max]}
                        onValueChange={(value) => setFilterRate({ min: value[0], max: value[1] })}
                        max={20}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{filterRate.min}%</span>
                        <span>{filterRate.max}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Term</Label>
                    <Select value={filterTerm} onValueChange={setFilterTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">All Terms</SelectItem>
                        <SelectItem value="15">15 Years</SelectItem>
                        <SelectItem value="20">20 Years</SelectItem>
                        <SelectItem value="30">30 Years</SelectItem>
                        <SelectItem value="360">30 Years (360 months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Lender</Label>
                    <Input
                      placeholder="Search lenders..."
                      value={filterLender}
                      onChange={(e) => setFilterLender(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Offers Grid */}
        <section className="w-full py-16">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <LenderCardSkeleton key={i} />
                ))}
              </div>
            ) : offers.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No offers match your criteria</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterRate({ min: 0, max: 20 })
                    setFilterTerm("0")
                    setFilterLender("")
                    setShowInactive(true)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {offers.map((offer) => (
                  <Card
                    key={offer.id}
                    className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${!offer.status ? "opacity-60 bg-gray-50" : ""
                      }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {!offer.status ? (
                        <></>
                      ) : new Date(offer.expiration_date) < new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) ? (
                        <Badge variant="destructive">Expires Soon</Badge>
                      ) : (
                        <></>
                      )}
                    </div>

                    <CardHeader className="pb-4">
                      {/* Lender Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{offer.lender_name}</CardTitle>
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
                          <span className="text-gray-600">Expires:</span>
                            <span className="font-medium flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(offer.expiration_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">

                        {/* Apply Button */}
                        <Button
                          className={`w-full h-12 ${offer.status ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                            }`}
                          disabled={!offer.status || loadingOfferId === offer.id}
                          onClick={() => handleApplyClick(offer)}
                        >
                          {offer.status ? (
                            loadingOfferId === offer.id ? (
                              <Loader2Icon className="animate-spin" />
                            ) : (
                              <>
                                Apply Now
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </>
                            )
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

        {/* Trust Indicators */}
        <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50 animate-fade-in-up">
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
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 h-14 px-8"
                  onClick={() => setShowPreQualModal(true)}
                >
                  Get Pre-Qualified Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Link href={`/about`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pre-Qualification Modal */}
      <PreQualificationModal
        isOpen={showPreQualModal}
        onClose={() => setShowPreQualModal(false)}
      />
    </div>
  )
}
