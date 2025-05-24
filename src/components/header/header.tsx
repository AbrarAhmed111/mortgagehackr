import { Button } from "../../components/ui/button"
import { Calculator, Menu, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-blue-900">MortgageHackr</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/marketplace" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Marketplace
          </Link>
          <Link href="/calculators" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Calculators
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contact
          </Link>
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
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
