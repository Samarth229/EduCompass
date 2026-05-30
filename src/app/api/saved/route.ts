import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: true,
      },
      orderBy: { savedAt: 'desc' },
    })

    return NextResponse.json({ colleges: saved.map((s) => s.college) })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { collegeId } = body as { collegeId: unknown }

    if (!collegeId || typeof collegeId !== 'number') {
      return NextResponse.json({ error: 'collegeId must be a number' }, { status: 400 })
    }

    const college = await prisma.college.findUnique({ where: { id: collegeId } })
    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    })

    if (existing) {
      await prisma.savedCollege.delete({ where: { id: existing.id } })
      return NextResponse.json({ saved: false })
    }

    await prisma.savedCollege.create({
      data: { userId: session.user.id, collegeId },
    })
    return NextResponse.json({ saved: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
