'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Loader2, ArrowRight, BarChart3 } from 'lucide-react'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { ChanceBadge } from '@/components/chance-badge'
import { CollegeCardSkeleton } from '@/components/college-card-skeleton'
import { predictColleges } from '@/lib/api'
import type { PredictorResult } from '@/lib/api'
import { toast } from 'sonner'

const EXAMS = [
  { value: 'JEE_MAIN', label: 'JEE Main' },
  { value: 'JEE_ADVANCED', label: 'JEE Advanced' },
  { value: 'MHT_CET', label: 'MHT-CET' },
  { value: 'KCET', label: 'KCET' },
  { value: 'WBJEE', label: 'WBJEE' },
]

const CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' },
]

const CHANCE_ORDER = { High: 0, Medium: 1, Low: 2 }

export default function PredictorPage() {
  const [exam, setExam] = useState('')
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<PredictorResult[] | null>(null)
  const [activeTab, setActiveTab] = useState<'All' | 'High' | 'Medium' | 'Low'>('All')

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault()
    if (!exam) { toast.error('Please select an exam'); return }
    if (!rank || parseInt(rank) < 1) { toast.error('Please enter a valid rank'); return }
    if (!category) { toast.error('Please select a category'); return }

    setLoading(true)
    setResults(null)
    try {
      const data = await predictColleges({ exam, rank: parseInt(rank), category })
      const sorted = [...data.colleges].sort(
        (a, b) => CHANCE_ORDER[a.chance] - CHANCE_ORDER[b.chance]
      )
      setResults(sorted)
      setActiveTab('All')
      if (sorted.length === 0) {
        toast.info('No colleges found for this rank range. Try a higher rank.')
      }
    } catch {
      toast.error('Prediction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filtered =
    activeTab === 'All' ? results ?? [] : (results ?? []).filter((c) => c.chance === activeTab)

  const chanceCounts = results
    ? {
        High: results.filter((c) => c.chance === 'High').length,
        Medium: results.filter((c) => c.chance === 'Medium').length,
        Low: results.filter((c) => c.chance === 'Low').length,
      }
    : null

  return (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">College Predictor</h1>
        <p className="text-[#A0A0A0]">Enter your rank to discover colleges where you have the best chances</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Form Panel */}
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 sticky top-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#F5C518] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Find Your Colleges</h2>
              <p className="text-[#606060] text-xs">Fill all fields to get predictions</p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-7">
            {['Exam', 'Rank', 'Category'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    (i === 0 && exam) || (i === 1 && rank) || (i === 2 && category)
                      ? 'bg-[#F5C518] text-black'
                      : 'bg-[#2A2A2A] text-[#A0A0A0]'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-[#A0A0A0]">{step}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-[#2A2A2A]" />}
              </div>
            ))}
          </div>

          <form onSubmit={handlePredict} className="space-y-5">
            {/* Exam */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Entrance Exam</label>
              <Select value={exam} onValueChange={(val) => val && setExam(val)}>
                <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white focus:border-[#F5C518] focus:ring-[#F5C518] h-11">
                  <SelectValue placeholder="Select your exam" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  {EXAMS.map((e) => (
                    <SelectItem key={e.value} value={e.value} className="text-white focus:bg-[#222222] focus:text-[#F5C518]">
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rank */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Your Rank</label>
              <input
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                placeholder="e.g. 15000"
                min="1"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-lg px-4 py-3 text-white placeholder:text-[#606060] outline-none transition-all duration-200 h-11 text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-[#A0A0A0] mb-1.5 block">Category</label>
              <Select value={category} onValueChange={(val) => val && setCategory(val)}>
                <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white focus:border-[#F5C518] focus:ring-[#F5C518] h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="text-white focus:bg-[#222222] focus:text-[#F5C518]">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5C518] text-black font-bold py-3 rounded-xl hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  Predict My Colleges
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="min-h-[400px]">
          {!results && !loading && (
            <div className="flex flex-col items-center justify-center h-80 bg-[#111111] border border-[#2A2A2A] rounded-2xl text-center p-8">
              <GraduationCap className="w-16 h-16 text-[#2A2A2A] mb-4" />
              <h3 className="text-white font-semibold mb-2">No Predictions Yet</h3>
              <p className="text-[#A0A0A0] text-sm max-w-xs">
                Fill in your exam, rank, and category on the left to see personalized college predictions.
              </p>
            </div>
          )}

          {loading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
            </div>
          )}

          {results && !loading && (
            <div className="animate-fadeIn space-y-4">
              {/* Summary */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">
                    Found <span className="text-[#F5C518]">{results.length}</span> colleges matching your profile
                  </p>
                  <p className="text-[#A0A0A0] text-xs mt-0.5">
                    {EXAMS.find((e) => e.value === exam)?.label} • Rank {parseInt(rank).toLocaleString('en-IN')} •{' '}
                    {CATEGORIES.find((c) => c.value === category)?.label}
                  </p>
                </div>
              </div>

              {/* Chance Filter Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(['All', 'High', 'Medium', 'Low'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-[#F5C518] text-black'
                        : 'bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-white'
                    }`}
                  >
                    {tab}
                    {chanceCounts && tab !== 'All' && (
                      <span className="ml-1.5 text-xs opacity-75">({chanceCounts[tab]})</span>
                    )}
                    {tab === 'All' && results && (
                      <span className="ml-1.5 text-xs opacity-75">({results.length})</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center">
                  <p className="text-[#A0A0A0]">No colleges with {activeTab} chance</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((college) => {
                    const pd = college.predictorData[0]
                    const initials = college.name.split(' ').slice(0, 2).map((w) => w[0]).join('')
                    return (
                      <div
                        key={college.id}
                        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 card-hover flex items-start gap-4"
                      >
                        <div className="w-14 h-14 rounded-lg bg-[#F5C518]/10 border border-[#F5C518]/30 flex items-center justify-center shrink-0">
                          <span className="text-[#F5C518] font-bold text-sm">{initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <Link
                              href={`/colleges/${college.id}`}
                              className="text-white font-bold hover:text-[#F5C518] transition-colors duration-200 text-base leading-snug"
                            >
                              {college.name}
                            </Link>
                            <ChanceBadge chance={college.chance} />
                          </div>
                          <p className="text-[#A0A0A0] text-xs mt-1">
                            {college.city}, {college.state} • {college.type}
                          </p>
                          {pd && (
                            <div className="flex flex-wrap gap-4 mt-2.5 text-xs">
                              <span className="text-[#A0A0A0]">
                                Opening Rank:{' '}
                                <span className="text-white font-semibold">
                                  {pd.openingRank.toLocaleString('en-IN')}
                                </span>
                              </span>
                              <span className="text-[#A0A0A0]">
                                Closing Rank:{' '}
                                <span className="text-white font-semibold">
                                  {pd.closingRank.toLocaleString('en-IN')}
                                </span>
                              </span>
                              {college.nirfRank && (
                                <span className="text-[#A0A0A0]">
                                  NIRF: <span className="text-[#F5C518] font-semibold">#{college.nirfRank}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/colleges/${college.id}`}
                          className="shrink-0 flex items-center gap-1 text-[#F5C518] hover:text-[#E6B800] text-sm font-medium transition-colors"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
