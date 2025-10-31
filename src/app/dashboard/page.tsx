import { requireAuth } from "../../utils/auth-guard"

export default async function AdminPage() {
  const session = await requireAuth()
  return (
   <div className="flex gap-2 items-center">
      <span>{session.user.name}</span>
      <br />
      <span>{session.user.email}</span>
      <br />
        <span>({session.user.role})</span>  
      <br />
      <a href="/dashboard/admin/provas-questoes">Provas e questões</a>

    </div>
  )
  
  

}
