import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const Schema = z.object({ name: z.string(), slug: z.string() });

export async function POST(req: NextRequest) {
  try {
    const data = Schema.parse(await req.json());
    const created = await prisma.subject.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: { message: e.message } }, { status: 400 });
  }
}
