'use client'
import Header from '@/components/AdminComponents/Header'
import Sidebar from '@/components/AdminComponents/Sidebar'
import React, { ReactNode, useEffect, useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarDesktopOpen, setSidebarDesktopOpen] = useState(true)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarDesktopOpen(true)
        setSidebarMobileOpen(false)
      } else {
        setSidebarDesktopOpen(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        sidebarMobileOpen &&
        !target.closest('[data-sidebar="true"]') &&
        !target.closest('[data-menu-button="true"]')
      ) {
        setSidebarMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebarMobileOpen])
  return (
    <div className="flex min-h-screen z-50">
      <Sidebar
        sidebarDesktopOpen={sidebarDesktopOpen}
        setSidebarDesktopOpen={setSidebarDesktopOpen}
        sidebarMobileOpen={sidebarMobileOpen}
        setSidebarMobileOpen={setSidebarMobileOpen}
      />

      <div className="flex flex-1 flex-col  lg:ml-64">
        <Header
          sidebarDesktopOpen={sidebarDesktopOpen}
          sidebarMobileOpen={sidebarMobileOpen}
          setSidebarMobileOpen={setSidebarMobileOpen}
        />

        <main className="h-full w-[98%] mx-auto py-2 pt-16">
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
