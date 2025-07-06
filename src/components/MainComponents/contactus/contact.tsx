"use client"
import { useState, useEffect, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Sparkles,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { createLead } from "@/lib/actions/contactLeads"
import toast from "react-hot-toast"
import Link from "next/link"
import { Calculator, Shield } from "lucide-react"

export default function ContactPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [is_spam, setIsSpam] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  useEffect(() => {
    const stored = localStorage.getItem("lastSubmittedAt")
    if (stored) {
      const timePassed = Date.now() - parseInt(stored)
      if (timePassed < 30000) {
        setCooldown(Math.ceil((30000 - timePassed) / 1000))
      }
    }
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (cooldown > 0) {
      setError(`Please wait ${cooldown} second${cooldown > 1 ? "s" : ""} before submitting again.`)
      return
    }

    if (!recaptchaToken) {
      setIsSpam(true)
      setError("Please complete the reCAPTCHA.")
      return
    }

    setLoading(true)

    try {
      const name = `${firstName} ${lastName}`
      await createLead(name.trim(), email.trim(), message.trim(), is_spam.toString())

      toast.success("Message sent successfully!")

      setFirstName("")
      setLastName("")
      setEmail("")
      setMessage("")
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()

      const now = Date.now()
      localStorage.setItem("lastSubmittedAt", now.toString())
      setCooldown(30)
    } catch (err) {
      console.error(err)
      setError("Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
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
                <Sparkles className="w-3 h-3 mr-1" /> Get in Touch
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-fade-in-up">
                We're here to help
              </h1>
              <p className="text-xl text-blue-100 animate-fade-in-up delay-200">
                Have questions about your loan analysis or need personalized guidance? Our team of financial experts is
                ready to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="animate-fade-in-up">
                <Card className="shadow-xl hover:shadow-2xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <MessageSquare className="mr-2 h-6 w-6 text-[#8cc63f]" />
                      Send us a message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                          <Input
                            id="firstName"
                            value={firstName}
                            type="text"
                            required
                            className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={lastName}
                            type="text"
                            required
                            className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Smith"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          value={email}
                          type="email"
                          required
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      {/* reCAPTCHA v2 */}
                      <div className="pt-4">
                        <ReCAPTCHA
                          sitekey="6Ldj4mcrAAAAAPIuUu-iHyLx47OjtixMGn_YxFVR"
                          ref={recaptchaRef}
                          onChange={(token) => setRecaptchaToken(token)}
                          onExpired={() => setRecaptchaToken(null)}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 mt-4 transition-all duration-300"
                        disabled={loading || !recaptchaToken || cooldown > 0}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {error && (
                        <div className="flex items-center space-x-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      {cooldown > 0 && (
                        <div className="flex items-center space-x-2 text-orange-500 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>Please wait {cooldown} second{cooldown > 1 ? 's' : ''} before submitting again.</span>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-8 animate-fade-in-up delay-200">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Our team of mortgage experts is here to help you navigate the complex world of home financing.
                    Whether you have questions about our tools or need personalized advice, we're ready to assist.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email Support</h3>
                        <p className="text-gray-600">support@mortgagehackr.net</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Business Hours</h3>
                        <p className="text-gray-600">Mon-Fri: 8AM-8PM EST</p>
                        <p className="text-gray-600">Sat: 9AM-5PM EST</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <CardContent className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">FAQ & Resources</h3>
                        <p className="text-gray-600">Check our FAQ for quick answers</p>
                        <Link href="/faq" className="text-[#8cc63f] hover:underline text-sm">
                          Visit FAQ →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/deal-analyzer">
                      <Button variant="outline" className="w-full justify-start">
                        <Calculator className="mr-2 h-4 w-4" />
                        Analyze Your Mortgage Deal
                      </Button>
                    </Link>
                    <Link href="/marketplace">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Browse Mortgage Offers
                      </Button>
                    </Link>
                    <Link href="/calculators">
                      <Button variant="outline" className="w-full justify-start">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Use Our Calculators
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="w-full py-16 bg-gray-50 animate-fade-in-up">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Why Trust Us?</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[#8cc63f]" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Team</h3>
                  <p className="text-gray-600">
                    Our team includes former automotive executives with decades of experience in data-driven deal-making.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure & Private</h3>
                  <p className="text-gray-600">
                    Your information is protected with bank-level security and never shared without your permission.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Fast Response</h3>
                  <p className="text-gray-600">
                    Get answers to your questions within 24 hours, with most responses coming much sooner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
