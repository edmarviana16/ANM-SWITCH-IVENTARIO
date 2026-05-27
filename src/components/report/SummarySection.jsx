import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, WifiOff } from "lucide-react";

export default function SummarySection({ quantitativos }) {
  const q = quantitativos;
  const percentOk = ((q.acessoOk / q.totalEquipamentos) * 100).toFixed(1);
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Sumário Executivo</h3>
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-3 text-sm leading-relaxed text-foreground">
            <p>O presente relatório consolida o inventário de <strong>{q.totalEquipamentos} equipamentos de rede</strong> distribuídos em <strong>{q.totalLocalidades} localidades</strong>, compreendendo a Sede em Brasília/DF e <strong>{q.totalRegionais} Unidades Regionais</strong> em todo o território nacional.</p>
            <p>Do total inventariado, <strong className="text-emerald-600">{q.acessoOk} equipamentos ({percentOk}%)</strong> apresentaram conectividade plena (Acesso OK).</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div><p className="text-lg font-bold text-emerald-700">{q.acessoOk}</p><p className="text-xs text-emerald-600">Acesso OK</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <WifiOff className="h-5 w-5 text-red-600" />
                <div><p className="text-lg font-bold text-red-700">{q.icmpFalha}</p><p className="text-xs text-red-600">Sem resposta ICMP</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <XCircle className="h-5 w-5 text-amber-600" />
                <div><p className="text-lg font-bold text-amber-700">{q.authFalha}</p><p className="text-xs text-amber-600">Falha de autenticação</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <AlertTriangle className="h-5 w-5 text-slate-500" />
                <div><p className="text-lg font-bold text-slate-700">{q.semSwitch + q.semIpGerencia}</p><p className="text-xs text-slate-600">Localidades sem gerência</p></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
