import { Button } from "../../components/ui/button"
import { Calculator, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../assets/Images/mortgagehackr-2.png"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50">
      {/* Trust Indicators Section */}
      <div className="border-b bg-white">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-6 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Secure & Private</h3>
              <p className="text-sm text-slate-600">Your financial data is encrypted and never shared</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Instant Results</h3>
              <p className="text-sm text-slate-600">Get your loan analysis in seconds, not hours</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Expert Guidance</h3>
              <p className="text-sm text-slate-600">Professional insights to help you make informed decisions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
            <Image src={logo} alt="MortgageHackr Logo" className="w-60"/>
            </Link>
        </div>
            <p className="text-sm text-slate-600">
              Professional loan analysis tools to help you make smarter financial decisions. Get accurate calculations
              and expert insights in minutes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Mail className="h-4 w-4" />
                <span>info@MortgageHackr.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>123 Financial District, Suite 456, New York, NY 10004</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Tools & Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Tools & Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-slate-600 hover:text-blue-600">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-slate-600 hover:text-blue-600">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-blue-600">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">Stay Updated</h4>
            <p className="text-sm text-slate-600">
              Get the latest market insights and financial tips delivered to your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            © 2024 MortgageHackr Pro. All rights reserved. | Licensed Financial Services Provider
          </p>
          <div className="flex space-x-4 text-xs text-slate-500 mt-4 sm:mt-0">
            <Link href="/#" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/#" className="hover:text-blue-600">
              Terms of Service
            </Link>
            <Link href="/#" className="hover:text-blue-600">
              Security
            </Link>
            <Link href="/#" className="hover:text-blue-600">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
