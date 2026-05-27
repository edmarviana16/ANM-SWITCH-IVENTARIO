import StatusBadge from "./StatusBadge";

function getFabricante(modelo) {
  if (!modelo) return "—";
  const upper = modelo.toUpperCase();
  if (upper.includes("HUAWEI")) return "Huawei";
  if (upper.includes("CISCO")) return "Cisco";
  if (upper.includes("INTELBRAS")) return "Intelbras";
  if (upper.includes("DATACOM")) return "Datacom";
  return modelo.split(" ")[0];
}

function getModelo(modelo) {
  if (!modelo) return "—";
  if (modelo.toUpperCase().startsWith("HUAWEI ")) return modelo.substring(7);
  return modelo;
}

export default function RegionalTable({ data }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Unidades Regionais e Escritórios</h3>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-primary/5">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Regional / UF</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">IP</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Fabricante</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Modelo</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Número de Série</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((reg, i) => {
              if (reg.equipamentos.length === 0) {
                return (
                  <tr key={i} className="bg-amber-50/40 transition-colors hover:bg-amber-50/70">
                    <td className="px-4 py-3 font-medium text-foreground">{reg.regional} / {reg.uf}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground" colSpan={4}>—</td>
                    <td className="px-4 py-3"><StatusBadge status={reg.observacao?.includes("Não existe") ? "sem_switch" : "sem_ip"} /></td>
                  </tr>
                );
              }
              return reg.equipamentos.map((eq, j) => (
                <tr key={`${i}-${j}`} className="transition-colors hover:bg-muted/50">
                  {j === 0 && <td className="px-4 py-3 font-medium text-foreground" rowSpan={reg.equipamentos.length}>{reg.regional} / {reg.uf}</td>}
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{eq.ip}</td>
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{getFabricante(eq.modelo)}</td>
                  <td className="px-4 py-3 text-xs text-foreground">{getModelo(eq.modelo)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{eq.serial}</td>
                  <td className="px-4 py-3"><StatusBadge status={eq.status} /></td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
