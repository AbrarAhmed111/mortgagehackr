"use client"
import { useParams } from 'next/navigation';
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
import { Key, useEffect, useState } from "react"
import { getBlogBySlug } from "@/lib/actions/blogs"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogDetailPage() {
  let params = useParams();

  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
const slug =
  typeof params?.slug === "string"
    ? params.slug
    : Array.isArray(params?.slug)
    ? params.slug[0]
    : "";
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const detail = await getBlogBySlug(slug)
        setPost(detail)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-6">
                  <Skeleton className="h-10 w-40 mx-auto" />
                  <Skeleton className="h-8 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-96 w-full rounded-lg" />
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

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
              <span className="text-gray-900">{post?.title}</span>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                {/* <Badge className="bg-blue-600 text-white">{post.category}</Badge> */}

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{post.title}</h1>
         
{post?.content?.map((item: { image: string ; description: string; }, index: number) => (
  <div key={index} className="mb-6">
    {item.image && (
      
      <Image
        src={item?.image}
        alt={`Image ${index + 1}`}
        className="w-full h-auto rounded-lg mb-4"
        width={100}
        height={100}
      />
    )}
    {item.description && (
      <div
        className="text-xl text-gray-600 leading-relaxed htmlStructure"
        dangerouslySetInnerHTML={{ __html: item.description }}
      ></div>
    )}
  </div>
))}

                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Image src={post.profile_image || "/placeholder.svg"} alt="" fill className="object-cover" />
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

                  {/* Navigation */}
                  <div className="mt-12 flex justify-between items-center">
                    <Link href="/blog">
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                      </Button>
                    </Link>
                    
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {/* Table of Contents */}
                   

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
      </main>

    </div>
  )
}
