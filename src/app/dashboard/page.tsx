import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, FileSpreadsheet, BarChart3 } from "lucide-react";

export default async function DashboardHome() {
  // Exemplo: poderíamos buscar KPIs da API aqui
  const kpis = [
    { label: "Provas cadastradas", value: 42, icon: Layers },
    { label: "Questões totais", value: 1380, icon: FileSpreadsheet },
    { label: "Edições ativas", value: 12, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Visão geral</h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo ao painel do Próximo Vest. Gerencie provas, questões e edições com agilidade.
          </p>
        </div>
        <Button asChild>
          <a href="/dashboard/admin/provas-questoes">
            Cadastrar nova prova <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="hover:shadow-sm transition">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{k.value}</div>
                <p className="text-xs text-muted-foreground">Atualizado agora</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Destaques */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Atalhos rápidos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" asChild><a href="/dashboard/admin/provas-questoes">Provas & Questões</a></Button>
            <Button variant="outline" asChild><a href="/dashboard/admin/edicoes-fases">Edições & Fases</a></Button>
            <Button variant="outline" asChild><a href="/dashboard/admin/banco">Banco de Dados</a></Button>
            <Button variant="outline" asChild><a href="/dashboard/admin/permissoes">Permissões</a></Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Novidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Importador de PDF → JSON chegando em breve.</p>
            <p>• Melhorias de UX no fluxo de cadastro de questões.</p>
            <p>• Logs de API com filtros por chave e período.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
