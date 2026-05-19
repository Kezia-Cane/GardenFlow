import { useMemo, useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { Layout } from "./components/Layout";
import { CombinedOverview } from "./pages/CombinedOverview";
import { WebStoreMetrics } from "./pages/WebStoreMetrics";
import { YouTubeMetrics } from "./pages/YouTubeMetrics";

export type PageKey = "overview" | "youtube" | "stores" | "revenue" | "insights" | "settings";

const pageMeta: Record<PageKey, { title: string; description: string }> = {
  overview: {
    title: "Combined Overview",
    description: "Unified visibility across YouTube, stores, and revenue.",
  },
  youtube: {
    title: "YouTube Channel Metrics",
    description: "Creator performance, audience quality, and ad revenue.",
  },
  stores: {
    title: "Web Store Metrics",
    description: "Traffic, conversion, cart recovery, and product revenue.",
  },
  revenue: {
    title: "Revenue",
    description: "Revenue planning and attribution workspace.",
  },
  insights: {
    title: "Insights",
    description: "AI-assisted recommendations and growth signals.",
  },
  settings: {
    title: "Settings",
    description: "Workspace controls and dashboard preferences.",
  },
};

function ComingSoon({ title }: { title: string }) {
  return (
    <section className="glass-card flex min-h-[420px] flex-col items-center justify-center rounded-xl p-8 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ChartNoAxesCombined size={26} />
      </div>
      <h3 className="text-2xl font-semibold text-on-surface">{title} is coming soon</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-on-muted">
        This prototype keeps the trial focused on the three core analytics views while leaving room for deeper reporting, AI insights, and account controls.
      </p>
    </section>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const meta = pageMeta[activePage];
  const content = useMemo(() => {
    if (activePage === "overview") return <CombinedOverview />;
    if (activePage === "youtube") return <YouTubeMetrics />;
    if (activePage === "stores") return <WebStoreMetrics />;
    return <ComingSoon title={meta.title} />;
  }, [activePage, meta.title]);

  return (
    <Layout activePage={activePage} title={meta.title} description={meta.description} onNavigate={setActivePage}>
      {content}
    </Layout>
  );
}
