import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const Schema = z.object({
  examBoardId: z.number().int(),
  year: z.number().int(),
  editionLabel: z.string(),
  notes: z.string().nullable().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = Schema.parse(await req.json());
    const created = await prisma.examEdition.create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 400 });
  }
}
