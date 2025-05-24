import React from 'react'
import { FaUser } from 'react-icons/fa'
// import { IoTimeOutline } from 'react-icons/io5'
// import { IoAppsOutline } from 'react-icons/io5'
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
  return (
    <header className="width-maker fixed top-0 z-50 bg-onHover/10 backdrop-blur-md border-b  border-white/20 shadow-sm">
      <div className="flex flex-grow items-center justify-between lg:justify-end px-4 py-2 gap-3">
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
        <div className="flex items-center gap-4 py-1">
          {/* <button className="text-gray-400 hover:text-gray-300">
            <IoTimeOutline size={20} />
          </button> */}

          <button className="text-gray-400 hover:text-gray-300 border rounded-full p-1">
            <FaUser size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
