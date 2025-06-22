"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  Calculator,
  Home,
  DollarSign,
  Search,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllBlogs, getBlogBySlug } from "@/lib/actions/blogs"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogClientPage() {
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");


  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs(page, limit, searchQuery);
        if (page === 1) {
          setAllBlogs(blogs.data);
        } else {
          setAllBlogs(prev => [...prev, ...blogs.data]);
        }
        setTotal(blogs.total);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    if (allBlogs.length < total) {
      setPage(prev => prev + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  
  const renderSkeletons = () =>
    Array.from({ length: limit }).map((_, idx) => (
      <Card key={idx} className="overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardHeader className="pb-4 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-8 w-full mt-2" />
        </CardContent>
      </Card>
    ));

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

        {/* Search Section */}
        <section className="w-full py-8 bg-gray-50 border-b">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md w-full relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
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
                {loading === true  ? (
                  renderSkeletons()
                ) : allBlogs.length > 0   ? (
                  allBlogs.map((post: any) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image src={post.profile_image || "/placeholder.svg"} alt="" fill className="object-cover" />
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {post.content?.[0]?.description}
                        </p>

                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500">No articles found.</p>
                )}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                {loading && page > 1 ? (
                  <p>Loading more...</p>
                ) : allBlogs.length < total ? (
                  <Button variant="outline" size="lg" onClick={handleLoadMore}>
                    Load More Articles
                  </Button>
                ) : (
                  allBlogs.length > 0 && <p>No more articles to load.</p>
                )}
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
                {[
                  { icon: <TrendingUp />, title: "Market Analysis", color: "green" },
                  { icon: <Calculator />, title: "Tips & Strategies", color: "blue" },
                  { icon: <Home />, title: "First-Time Buyers", color: "purple" },
                  { icon: <DollarSign />, title: "Refinancing", color: "orange" },
                ].map((item, i) => (
                  <Card key={i} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className={`mx-auto w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mb-4`}>
                        {item.icon}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.title === "Refinancing"
                          ? "When and how to refinance for maximum savings."
                          : item.title === "First-Time Buyers"
                          ? "Complete guides for navigating your first home purchase."
                          : item.title === "Tips & Strategies"
                          ? "Proven tactics to save money and negotiate better terms."
                          : "Latest rate trends, market forecasts, and economic insights."}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        View Articles
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
