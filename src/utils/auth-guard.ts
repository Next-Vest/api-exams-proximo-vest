// src/server/auth-guard.ts
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Opção A: transformar em objeto simples (se sua lib pedir objeto)
export async function requireAuth() {
  const hdrsObj = Object.fromEntries((await headers()).entries());
  const session = await auth.api.getSession({ headers: hdrsObj });
  if (!session?.user?.id) redirect("/auth/sign-in");
  return session;
}

// (Opcional) com role
import { hasRole } from "../utils/auth";
export async function requireAuthWithRole(role: string) {
  const hdrsObj = Object.fromEntries((await headers()).entries());
  const session = await auth.api.getSession({ headers: hdrsObj });
  if (!session?.user?.id) redirect("/auth/sign-in");
  const ok = await hasRole(session.user.id as string, role);
  if (!ok) redirect("/404");
  return session;
}
