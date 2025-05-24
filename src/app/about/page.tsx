import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Users, Target, Award, Shield, TrendingUp, Star, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                About MortgageHackr Pro
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Empowering smart financial decisions since 2020
              </h1>
              <p className="text-xl text-blue-100">
                We're on a mission to democratize access to financial insights and help millions of borrowers make
                informed loan decisions with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                  <p className="text-lg text-gray-600">
                    To provide transparent, accurate, and accessible loan analysis tools that empower borrowers to make
                    informed financial decisions without the complexity and confusion of traditional lending processes.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Our Vision</h3>
                  <p className="text-lg text-gray-600">
                    A world where every borrower has access to the insights and tools they need to secure the best
                    possible loan terms, regardless of their financial background or experience.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  width="500"
                  height="400"
                  alt="Our Mission"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape how we serve our community of borrowers.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We believe in complete transparency. No hidden fees, no confusing terms, just clear, honest
                    information you can trust.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>User-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Every feature we build starts with our users' needs. We listen, learn, and continuously improve
                    based on your feedback.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We leverage cutting-edge technology and data science to provide insights that were previously only
                    available to financial professionals.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Since our founding, we've helped thousands of borrowers save money and make better financial decisions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">100K+</div>
                <div className="text-sm text-gray-600">Borrowers Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-600">$50M+</div>
                <div className="text-sm text-gray-600">Total Savings Generated</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">500K+</div>
                <div className="text-sm text-gray-600">Loan Analyses Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-orange-600">4.8/5</div>
                <div className="text-sm text-gray-600">Average User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our diverse team of financial experts, data scientists, and engineers work together to build the best
                loan analysis platform.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JS
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">John Smith</h3>
                    <p className="text-gray-600">CEO & Co-Founder</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Former Goldman Sachs analyst with 15+ years in financial services. Passionate about democratizing
                    financial insights.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    MJ
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Maria Johnson</h3>
                    <p className="text-gray-600">CTO & Co-Founder</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Former Google engineer specializing in machine learning and financial algorithms. PhD in Computer
                    Science from Stanford.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    DL
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">David Lee</h3>
                    <p className="text-gray-600">Head of Product</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Product leader with experience at fintech startups. Focused on creating intuitive user experiences
                    for complex financial tools.
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Awards & Recognition</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're honored to be recognized by industry leaders and our community.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Best Fintech Startup 2023</h3>
                    <p className="text-sm text-gray-600">TechCrunch Disrupt</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Top Consumer Choice</h3>
                    <p className="text-sm text-gray-600">Financial Planning Magazine</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Innovation Award</h3>
                    <p className="text-sm text-gray-600">Lending Industry Summit</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Best User Experience</h3>
                    <p className="text-sm text-gray-600">UX Design Awards</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to join our community?</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Experience the difference that transparent, user-focused loan analysis can make for your financial
                future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 h-14 px-8">
                  Start Your Free Analysis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-blue-700 h-14 px-8"
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
