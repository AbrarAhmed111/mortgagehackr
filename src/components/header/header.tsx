"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Calculator, Menu, Phone, Mail, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../assets/Images/mortgagehackr-2.png"

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="MortgageHackr Logo" className="w-48 sm:w-60" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {["Home", "Marketplace", "Calculators", "About", "Contact"].map((label, idx) => {
              const path = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`
              return (
                <Link key={idx} href={path} className="text-sm font-medium hover:text-[#73a334] transition-colors">
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@MortgageHackr.com</span>
              </div>
            </div>
            <Button size="sm" className="hidden sm:block bg-blue-600 hover:bg-blue-700">
              Start Analysis
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end md:hidden"
    onClick={() => setSidebarOpen(false)} // Close on outside click
  >
    <div
      className="w-64 bg-white h-full p-4 shadow-lg flex flex-col"
      onClick={(e) => e.stopPropagation()} // Prevent click inside sidebar from closing
    >
      <div className="flex justify-between items-center mb-6">
        <Image src={logo} alt="MortgageHackr Logo" className="h-10" />
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex flex-col space-y-4">
        {["Home", "Marketplace", "Calculators", "About", "Contact"].map((label, idx) => {
          const path = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`
          return (
            <Link
              key={idx}
              href={path}
              className="text-base font-medium text-gray-700 hover:text-[#73a334]"
              onClick={() => setSidebarOpen(false)}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  </div>
)}

    </>
  )
}
