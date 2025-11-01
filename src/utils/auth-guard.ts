// src/server/auth-guard.ts
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from '../lib/prisma'


// Opção A: transformar em objeto simples (se sua lib pedir objeto)
export async function requireAuth() {
  const hdrsObj = Object.fromEntries((await headers()).entries())
  const session = await auth.api.getSession({ headers: hdrsObj })

  if (!session?.user?.id) {
    redirect("/unauthorized")
  }

  const { id } = session.user

  // Busca os roles do usuário no banco
  const rolesUser = await prisma.userRole.findMany({
    where: { userId: id },
    select: { role: true },
  })

  // Transforma [{role: "admin"}, {role: "editor"}] em ["admin", "editor"]
  const roles = rolesUser.map((r) => r.role)

  // Adiciona os roles no objeto da sessão
  const sessionWithRoles = {
    ...session,
    user: {
      ...session.user,
      roles,
    },
  }



  return sessionWithRoles
}
// (Opcional) com role
import { hasRole } from "../utils/auth";
export async function requireAuthWithRole(role: string) {
  const hdrsObj = Object.fromEntries((await headers()).entries());
  const session = await auth.api.getSession({ headers: hdrsObj });
  if (!session?.user?.id) redirect("/auth/sign-in");
  const ok = await hasRole(session.user.id as string, role);
  if (!ok) redirect("/unauthorized");
  return session;
}
