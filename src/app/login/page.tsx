'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { GraduationCap, Loader2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/colleges'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Welcome back!')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <GraduationCap className="w-7 h-7 text-[#F5C518]" />
              <span className="text-xl font-bold text-white">
                Edu<span className="text-[#F5C518]">Compass</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-[#A0A0A0] text-sm mt-1">Login to continue your college search</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 pr-10 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606060] hover:text-[#A0A0A0]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5C518] text-black font-bold py-3 rounded-xl hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Login
            </button>
          </form>

          <p className="text-center text-[#A0A0A0] text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#F5C518] hover:text-[#E6B800] font-medium transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-6 h-6 text-[#F5C518] animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  )
}
