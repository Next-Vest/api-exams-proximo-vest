import * as React from "react";
import { SidebarDesktop } from "./sidebar";
import { Topbar } from "./topbar";

export default function DashboardShell({
  user,
  children,
}: {
  user?: { name?: string; email?: string; role?: string };
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground">
      <Topbar user={user} />
      <div className="container mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-6 py-6">
          <SidebarDesktop />
          <main className="min-h-[70vh] rounded-xl border bg-card">
            <div className="p-4 sm:p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
