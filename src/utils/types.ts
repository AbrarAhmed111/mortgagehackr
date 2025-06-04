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

export interface Blog {
  id: string
  title: string
  slug: string
  content: {
    image?: string
    description: string
  }[]
  profileImage?: string
  createdAt: string // ISO timestamp string
}

export type BlogsColumn<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  isImage?: boolean
  imageWidth?: number
  imageHeight?: number
  render?: (item: T) => React.ReactNode
}

export interface LenderOffer {
  id: string
  lenderName: string
  interestRate: number
  apr: number
  loanTerm: number
  eligibilityCriteria?: string
  ctaLink: string
  expirationDate: string // ISO date string (e.g. "2025-06-30")
  status: 'active' | 'inactive'
  click_count?: number // Optional: if you're attaching click data in the UI
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
