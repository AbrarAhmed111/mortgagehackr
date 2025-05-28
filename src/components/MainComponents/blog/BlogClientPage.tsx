"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Calculator,
  Home,
  DollarSign,
  Search,
  Filter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    slug: "mortgage-rates-hit-7-5-percent-what-this-means-for-homebuyers-2024",
    title: "Mortgage Rates Hit 7.5%: What This Means for Homebuyers in 2024",
    excerpt:
      "Breaking down the latest rate surge and actionable strategies to still secure competitive financing in today's market.",
    author: "Sarah Chen",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    category: "Market Analysis",
    featured: true,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Rates", "Market Trends", "Homebuying"],
  },
  {
    id: 2,
    slug: "hidden-costs-mortgage-shopping-what-lenders-dont-tell-you",
    title: "The Hidden Costs of Mortgage Shopping: What Lenders Don't Tell You",
    excerpt:
      "Uncover the fees, timing tricks, and rate lock strategies that can save or cost you thousands during the mortgage process.",
    author: "Mike Rodriguez",
    publishDate: "2024-01-12",
    readTime: "7 min read",
    category: "Tips & Strategies",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Fees", "Shopping Tips", "Negotiation"],
  },
  {
    id: 3,
    slug: "refinancing-2024-when-math-actually-works",
    title: "Refinancing in 2024: When the Math Actually Works",
    excerpt:
      "Our data-driven analysis reveals the exact scenarios where refinancing makes sense, even with today's higher rates.",
    author: "David Kim",
    publishDate: "2024-01-10",
    readTime: "6 min read",
    category: "Refinancing",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Refinancing", "Calculator", "Savings"],
  },
  {
    id: 4,
    slug: "first-time-homebuyer-programs-complete-2024-guide",
    title: "First-Time Homebuyer Programs: The Complete 2024 Guide",
    excerpt:
      "Navigate federal, state, and local programs that can reduce your down payment and closing costs significantly.",
    author: "Jennifer Walsh",
    publishDate: "2024-01-08",
    readTime: "8 min read",
    category: "First-Time Buyers",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["First-Time Buyers", "Programs", "Down Payment"],
  },
  {
    id: 5,
    slug: "arm-vs-fixed-which-mortgage-type-wins-todays-market",
    title: "ARM vs Fixed: Which Mortgage Type Wins in Today's Market?",
    excerpt:
      "A comprehensive comparison of adjustable-rate mortgages versus fixed-rate loans, with real scenarios and calculations.",
    author: "Tom Anderson",
    publishDate: "2024-01-05",
    readTime: "6 min read",
    category: "Loan Types",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["ARM", "Fixed Rate", "Comparison"],
  },
  {
    id: 6,
    slug: "credit-score-hacks-boost-your-score-before-applying",
    title: "Credit Score Hacks: Boost Your Score Before Applying",
    excerpt:
      "Proven strategies to improve your credit score quickly and legally, potentially saving thousands on your mortgage.",
    author: "Lisa Park",
    publishDate: "2024-01-03",
    readTime: "5 min read",
    category: "Credit & Qualification",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Credit Score", "Qualification", "Tips"],
  },
]

const categories = [
  "All Posts",
  "Market Analysis",
  "Tips & Strategies",
  "Refinancing",
  "First-Time Buyers",
  "Loan Types",
  "Credit & Qualification",
]

export default function BlogClientPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                MortgageHackr Blog
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Expert Mortgage Insights & Money-Saving Tips
              </h1>
              <p className="text-xl text-blue-100">
                Stay ahead of the market with data-driven analysis, insider strategies, and actionable advice from our
                team of mortgage experts.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="w-full py-8 bg-gray-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="w-full py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <Badge className="bg-red-500 text-white mb-4">Featured Article</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Latest Insights</h2>
                </div>

                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white">{featuredPost.category}</Badge>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold leading-tight">{featuredPost.title}</h3>

                        <p className="text-gray-600 leading-relaxed">{featuredPost.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Link href={`/blog/${featuredPost.slug}`}>
                          <Button className="w-fit bg-blue-600 hover:bg-blue-700">
                            Read Full Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Recent Articles Grid */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Recent Articles</h2>
                <p className="text-xl text-gray-600">
                  Stay informed with our latest mortgage market analysis and expert advice.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt="" fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white text-xs">{post.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <CardTitle className="text-lg leading-tight line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Popular Topics</h2>
                <p className="text-xl text-gray-600">Explore our most-read content categories and trending topics.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Market Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Latest rate trends, market forecasts, and economic insights.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Articles
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Calculator className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Tips & Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Proven tactics to save money and negotiate better terms.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Articles
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Home className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">First-Time Buyers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Complete guides for navigating your first home purchase.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Articles
                    </Button>
                  </CardContent>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <DollarSign className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Refinancing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">When and how to refinance for maximum savings.</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Articles
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
