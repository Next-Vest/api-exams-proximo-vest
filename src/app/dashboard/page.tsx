// Ex.: em um componente de topo (Client Component)
"use client"
import { authClient } from "../../lib/auth-client"

export default function UserBadge() {
  const { data: session } = authClient.useSession()
  if (!session) return <a href="/sign-in">Entrar</a>
  return (
    <div className="flex gap-2 items-center">
      <span>{session.user.name}</span>
      <br />
      <span>{session.user.email}</span>
      <br />
        <span>({session.user.role})</span>  
      <br />
      <button onClick={() => authClient.signOut()}>Sair</button>
    </div>
  )
}
