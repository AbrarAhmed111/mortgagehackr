import '../assets/css/globals.css'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import Providers from '@/store/Providers'

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <html lang="en">
        <head></head>
        <body suppressHydrationWarning className="antialiased w-full">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </body>
      </html>
    </Providers>
  )
}
