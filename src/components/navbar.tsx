'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import {
  GraduationCap,
  Menu,
  Bookmark,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'Colleges' },
  { href: '/predictor', label: 'Predictor' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#111111] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-[#F5C518]" />
          <span className="text-xl font-bold text-white">
            Edu<span className="text-[#F5C518]">Compass</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                isActive(link.href)
                  ? 'text-[#F5C518]'
                  : 'text-[#A0A0A0] hover:text-white'
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <div className="h-0.5 bg-[#F5C518] rounded-full mt-0.5 mx-auto" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/saved"
                className="flex items-center gap-1.5 text-sm text-[#A0A0A0] hover:text-[#F5C518] transition-colors duration-200"
              >
                <Bookmark className="w-4 h-4" />
                Saved
              </Link>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#F5C518] rounded-lg px-3 py-2 text-sm text-white transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-[#F5C518] flex items-center justify-center">
                    <span className="text-black text-xs font-bold">
                      {session.user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  </div>
                  <span className="max-w-[120px] truncate">{session.user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-[#A0A0A0]" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl z-50 overflow-hidden">
                    <Link
                      href="/saved"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#A0A0A0] hover:bg-[#222222] hover:text-white transition-colors"
                    >
                      <Bookmark className="w-4 h-4" />
                      Saved Colleges
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#EF4444] hover:bg-[#222222] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/login')}
                className="border-[#2A2A2A] text-white bg-transparent hover:border-[#F5C518] hover:text-[#F5C518] transition-all duration-200"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => router.push('/register')}
                className="bg-[#F5C518] text-black font-semibold hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden text-white p-2 rounded">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#111111] border-[#2A2A2A] w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-white">
                <GraduationCap className="w-5 h-5 text-[#F5C518]" />
                Edu<span className="text-[#F5C518]">Compass</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive(link.href)
                      ? 'bg-[#F5C518]/10 text-[#F5C518]'
                      : 'text-[#A0A0A0] hover:bg-[#1A1A1A] hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[#2A2A2A] my-3" />
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5C518] flex items-center justify-center">
                      <span className="text-black text-sm font-bold">
                        {session.user?.name?.[0]?.toUpperCase() ?? 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{session.user?.name}</p>
                      <p className="text-[#606060] text-xs">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/saved"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-[#A0A0A0] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    Saved Colleges
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-[#EF4444] hover:bg-[#1A1A1A] transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Button
                    variant="outline"
                    onClick={() => { setMobileOpen(false); router.push('/login') }}
                    className="border-[#2A2A2A] text-white bg-transparent hover:border-[#F5C518] hover:text-[#F5C518] w-full"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={() => { setMobileOpen(false); router.push('/register') }}
                    className="bg-[#F5C518] text-black font-semibold hover:bg-[#E6B800] w-full"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Close user menu on outside click */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </nav>
  )
}
