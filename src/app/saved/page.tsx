import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bookmark, ArrowRight } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CollegeCard } from '@/components/college-card'
import type { CollegeListItem } from '@/lib/api'

export default async function SavedPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/saved')
  }

  const savedRecords = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
    orderBy: { savedAt: 'desc' },
  })

  const colleges: CollegeListItem[] = savedRecords.map((r) => ({
    id: r.college.id,
    name: r.college.name,
    city: r.college.city,
    state: r.college.state,
    type: r.college.type,
    nirfRank: r.college.nirfRank,
    nirfScore: r.college.nirfScore,
    fees: r.college.fees,
    rating: r.college.rating,
    established: r.college.established,
    image: r.college.image,
    field: r.college.field,
    website: r.college.website,
    description: r.college.description,
    createdAt: r.college.createdAt.toISOString(),
  }))

  return (
    <div className="animate-fadeIn max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bookmark className="w-6 h-6 text-[#F5C518]" />
          <div>
            <h1 className="text-2xl font-bold text-white">Saved Colleges</h1>
            <p className="text-[#A0A0A0] text-sm mt-0.5">
              {colleges.length > 0
                ? `${colleges.length} college${colleges.length > 1 ? 's' : ''} saved`
                : 'No colleges saved yet'}
            </p>
          </div>
        </div>
        <Link
          href="/colleges"
          className="flex items-center gap-1.5 text-[#F5C518] hover:text-[#E6B800] text-sm font-medium transition-colors"
        >
          Explore Colleges <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {colleges.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#111111] border border-[#2A2A2A] rounded-2xl text-center">
          <Bookmark className="w-16 h-16 text-[#2A2A2A] mb-4" />
          <h2 className="text-white font-semibold text-lg mb-2">No saved colleges yet</h2>
          <p className="text-[#A0A0A0] text-sm mb-8 max-w-sm">
            Browse colleges and click the bookmark icon to save them here for easy access.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-black font-bold px-6 py-3 rounded-full hover:bg-[#E6B800] hover:scale-[1.03] active:scale-95 transition-all duration-200 text-sm"
          >
            Explore Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} initialSaved />
          ))}
        </div>
      )}
    </div>
  )
}
