'use client'
import { signout } from '@/lib/actions/auth'
import React, { useState, useRef, useEffect } from 'react'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { IoMenuSharp } from 'react-icons/io5'

interface IHeaderProps {
  sidebarDesktopOpen: string | boolean | undefined
  sidebarMobileOpen: string | boolean | undefined
  setSidebarMobileOpen: (arg0: boolean) => void
}

const Header: React.FC<IHeaderProps> = ({
  sidebarMobileOpen,
  setSidebarMobileOpen,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 flex w-full z-50">
      <div className="flex flex-grow items-center px-4 md:px-6 py-2 2xl:px-11 justify-between backdrop-blur-md  border-b">
        <div className="lg:hidden">
          <button
            onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
            className="text-gray-400 hover:text-gray-300 p-1"
          >
            <IoMenuSharp size={24} />
          </button>
        </div>
        <div></div>
        <div className="hidden lg:block"></div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-400 hover:text-gray-300 border rounded-full p-2"
          >
            <FaUser size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
              <button
                onClick={signout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
