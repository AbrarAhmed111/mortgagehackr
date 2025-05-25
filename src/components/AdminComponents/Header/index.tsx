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
