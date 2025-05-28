import AboutPage from "@/components/MainComponents/aboutus";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About MortgageHackr │ Our Mission & Story",
  description:
    "We turn complex mortgage math into simple, actionable insights—so every borrower negotiates with confidence.",
  openGraph: {
    title: "About MortgageHackr",
  },
  twitter: {
    title: "About MortgageHackr",
  },
}
export default function Page() {
  return <div><AboutPage/></div>;
}
