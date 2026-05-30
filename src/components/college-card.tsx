'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { MapPin, Bookmark, Trophy, IndianRupee, Star, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { toggleSaved } from '@/lib/api'
import type { CollegeListItem } from '@/lib/api'
import { cn } from '@/lib/utils'

function getGoogleFavicon(website: string | null): string | null {
  if (!website) return null
  try {
    const domain = new URL(website).hostname
    return `https://www.google.com/s2/favicons?sz=256&domain=${domain}`
  } catch {
    return null
  }
}

function CollegeLogo({ website, name, size }: { website: string | null; name: string; size: number }) {
  const [imgError, setImgError] = useState(false)
  const logoUrl = getGoogleFavicon(website)
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

  if (logoUrl && !imgError) {
    return (
      <div
        className="rounded-lg bg-white border-2 border-[#F5C518]/30 flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={name}
          className="object-contain"
          style={{ width: size * 0.65, height: size * 0.65 }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className="rounded-lg bg-[#F5C518]/10 border-2 border-[#F5C518]/30 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-[#F5C518] font-bold" style={{ fontSize: size * 0.28 }}>{initials}</span>
    </div>
  )
}

interface CollegeCardProps {
  college: CollegeListItem
  initialSaved?: boolean
  onUnsave?: (id: number) => void
  layout?: 'list' | 'grid'
}

function formatFees(fees: number) {
  const lakhs = fees / 100000
  return `₹${lakhs.toFixed(1)}L/yr`
}

export function CollegeCard({
  college,
  initialSaved = false,
  onUnsave,
  layout = 'list',
}: CollegeCardProps) {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(initialSaved)
  const [saving, setSaving] = useState(false)

  async function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault()
    if (!session) {
      toast.warning('Please login to save colleges')
      return
    }
    setSaving(true)
    try {
      const res = await toggleSaved(college.id)
      setSaved(res.saved)
      if (res.saved) {
        toast.success('College saved!')
      } else {
        toast.info('Removed from saved')
        onUnsave?.(college.id)
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (layout === 'grid') {
    return (
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 card-hover flex flex-col h-full">
        <div className="flex items-start gap-3 mb-3">
          <CollegeLogo website={college.website} name={college.name} size={48} />
          <div className="flex-1 min-w-0">
            <Link
              href={`/colleges/${college.id}`}
              className="text-white font-semibold text-sm leading-snug hover:text-[#F5C518] transition-colors duration-200 line-clamp-2"
            >
              {college.name}
            </Link>
            <p className="text-[#A0A0A0] text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {college.city}, {college.state}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518] font-medium">
            {college.type}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#222222] text-[#A0A0A0]">
            {college.field}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-4 flex-1">
          {college.nirfRank && (
            <div className="flex items-center gap-1 text-[#A0A0A0]">
              <Trophy className="w-3 h-3 text-[#F5C518]" />
              <span>NIRF #{college.nirfRank}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[#A0A0A0]">
            <IndianRupee className="w-3 h-3 text-[#F5C518]" />
            <span>{formatFees(college.fees)}</span>
          </div>
          <div className="flex items-center gap-1 text-[#A0A0A0]">
            <Star className="w-3 h-3 text-[#F5C518] fill-[#F5C518]" />
            <span>{college.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link
          href={`/colleges/${college.id}`}
          className="mt-auto block text-center bg-[#F5C518] text-black font-semibold text-sm py-2 rounded-lg hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 card-hover flex gap-4 items-start">
      <CollegeLogo website={college.website} name={college.name} size={80} />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <Link
            href={`/colleges/${college.id}`}
            className="text-white font-bold text-lg hover:text-[#F5C518] transition-colors duration-200 leading-snug"
          >
            {college.name}
          </Link>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518] font-medium shrink-0 mt-1">
            {college.type}
          </span>
        </div>

        <p className="text-[#A0A0A0] text-sm mt-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {college.city}, {college.state}
        </p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {college.nirfRank && (
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#F5C518]" />
              <span className="text-[#A0A0A0]">NIRF</span>
              <span className="text-white font-semibold">#{college.nirfRank}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-[#F5C518]" />
            <span className="text-[#A0A0A0]">Fees</span>
            <span className="text-white font-semibold">{formatFees(college.fees)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#F5C518] fill-[#F5C518]" />
            <span className="text-white font-semibold">{college.rating.toFixed(1)}</span>
          </div>
          {college.established && (
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#F5C518]" />
              <span className="text-[#A0A0A0]">Est.</span>
              <span className="text-white font-semibold">{college.established}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex flex-col gap-2 items-end shrink-0">
        <Link
          href={`/colleges/${college.id}`}
          className="bg-[#F5C518] text-black font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          View Details
        </Link>
        <button
          onClick={handleToggleSave}
          disabled={saving}
          className={cn(
            'p-2 rounded-lg border transition-all duration-200',
            saved
              ? 'bg-[#F5C518]/10 border-[#F5C518] text-[#F5C518]'
              : 'bg-[#111111] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#F5C518] hover:text-[#F5C518]'
          )}
          title={saved ? 'Remove from saved' : 'Save college'}
        >
          <Bookmark className={cn('w-4 h-4', saved && 'fill-[#F5C518]')} />
        </button>
      </div>
    </div>
  )
}
