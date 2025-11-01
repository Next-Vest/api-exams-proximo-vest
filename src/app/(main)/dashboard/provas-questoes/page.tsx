
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";
import { requireAuthWithRole } from "../../../../utils/auth-guard";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
type Board = { id: number; name: string; slug: string };
export default async function Provas() {
  requireAuthWithRole("Admin");
  const res = await fetch(`${process.env.API_URL}/exam-board/list`, {
  });

  if (!res.ok) throw new Error('Falha ao buscar boards');

  const boards = await res.json();
  const boardNumber = boards.length as number;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards boardNumber={boardNumber} />
      <DataTable data={boards} />


    </div>
  );
}
