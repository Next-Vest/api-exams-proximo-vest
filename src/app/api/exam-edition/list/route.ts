import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { z } from "zod"

const Schema = z.object({
  examBoardId: z.coerce.number().int().optional(), // coerce permite receber "1" como número
  year: z.coerce.number().int().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const examBoardId = searchParams.get("examBoardId")
    const year = searchParams.get("year")

    // valida e converte automaticamente
    const { examBoardId: validatedExamBoardId, year: validatedYear } = Schema.parse({
      examBoardId,
      year,
    })

    const where: any = {}
    if (validatedExamBoardId) where.examBoardId = validatedExamBoardId
    if (validatedYear) where.year = validatedYear

    const rows = await prisma.examEdition.findMany({
      where,
      orderBy: [{ year: "desc" }, { editionLabel: "asc" }],
    })

    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 400 })
  }
}
