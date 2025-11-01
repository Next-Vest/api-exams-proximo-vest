"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "../../utils/nav";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function SidebarMobile() {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export function SidebarDesktop() {
  return (
    <aside className="hidden md:flex md:w-72 border-r bg-background">
      <SidebarContent />
    </aside>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col">
      {/* Brand */}
      <div className="h-16 flex items-center gap-2 px-4 border-b">
        <div className="h-8 w-8 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500" />
        <div className="leading-tight">
          <p className="font-semibold">Próximo Vest</p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
      </div>

      {/* Nav */}
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {adminNav.map((item) => {
            const active =
              item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={onNavigate}>
                <div
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {Icon && <Icon className={cn("h-4 w-4", active && "text-primary")} />}
                  <span className="flex-1">{item.title}</span>
                  {item.badge !== undefined && (
                    <span className="text-xs rounded bg-muted px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3 text-xs text-muted-foreground">
        v1.0.0 • © {new Date().getFullYear()}
      </div>
    </div>
  );
}
