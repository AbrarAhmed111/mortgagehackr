import MarketplacePage from "@/components/MainComponents/marketplace/marketplace";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compare Mortgage Offers │ Nationwide Marketplace",
  description:
    "Side-by-side APRs, points, and fees from vetted lenders—updated every Thursday.",
  openGraph: {
    title: "Mortgage Offer Marketplace",
  },
  twitter: {
    title: "Mortgage Offer Marketplace",
  },
}
export default function Page() {
  return <div><MarketplacePage/></div>;
}
