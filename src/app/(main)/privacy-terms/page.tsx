import TermsPage from '@/components/MainComponents/terms/terms'
import React from 'react'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy, Terms & TCPA Consent │ MortgageHackr",
  description:
    " Learn how we protect your data, honor CCPA requests, and comply with TCPA contact rules.",
  openGraph: {
    title: "MortgageHackr Privacy & Terms",
  },
  twitter: {
    title: "MortgageHackr Privacy & Terms",
  },
}
export default function page() {
  return (
    <div><TermsPage/></div>
  )
}
