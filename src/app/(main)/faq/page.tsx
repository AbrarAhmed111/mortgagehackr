import FAQPage from "@/components/MainComponents/faq/faq";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MortgageHackr FAQ │ Straight Answers, No Jargon",
  description:
    "Everything you need to know about credit pulls, data security, and how we stay free for users.",
  openGraph: {
    title: "MortgageHackr FAQ",
  },
  twitter: {
    title: "MortgageHackr FAQ",
  },
}
export default function Page() {
  return <div><FAQPage/></div>;
}
