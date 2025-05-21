'use client'
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { navLinks } from '@/constants'
import { ISidebarProps, NavLinkProps } from '@/utils/types'

const Sidebar: React.FC<ISidebarProps> = ({
  sidebarDesktopOpen,
  sidebarMobileOpen,
  setSidebarMobileOpen,
}) => {
  const [mounted, setMounted] = useState(false)
  const [pathname, setPathname] = useState('')
  const sidebar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setPathname(window.location.pathname)
  }, [])

  const handleSidebarItemClick = (path: string): void => {
    setPathname(path)
    if (window.innerWidth < 1024) {
      setSidebarMobileOpen(false)
    }
  }

  const NavLink: React.FC<NavLinkProps> = ({
    to,
    children,
    className,
    onClick,
  }) => {
    const isActive = pathname === to
    const finalClassName =
      typeof className === 'function' ? className({ isActive }) : className

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
      if (to === '#') {
        e.preventDefault()
      } else {
        setPathname(to)
        onClick && onClick()
      }
    }

    return (
      <Link href={to} className={finalClassName} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  const getSidebarClasses = () => {
    if (!mounted) return ''
    if (window.innerWidth >= 1024) {
      return sidebarDesktopOpen ? 'w-64' : 'w-0'
    } else {
      return sidebarMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full w-64'
    }
  }

  if (!mounted) return null

  return (
    <div className="size-screen">
      <aside
        ref={sidebar}
        data-sidebar="true"
        className={`fixed left-0 top-0 z-[999] flex h-screen flex-col border-r bg-gray-100 overflow-hidden transition-all duration-300 ${getSidebarClasses()}`}
      >
        <div className="flex items-center gap-2 px-8 py-8">
          <NavLink to="/" onClick={() => handleSidebarItemClick('/')}>
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-gray-700">WEB</span>
            </div>
          </NavLink>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto">
          <nav className="mt-2">
            <div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.to}
                      onClick={() => handleSidebarItemClick(link.to)}
                      className={`${
                        pathname === link.to
                          ? 'sidebar-btn flex items-center gap-3 ml-4'
                          : 'text-gray-700 hover:text-gray-500 px-4 py-2.5 rounded-full flex items-center gap-3 ml-4'
                      }`}
                    >
                      <span className="w-5 h-5">{link.icon}</span>
                      <span className="text-lg">{link.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
