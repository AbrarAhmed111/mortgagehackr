import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions │ MortgageHackr",
  description: "Our terms of service, user responsibilities, and legal disclaimers for using MortgageHackr services.",
  openGraph: {
    title: "Terms & Conditions │ MortgageHackr",
  },
  twitter: {
    title: "Terms & Conditions │ MortgageHackr",
  },
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                Legal
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms & Conditions</h1>
              <p className="text-xl text-blue-100">
                Please read these terms carefully before using our services.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div className="text-sm text-gray-500 mb-8">
                  Last Updated: May 28, 2024
                </div>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using MortgageHackr.net (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, you may not access the Service.
                </p>

                <h2>2. Use of the Service</h2>
                <p>
                  MortgageHackr provides tools and information to help users analyze mortgage offers and make informed financial decisions. Our Service is intended for informational purposes only and does not constitute financial advice.
                </p>
                <p>
                  You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service.
                </p>

                <h2>3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                </p>

                <h2>4. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of MortgageHackr and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p>
                  Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MortgageHackr.
                </p>

                <h2>5. User Content</h2>
                <p>
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p>
                  By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.
                </p>

                <h2>6. Links To Other Web Sites</h2>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by MortgageHackr.
                </p>
                <p>
                  MortgageHackr has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that MortgageHackr shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>

                <h2>7. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
                </p>
                <p>
                  MortgageHackr does not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                </p>
                <p>
                  The information provided through our Service is for general informational purposes only. All information on the Service is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Service.
                </p>

                <h2>8. Limitation Of Liability</h2>
                <p>
                  In no event shall MortgageHackr, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ol type="a">
                  <li>your access to or use of or inability to access or use the Service;</li>
                  <li>any conduct or content of any third party on the Service;</li>
                  <li>any content obtained from the Service; and</li>
                  <li>unauthorized access, use or alteration of your transmissions or content.</li>
                </ol>

                <h2>9. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>

                <h2>10. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@mortgagehackr.net</li>
                  <li>Phone: (555) 123-4567</li>
                  <li>Address: 123 Financial District, Suite 456, New York, NY 10004</li>
                </ul>
              </div>

              <div className="mt-12">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
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
