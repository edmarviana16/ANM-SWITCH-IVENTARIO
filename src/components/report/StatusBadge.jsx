import { CheckCircle, XCircle, AlertTriangle, WifiOff } from "lucide-react";
export default function StatusBadge({ status }) {
  const config = {
    ok: { icon: CheckCircle, text: "Acesso OK", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    icmp_falha: { icon: WifiOff, text: "Nao responde ICMP", className: "bg-red-50 text-red-700 border-red-200" },
    falha_auth: { icon: XCircle, text: "Falha de autenticacao", className: "bg-amber-50 text-amber-700 border-amber-200" },
    sem_switch: { icon: AlertTriangle, text: "Sem switch gerenciavel", className: "bg-slate-100 text-slate-600 border-slate-200" },
    sem_ip: { icon: AlertTriangle, text: "IP nao localizado", className: "bg-slate-100 text-slate-600 border-slate-200" },
  };
  const c = config[status] || config.ok;
  const Icon = c.icon;
  return (<span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${c.className}`}><Icon className="h-3 w-3" />{c.text}</span>);
}
