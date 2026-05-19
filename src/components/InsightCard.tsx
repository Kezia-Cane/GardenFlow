import type { LucideIcon } from "lucide-react";

type InsightCardProps = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export function InsightCard({ title, body, icon: Icon }: InsightCardProps) {
  return (
    <article className="glass-card rounded-xl p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
        <Icon size={18} />
      </div>
      <h3 className="text-base font-semibold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-muted">{body}</p>
    </article>
  );
}
