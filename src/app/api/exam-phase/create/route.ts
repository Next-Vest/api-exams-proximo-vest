import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const Schema = z.object({
  examEditionId: z.number().int(),
  phaseNumber: z.number().int(),
  dayNumber: z.number().int().nullable().optional(),
  subjectBlock: z.string().nullable().optional(),
  questionCountExpected: z.number().int().nullable().optional(),
  defaultOptionCount: z.number().int().nullable().optional(), // 4 ou 5
  isDiscursive: z.boolean().default(false)
});

export async function POST(req: NextRequest) {
  try {
    const data = Schema.parse(await req.json());
    const created = await prisma.examPhase.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 400 });
  }
}
