'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { GraduationCap, Loader2, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { registerUser } from '@/lib/api'

interface FieldErrors {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

function PasswordRule({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${met ? 'text-green-400' : 'text-[#606060]'}`}>
      {met ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {text}
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const pwRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  }

  function validate(): boolean {
    const e: FieldErrors = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required'
    if (!pwRules.length) e.password = 'Password must be at least 8 characters'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await registerUser({ name: name.trim(), email, password })
      const res = await signIn('credentials', { email, password, redirect: false })
      if (res?.error) {
        toast.success('Account created! Please login.')
        router.push('/login')
      } else {
        toast.success('Account created! Welcome to EduCompass.')
        router.push('/colleges')
        router.refresh()
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      if (msg.toLowerCase().includes('email')) {
        setErrors({ email: 'Email already registered' })
      } else {
        toast.error(msg)
      }
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
            <h1 className="text-2xl font-bold text-white">Create an Account</h1>
            <p className="text-[#A0A0A0] text-sm mt-1">Join to save colleges and write reviews</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
                placeholder="John Doe"
                className={`w-full bg-[#0A0A0A] border ${errors.name ? 'border-[#EF4444]' : 'border-[#2A2A2A]'} focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm`}
              />
              {errors.name && <p className="text-[#EF4444] text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                placeholder="you@example.com"
                className={`w-full bg-[#0A0A0A] border ${errors.email ? 'border-[#EF4444]' : 'border-[#2A2A2A]'} focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm`}
              />
              {errors.email && <p className="text-[#EF4444] text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })) }}
                  placeholder="Create a strong password"
                  className={`w-full bg-[#0A0A0A] border ${errors.password ? 'border-[#EF4444]' : 'border-[#2A2A2A]'} focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 pr-10 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606060] hover:text-[#A0A0A0]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="flex gap-3 mt-2 flex-wrap">
                  <PasswordRule met={pwRules.length} text="8+ chars" />
                  <PasswordRule met={pwRules.upper} text="Uppercase" />
                  <PasswordRule met={pwRules.number} text="Number" />
                </div>
              )}
              {errors.password && <p className="text-[#EF4444] text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })) }}
                  placeholder="Re-enter your password"
                  className={`w-full bg-[#0A0A0A] border ${errors.confirm ? 'border-[#EF4444]' : 'border-[#2A2A2A]'} focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 pr-10 text-white placeholder:text-[#606060] outline-none transition-all duration-200 text-sm`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606060] hover:text-[#A0A0A0]">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && <p className="text-[#EF4444] text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5C518] text-black font-bold py-3 rounded-xl hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="text-center text-[#A0A0A0] text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#F5C518] hover:text-[#E6B800] font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
