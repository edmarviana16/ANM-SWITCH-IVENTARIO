import { Shield, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
export default function DocumentHeader() {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary via-primary to-accent shadow-xl">
      <div className="relative px-8 py-10">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10"><Shield className="h-6 w-6 text-white" /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Documento Tecnico Oficial</p>
                <p className="text-xs font-medium text-white/40">Classificacao: Uso Interno</p>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">Relatorio de Inventario de Ativos de Rede</h1>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">Levantamento completo de switches gerenciaveis - Sede e Unidades Regionais</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"><Calendar className="h-3.5 w-3.5 text-white/60" /><span className="text-xs font-semibold text-white/80">{format(new Date(), "dd/MM/yyyy")}</span></div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"><FileText className="h-3.5 w-3.5 text-white/60" /><span className="text-xs font-semibold text-white/80">Versao 1.0</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
