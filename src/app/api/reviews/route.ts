import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { collegeId, rating, comment } = body as {
      collegeId: unknown
      rating: unknown
      comment: unknown
    }

    if (!collegeId || typeof collegeId !== 'number') {
      return NextResponse.json({ error: 'collegeId must be a number' }, { status: 400 })
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'rating must be between 1 and 5' }, { status: 400 })
    }
    if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
      return NextResponse.json({ error: 'comment cannot be empty' }, { status: 400 })
    }

    const college = await prisma.college.findUnique({ where: { id: collegeId } })
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    const review = await prisma.review.create({
      data: {
        collegeId,
        userId: session.user.id,
        rating,
        comment: comment.trim(),
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    })

    // Recalculate and update college average rating
    const aggregate = await prisma.review.aggregate({
      where: { collegeId },
      _avg: { rating: true },
    })

    await prisma.college.update({
      where: { id: collegeId },
      data: { rating: aggregate._avg.rating ?? 0 },
    })

    return NextResponse.json({ review }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
