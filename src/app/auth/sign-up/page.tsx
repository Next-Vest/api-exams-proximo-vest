"use client"

import { useState } from "react"
import { authClient } from "../../../lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authClient.signUp.email(
      { email, password, name, callbackURL: "/dashboard" },
      {
        onSuccess: () => router.push("/dashboard"),
        onError: (ctx) => alert(ctx.error.message),
      }
    )
    setLoading(false)
    if (!error) router.push("/dashboard")
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-sm">
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? "Criando..." : "Criar conta"}</button>
    </form>
  )
}
