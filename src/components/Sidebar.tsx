import { BarChart3, Bell, Home, Lightbulb, PlayCircle, Settings, ShoppingCart, Sprout, WalletCards } from "lucide-react";
import type { PageKey } from "../App";

type SidebarProps = {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
};

const navItems: Array<{ key: PageKey; label: string; icon: typeof Home }> = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "youtube", label: "YouTube Channels", icon: PlayCircle },
  { key: "stores", label: "Web Stores", icon: ShoppingCart },
  { key: "revenue", label: "Revenue", icon: WalletCards },
  { key: "insights", label: "Insights", icon: Lightbulb },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-outline bg-surface/95 p-2 backdrop-blur md:inset-y-0 md:left-0 md:w-[280px] md:border-r md:border-t-0 md:p-6">
      <div className="hidden md:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sprout size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">GardenFlow</h1>
            <p className="text-sm text-on-muted">Botanical Intelligence</p>
          </div>
        </div>
      </div>
      <nav className="grid grid-cols-6 gap-1 md:block md:space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = activePage === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition md:justify-start md:border-l-4 ${
                active
                  ? "border-primary bg-primary/10 text-primary md:translate-x-1"
                  : "border-transparent text-on-muted hover:bg-surface-variant/60 hover:text-on-surface"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
              title={label}
            >
              <Icon size={19} />
              <span className="hidden md:inline">{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-auto hidden pt-10 md:block">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-background">
              GF
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-on-surface">GardenFlow Ops</p>
              <p className="truncate text-xs text-on-muted">Executive Admin</p>
            </div>
            <Bell className="ml-auto text-on-muted" size={16} />
          </div>
        </div>
      </div>
      <div className="hidden">
        <BarChart3 />
      </div>
    </aside>
  );
}
