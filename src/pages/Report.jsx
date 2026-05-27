import { useState } from "react";
import { Download, Server, MapPin, AlertTriangle, CheckCircle, WifiOff, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import DocumentHeader from "@/components/report/DocumentHeader";
import KPICard from "@/components/report/KPICard";
import SummarySection from "@/components/report/SummarySection";
import ExecutiveCharts from "@/components/report/ExecutiveCharts";
import SedeTable from "@/components/report/SedeTable";
import RegionalTable from "@/components/report/RegionalTable";
import IncidentTable from "@/components/report/IncidentTable";
import { SEDE_CORE, SEDE_ANDARES, REGIONAIS, getQuantitativos } from "@/lib/networkData";
import { generateReport } from "@/lib/generatePDF";

export default function Report() {
  const [generating, setGenerating] = useState(false);
  const q = getQuantitativos();
  const handleGeneratePDF = async () => {
    setGenerating(true);
    setTimeout(() => { generateReport(); setGenerating(false); }, 500);
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <DocumentHeader />
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Visualize o inventario completo ou gere o documento tecnico em PDF.</p>
          <Button onClick={handleGeneratePDF} disabled={generating} size="lg" className="gap-2 bg-primary px-6 font-semibold">
            <Download className="h-4 w-4" />{generating ? "Gerando PDF..." : "Gerar Documento PDF"}
          </Button>
        </div>
        <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard icon={Server} label="Equipamentos" value={q.totalEquipamentos} sublabel="Total inventariado" color="primary" delay={0} />
          <KPICard icon={CheckCircle} label="Acesso OK" value={q.acessoOk} sublabel={String(((q.acessoOk/q.totalEquipamentos)*100).toFixed(0))+"% do total"} color="success" delay={1} />
          <KPICard icon={WifiOff} label="Sem ICMP" value={q.icmpFalha} sublabel="Nao respondem" color="danger" delay={2} />
          <KPICard icon={XCircle} label="Falha Auth" value={q.authFalha} sublabel="Credenciais" color="warning" delay={3} />
          <KPICard icon={MapPin} label="Localidades" value={q.totalLocalidades} sublabel={q.totalRegionais+" regionais"} color="accent" delay={4} />
          <KPICard icon={AlertTriangle} label="Pendencias" value={q.semSwitch + q.semIpGerencia} sublabel="Sem gerencia" color="warning" delay={5} />
        </div>
        <Tabs defaultValue="executivo" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="executivo">Painel Executivo</TabsTrigger>
            <TabsTrigger value="sede">Sede / DF</TabsTrigger>
            <TabsTrigger value="regionais">Regionais</TabsTrigger>
            <TabsTrigger value="ocorrencias">Ocorrencias</TabsTrigger>
          </TabsList>
          <TabsContent value="executivo"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}><SummarySection quantitativos={q} /><ExecutiveCharts quantitativos={q} /></motion.div></TabsContent>
          <TabsContent value="sede"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}><SedeTable title="Infraestrutura Core" data={SEDE_CORE} /><SedeTable title="Switches por Andar" data={SEDE_ANDARES} /></motion.div></TabsContent>
          <TabsContent value="regionais"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}><RegionalTable data={REGIONAIS} /></motion.div></TabsContent>
          <TabsContent value="ocorrencias"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}><IncidentTable /></motion.div></TabsContent>
        </Tabs>
        <div className="mt-12 border-t border-border pt-6 text-center"><p className="text-xs text-muted-foreground">Documento Tecnico Oficial - Uso Interno - Inventario de Ativos de Rede</p></div>
      </div>
    </div>
  );
}
