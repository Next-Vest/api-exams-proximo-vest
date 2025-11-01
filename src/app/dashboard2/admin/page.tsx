import { requireAuth } from "../../../utils/auth-guard"

export default async function AdminPage() {
  const session = await requireAuth()
  return (
    <div>
        <div>Olá, {session.user.name}</div>
        <div>Bem-vindo à área administrativa.</div>
    </div>
  )
  
  

}
