// app/dashboard/admin/exam-board/new/page.tsx
"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useParams } from "next/navigation"

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ReloadIcon, CheckIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

// ✅ Sem coerce: entrada == saída (number)
const FormSchema = z.object({
  year: z.number().int().min(1900, "Ano inválido").max(2100, "Ano inválido"),
  editionLabel: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
})

type FormValues = z.infer<typeof FormSchema>

export default function NewExamBoardPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [submitting, setSubmitting] = React.useState(false)
  const [created, setCreated] = React.useState<{ year?: number; editionLabel?: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: { year: 2025, editionLabel: "" },
  })

  async function onSubmit(values: FormValues) {
    if (!id) {
      toast.error("ID do Exam Board não encontrado na rota.")
      return
    }
    setSubmitting(true)
    setCreated(null)
    const num = Number(id)

    try {
      const res = await fetch(`/api/exam-edition/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examBoardId: num,
          year: values.year,
          editionLabel: values.editionLabel,
        }),
        cache: "no-store",
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) throw new Error(data?.error?.message ?? `Falha (${res.status}) ao criar a edição`)

      setCreated(data)
      toast.success("Edição criada com sucesso!")
      form.reset()
      router.push(`/dashboard/admin/provas-questoes/${id}`)
    } catch (err) {
      toast.error("Erro ao criar a edição")
      console.error("Create Exam Edition error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="border border-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle>Novo Vestibular • Nova Edição</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                type="number"
                placeholder="Ano"
                // ✅ converte para number no RHF
                {...form.register("year", { valueAsNumber: true })}
              />
              {form.formState.errors.year && (
                <p className="text-sm text-destructive">{form.formState.errors.year.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="editionLabel">Edição (rótulo)</Label>
              <Input
                id="editionLabel"
                placeholder="Ex.: 1ª fase, 2ª fase, Prova Regular"
                {...form.register("editionLabel")}
              />
              {form.formState.errors.editionLabel && (
                <p className="text-sm text-destructive">{form.formState.errors.editionLabel.message}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={submitting || !form.formState.isValid}>
                {submitting ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Criar"
                )}
              </Button>

              <Button type="button" variant="outline" onClick={() => form.reset()} disabled={submitting}>
                Limpar
              </Button>
            </div>
          </form>

          {created && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <CheckIcon className="h-4 w-4" />
                <span>
                  Edição criada: <b>{created.editionLabel}</b> (<code>{created.year}</code>)
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
