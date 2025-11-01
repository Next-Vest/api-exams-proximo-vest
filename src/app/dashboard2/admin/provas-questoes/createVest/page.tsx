// app/dashboard/admin/exam-board/new/page.tsx
"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

// shadcn/ui
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ReloadIcon, CheckIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

// Schema de validação
const FormSchema = z.object({
  name: z.string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo"),
  slug: z.string()
    .min(2, "Slug muito curto")
    .max(50, "Slug muito longo")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas minúsculas, números e hífens (ex.: unicamp, enem, fuvest)"),
})

type FormValues = z.infer<typeof FormSchema>

export default function NewExamBoardPage() {
  const router = useRouter()

  const [submitting, setSubmitting] = React.useState(false)
  const [created, setCreated] = React.useState<{ id?: number; name?: string; slug?: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: { name: "", slug: "" },
  })

  async function onSubmit(values: FormValues) {
    setSubmitting(true)
    setCreated(null)
    try {
      const res = await fetch(`/api/exam-board/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        cache: "no-store",
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data?.error?.message ?? `Falha (${res.status}) ao criar Exam Board`)
      }

      setCreated(data)
      toast.success(`Criado com sucesso! Vestibular: ${data?.name ?? values.name}`)
      form.reset()

      // Navegação client-side após sucesso
      router.push("/dashboard/admin/provas-questoes")
    } catch (err: any) {
      toast.error(`Erro ao criar o Vestibular: ${err?.message ?? "Verifique o console para detalhes."}`)
      console.error("Create Exam Board error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="border border-muted/50 shadow-sm">
        <CardHeader>
          <CardTitle>Novo Vestibular</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex.: Unicamp"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="Ex.: unicamp"
                {...form.register("slug")}
                onChange={(e) => {
                  const v = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "-")
                    .replace(/--+/g, "-")
                    .replace(/^-+|-+$/g, "")
                  form.setValue("slug", v, { shouldValidate: true, shouldDirty: true })
                }}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
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
                  Criado: <b>{created.name}</b> (<code>{created.slug}</code>)
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
