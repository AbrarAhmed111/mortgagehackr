"use client"
import { useState, useEffect, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import { createLead } from "@/lib/actions/contactLeads"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [is_spam,setIsSpam] = useState<boolean>(false)
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
        <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                Get in Touch
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">We're here to help</h1>
              <p className="text-xl text-blue-100">
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
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">First Name *</label>
                          <input
                            value={firstName}
                            type="text"
                            required
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Last Name *</label>
                          <input
                            value={lastName}
                            type="text"
                            required
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Smith"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address *</label>
                        <input
                          value={email}
                          type="email"
                          required
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message *</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us how we can help you..."
                        ></textarea>
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
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 mt-4"
                        disabled={loading || !recaptchaToken}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>

                      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
                  <p className="text-gray-600 mb-6">
                    We're committed to providing exceptional support and guidance for all your loan analysis needs.
                  </p>
                </div>

                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone Support</h3>
                        <p className="text-gray-600">(555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 8AM-8PM EST</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-[#8cc63f]" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email Support</h3>
                        <p className="text-gray-600">support@MortgageHackr.com</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Office Address</h3>
                        <p className="text-gray-600">123 Financial District</p>
                        <p className="text-gray-600">Suite 456, New York, NY 10004</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 8AM - 8PM EST</p>
                        <p className="text-gray-600">Saturday: 9AM - 5PM EST</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find quick answers to common questions about our loan analysis services.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "Is the loan analysis really free?",
                  answer:
                    "Yes, our loan analysis is completely free. We're compensated by lenders when you choose to work with them, but there's never any cost to you for using our analysis tools.",
                },
                {
                  question: "Will checking rates affect my credit score?",
                  answer:
                    "No, our initial analysis and rate checking only use soft credit inquiries, which don't impact your credit score. Hard inquiries only occur when you formally apply for a loan.",
                },
                {
                  question: "How accurate are your calculations?",
                  answer:
                    "Our calculations use industry-standard formulas and are highly accurate. However, final loan terms may vary based on your creditworthiness and lender requirements.",
                },
                {
                  question: "What if I don't have all the loan information?",
                  answer:
                    "That's okay! Our flexible system works with whatever information you have. We can calculate missing details and provide preliminary analysis, then refine it as you provide more information.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-[#8cc63f]" />
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{item.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Other Ways to Get Help</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the support option that works best for you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: <MessageSquare className="h-8 w-8 text-[#8cc63f]" />,
                  title: "Live Chat",
                  description: "Get instant help from our support team through live chat on our website.",
                  action: "Start Chat",
                },
                {
                  icon: <HelpCircle className="h-8 w-8 text-[#8cc63f]" />,
                  title: "Help Center",
                  description: "Browse our comprehensive help center with guides, tutorials, and FAQs.",
                  action: "Visit Help Center",
                },
                {
                  icon: <Phone className="h-8 w-8 text-purple-600" />,
                  title: "Schedule a Call",
                  description: "Book a personalized consultation with one of our financial experts.",
                  action: "Schedule Call",
                },
              ].map((item, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{item.description}</CardDescription>
                    <Button variant="outline" className="w-full">
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
