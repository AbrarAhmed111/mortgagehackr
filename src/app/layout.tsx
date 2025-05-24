import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../assets/css/globals.css"; // CSS is now included here
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import Providers from "../store/Providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MortgageHackr Pro - Smart Loan Analysis & Comparison",
  description:
    "Get personalized loan insights, compare rates, and make informed financial decisions with our AI-powered analysis tools.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <head></head>
        <body suppressHydrationWarning className="antialiased">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </body>
      </html>
    </Providers>
  )
}
