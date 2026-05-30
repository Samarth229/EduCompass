import type { College, Course, Placement, Review, PredictorData, User } from '@/generated/prisma'

export type CollegeWithRelations = College & {
  courses: Course[]
  placements: Placement[]
  reviews: (Review & { user: Pick<User, 'id' | 'name'> })[]
  predictorData: PredictorData[]
}

export type PredictorResult = College & {
  predictorData: PredictorData[]
  chance: 'High' | 'Medium' | 'Low'
}

export type ApiResponse<T> = {
  data?: T
  error?: string
}

export type SearchParams = {
  search?: string
  state?: string
  type?: string
  field?: string
  minFees?: string
  maxFees?: string
  minRating?: string
  sortBy?: 'nirfRank' | 'fees' | 'rating'
  sortOrder?: 'asc' | 'desc'
  page?: string
  limit?: string
}
