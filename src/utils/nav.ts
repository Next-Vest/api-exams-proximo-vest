import {
  LayoutDashboard,
  BookMarked,
  FileText,
  Database,
  Settings,
  ShieldCheck,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon?: any;
  exact?: boolean;
  badge?: string | number;
};

export const adminNav: NavItem[] = [
  { title: "Visão geral", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { title: "Provas & Questões", href: "/dashboard/admin/provas-questoes", icon: BookMarked },
  { title: "Edições & Fases", href: "/dashboard/admin/edicoes-fases", icon: FileText },
  { title: "Banco de Dados", href: "/dashboard/admin/banco", icon: Database },
  { title: "Permissões", href: "/dashboard/admin/permissoes", icon: ShieldCheck },
  { title: "Configurações", href: "/dashboard/admin/configuracoes", icon: Settings },
];
