import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/session-provider'
import { QueryProvider } from '@/providers/query-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'EduCompass — Find Your Dream Engineering College',
  description:
    'Explore 80+ top engineering colleges, predict your admission chances with JEE rank, and make the right choice.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white antialiased">
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster theme="dark" position="top-right" richColors />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
