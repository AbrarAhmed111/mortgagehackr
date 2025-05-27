'use client'
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constants'
import { ISidebarProps, NavLinkProps } from '@/utils/types'

const Sidebar: React.FC<ISidebarProps> = ({
  sidebarDesktopOpen,
  sidebarMobileOpen,
  setSidebarMobileOpen,
}) => {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const sidebar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSidebarItemClick = (path: string): void => {
    if (isClient && window.innerWidth < 1024) {
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
        return
      }
      onClick && onClick()
    }

    return (
      <Link href={to} className={finalClassName} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  return (
    <>
      <aside
        ref={sidebar}
        data-sidebar="true"
        className={`fixed left-0 top-0 flex h-screen flex-col border-r bg-gray-100 overflow-hidden transition-all duration-300 z-40
          ${sidebarDesktopOpen ? 'lg:w-64' : 'lg:w-0'}
          ${sidebarMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full w-64'}
          lg:translate-x-0`}
      >
        <div className="flex items-center gap-2 px-8 py-3 border-b">
          <NavLink to="/" onClick={() => handleSidebarItemClick('/')}>
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-[#8cc63f]">
                Dashboard
              </span>
            </div>
          </NavLink>
        </div>

        <div className="flex flex-col overflow-y-auto">
          <nav className="mt-2">
            <div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <li key={link.to || index}>
                    <NavLink
                      to={link.to}
                      onClick={() => handleSidebarItemClick(link.to)}
                      className={`${
                        pathname === link.to
                          ? 'bg-[#73a334]/30 w-[80%] rounded-lg px-3 py-1 flex items-center gap-3 ml-4 font-medium'
                          : 'text-gray-700 hover:text-[#73a334]  px-3 py-2.5 rounded-full flex items-center gap-3 ml-4 font-medium'
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
    </>
  )
}

export default Sidebar
