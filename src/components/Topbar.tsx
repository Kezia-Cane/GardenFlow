import { Bell, CalendarDays, Download, UserCircle } from "lucide-react";

type TopbarProps = {
  title: string;
  description: string;
};

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-outline bg-surface/70 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-on-surface md:text-3xl">{title}</h2>
          <p className="mt-1 text-sm text-on-muted">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-outline bg-surface-container px-3 py-2 text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <CalendarDays size={16} />
            Last 30 days
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary-solid px-3 py-2 text-sm font-semibold text-background shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <Download size={16} />
            Export
          </button>
          <button className="rounded-lg border border-outline bg-surface-container p-2 text-on-muted hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" title="Notifications">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-outline bg-surface-container px-3 py-2 text-sm text-on-surface">
            <UserCircle size={18} />
            Admin
          </div>
        </div>
      </div>
    </header>
  );
}
