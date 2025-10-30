import { prisma } from "../../../../lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";
import { json, readBody, tryCatch, badRequest, notFound } from "../../_utils";

type Params = { id: string };
type Ctx = { params: Promise<Params> };

const PatchSchema = z.object({
  criterion: z.string().optional(),
  levelsJson: z.record(z.string(), z.string()).optional(),
});

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return tryCatch(async () => {
    const { id: idStr } = await ctx.params;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return badRequest("Invalid id");

    const parsed = PatchSchema.safeParse(await readBody(req));
    if (!parsed.success) return badRequest(parsed.error.message);

    const found = await prisma.frRubric.findUnique({ where: { id } });
    if (!found) return notFound("Rubric not found");

    const updated = await prisma.frRubric.update({
      where: { id },
      data: { ...parsed.data } as any,
    });

    return json(updated);
  });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  return tryCatch(async () => {
    const { id: idStr } = await ctx.params;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return badRequest("Invalid id");

    await prisma.frRubric.delete({ where: { id } });
    return json({ ok: true });
  });
}
