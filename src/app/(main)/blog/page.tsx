import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "MortgageHackr Blog │ Expert Mortgage Insights & Tips",
  description:
    "Stay informed with the latest mortgage trends, rate analysis, and money-saving strategies from our team of experts.",
  openGraph: {
    title: "MortgageHackr Blog",
    description: "Expert mortgage insights and money-saving strategies",
  },
  twitter: {
    title: "MortgageHackr Blog",
    description: "Expert mortgage insights and money-saving strategies",
  },
}

export default function BlogPage() {
  return <BlogClientPage />
}
