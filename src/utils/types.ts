import { StaticImageData } from 'next/image'
import { JSX } from 'react'

// 1 - Sidebar
export interface SidebarNavLinkType {
  name: string
  to: string
  icon: any
}

export interface ISidebarProps {
  sidebarDesktopOpen: boolean
  setSidebarDesktopOpen: (arg: boolean) => void
  sidebarMobileOpen: boolean
  setSidebarMobileOpen: (arg: boolean) => void
}
export interface NavLinkProps {
  to: string
  children: React.ReactNode
  className?: string | ((props: { isActive: boolean }) => string)
  onClick?: () => void
}

// 2 - Blogs
export type Blog = {
  title: string
  content: string
  image: string | StaticImageData
  publishDate: string
}

export type BlogsColumn<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  isImage?: boolean
  imageWidth?: number
  imageHeight?: number
  render?: (item: T) => React.ReactNode
}

// Lender offers
export interface LenderOffer {
  id: string
  lenderName: string
  interestRate: string
  loanTerm: string
  eligibility: string
  ctaLink: string
  expirationDate: string
  status: 'Active' | 'Inactive'
}

export interface LenderOffersColumn<T> {
  header: string
  // accessor?: ((item: T) => React.ReactNode) | keyof T
  accessor: keyof T | ((item: T) => React.ReactNode)

  render?: (item: T) => React.ReactNode
  isImage?: boolean
}

export interface LeadAttribution {
  id: string
  lenderName: string
  lenderOfferId: string
  clickDate: string
  clickTime: string
  userIp: string
  userAgent: string
  referrerUrl?: string
  leadSource: string
  conversionStatus: 'Pending' | 'Converted' | 'Rejected'
  leadValue?: number
  leadEmail?: string
  leadPhone?: string
  sessionId: string
  deviceType: 'Desktop' | 'Mobile' | 'Tablet'
  location?: string
}

// Analytics summary interface
export interface AnalyticsSummary {
  totalClicks: number
  totalConversions: number
  conversionRate: number
  totalRevenue: number
  averageLeadValue: number
  topPerformingLender: string
}

// Column type for DataTable
export interface AttributionColumn<T> {
  header: string
  accessor: keyof T
  render?: (item: T) => JSX.Element
}

// DataTable Component
export interface DataTableProps<T> {
  data: T[]
  columns: AttributionColumn<T>[]
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  onSelect: (selected: T[]) => void
  itemsPerPage: number
}
