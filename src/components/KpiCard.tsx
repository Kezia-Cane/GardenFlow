import type { LucideIcon } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  tone?: "emerald" | "cyan" | "violet";
};

const toneClasses = {
  emerald: "from-primary/20 text-primary",
  cyan: "from-secondary/20 text-secondary",
  violet: "from-tertiary/20 text-tertiary",
};

export function KpiCard({ title, value, change, icon: Icon, tone = "emerald" }: KpiCardProps) {
  const valueSize = value.length > 16 ? "text-xl leading-7" : "text-2xl";

  return (
    <article className="glass-card group relative min-h-[142px] overflow-hidden rounded-xl p-5">
      <div className={`absolute -right-5 -top-5 h-20 w-20 rounded-full bg-gradient-to-br ${toneClasses[tone]} to-transparent blur-xl transition-opacity group-hover:opacity-80`} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-muted">{title}</p>
          <p className={`mt-3 break-words font-semibold text-on-surface ${valueSize}`}>{value}</p>
        </div>
        <div className={`rounded-lg bg-surface-container p-2 ${toneClasses[tone].split(" ")[1]}`}>
          <Icon size={19} />
        </div>
      </div>
      {change && (
        <p className="relative mt-4 text-sm font-medium text-primary">
          {change}
          <span className="ml-2 text-on-muted">vs previous period</span>
        </p>
      )}
    </article>
  );
}
