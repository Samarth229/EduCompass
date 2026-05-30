import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const VALID_EXAMS = ['JEE_MAIN', 'JEE_ADVANCED', 'MHT_CET', 'KCET', 'WBJEE']
const VALID_CATEGORIES = ['GENERAL', 'OBC', 'SC', 'ST', 'EWS']

function getChance(
  rank: number,
  openingRank: number,
  closingRank: number
): 'High' | 'Medium' | 'Low' {
  if (rank <= openingRank + 500) return 'High'
  if (rank <= closingRank - 500) return 'Medium'
  return 'Low'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { exam, rank, category } = body as {
      exam: unknown
      rank: unknown
      category: unknown
    }

    if (!exam || typeof exam !== 'string' || !VALID_EXAMS.includes(exam)) {
      return NextResponse.json(
        { error: `exam must be one of: ${VALID_EXAMS.join(', ')}` },
        { status: 400 }
      )
    }
    if (!rank || typeof rank !== 'number' || rank < 1) {
      return NextResponse.json(
        { error: 'rank must be a positive integer' },
        { status: 400 }
      )
    }
    if (!category || typeof category !== 'string' || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      )
    }

    const predictorRows = await prisma.predictorData.findMany({
      where: {
        exam,
        category,
        openingRank: { lte: rank },
        closingRank: { gte: rank },
      },
      include: {
        college: true,
      },
      orderBy: { openingRank: 'asc' },
    })

    const colleges = predictorRows.map((row) => ({
      ...row.college,
      predictorData: [
        {
          id: row.id,
          collegeId: row.collegeId,
          exam: row.exam,
          category: row.category,
          openingRank: row.openingRank,
          closingRank: row.closingRank,
          year: row.year,
        },
      ],
      chance: getChance(rank, row.openingRank, row.closingRank),
    }))

    return NextResponse.json({ colleges })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
