import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const collegeId = parseInt(id, 10)

    if (isNaN(collegeId)) {
      return NextResponse.json({ error: 'Invalid college ID' }, { status: 400 })
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        courses: true,
        placements: true,
        predictorData: true,
        reviews: {
          include: {
            user: { select: { id: true, name: true } },
            likes: { select: { userId: true } },
            replies: {
              include: { user: { select: { id: true, name: true } } },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    return NextResponse.json({ college })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
