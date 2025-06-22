// types.ts

// --- Blogs ---

export type BlogContentBlock = {
  image?: File | null // Optional image URL
  description?: string // Optional description text
}

export type Blog = {
  id: string // UUID
  title: string // Blog title
  slug: string // Unique slug for routing
  content: BlogContentBlock[] // Array of content blocks
  profile_image?: string | null // Author or profile image URL
  created_at: string // ISO timestamp
}
// --- LENDER OFFERS ---
export interface LenderOffer {
  id: string // UUID
  lender_name: string
  interest_rate: number // percentage, e.g. 3.75
  apr?: number // optional APR
  loan_term: number // in months or years (match with backend)
  eligibility?: string // optional description
  cta_link: string // external Apply Now URL
  expiration_date: string // ISO date string (from 'date' in SQL)
  status: boolean // active/inactive
  created_at: string // ISO datetime string
  updated_at: string // ISO datetime string
}

// --- APPLY NOW CLICKS (for tracking CTA clicks) ---
export interface ApplyNowClick {
  id: string // UUID
  lenderOfferId: string // FK to LenderOffer
  clickTimestamp: string // ISO date/time string
  // Optional: can include IP, user-agent for analytics
}

// --- CONTACT LEADS ---
export interface ContactLead {
  id: string // UUID
  name: string
  email: string
  message: string
  submittedAt: string // ISO date/time string
  isSpam: boolean // for spam filtering/flagging
}

// --- DEAL ANALYZER LEADS ---
export type DealResultType = 'Great' | 'Fair' | 'Poor'

export interface DealAnalyzerLead {
  id: string // UUID
  loanStartMonthYear: string // e.g. "2025-05" (YYYY-MM)
  loanAmount: number // in dollars
  interestRate: number // percentage, e.g. 4.25
  loanTerm: 15 | 30 // years
  email?: string // optional email capture
  resultType: DealResultType
  submittedAt: string // ISO date/time string
}

// --- HELOC LEADS ---
export interface HelocLead {
  id: string // UUID
  email: string
  submittedAt: string // ISO date/time string
}
