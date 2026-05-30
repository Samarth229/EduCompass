import type { SearchParams } from '@/types'

export async function getColleges(params: Partial<SearchParams>) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  )
  const query = new URLSearchParams(filtered as Record<string, string>).toString()
  const res = await fetch(`/api/colleges?${query}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch colleges')
  return res.json() as Promise<{
    colleges: CollegeListItem[]
    total: number
    page: number
    totalPages: number
  }>
}

export async function getCollege(id: string) {
  const res = await fetch(`/api/colleges/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch college')
  return res.json() as Promise<{ college: CollegeDetail }>
}

export async function predictColleges(data: {
  exam: string
  rank: number
  category: string
}) {
  const res = await fetch('/api/predictor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Prediction failed')
  return res.json() as Promise<{ colleges: PredictorResult[] }>
}

export async function getSavedColleges() {
  const res = await fetch('/api/saved', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch saved colleges')
  return res.json() as Promise<{ colleges: CollegeListItem[] }>
}

export async function toggleSaved(collegeId: number) {
  const res = await fetch('/api/saved', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collegeId }),
  })
  if (!res.ok) throw new Error('Failed to toggle save')
  return res.json() as Promise<{ saved: boolean }>
}

export async function submitReview(data: {
  collegeId: number
  rating: number
  comment: string
}) {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to submit review' }))
    throw new Error(err.error ?? 'Failed to submit review')
  }
  return res.json()
}

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Registration failed')
  return json
}

// ---- Shared types used across the frontend ----

export interface CollegeListItem {
  id: number
  name: string
  city: string
  state: string
  type: string
  nirfRank: number | null
  nirfScore: number | null
  fees: number
  rating: number
  established: number | null
  image: string | null
  field: string
  website: string | null
  description: string | null
  createdAt: string
}

export interface Course {
  id: number
  collegeId: number
  name: string
  duration: number
  seats: number
  fees: number
}

export interface Placement {
  id: number
  collegeId: number
  year: number
  avgPackage: number
  highestPackage: number
  placementPercent: number
  topRecruiters: string
}

export interface ReviewReplyItem {
  id: number
  reviewId: number
  userId: string
  comment: string
  createdAt: string
  user: { id: string; name: string | null }
}

export interface ReviewItem {
  id: number
  collegeId: number
  userId: string
  rating: number
  comment: string
  createdAt: string
  user: { id: string; name: string | null }
  likes: { userId: string }[]
  replies: ReviewReplyItem[]
}

export async function likeReview(reviewId: number): Promise<{ liked: boolean; count: number }> {
  const res = await fetch(`/api/reviews/${reviewId}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to like review')
  return res.json()
}

export async function replyToReview(reviewId: number, comment: string): Promise<{ reply: ReviewReplyItem }> {
  const res = await fetch(`/api/reviews/${reviewId}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment }),
  })
  if (!res.ok) throw new Error('Failed to post reply')
  return res.json()
}

export function getCollegeLogo(website: string | null): string | null {
  if (!website) return null
  try {
    const url = new URL(website)
    return `https://logo.clearbit.com/${url.hostname}`
  } catch {
    return null
  }
}

export interface PredictorData {
  id: number
  collegeId: number
  exam: string
  category: string
  openingRank: number
  closingRank: number
  year: number
}

export interface CollegeDetail extends CollegeListItem {
  courses: Course[]
  placements: Placement[]
  reviews: ReviewItem[]
  predictorData: PredictorData[]
}

export interface PredictorResult extends CollegeListItem {
  predictorData: PredictorData[]
  chance: 'High' | 'Medium' | 'Low'
}
