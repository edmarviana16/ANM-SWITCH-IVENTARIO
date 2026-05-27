import { AlertTriangle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { REGIONAIS } from "@/lib/networkData";

export default function IncidentTable() {
  const incidents = [];
  REGIONAIS.forEach(r => {
    if (r.observacao) {
      incidents.push({ local: `${r.regional} / ${r.uf}`, tipo: r.observacao.includes("Não existe") ? "sem_switch" : "sem_ip", descricao: r.observacao, ip: "—" });
    }
    r.equipamentos.forEach(eq => {
      if (eq.status === "icmp_falha") incidents.push({ local: `${r.regional} / ${r.uf}`, tipo: "icmp_falha", descricao: "Equipamento não responde a ICMP", ip: eq.ip });
      if (eq.status === "falha_auth") incidents.push({ local: `${r.regional} / ${r.uf}`, tipo: "falha_auth", descricao: "Falha na autenticação (usuário/senha)", ip: eq.ip });
    });
  });
  if (incidents.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600">Ocorrências e Pendências ({incidents.length})</h3>
      </div>
      <div className="overflow-x-auto rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-200 bg-amber-50/50">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-700">Localidade</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-700">IP</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-700">Descrição</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {incidents.map((inc, i) => (
              <tr key={i} className="transition-colors hover:bg-amber-50/60">
                <td className="px-4 py-3 font-medium text-foreground">{inc.local}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{inc.ip}</td>
                <td className="px-4 py-3 text-xs text-foreground">{inc.descricao}</td>
                <td className="px-4 py-3"><StatusBadge status={inc.tipo} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
