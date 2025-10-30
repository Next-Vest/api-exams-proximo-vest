// app/api/_internal/verify-key/route.ts
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return NextResponse.json({ error: "Chave de API ausente" }, { status: 401 });
  }

  const keyEntry = await prisma.apiKey.findUnique({ where: { key: apiKey } });
  if (!keyEntry || !keyEntry.active) {
    return NextResponse.json({ error: "Chave de API inválida ou desativada" }, { status: 403 });
  }

  // (Opcional) Atualiza estatísticas de uso
  await prisma.apiKey.update({
    where: { id: keyEntry.id },
    data: { usageCount: { increment: 1 }, lastUsedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
