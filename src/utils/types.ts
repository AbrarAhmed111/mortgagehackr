import { StaticImageData } from 'next/image'

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

export type Column<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  isImage?: boolean
  imageWidth?: number
  imageHeight?: number
  render?: (item: T) => React.ReactNode
}
