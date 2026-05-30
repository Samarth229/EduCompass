'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react'
import { CollegeCard } from '@/components/college-card'
import { CollegeCardSkeleton } from '@/components/college-card-skeleton'
import { getColleges } from '@/lib/api'
import type { CollegeListItem } from '@/lib/api'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const STATES = [
  'Tamil Nadu', 'Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh',
  'West Bengal', 'Telangana', 'Rajasthan', 'Gujarat', 'Punjab',
  'Kerala', 'Odisha', 'Jharkhand', 'Bihar', 'Uttarakhand', 'Assam',
]
const TYPES = ['Government', 'Private', 'Deemed']
const FIELDS = ['Engineering', 'Management', 'Medical']
const SORT_OPTIONS = [
  { value: 'nirfRank-asc', label: 'NIRF Rank' },
  { value: 'fees-asc', label: 'Fees: Low to High' },
  { value: 'fees-desc', label: 'Fees: High to Low' },
  { value: 'rating-desc', label: 'Rating' },
]

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-[#2A2A2A] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-white font-semibold text-sm mb-3"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-[#A0A0A0]" /> : <ChevronDown className="w-4 h-4 text-[#A0A0A0]" />}
      </button>
      {open && children}
    </div>
  )
}

interface Filters {
  search: string
  states: string[]
  types: string[]
  fields: string[]
  minRating: string
  sortBy: string
  sortOrder: string
  page: number
}

function CollegesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') ?? '',
    states: searchParams.get('state') ? [searchParams.get('state')!] : [],
    types: searchParams.get('type') ? [searchParams.get('type')!] : [],
    fields: searchParams.get('field') ? [searchParams.get('field')!] : [],
    minRating: searchParams.get('minRating') ?? '',
    sortBy: searchParams.get('sortBy') ?? 'nirfRank',
    sortOrder: searchParams.get('sortOrder') ?? 'asc',
    page: parseInt(searchParams.get('page') ?? '1', 10),
  })

  const [colleges, setColleges] = useState<CollegeListItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const applyFilters = useCallback(async (f: Filters) => {
    setLoading(true)
    const params: Record<string, string> = { page: String(f.page), limit: '10' }
    if (f.search) params.search = f.search
    if (f.states.length === 1) params.state = f.states[0]
    if (f.types.length === 1) params.type = f.types[0]
    if (f.fields.length === 1) params.field = f.fields[0]
    if (f.minRating) params.minRating = f.minRating
    params.sortBy = f.sortBy
    params.sortOrder = f.sortOrder

    const qs = new URLSearchParams(params).toString()
    router.replace(`/colleges?${qs}`, { scroll: false })

    try {
      const data = await getColleges(params)
      setColleges(data.colleges)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch {
      setColleges([])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    applyFilters(filters)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleCheck(key: 'states' | 'types' | 'fields', value: string) {
    setFilters((prev) => {
      const arr = prev[key]
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  function handleSortChange(val: string) {
    const [sortBy, sortOrder] = val.split('-')
    const next = { ...filters, sortBy, sortOrder, page: 1 }
    setFilters(next)
    applyFilters(next)
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = { ...filters, page: 1 }
    setFilters(next)
    applyFilters(next)
  }

  function handleApplyFilters() {
    const next = { ...filters, page: 1 }
    setFilters(next)
    applyFilters(next)
    setMobileFiltersOpen(false)
  }

  function handleReset() {
    const reset: Filters = {
      search: '', states: [], types: [], fields: [],
      minRating: '', sortBy: 'nirfRank', sortOrder: 'asc', page: 1,
    }
    setFilters(reset)
    applyFilters(reset)
  }

  function handlePageChange(p: number) {
    const next = { ...filters, page: p }
    setFilters(next)
    applyFilters(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sortValue = `${filters.sortBy}-${filters.sortOrder}`

  const FiltersPanel = (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-bold text-base">Filters</span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-[#A0A0A0] hover:text-[#F5C518] transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search */}
      <div className="py-4 border-b border-[#2A2A2A]">
        <form onSubmit={handleSearch}>
          <input
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
            placeholder="Search colleges..."
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#606060] outline-none transition-all duration-200"
          />
        </form>
      </div>

      <FilterSection title="State">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {STATES.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.states.includes(s)}
                onChange={() => toggleCheck('states', s)}
                className="accent-[#F5C518] w-3.5 h-3.5"
              />
              <span className="text-[#A0A0A0] text-sm group-hover:text-white transition-colors">{s}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="College Type">
        <div className="space-y-2">
          {TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.types.includes(t)}
                onChange={() => toggleCheck('types', t)}
                className="accent-[#F5C518] w-3.5 h-3.5"
              />
              <span className="text-[#A0A0A0] text-sm group-hover:text-white transition-colors">{t}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Field">
        <div className="space-y-2">
          {FIELDS.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fields.includes(f)}
                onChange={() => toggleCheck('fields', f)}
                className="accent-[#F5C518] w-3.5 h-3.5"
              />
              <span className="text-[#A0A0A0] text-sm group-hover:text-white transition-colors">{f}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Minimum Rating">
        <div className="flex flex-wrap gap-2">
          {['3', '3.5', '4', '4.5'].map((r) => (
            <button
              key={r}
              onClick={() => setFilters((p) => ({ ...p, minRating: p.minRating === r ? '' : r }))}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                filters.minRating === r
                  ? 'bg-[#F5C518] text-black border-[#F5C518] font-semibold'
                  : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-white'
              }`}
            >
              {r}★+
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-[#F5C518] text-black font-semibold py-2.5 rounded-lg hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )

  return (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Engineering Colleges in India</h1>
        <p className="text-[#A0A0A0] text-sm mt-1">Discover and compare top colleges based on NIRF 2024 data</p>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 sticky top-20">
            {FiltersPanel}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger className="lg:hidden flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] text-white px-3 py-2 rounded-lg text-sm hover:border-[#F5C518] transition-all">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#111111] border-[#2A2A2A] w-80 overflow-y-auto">
                  <SheetHeader className="mb-4">
                    <SheetTitle className="text-white">Filters</SheetTitle>
                  </SheetHeader>
                  {FiltersPanel}
                </SheetContent>
              </Sheet>
              <p className="text-[#A0A0A0] text-sm">
                {loading ? (
                  <span className="text-[#606060]">Loading...</span>
                ) : (
                  <>
                    Showing{' '}
                    <span className="text-white font-semibold">
                      {(filters.page - 1) * 10 + 1}–{Math.min(filters.page * 10, total)}
                    </span>{' '}
                    of <span className="text-white font-semibold">{total}</span> colleges
                  </>
                )}
              </p>
            </div>

            <Select value={sortValue} onValueChange={(val) => val && handleSortChange(val)}>
              <SelectTrigger className="w-44 bg-[#1A1A1A] border-[#2A2A2A] text-white text-sm focus:border-[#F5C518] focus:ring-[#F5C518]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-white focus:bg-[#222222] focus:text-[#F5C518]">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {(filters.states.length > 0 || filters.types.length > 0 || filters.fields.length > 0 || filters.minRating) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.states.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 text-xs bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/30 px-2.5 py-1 rounded-full">
                  {s}
                  <button onClick={() => { toggleCheck('states', s); handleApplyFilters() }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.types.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 text-xs bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/30 px-2.5 py-1 rounded-full">
                  {t}
                  <button onClick={() => { toggleCheck('types', t); handleApplyFilters() }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.minRating && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#F5C518]/10 text-[#F5C518] border border-[#F5C518]/30 px-2.5 py-1 rounded-full">
                  {filters.minRating}★+
                  <button onClick={() => { setFilters((p) => ({ ...p, minRating: '' })); handleApplyFilters() }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* College List */}
          <div className="space-y-3">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <CollegeCardSkeleton key={i} />)
              : colleges.length > 0
              ? colleges.map((c) => <CollegeCard key={c.id} college={c} />)
              : (
                <div className="text-center py-20 bg-[#111111] rounded-xl border border-[#2A2A2A]">
                  <p className="text-[#A0A0A0] text-lg mb-2">No colleges found</p>
                  <p className="text-[#606060] text-sm mb-6">Try adjusting your filters</p>
                  <button
                    onClick={handleReset}
                    className="bg-[#F5C518] text-black font-semibold px-6 py-2.5 rounded-full hover:bg-[#E6B800] transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={filters.page <= 1}
                onClick={() => handlePageChange(filters.page - 1)}
                className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - filters.page) <= 2)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center gap-2">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="text-[#606060]">…</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                        p === filters.page
                          ? 'bg-[#F5C518] text-black'
                          : 'border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              <button
                disabled={filters.page >= totalPages}
                onClick={() => handlePageChange(filters.page + 1)}
                className="px-4 py-2 rounded-lg border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CollegeCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <CollegesContent />
    </Suspense>
  )
}
