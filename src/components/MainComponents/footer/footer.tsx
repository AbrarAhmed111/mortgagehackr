import { Calculator, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Shield, Clock, Users, Sparkles, Zap, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"
import logo from "@/assets/Images/mortgagehackr-logo.png"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-slate-50">
      {/* Trust Indicators Section */}
      <div className="border-b bg-white">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center space-y-4 group">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Secure & Private</h3>
              <p className="text-sm text-slate-600 max-w-xs">Your financial data is encrypted and never shared without your permission</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <Clock className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Instant Results</h3>
              <p className="text-sm text-slate-600 max-w-xs">Get your loan analysis in seconds, not hours with Mortgagehacker</p>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                <Users className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Expert Guidance</h3>
              <p className="text-sm text-slate-600 max-w-xs">Professional insights to help you make informed financial decisions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container px-4 md:px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center group">
                <Image
                  src={logo}
                  alt="MortgageHackr Logo"
                  className="w-60 transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Professional loan analysis tools to help you make smarter financial decisions. Get accurate calculations
              and expert insights in minutes with Mortgagehacker.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-600 hover:text-[#73a334] transition-colors duration-300">
                <Mail className="h-4 w-4" />
                <span>info@mortgagehackr.com</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-full">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-full">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-700 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-full">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Tools & Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-900">Tools & Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Home</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Marketplace</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/deal-analyzer" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Deal Analyzer</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Calculators</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>About</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>FAQ</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Blog</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Contact</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/how-deal-analyzer-works" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>How Deal Analyzer Works</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/privacy-terms" className="text-slate-600 hover:text-[#73a334] transition-colors duration-300 flex items-center group">
                  <span>Privacy Terms</span>
                  <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-900">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-slate-600 hover:text-[#73a334] transition-colors duration-300">
                <Mail className="h-4 w-4" />
                <span>support@mortgagehackr.net</span>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <div className="font-semibold">Business Hours:</div>
                <div>Mon-Fri: 8AM-8PM EST</div>
                <div>Sat: 9AM-5PM EST</div>
              </div>
            </div>


          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              © {currentYear} MortgageHackr. All rights reserved. | Licensed Financial Services Provider
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for homeowners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
