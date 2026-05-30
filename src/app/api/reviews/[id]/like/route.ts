import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const reviewId = parseInt(id, 10)
    if (isNaN(reviewId)) {
      return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 })
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } })
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    const existing = await prisma.reviewLike.findUnique({
      where: { reviewId_userId: { reviewId, userId: session.user.id } },
    })

    if (existing) {
      await prisma.reviewLike.delete({ where: { id: existing.id } })
      const count = await prisma.reviewLike.count({ where: { reviewId } })
      return NextResponse.json({ liked: false, count })
    }

    await prisma.reviewLike.create({ data: { reviewId, userId: session.user.id } })
    const count = await prisma.reviewLike.count({ where: { reviewId } })
    return NextResponse.json({ liked: true, count }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
