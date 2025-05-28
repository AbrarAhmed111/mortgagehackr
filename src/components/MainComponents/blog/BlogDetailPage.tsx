import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  TrendingUp,
  Calculator,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock blog posts data (same as in blog page)
const blogPosts = [
  {
    id: 1,
    slug: "mortgage-rates-hit-7-5-percent-what-this-means-for-homebuyers-2024",
    title: "Mortgage Rates Hit 7.5%: What This Means for Homebuyers in 2024",
    excerpt:
      "Breaking down the latest rate surge and actionable strategies to still secure competitive financing in today's market.",
    content: `
      <p>The mortgage market has experienced a dramatic shift in 2024, with rates climbing to levels not seen since the early 2000s. As of this week, the average 30-year fixed mortgage rate has reached 7.5%, marking a significant increase from the historic lows we witnessed during the pandemic.</p>

      <h2>Understanding the Rate Surge</h2>
      <p>Several factors have contributed to this rapid increase in mortgage rates:</p>
      <ul>
        <li><strong>Federal Reserve Policy:</strong> The Fed's aggressive stance on combating inflation has led to multiple rate hikes throughout 2023 and into 2024.</li>
        <li><strong>Economic Uncertainty:</strong> Geopolitical tensions and market volatility have pushed investors toward safer assets, affecting mortgage-backed securities.</li>
        <li><strong>Inflation Concerns:</strong> Persistent inflation has forced lenders to price in higher risk premiums.</li>
      </ul>

      <h2>Impact on Homebuyers</h2>
      <p>The rate increase has significant implications for prospective homebuyers:</p>
      
      <h3>Affordability Challenges</h3>
      <p>A homebuyer looking at a $400,000 home with a 20% down payment would see their monthly payment increase by approximately $400 compared to rates at 6.5%. This represents a substantial impact on purchasing power.</p>

      <h3>Market Dynamics</h3>
      <p>Higher rates are beginning to cool the housing market, with some regions seeing:</p>
      <ul>
        <li>Reduced buyer competition</li>
        <li>Longer time on market for listings</li>
        <li>More negotiating power for buyers</li>
        <li>Potential price stabilization in overheated markets</li>
      </ul>

      <h2>Strategies for Today's Market</h2>
      <p>Despite higher rates, there are still opportunities for savvy homebuyers:</p>

      <h3>1. Consider Adjustable-Rate Mortgages (ARMs)</h3>
      <p>ARMs are offering rates 0.5-1% lower than fixed-rate mortgages. If you plan to move or refinance within 5-7 years, an ARM could provide significant savings.</p>

      <h3>2. Explore Rate Buydowns</h3>
      <p>Some sellers are offering to pay for temporary rate buydowns, effectively reducing your rate for the first 1-3 years of the loan.</p>

      <h3>3. Improve Your Credit Profile</h3>
      <p>The difference between a 740 credit score and a 680 score can be 0.25-0.5% in rate. Every point matters in today's environment.</p>

      <h3>4. Shop Multiple Lenders</h3>
      <p>Rate spreads between lenders have widened. Shopping around could save you 0.125-0.25% or more.</p>

      <h2>Looking Ahead</h2>
      <p>While predicting rate movements is challenging, several factors could influence future trends:</p>
      <ul>
        <li>Federal Reserve policy decisions</li>
        <li>Inflation data and economic indicators</li>
        <li>Housing market supply and demand dynamics</li>
        <li>Global economic conditions</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>While 7.5% rates represent a significant increase from recent years, they're still within historical norms. The key is to focus on what you can control: your credit score, down payment, and loan shopping strategy.</p>

      <p>Remember, you can always refinance when rates improve. Don't let perfect be the enemy of good if you've found the right home and can comfortably afford the payments.</p>
    `,
    author: "Sarah Chen",
    authorBio:
      "Sarah is a senior mortgage analyst with over 10 years of experience in real estate finance. She specializes in market trends and rate analysis.",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    category: "Market Analysis",
    featured: true,
    image: "/placeholder.svg?height=400&width=800",
    tags: ["Rates", "Market Trends", "Homebuying"],
  },
  {
    id: 2,
    slug: "hidden-costs-mortgage-shopping-what-lenders-dont-tell-you",
    title: "The Hidden Costs of Mortgage Shopping: What Lenders Don't Tell You",
    excerpt:
      "Uncover the fees, timing tricks, and rate lock strategies that can save or cost you thousands during the mortgage process.",
    content: `
      <p>When shopping for a mortgage, most borrowers focus solely on the interest rate. However, the true cost of your loan extends far beyond that headline number. Understanding these hidden costs can save you thousands of dollars and help you make more informed decisions.</p>

      <h2>The Fee Iceberg</h2>
      <p>Like an iceberg, the interest rate is just the tip. Below the surface lie numerous fees that can significantly impact your total cost:</p>

      <h3>Origination Fees</h3>
      <p>Many lenders charge origination fees ranging from 0.5% to 1% of your loan amount. On a $400,000 loan, this could be $2,000-$4,000. Some lenders advertise "no origination fees" but may compensate with higher rates.</p>

      <h3>Processing and Underwriting Fees</h3>
      <p>These administrative fees can range from $300-$900 each. While they sound official, they're often negotiable or can be waived for qualified borrowers.</p>

      <h3>Third-Party Fees</h3>
      <p>Appraisal, title insurance, and attorney fees are typically required but can vary significantly between providers. Shopping around for these services can save hundreds.</p>

      <h2>Rate Lock Strategies</h2>
      <p>Understanding rate locks can be the difference between securing a great rate and missing out entirely:</p>

      <h3>Lock Periods</h3>
      <p>Standard locks are 30-45 days, but you can often extend to 60-90 days for a fee. In volatile markets, longer locks provide peace of mind.</p>

      <h3>Float-Down Options</h3>
      <p>Some lenders offer float-down provisions that allow you to capture lower rates if they fall during your lock period. This typically costs 0.125-0.25% upfront.</p>

      <h2>Timing Tricks That Cost Money</h2>
      <p>Lenders use various timing strategies that can work against borrowers:</p>

      <h3>Rate Sheets and Timing</h3>
      <p>Mortgage rates can change multiple times per day. Lenders typically update their rate sheets in the morning, and rates often worsen throughout the day during volatile periods.</p>

      <h3>Month-End Pressure</h3>
      <p>Loan officers often have monthly quotas. This can work in your favor at month-end when they're motivated to close deals, potentially offering better terms.</p>

      <h2>The APR Deception</h2>
      <p>Annual Percentage Rate (APR) is supposed to reflect the true cost of your loan, but it has limitations:</p>
      <ul>
        <li>It assumes you'll hold the loan for its full term</li>
        <li>It doesn't include all closing costs</li>
        <li>It can be manipulated by how fees are categorized</li>
      </ul>

      <h2>Negotiation Strategies</h2>
      <p>Everything in mortgage lending is negotiable if you know how to ask:</p>

      <h3>Fee Waivers</h3>
      <p>Processing, underwriting, and application fees can often be waived for borrowers with strong credit profiles or significant assets.</p>

      <h3>Rate Negotiations</h3>
      <p>If you have competing offers, use them as leverage. Many lenders will match or beat competitor rates to win your business.</p>

      <h3>Closing Cost Credits</h3>
      <p>Lenders can provide credits toward closing costs in exchange for slightly higher rates. This can be beneficial if you're cash-constrained.</p>

      <h2>Red Flags to Watch For</h2>
      <p>Be wary of these common tactics:</p>
      <ul>
        <li><strong>Bait and Switch:</strong> Initial quotes that change dramatically at closing</li>
        <li><strong>Pressure Tactics:</strong> Claims that rates are only available "today"</li>
        <li><strong>Excessive Fees:</strong> Junk fees with vague descriptions</li>
        <li><strong>Yield Spread Premiums:</strong> Hidden compensation that increases your rate</li>
      </ul>

      <h2>Your Action Plan</h2>
      <p>To navigate these hidden costs effectively:</p>
      <ol>
        <li>Get Loan Estimates from at least 3 lenders</li>
        <li>Compare total costs, not just rates</li>
        <li>Ask about all fees upfront</li>
        <li>Negotiate aggressively</li>
        <li>Read all documents carefully before signing</li>
      </ol>

      <p>Remember, the mortgage industry is competitive. Lenders want your business and are often willing to work with you if you're informed and persistent.</p>
    `,
    author: "Mike Rodriguez",
    authorBio:
      "Mike is a former mortgage broker turned consumer advocate. He's helped thousands of borrowers navigate the mortgage process and avoid costly mistakes.",
    publishDate: "2024-01-12",
    readTime: "7 min read",
    category: "Tips & Strategies",
    featured: false,
    image: "/placeholder.svg?height=400&width=800",
    tags: ["Fees", "Shopping Tips", "Negotiation"],
  },
]

// Related posts for suggestions
const relatedPosts = [
  {
    id: 3,
    slug: "refinancing-2024-when-math-actually-works",
    title: "Refinancing in 2024: When the Math Actually Works",
    category: "Refinancing",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    slug: "first-time-homebuyer-programs-complete-2024-guide",
    title: "First-Time Homebuyer Programs: The Complete 2024 Guide",
    category: "First-Time Buyers",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    slug: "arm-vs-fixed-which-mortgage-type-wins-todays-market",
    title: "ARM vs Fixed: Which Mortgage Type Wins in Today's Market?",
    category: "Loan Types",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found | MortgageHackr Blog",
    }
  }

  return {
    title: `${post.title} | MortgageHackr Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="w-full py-4 bg-gray-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.category}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <Badge className="bg-blue-600 text-white">{post.category}</Badge>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>

                <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-4">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <article className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </article>

                  {/* Author Bio */}
                  <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">About {post.author}</h3>
                        <p className="text-gray-600 mb-4">{post.authorBio}</p>
                        <div className="flex space-x-4">
                          <Button variant="outline" size="sm">
                            View All Posts
                          </Button>
                          <Button variant="outline" size="sm">
                            Follow Author
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-12 flex justify-between items-center">
                    <Link href="/blog">
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Article
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {/* Table of Contents */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          In This Article
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <a href="#understanding-rate-surge" className="text-blue-600 hover:underline">
                              Understanding the Rate Surge
                            </a>
                          </li>
                          <li>
                            <a href="#impact-homebuyers" className="text-blue-600 hover:underline">
                              Impact on Homebuyers
                            </a>
                          </li>
                          <li>
                            <a href="#strategies-todays-market" className="text-blue-600 hover:underline">
                              Strategies for Today's Market
                            </a>
                          </li>
                          <li>
                            <a href="#looking-ahead" className="text-blue-600 hover:underline">
                              Looking Ahead
                            </a>
                          </li>
                          <li>
                            <a href="#bottom-line" className="text-blue-600 hover:underline">
                              The Bottom Line
                            </a>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Quick Tools */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Tools</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Link href="/calculators">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Calculator className="h-4 w-4 mr-2" />
                            Mortgage Calculator
                          </Button>
                        </Link>
                        <Link href="/marketplace">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Rate Comparison
                          </Button>
                        </Link>
                        <Link href="/deal-analyzer">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Deal Analyzer
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Related Articles</h2>
                <p className="text-xl text-gray-600">Continue reading with these related insights</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-blue-600 text-white text-xs">{relatedPost.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg leading-tight line-clamp-2">{relatedPost.title}</CardTitle>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Read Article
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    View All Articles
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
