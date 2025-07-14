"use client"

import { useState, useEffect } from "react"
import { Button } from "../../ui/button"
import { Calculator, Menu, Phone, Mail, X, Zap, Sparkles, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/Images/mortgagehackr-logo.png"

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Deal Analyzer", path: "/deal-analyzer" },
    { label: "Calculator", path: "/calculators" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg' 
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }`}>
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image 
              src={logo} 
              alt="MortgageHackr Logo" 
              className="w-48 sm:w-64 transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="text-sm font-medium hover:text-[#73a334] transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#73a334] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground hover:text-[#73a334] transition-colors duration-300">
                <Mail className="h-4 w-4" />
                <span>info@MortgageHackr.com</span>
              </div>
            </div>
            
            <Link href="/deal-analyzer">
              <Button 
                className="hidden sm:flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Zap className="mr-2 h-4 w-4" />
                Start Analysis
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden hover:bg-gray-100 transition-colors duration-300" 
              onClick={() => setSidebarOpen(true)} 
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-80 bg-white h-full p-6 shadow-2xl flex flex-col animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Image src={logo} alt="MortgageHackr Logo" className="h-10" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(false)} 
                aria-label="Close menu"
                className="hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className="text-base font-medium text-gray-700 hover:text-[#73a334] hover:bg-gray-50 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <div className="border-t pt-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                  <Mail className="h-4 w-4" />
                  <span>info@MortgageHackr.com</span>
                </div>
              </div>
              
              <Link href="/deal-analyzer" onClick={() => setSidebarOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
