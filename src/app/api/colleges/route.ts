import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/generated/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const search = searchParams.get('search') ?? undefined
    const state = searchParams.get('state') ?? undefined
    const type = searchParams.get('type') ?? undefined
    const field = searchParams.get('field') ?? undefined
    const minFees = searchParams.get('minFees')
    const maxFees = searchParams.get('maxFees')
    const minRating = searchParams.get('minRating')
    const sortBy = searchParams.get('sortBy') as 'nirfRank' | 'fees' | 'rating' | null
    const sortOrder = (searchParams.get('sortOrder') ?? 'asc') as 'asc' | 'desc'
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '10', 10)))

    const where: Prisma.CollegeWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (state) {
      where.state = { equals: state, mode: 'insensitive' }
    }
    if (type) {
      where.type = { equals: type, mode: 'insensitive' }
    }
    if (field) {
      where.field = { equals: field, mode: 'insensitive' }
    }
    if (minFees || maxFees) {
      where.fees = {}
      if (minFees) where.fees.gte = parseFloat(minFees)
      if (maxFees) where.fees.lte = parseFloat(maxFees)
    }
    if (minRating) {
      where.rating = { gte: parseFloat(minRating) }
    }

    const validSortFields = ['nirfRank', 'fees', 'rating'] as const
    const orderBy: Prisma.CollegeOrderByWithRelationInput =
      sortBy && validSortFields.includes(sortBy)
        ? { [sortBy]: sortOrder }
        : { nirfRank: 'asc' }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          type: true,
          nirfRank: true,
          nirfScore: true,
          fees: true,
          rating: true,
          established: true,
          image: true,
          field: true,
          website: true,
          description: true,
          createdAt: true,
        },
      }),
      prisma.college.count({ where }),
    ])

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
