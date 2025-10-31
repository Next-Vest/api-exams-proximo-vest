import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { z } from "zod"

// Função utilitária do Zod para tratar parâmetros de query
const intFromQuery = z.preprocess(
  (v) => {
    // Se vier null, string vazia ou algo inválido, vira undefined
    if (v === null || v === "") return undefined
    const num = Number(v)
    return Number.isFinite(num) ? num : undefined
  },
  z.number().int().optional()
)

// Esquema principal
const Schema = z.object({
  examEditionId: intFromQuery,
  phaseNumber: intFromQuery,
  dayNumber: intFromQuery,
})

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Faz o parse validado
    const parsed = Schema.parse({
      examEditionId: searchParams.get("examEditionId"),
      phaseNumber: searchParams.get("phaseNumber"),
      dayNumber: searchParams.get("dayNumber"),
    })

    // Monta o filtro dinâmico
    const where: any = {}
    if (parsed.examEditionId !== undefined) where.examEditionId = parsed.examEditionId
    if (parsed.phaseNumber !== undefined) where.phaseNumber = parsed.phaseNumber
    if (parsed.dayNumber !== undefined) where.dayNumber = parsed.dayNumber

    // Consulta com ou sem filtros
    const rows = await prisma.examPhase.findMany({
      where,
      orderBy: [
        { phaseNumber: "asc" },
        { dayNumber: "asc" },
      ],
    })

    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json(
      { error: { message: e.message } },
      { status: 400 }
    )
  }
}
