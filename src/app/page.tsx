import { Suspense } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, GraduationCap, Target, BarChart3, BookOpen } from 'lucide-react'
import { CollegeCard } from '@/components/college-card'
import { CollegeCardGridSkeleton } from '@/components/college-card-skeleton'
import type { CollegeListItem } from '@/lib/api'

async function fetchTopColleges(): Promise<CollegeListItem[]> {
  try {
    const res = await fetch(`https://edu-compass-three.vercel.app/api/colleges?limit=6&sortBy=nirfRank&sortOrder=asc`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.colleges ?? []
  } catch {
    return []
  }
}

async function TopCollegesSection() {
  const colleges = await fetchTopColleges()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} layout="grid" />
      ))}
    </div>
  )
}

const STATS = [
  { value: '50+', label: 'Colleges Listed', icon: BookOpen },
  { value: '5', label: 'Exams Covered', icon: Target },
  { value: 'NIRF 2024', label: 'Real Data', icon: BarChart3 },
  { value: 'Free', label: 'Predictor Tool', icon: GraduationCap },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Enter Your Rank',
    desc: 'Input your JEE Main, JEE Advanced, MHT-CET, KCET or WBJEE rank.',
  },
  {
    step: '02',
    title: 'Select Exam & Category',
    desc: 'Choose your entrance exam and reservation category for accurate results.',
  },
  {
    step: '03',
    title: 'Get College List',
    desc: 'Instantly see colleges with admission chances: High, Medium, or Low.',
  },
]

const QUICK_FILTERS = [
  { label: 'IITs', href: '/colleges?search=IIT&type=Government' },
  { label: 'NITs', href: '/colleges?search=NIT&type=Government' },
  { label: 'Private', href: '/colleges?type=Private' },
  { label: 'Government', href: '/colleges?type=Government' },
  { label: 'Deemed', href: '/colleges?type=Deemed' },
]

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5C518]/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#F5C518] text-sm font-medium">NIRF 2024 Rankings</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Find Your Dream{' '}
            <span className="text-[#F5C518]">Engineering College</span>
          </h1>
          <p className="text-[#A0A0A0] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Explore 50+ top engineering colleges, predict your admission chances with your JEE rank,
            and make the right choice for your future.
          </p>

          {/* Search Bar */}
          <form
            action="/colleges"
            method="GET"
            className="flex items-center bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#F5C518]/50 rounded-full p-1.5 pl-5 gap-2 max-w-2xl mx-auto transition-all duration-200 focus-within:border-[#F5C518] focus-within:ring-1 focus-within:ring-[#F5C518]/30"
          >
            <Search className="w-5 h-5 text-[#606060] flex-shrink-0" />
            <input
              type="text"
              name="search"
              placeholder="Search colleges by name, city, or state..."
              className="flex-1 bg-transparent text-white placeholder:text-[#606060] outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-[#F5C518] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200 flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-[#606060] text-sm">Quick filters:</span>
            {QUICK_FILTERS.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="text-sm px-4 py-1.5 rounded-full border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-[#F5C518] transition-all duration-200"
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl border-l-4 border-[#F5C518] bg-[#1A1A1A]"
              >
                <Icon className="w-8 h-8 text-[#F5C518] flex-shrink-0" />
                <div>
                  <p className="text-2xl font-bold text-[#F5C518]">{value}</p>
                  <p className="text-[#A0A0A0] text-sm">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Colleges */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Top Ranked Colleges</h2>
            <p className="text-[#A0A0A0] text-sm mt-1">Based on NIRF 2024 rankings</p>
          </div>
          <Link
            href="/colleges"
            className="flex items-center gap-1.5 text-[#F5C518] hover:text-[#E6B800] font-semibold text-sm transition-colors duration-200"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Suspense fallback={<CollegeCardGridSkeleton count={6} />}>
          <TopCollegesSection />
        </Suspense>
      </section>

      {/* How Predictor Works */}
      <section className="bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">How the Predictor Works</h2>
            <p className="text-[#A0A0A0]">3 simple steps to find your best-match colleges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5C518] flex items-center justify-center mb-4 font-bold text-black text-lg">
                  {step}
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[-50%] h-0.5 bg-gradient-to-r from-[#F5C518] to-[#2A2A2A]" />
                )}
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#F5C518]/20 via-[#F5C518]/10 to-[#F5C518]/5 border border-[#F5C518]/30 rounded-2xl p-12 text-center">
          <GraduationCap className="w-12 h-12 text-[#F5C518] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Ready to find your college?</h2>
          <p className="text-[#A0A0A0] mb-8 max-w-lg mx-auto">
            Use our free predictor tool to see which colleges accept students at your rank.
          </p>
          <Link
            href="/predictor"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-black font-bold px-8 py-3.5 rounded-full hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200 text-base"
          >
            Use Predictor Tool <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
