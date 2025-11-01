import {
  ShoppingBag,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Administrator",
    items: [
      {
        title: "Provas",
        url: "/dashboard/provas-questoes",
        icon: SquareArrowUpRight,
        comingSoon: false,
      },
    ],
  },
  {
    id: 2,
    label: "Dashboards",
    items: [
      {
        title: "Default",
        url: "/dashboard/default",
        icon: LayoutDashboard,
      },
      {
        title: "CRM",
        url: "/dashboard/crm",
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
      },
      {
        title: "Analytics",
        url: "/dashboard/coming-soon",
        icon: Gauge,
        comingSoon: true,
      },
      {
        title: "E-commerce",
        url: "/dashboard/coming-soon",
        icon: ShoppingBag,
        comingSoon: true,
      },
      {
        title: "Academy",
        url: "/dashboard/coming-soon",
        icon: GraduationCap,
        comingSoon: true,
      },
      {
        title: "Logistics",
        url: "/dashboard/coming-soon",
        icon: Forklift,
        comingSoon: true,
      },
    ],
  },
  {
    id: 3,
    label: "Pages",
    items: [
      {
        title: "Email",
        url: "/dashboard/coming-soon",
        icon: Mail,
        comingSoon: true,
      },
      {
        title: "Chat",
        url: "/dashboard/coming-soon",
        icon: MessageSquare,
        comingSoon: true,
      },
      {
        title: "Calendar",
        url: "/dashboard/coming-soon",
        icon: Calendar,
        comingSoon: true,
      },
      {
        title: "Kanban",
        url: "/dashboard/coming-soon",
        icon: Kanban,
        comingSoon: true,
      },
      {
        title: "Invoice",
        url: "/dashboard/coming-soon",
        icon: ReceiptText,
        comingSoon: true,
      },
      {
        title: "Users",
        url: "/dashboard/coming-soon",
        icon: Users,
        comingSoon: true,
      },
      {
        title: "Roles",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
      },
    ],
  },
  {
    id: 4,
    label: "Misc",
    items: [
      {
        title: "Others",
        url: "/dashboard/coming-soon",
        icon: SquareArrowUpRight,
        comingSoon: true,
      },
    ],
  },
];
