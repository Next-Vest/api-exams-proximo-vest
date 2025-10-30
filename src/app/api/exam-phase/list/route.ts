import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { z } from "zod"

const Schema = z.object({
  examEditionId: z.coerce.number().int().optional(),
  phaseNumber: z.coerce.number().int().optional(),
  dayNumber: z.coerce.number().int().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const examEditionId = searchParams.get("examEditionId")
    const phaseNumber = searchParams.get("phaseNumber")
    const dayNumber = searchParams.get("dayNumber")

    const { examEditionId: eid, phaseNumber: pn, dayNumber: dn } = Schema.parse({
      examEditionId,
      phaseNumber,
      dayNumber,
    })

    const where: any = {}
    if (eid) where.examEditionId = eid
    if (pn) where.phaseNumber = pn
    if (typeof dn === "number") where.dayNumber = dn

    const rows = await prisma.examPhase.findMany({
      where,
      orderBy: [{ phaseNumber: "asc" }, { dayNumber: "asc" }],
    })

    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 400 })
  }
}
