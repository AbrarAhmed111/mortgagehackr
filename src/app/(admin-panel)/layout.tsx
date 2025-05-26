// 'use client'
// import Header from '@/components/AdminComponents/Header'
// import Sidebar from '@/components/AdminComponents/Sidebar'
// import React, { ReactNode, useEffect, useState } from 'react'

// interface LayoutProps {
//   children: ReactNode
// }

// export default function Layout({ children }: LayoutProps) {
//   const [sidebarDesktopOpen, setSidebarDesktopOpen] = useState(true)
//   const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSidebarDesktopOpen(true)
//         setSidebarMobileOpen(false)
//       } else {
//         setSidebarDesktopOpen(false)
//       }
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement
//       if (
//         sidebarMobileOpen &&
//         !target.closest('[data-sidebar="true"]') &&
//         !target.closest('[data-menu-button="true"]')
//       ) {
//         setSidebarMobileOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [sidebarMobileOpen])

//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       <Sidebar
//         sidebarDesktopOpen={sidebarDesktopOpen}
//         setSidebarDesktopOpen={setSidebarDesktopOpen}
//         sidebarMobileOpen={sidebarMobileOpen}
//         setSidebarMobileOpen={setSidebarMobileOpen}
//       />

//       {/* Main content area with proper width constraints */}
//       <div
//         className={`flex flex-1 flex-col min-w-0 transition-all duration-300 ${
//           sidebarDesktopOpen ? 'lg:ml-64' : 'lg:ml-0'
//         }`}
//       >
//         <Header
//           sidebarDesktopOpen={sidebarDesktopOpen}
//           sidebarMobileOpen={sidebarMobileOpen}
//           setSidebarMobileOpen={setSidebarMobileOpen}
//         />

//         {/* Main content with overflow control */}
//         <main className="flex-1 overflow-hidden">
//           <div className="h-full w-full p-4 lg:p-6">
//             <div className="h-full w-full max-w-full overflow-hidden">
//               {children}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import Header from '@/components/AdminComponents/Header'
import Sidebar from '@/components/AdminComponents/Sidebar'
import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [sidebarDesktopOpen, setSidebarDesktopOpen] = useState(true)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)

  const hideLayout = pathname === '/login' || pathname === '/forgot-password'

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

  if (hideLayout) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar
        sidebarDesktopOpen={sidebarDesktopOpen}
        setSidebarDesktopOpen={setSidebarDesktopOpen}
        sidebarMobileOpen={sidebarMobileOpen}
        setSidebarMobileOpen={setSidebarMobileOpen}
      />

      <div
        className={`flex flex-1 flex-col min-w-0 transition-all duration-300 ${
          sidebarDesktopOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <Header
          sidebarDesktopOpen={sidebarDesktopOpen}
          sidebarMobileOpen={sidebarMobileOpen}
          setSidebarMobileOpen={setSidebarMobileOpen}
        />

        <main className="flex-1 overflow-hidden">
          <div className="h-full w-full p-4 lg:p-6">
            <div className="h-full w-full max-w-full overflow-hidden">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
