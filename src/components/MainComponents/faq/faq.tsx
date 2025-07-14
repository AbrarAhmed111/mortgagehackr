"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Search, HelpCircle, Phone, Mail, MessageSquare, Calculator, Home, Sparkles, Zap, Users } from "lucide-react"
import Link from "next/link"

const faqs = [
    {
      question: "What is MortgageHackr?",
      answer:
        "MortgageHackr.net is a free platform where you can compare live mortgage offers, grade your current loan against historical market data, and find refinancing or HELOC options—all in one place."
    },
    {
      question: "How does the Mortgage Deal Analyzer work?",
      answer:
        "You enter your original loan details (month/year, rate, amount, term). We pull the Freddie Mac national average from the last Thursday of that month and instantly grade your deal as Great, Fair, or Poor."
    },
    {
      question: "Will using MortgageHackr affect my credit score?",
      answer:
        "No. Browsing offers, running the Deal Analyzer, and using the calculator are soft inquiries. A lender will request your permission for any hard pull during an official application."
    },
    {
      question: "Is MortgageHackr a lender or broker?",
      answer:
        "No. We're an independent marketplace. When you choose an offer, you apply directly with that lender. MortgageHackr simply connects you."
    },
    {
      question: "Why do you show rates weekly instead of daily?",
      answer:
        "Freddie Mac publishes its benchmark mortgage average every Thursday, which is the industry standard for historical comparisons. Partner-lender rates update more frequently and display a timestamp."
    },
    {
      question: `I got a "Poor Deal." What should I do next?`,
      answer:
        `Click "Check Your Options" on your results screen. We'll show current refinance offers and, if you opt in, a specialist lender will reach out to discuss saving you money.`
    },
    {
      question: `I got a "Great Deal." Why suggest a HELOC?`,
      answer:
        "A low mortgage rate usually means you've built equity. A HELOC lets you tap that equity for renovations, tuition, or debt consolidation—without sacrificing your excellent mortgage rate."
    },
    {
      question: "How do I contact support or give feedback?",
      answer:
        "Email us at support@mortgagehackr.net or use the message form on our Contact page. You can also join the Community forum to share tips with other homeowners."
    }
  ]  

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [openItems, setOpenItems] = useState<number[]>([])

    // Debounced search function
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout
            return (value: string) => {
                clearTimeout(timeoutId)
                timeoutId = setTimeout(() => {
                    setSearchTerm(value)
                }, 300)
            }
        })(),
        []
    )

    const toggleItem = (index: number) => {
        setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    const filteredFAQs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )

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
                                <Sparkles className="w-3 h-3 mr-1" /> Help Center
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-fade-in-up">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-xl text-blue-100 animate-fade-in-up delay-200">
                                Find answers to common questions about our mortgage marketplace, loan Calculator, and services.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Search Section */}
                <section className="w-full py-12 bg-gray-50 animate-fade-in-up">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search frequently asked questions..."
                                    defaultValue={searchTerm}
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="w-full py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12 animate-fade-in-up">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Common Questions</h2>
                                <p className="text-xl text-gray-600">
                                    Everything you need to know about using our mortgage marketplace and tools.
                                </p>
                                <Badge variant="outline" className="mt-4">
                                    {filteredFAQs.length} questions
                                </Badge>
                            </div>

                            {filteredFAQs.length === 0 ? (
                                <div className="text-center py-12 animate-fade-in-up">
                                    <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No results found</h3>
                                    <p className="text-gray-600 mb-4">
                                        We couldn't find any FAQs matching your search. Try different keywords.
                                    </p>
                                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                                        Clear Search
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredFAQs.map((faq, index) => {
                                        const originalIndex = faqs.indexOf(faq)
                                        const isOpen = openItems.includes(originalIndex)

                                        return (
                                            <Card key={originalIndex} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                                                <CardHeader
                                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => toggleItem(originalIndex)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-lg font-medium text-left pr-4">{faq.question}</CardTitle>
                                                        {isOpen ? (
                                                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 transition-transform" />
                                                        ) : (
                                                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 transition-transform" />
                                                        )}
                                                    </div>
                                                </CardHeader>
                                                {isOpen && (
                                                    <CardContent className="pt-0 animate-fade-in">
                                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                                    </CardContent>
                                                )}
                                            </Card>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Contact Support Section */}
                <section className="w-full py-16 bg-gradient-to-r from-green-50 to-blue-50 animate-fade-in-up">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Still have questions?</h2>
                                <p className="text-xl text-gray-600">
                                    Our support team is here to help you with any questions not covered in our FAQ.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all animate-fade-in-up">
                                    <CardHeader>
                                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <Mail className="h-8 w-8 text-[#8cc63f]" />
                                        </div>
                                        <CardTitle className="text-lg">Email Support</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">Get detailed responses within 24 hours</p>
                                        <Link href="/contact">
                                            <Button variant="outline" className="w-full">
                                                Send Email
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all animate-fade-in-up delay-100">
                                    <CardHeader>
                                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <MessageSquare className="h-8 w-8 text-[#8cc63f]" />
                                        </div>
                                        <CardTitle className="text-lg">Live Chat</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
                                        <Button variant="outline" className="w-full">
                                            Start Chat
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all animate-fade-in-up delay-200">
                                    <CardHeader>
                                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                            <Users className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <CardTitle className="text-lg">Community</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">Connect with other homeowners</p>
                                        <Link href="/contact">
                                            <Button variant="outline" className="w-full">
                                                Join Forum
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions Section */}
                <section className="w-full py-16 bg-gray-50 animate-fade-in-up">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to get started?</h2>
                                <p className="text-xl text-gray-600">
                                    Explore our tools and find the best mortgage options for your situation.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <Link href="/deal-analyzer">
                                    <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up">
                                        <CardHeader>
                                            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                                <Calculator className="h-8 w-8 text-[#8cc63f]" />
                                            </div>
                                            <CardTitle className="text-lg">Deal Analyzer</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-4">Analyze your current mortgage deal</p>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                <Zap className="mr-2 h-4 w-4" />
                                                Start Analysis
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>

                                <Link href="/marketplace">
                                    <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up delay-100">
                                        <CardHeader>
                                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                                <Home className="h-8 w-8 text-[#8cc63f]" />
                                            </div>
                                            <CardTitle className="text-lg">Marketplace</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-4">Compare mortgage offers</p>
                                            <Button className="w-full bg-green-500 hover:bg-green-600">
                                                <Zap className="mr-2 h-4 w-4" />
                                                Browse Offers
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>

                                <Link href="/calculators">
                                    <Card className="text-center p-6 hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer animate-fade-in-up delay-200">
                                        <CardHeader>
                                            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                                <Calculator className="h-8 w-8 text-orange-600" />
                                            </div>
                                            <CardTitle className="text-lg">Calculator</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-4">Calculate payments and costs</p>
                                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                                <Zap className="mr-2 h-4 w-4" />
                                                Use Calculator
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
