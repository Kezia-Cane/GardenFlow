import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function ChartCard({ title, subtitle, children, className = "" }: ChartCardProps) {
  return (
    <section className={`glass-card rounded-xl p-5 ${className}`}>
      <div className="mb-5 border-b border-white/10 pb-4">
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-on-muted">{subtitle}</p>}
      </div>
      <div className="h-[300px] min-w-0">{children}</div>
    </section>
  );
}
