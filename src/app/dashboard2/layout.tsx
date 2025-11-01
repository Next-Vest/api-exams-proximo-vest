import * as React from "react";
import DashboardShell from "../../components/layout/dashboardshell";
import { requireAuth } from "@/utils/auth-guard";

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await requireAuth(); // garante usuário logado (server)
  const user = {
    name: session.user.name,
    email: session.user.email,
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
