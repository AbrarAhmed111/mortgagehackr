import type { Metadata } from 'next'
import HomePage from '@/NamePages/UserSite/Home'

export const metadata: Metadata = {
  metadataBase: new URL('https://mortgagehackr.net'),
  title: 'MortgageHackr │ Unlock Better Mortgage Deals',
  description:
    'Free, data-driven tools that reveal whether a mortgage quote is competitive—no credit hit, no sales pitch.',
  openGraph: {
    type: 'website',
    title: 'MortgageHackr',
    description:
      'Clear, unbiased mortgage insights for borrowers in every state.',
    images: ['/og/hero.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MortgageHackr',
    description:
      'Clear, unbiased mortgage insights for borrowers in every state.',
    images: ['/og/hero.jpg'],
  },
}

export default function Home() {
  return <HomePage />
}
