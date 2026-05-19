import type { ReactNode } from "react";
import type { PageKey } from "../App";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type LayoutProps = {
  activePage: PageKey;
  title: string;
  description: string;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
};

export function Layout({ activePage, title, description, onNavigate, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,222,163,0.12),transparent_34%),radial-gradient(circle_at_35%_20%,rgba(76,215,246,0.09),transparent_28%)]" />
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="relative pb-24 md:ml-[280px] md:pb-0">
        <Topbar title={title} description={description} />
        <div className="space-y-6 p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
