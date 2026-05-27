import StatusBadge from "./StatusBadge";

function getFabricante(modelo) {
  if (!modelo) return "—";
  if (modelo.toUpperCase().includes("HUAWEI")) return "Huawei";
  if (modelo.toUpperCase().includes("CISCO")) return "Cisco";
  return modelo.split(" ")[0];
}

function getModelo(modelo) {
  if (!modelo) return "—";
  if (modelo.toUpperCase().startsWith("HUAWEI ")) return modelo.substring(7);
  return modelo;
}

export default function SedeTable({ title, data }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-primary/5">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Localidade</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">IP</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Fabricante</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Modelo</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Número de Série</th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, i) =>
              item.equipamentos.map((eq, j) => (
                <tr key={`${i}-${j}`} className="transition-colors hover:bg-muted/50">
                  {j === 0 && (
                    <>
                      <td className="px-4 py-3 font-medium text-foreground" rowSpan={item.equipamentos.length}>{item.localidade}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground" rowSpan={item.equipamentos.length}>{item.ip}</td>
                    </>
                  )}
                  <td className="px-4 py-3 text-xs font-medium text-foreground">{getFabricante(eq.modelo)}</td>
                  <td className="px-4 py-3 text-xs text-foreground">{getModelo(eq.modelo)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{eq.serial}</td>
                  <td className="px-4 py-3"><StatusBadge status={eq.status || "ok"} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
