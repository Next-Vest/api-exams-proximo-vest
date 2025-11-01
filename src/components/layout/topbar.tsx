"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Sun, Moon, LogOut, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMobile } from "./sidebar";
import { authClient } from "@/lib/auth-client";

export function Topbar({ user }: { user?: { name?: string; email?: string } }) {
  const router = useRouter();
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const el = document.documentElement;
    const on = el.classList.contains("dark");
    setDark(on);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDark(el.classList.contains("dark"));
  };

  const initials =
    (user?.name?.[0] ?? user?.email?.[0] ?? "?").toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto max-w-[1400px] h-full px-4">
        <div className="flex h-full items-center gap-3">
          {/* Mobile menu */}
          <SidebarMobile />

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar provas, questões, edições..."
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = (e.target as HTMLInputElement).value.trim();
                  if (q) router.push(`/dashboard/search?q=${encodeURIComponent(q)}`);
                }
              }}
            />
          </div>

          {/* Theme */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">{user?.name ?? "Usuário"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="truncate">{user?.name ?? "Usuário"}</div>
                <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                <User2 className="mr-2 h-4 w-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/sign-in";
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
