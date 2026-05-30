'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  MapPin, Trophy, IndianRupee, Star, Globe, Bookmark,
  ChevronRight, TrendingUp, Users, Briefcase, GraduationCap,
  Loader2, ExternalLink, ThumbsUp, MessageCircle, Send, X,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StarRating } from '@/components/star-rating'
import { toast } from 'sonner'
import {
  getCollege, toggleSaved, submitReview, likeReview, replyToReview,
} from '@/lib/api'
import type { CollegeDetail, ReviewItem, ReviewReplyItem } from '@/lib/api'
import { useSession } from 'next-auth/react'

function formatFees(fees: number) {
  return `₹${(fees / 100000).toFixed(1)}L`
}

function formatPackage(lpa: number) {
  if (lpa >= 100) return `₹${(lpa / 100).toFixed(2)} Cr`
  return `₹${lpa} LPA`
}

function generateAbout(college: CollegeDetail): string {
  const placement = college.placements[0]
  const typeDesc =
    college.type === 'Government'
      ? 'As a government-funded institution, it offers subsidized education of the highest standard, making it accessible to students from all socioeconomic backgrounds while maintaining world-class academic standards.'
      : college.type === 'Deemed'
      ? 'As a deemed university, it enjoys academic autonomy that allows it to innovate in curriculum design, research initiatives, and industry partnerships beyond conventional university structures.'
      : 'As a premier private institution, it combines cutting-edge infrastructure with an industry-focused curriculum, producing graduates who are immediately productive in their careers.'

  const rankLine = college.nirfRank
    ? `Ranked #${college.nirfRank} nationally by NIRF 2024${college.nirfScore ? ` with a score of ${college.nirfScore.toFixed(2)}` : ''}, it stands among the most respected engineering institutions in India.`
    : ''

  const placementLine = placement
    ? `The dedicated placement cell has consistently delivered exceptional results — the ${placement.year} batch saw an average package of ${formatPackage(placement.avgPackage)}, a highest package of ${formatPackage(placement.highestPackage)}, and a placement rate of ${placement.placementPercent}%. Recruiters include top names like ${placement.topRecruiters.split(',').slice(0, 3).join(', ')} and many more.`
    : ''

  return [
    college.description ?? '',
    '',
    `${college.name} is a ${college.type.toLowerCase()} ${college.field.toLowerCase()} institution located in ${college.city}, ${college.state}${college.established ? `, with a rich legacy spanning over ${new Date().getFullYear() - college.established} years since its founding in ${college.established}` : ''}.`,
    rankLine,
    typeDesc,
    `The institute offers ${college.courses.length} carefully designed programs covering diverse specializations, supported by state-of-the-art laboratories, dedicated research centres, and strong ties with industry leaders.`,
    placementLine,
    `Students at ${college.name} benefit from a vibrant campus life, active technical and cultural clubs, and a global alumni network that opens doors across industries and geographies.`,
  ]
    .filter(Boolean)
    .join(' ')
}

function getGoogleFavicon(website: string | null): string | null {
  if (!website) return null
  try {
    const domain = new URL(website).hostname
    return `https://www.google.com/s2/favicons?sz=256&domain=${domain}`
  } catch {
    return null
  }
}

function CollegeLogo({
  website, name, size = 80,
}: { website: string | null; name: string; size?: number }) {
  const [imgError, setImgError] = useState(false)
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  const logoUrl = getGoogleFavicon(website)

  return (
    <div
      className="rounded-xl border-2 border-[#F5C518]/30 bg-white overflow-hidden flex items-center justify-center"
      style={{ width: size, height: size, minWidth: size }}
    >
      {logoUrl && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={name}
          className="object-contain"
          style={{ width: size * 0.7, height: size * 0.7 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full bg-[#F5C518]/10 flex items-center justify-center"
        >
          <span className="text-[#F5C518] font-bold" style={{ fontSize: size * 0.25 }}>
            {initials}
          </span>
        </div>
      )}
    </div>
  )
}

function ReviewCard({
  review, currentUserId, session,
}: {
  review: ReviewItem
  currentUserId: string | undefined
  session: ReturnType<typeof useSession>['data']
}) {
  const [liked, setLiked] = useState(() =>
    currentUserId ? review.likes.some((l) => l.userId === currentUserId) : false
  )
  const [likeCount, setLikeCount] = useState(review.likes.length)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replies, setReplies] = useState<ReviewReplyItem[]>(review.replies)
  const [submittingReply, setSubmittingReply] = useState(false)

  async function handleLike() {
    if (!session) { toast.warning('Please login to like reviews'); return }
    try {
      const res = await likeReview(review.id)
      setLiked(res.liked)
      setLikeCount(res.count)
    } catch {
      toast.error('Failed to like review')
    }
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!session) { toast.warning('Please login to reply'); return }
    if (!replyText.trim()) return
    setSubmittingReply(true)
    try {
      const { reply } = await replyToReview(review.id, replyText)
      setReplies((prev) => [...prev, reply])
      setReplyText('')
      setShowReply(false)
      toast.success('Reply posted!')
      window.location.reload()
    } catch {
      toast.error('Failed to post reply')
    } finally {
      setSubmittingReply(false)
    }
  }

  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#F5C518] flex items-center justify-center shrink-0">
            <span className="text-black text-sm font-bold">
              {review.user.name?.[0]?.toUpperCase() ?? 'U'}
            </span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{review.user.name ?? 'Anonymous'}</p>
            <p className="text-[#606060] text-xs">
              {new Date(review.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">{review.comment}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-[#2A2A2A] pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${
            liked ? 'text-[#F5C518]' : 'text-[#606060] hover:text-[#A0A0A0]'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-[#F5C518]' : ''}`} />
          {likeCount > 0 ? likeCount : ''} Helpful
        </button>
        <button
          onClick={() => setShowReply(!showReply)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#606060] hover:text-[#A0A0A0] transition-colors duration-200"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Reply {replies.length > 0 && `(${replies.length})`}
        </button>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-[#2A2A2A]">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-[#222222] flex items-center justify-center shrink-0">
                <span className="text-[#A0A0A0] text-xs font-bold">
                  {reply.user.name?.[0]?.toUpperCase() ?? 'U'}
                </span>
              </div>
              <div className="flex-1 bg-[#1A1A1A] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-xs font-semibold">{reply.user.name ?? 'User'}</span>
                  <span className="text-[#606060] text-xs">
                    {new Date(reply.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short',
                    })}
                  </span>
                </div>
                <p className="text-[#A0A0A0] text-xs leading-relaxed">{reply.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      {showReply && (
        <form onSubmit={handleReply} className="mt-3 flex gap-2 items-center">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={session ? 'Write a reply...' : 'Login to reply'}
            disabled={!session}
            className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-lg px-3 py-2 text-white placeholder:text-[#606060] outline-none text-xs transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={submittingReply || !replyText.trim()}
            className="p-2 bg-[#F5C518] text-black rounded-lg hover:bg-[#E6B800] disabled:opacity-50 transition-all shrink-0"
          >
            {submittingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
          <button type="button" onClick={() => setShowReply(false)} className="p-2 text-[#606060] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  )
}

export default function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: session } = useSession()

  const [college, setCollege] = useState<CollegeDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [savingToggle, setSavingToggle] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    if (!id) return
    getCollege(id)
      .then(({ college: c }) => { setCollege(c); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  async function handleToggleSave() {
    if (!session) { toast.warning('Please login to save colleges'); return }
    if (!college) return
    setSavingToggle(true)
    try {
      const res = await toggleSaved(college.id)
      setSaved(res.saved)
      toast.success(res.saved ? 'College saved!' : 'Removed from saved')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSavingToggle(false)
    }
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!college) return
    if (reviewRating === 0) { toast.error('Please select a rating'); return }
    if (!reviewComment.trim()) { toast.error('Please write a comment'); return }
    setSubmittingReview(true)
    try {
      const { review } = await submitReview({ collegeId: college.id, rating: reviewRating, comment: reviewComment })
      setCollege((prev) =>
        prev ? {
          ...prev,
          reviews: [{
            ...review,
            user: { id: session!.user.id, name: session!.user.name ?? null },
            likes: [],
            replies: [],
          }, ...prev.reviews],
        } : prev
      )
      setReviewRating(0)
      setReviewComment('')
      toast.success('Review submitted!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#F5C518] animate-spin" />
      </div>
    )
  }

  if (!college) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <div>
          <GraduationCap className="w-12 h-12 text-[#F5C518] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">College not found</h2>
          <Link href="/colleges" className="text-[#F5C518] hover:underline text-sm">← Back to Colleges</Link>
        </div>
      </div>
    )
  }

  const placement = college.placements[0]

  // Custom banner seeds per college ID — change the number to get a different picsum photo
  const BANNER_SEEDS: Record<number, number> = {
    1: 1084,  // IIT Madras
  }
  const bannerSeed = BANNER_SEEDS[college.id] ?? (college.id * 13 + 7)
  const bannerImage = `https://picsum.photos/seed/${bannerSeed}/1400/500`

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <div className="bg-[#111111] border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-1.5 text-xs text-[#A0A0A0]">
          <Link href="/" className="hover:text-[#F5C518] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/colleges" className="hover:text-[#F5C518] transition-colors">Colleges</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white truncate max-w-[200px]">{college.name}</span>
        </div>
      </div>

      {/* Top Banner with CSS background image */}
      <section
        className="relative overflow-hidden border-b border-[#2A2A2A]"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay: dark on left for text readability, fades to transparent on right to reveal image */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.35) 75%, rgba(10,10,10,0.15) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <CollegeLogo website={college.website} name={college.name} size={88} />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{college.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[#A0A0A0] text-sm">
                    <MapPin className="w-3.5 h-3.5" />{college.city}, {college.state}
                  </span>
                  {college.established && (
                    <span className="text-[#A0A0A0] text-sm">Est. {college.established}</span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518] font-medium border border-[#F5C518]/20">
                    {college.type}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#222222] text-[#A0A0A0] border border-[#2A2A2A]">
                    {college.field}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 mt-5">
                  {college.nirfRank && (
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-[#F5C518]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">NIRF Rank</p>
                        <p className="text-white font-bold">#{college.nirfRank}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-[#F5C518]" />
                    <div>
                      <p className="text-xs text-[#A0A0A0]">Annual Fees</p>
                      <p className="text-white font-bold">{formatFees(college.fees)}</p>
                    </div>
                  </div>
                  {placement && (
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#F5C518]" />
                      <div>
                        <p className="text-xs text-[#A0A0A0]">Avg Package</p>
                        <p className="text-white font-bold">{formatPackage(placement.avgPackage)}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#F5C518] fill-[#F5C518]" />
                    <div>
                      <p className="text-xs text-[#A0A0A0]">Rating</p>
                      <p className="text-white font-bold">{college.rating.toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleSave}
              disabled={savingToggle}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-200 shrink-0 ${
                saved
                  ? 'bg-[#F5C518]/10 border-[#F5C518] text-[#F5C518]'
                  : 'bg-[#1A1A1A]/80 border-[#2A2A2A] text-white hover:border-[#F5C518] hover:text-[#F5C518] backdrop-blur-sm'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#F5C518]' : ''}`} />
              {saved ? 'Saved' : 'Save College'}
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview">
          <TabsList className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-1 mb-8 h-auto flex-wrap">
            {['overview', 'courses', 'placements', 'reviews'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize data-[state=active]:bg-[#F5C518] data-[state=active]:text-black data-[state=active]:font-semibold text-[#A0A0A0] hover:text-white transition-all rounded-lg px-5 py-2"
              >
                {tab}
                {tab === 'reviews' && college.reviews.length > 0 && (
                  <span className="ml-1.5 text-xs opacity-75">({college.reviews.length})</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 text-lg">About</h3>
                <p className="text-[#A0A0A0] leading-relaxed text-sm whitespace-pre-line">
                  {generateAbout(college)}
                </p>
              </div>
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 text-lg">College Info</h3>
                <dl className="space-y-3">
                  {[
                    { label: 'Type', value: college.type },
                    { label: 'Field', value: college.field },
                    { label: 'City', value: college.city },
                    { label: 'State', value: college.state },
                    { label: 'Established', value: college.established?.toString() },
                    { label: 'NIRF Rank', value: college.nirfRank ? `#${college.nirfRank}` : null },
                    { label: 'NIRF Score', value: college.nirfScore?.toFixed(2) },
                  ].map(
                    ({ label, value }) =>
                      value && (
                        <div key={label} className="flex justify-between items-center text-sm border-b border-[#2A2A2A] pb-2">
                          <dt className="text-[#A0A0A0]">{label}</dt>
                          <dd className="text-white font-medium">{value}</dd>
                        </div>
                      )
                  )}
                  {college.website && (
                    <div className="flex justify-between items-center text-sm">
                      <dt className="text-[#A0A0A0]">Website</dt>
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5C518] hover:underline flex items-center gap-1 text-xs"
                      >
                        <Globe className="w-3 h-3" />
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </TabsContent>

          {/* Courses */}
          <TabsContent value="courses" className="animate-fadeIn">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#2A2A2A]">
                <h3 className="text-white font-bold text-lg">Available Courses</h3>
              </div>
              {college.courses.length === 0 ? (
                <div className="p-8 text-center text-[#A0A0A0]">No course data available</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0A0A0A] text-[#A0A0A0]">
                        <th className="text-left px-6 py-3 font-medium">Course</th>
                        <th className="text-center px-4 py-3 font-medium">Duration</th>
                        <th className="text-center px-4 py-3 font-medium">Seats</th>
                        <th className="text-right px-6 py-3 font-medium">Annual Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {college.courses.map((c, i) => (
                        <tr key={c.id} className={`border-t border-[#2A2A2A] ${i % 2 === 0 ? 'bg-[#111111]' : 'bg-[#1A1A1A]'}`}>
                          <td className="px-6 py-4 text-white font-medium">{c.name}</td>
                          <td className="px-4 py-4 text-[#A0A0A0] text-center">{c.duration} yrs</td>
                          <td className="px-4 py-4 text-[#A0A0A0] text-center">{c.seats}</td>
                          <td className="px-6 py-4 text-[#F5C518] font-semibold text-right">{formatFees(c.fees)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Placements */}
          <TabsContent value="placements" className="animate-fadeIn">
            {!placement ? (
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center text-[#A0A0A0]">No placement data available</div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Avg Package', value: formatPackage(placement.avgPackage), icon: TrendingUp },
                    { label: 'Highest Package', value: formatPackage(placement.highestPackage), icon: Trophy },
                    { label: 'Placement Rate', value: `${placement.placementPercent}%`, icon: Users },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center">
                      <Icon className="w-6 h-6 text-[#F5C518] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[#F5C518] mb-1">{value}</p>
                      <p className="text-[#A0A0A0] text-sm">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Top Recruiters ({placement.year})</h4>
                  <div className="flex flex-wrap gap-2">
                    {placement.topRecruiters.split(',').map((r) => (
                      <span key={r.trim()} className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full text-sm text-white">
                        {r.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="animate-fadeIn">
            <div className="space-y-4">
              {session ? (
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
                  <h3 className="text-white font-bold mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <p className="text-[#A0A0A0] text-sm mb-2">Your Rating</p>
                      <StarRating rating={reviewRating} interactive onChange={setReviewRating} size="lg" />
                    </div>
                    <div>
                      <p className="text-[#A0A0A0] text-sm mb-2">Your Review</p>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience about this college..."
                        rows={4}
                        className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#F5C518] focus:ring-1 focus:ring-[#F5C518] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#606060] outline-none transition-all duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-[#F5C518] text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-[#E6B800] hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 flex items-center gap-2 text-sm"
                    >
                      {submittingReview && <Loader2 className="w-4 h-4 animate-spin" />}
                      Submit Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 text-center">
                  <p className="text-[#A0A0A0] text-sm">
                    <Link href="/login" className="text-[#F5C518] hover:underline font-medium">Login</Link>{' '}
                    to write a review or interact with reviews
                  </p>
                </div>
              )}

              {college.reviews.length === 0 ? (
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-10 text-center">
                  <Star className="w-10 h-10 text-[#2A2A2A] mx-auto mb-3" />
                  <p className="text-[#A0A0A0] font-medium">No reviews yet</p>
                  <p className="text-[#606060] text-sm mt-1">Be the first to review this college</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {college.reviews.map((r) => (
                    <ReviewCard
                      key={r.id}
                      review={r}
                      currentUserId={session?.user?.id}
                      session={session}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
