import { motion } from "framer-motion";
export default function KPICard({ icon: Icon, label, value, sublabel, color = "primary", delay = 0 }) {
  const colorMap = { primary: "bg-primary/10 text-primary border-primary/20", accent: "bg-accent/10 text-accent border-accent/20", success: "bg-emerald-50 text-emerald-600 border-emerald-200", warning: "bg-amber-50 text-amber-600 border-amber-200", danger: "bg-red-50 text-red-600 border-red-200" };
  const iconBg = { primary: "bg-primary text-primary-foreground", accent: "bg-accent text-accent-foreground", success: "bg-emerald-500 text-white", warning: "bg-amber-500 text-white", danger: "bg-red-500 text-white" };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay * 0.1, duration: 0.4 }} className={`relative overflow-hidden rounded-xl border p-5 ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight">{value}</p>
          {sublabel && <p className="mt-1 text-xs font-medium opacity-60">{sublabel}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg[color]}`}><Icon className="h-5 w-5" /></div>
      </div>
    </motion.div>
  );
}
