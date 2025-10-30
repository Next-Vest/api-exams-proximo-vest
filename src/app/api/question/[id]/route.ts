import { prisma } from "../../../../lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";
import { json, readBody, tryCatch, notFound, badRequest } from "../../_utils";

type Params = { id: string };
type Ctx = { params: Promise<Params> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  return tryCatch(async () => {
    const { id: idStr } = await ctx.params;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return badRequest("Invalid id");

    const found = await prisma.question.findUnique({
      where: { id },
      include: {
        stimulus: { include: { assets: true } },
        subjects: { include: { subject: true } },
        skills: { include: { skill: true } },
        mcq: { include: { options: true } },
        fr: { include: { expectedAnswers: true, rubrics: true } },
      },
    });
    if (!found) return notFound("Question not found");
    return json(found);
  });
}

const OptionKey = z.enum(["A", "B", "C", "D", "E"]);
const PatchSchema = z.object({
  numberLabel: z.string().optional(),
  isDiscursive: z.boolean().optional(),
  sourcePageStart: z.number().optional(),
  sourcePageEnd: z.number().optional(),
  mcq: z
    .object({
      optionCount: z.number().int().min(4).max(5).optional(),
      shuffleOptions: z.boolean().optional(),
      correctOptionKey: OptionKey.optional(),
      options: z
        .array(
          z.object({
            label: OptionKey,
            textHtml: z.string().optional(),
            textPlain: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
  fr: z
    .object({
      maxScore: z.number().optional(),
      answerGuidanceHtml: z.string().optional(),
    })
    .optional(),
});

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return tryCatch(async () => {
    const { id: idStr } = await ctx.params;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return badRequest("Invalid id");

    const parsed = PatchSchema.safeParse(await readBody(req));
    if (!parsed.success) return badRequest(parsed.error.message);
    const input = parsed.data;

    // estado atual para decidir MCQ x FR
    const current = await prisma.question.findUnique({
      where: { id },
      include: { mcq: true, fr: true },
    });
    if (!current) return notFound("Question not found");

    const data: any = { ...input };
    delete data.mcq;
    delete data.fr;

    // Atualiza cabeçalho da questão
    const updated = await prisma.question.update({
      where: { id },
      data,
    });

    // Atualização dos blocos (MCQ/FR)
    // Obs: se quiser atomicidade total, envolva as operações seguintes numa $transaction.
    if (input.mcq && !updated.isDiscursive) {
      await prisma.mcqItem.upsert({
        where: { questionId: id },
        update: {
          optionCount: input.mcq.optionCount ?? undefined,
          shuffleOptions: input.mcq.shuffleOptions ?? undefined,
          correctOptionKey: input.mcq.correctOptionKey ?? undefined,
        },
        create: {
          questionId: id,
          optionCount: input.mcq.optionCount ?? 5,
          shuffleOptions: input.mcq.shuffleOptions ?? true,
          correctOptionKey: input.mcq.correctOptionKey ?? "A",
        },
      });

      if (input.mcq.options?.length) {
        // sobrescreve opções
        await prisma.mcqOption.deleteMany({ where: { questionId: id } });
        await prisma.mcqOption.createMany({
          data: input.mcq.options.map((o) => ({
            questionId: id,
            label: o.label,
            textHtml: o.textHtml,
            textPlain: o.textPlain,
          })),
        });
      }
    }

    if (input.fr && updated.isDiscursive) {
      await prisma.frItem.upsert({
        where: { questionId: id },
        update: {
          maxScore: (input.fr.maxScore as any) ?? undefined,
          answerGuidanceHtml: input.fr.answerGuidanceHtml ?? undefined,
        },
        create: {
          questionId: id,
          maxScore: (input.fr.maxScore as any) ?? undefined,
          answerGuidanceHtml: input.fr.answerGuidanceHtml ?? undefined,
        },
      });
    }

    const full = await prisma.question.findUnique({
      where: { id },
      include: {
        stimulus: { include: { assets: true } },
        subjects: { include: { subject: true } },
        skills: { include: { skill: true } },
        mcq: { include: { options: true } },
        fr: { include: { expectedAnswers: true, rubrics: true } },
      },
    });

    return json(full);
  });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  return tryCatch(async () => {
    const { id: idStr } = await ctx.params;
    const id = Number(idStr);
    if (!Number.isFinite(id)) return badRequest("Invalid id");

    await prisma.question.delete({ where: { id } });
    return json({ ok: true });
  });
}
