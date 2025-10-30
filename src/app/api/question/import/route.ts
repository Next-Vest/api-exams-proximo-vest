import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // opcional: reusar sua lógica local ou chamar seu próprio serviço
  const body = await req.json();
  // aqui você pode fazer fetch interno para /api/question/batch
  return NextResponse.json({ forwarded: true, payload: body });
}
