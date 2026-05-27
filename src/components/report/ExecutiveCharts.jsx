import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["hsl(217,91%,40%)", "hsl(199,89%,48%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)"];

export default function ExecutiveCharts({ quantitativos }) {
  const statusData = [
    { name: "Acesso OK", value: quantitativos.acessoOk },
    { name: "Sem ICMP", value: quantitativos.icmpFalha },
    { name: "Falha Auth", value: quantitativos.authFalha },
  ].filter(d => d.value > 0);
  const modeloData = Object.entries(quantitativos.modeloCount).map(([name, value]) => ({ name, value }));
  const distribuicaoData = [
    { name: "Sede/DF", value: quantitativos.sedeEquipamentos },
    { name: "Regionais", value: quantitativos.regionalEquipamentos },
  ];
  const ufData = Object.entries(quantitativos.porUF).sort((a, b) => b[1].total - a[1].total).slice(0, 12).map(([uf, data]) => ({ uf, ...data }));
  const renderLabel = ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Status de Conectividade</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={statusData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" label={renderLabel} labelLine={false} fontSize={11} fontWeight={600}>{statusData.map((_, i) => <Cell key={i} fill={[COLORS[2], COLORS[4], COLORS[3]][i]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Distribuição por Modelo</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={modeloData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" label={renderLabel} labelLine={false} fontSize={10} fontWeight={600}>{modeloData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Sede vs. Regionais</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={distribuicaoData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" label={renderLabel} labelLine={false} fontSize={11} fontWeight={600}>{distribuicaoData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Equipamentos por UF (Top 12)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ufData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,88%)" />
              <XAxis dataKey="uf" tick={{ fontSize: 10, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="total" fill={COLORS[0]} radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="ok" fill={COLORS[2]} radius={[4, 4, 0, 0]} name="OK" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
