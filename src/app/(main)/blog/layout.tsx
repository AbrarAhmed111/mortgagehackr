import { ReactNode } from 'react'
import Header from '@/components/MainComponents/header/header'
import Footer from '@/components/MainComponents/footer/footer'

type BlogLayoutProps = {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 