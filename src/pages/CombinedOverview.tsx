import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, BadgeDollarSign, Eye, Lightbulb, MousePointerClick, Sparkles, Star, Store, Trophy, Youtube } from "lucide-react";
import { recentActivity, webStores, youtubeChannels } from "../data/mockData";
import { ChartCard } from "../components/ChartCard";
import { InsightCard } from "../components/InsightCard";
import { KpiCard } from "../components/KpiCard";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  getBestPerformingAsset,
  getCombinedRevenueSeries,
  getEstimatedFunnel,
  getStoreTotals,
  getYouTubeTotals,
} from "../utils/calculations";

const funnelColors = ["#4cd7f6", "#4edea3", "#10b981", "#d0bcff", "#b090ff"];

function FunnelTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: { stage?: string; value?: number } }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item?.stage) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-surface-container/95 px-3 py-2 shadow-panel backdrop-blur-md">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-muted">{item.stage}</p>
      <p className="mt-1 text-sm font-semibold text-on-surface">{formatNumber(item.value ?? 0)}</p>
    </div>
  );
}

export function CombinedOverview() {
  const youtubeTotals = getYouTubeTotals(youtubeChannels);
  const storeTotals = getStoreTotals(webStores);
  const combinedRevenue = youtubeTotals.revenue + storeTotals.revenue;
  const conversionEstimate = (storeTotals.unitsSold / Math.max(youtubeTotals.views, 1)) * 100;
  const combinedSeries = getCombinedRevenueSeries(youtubeChannels, webStores);
  const funnel = getEstimatedFunnel(youtubeChannels, webStores);
  const breakdown = [
    ...youtubeChannels.map((channel) => ({ name: channel.name, revenue: channel.revenue, type: "YouTube" })),
    ...webStores.map((store) => ({ name: store.name, revenue: store.revenue, type: "Store" })),
  ].sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard title="Total YouTube Views" value={formatNumber(youtubeTotals.views)} change="+13.1%" icon={Eye} tone="cyan" />
        <KpiCard title="YouTube Revenue" value={formatCurrency(youtubeTotals.revenue)} change="+9.5%" icon={Youtube} />
        <KpiCard title="Web Store Revenue" value={formatCurrency(storeTotals.revenue)} change="+17.6%" icon={Store} tone="violet" />
        <KpiCard title="Combined Revenue" value={formatCurrency(combinedRevenue)} change="+15.4%" icon={BadgeDollarSign} />
        <KpiCard title="YT-to-Store Conv." value={formatPercent(conversionEstimate)} change="+0.4 pts" icon={MousePointerClick} tone="cyan" />
        <KpiCard title="Best Asset" value={getBestPerformingAsset(youtubeChannels, webStores)} change="Top revenue driver" icon={Trophy} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Combined Revenue Over Time" subtitle="Unified revenue across content and commerce" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={combinedSeries}>
              <defs>
                <linearGradient id="combined" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="totalRevenue" stroke="#4edea3" fill="url(#combined)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue Mix" subtitle="YouTube vs web store revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={combinedSeries}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Legend />
              <Bar dataKey="youtubeRevenue" name="YouTube" stackId="revenue" fill="#4cd7f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="webRevenue" name="Web Store" stackId="revenue" fill="#4edea3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Content to Commerce Funnel" subtitle="Views to clicks, visits, purchases, and revenue">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip content={<FunnelTooltip />} cursor={false} />
              <Funnel dataKey="value" data={funnel} isAnimationActive>
                <LabelList position="right" fill="#dde4dd" stroke="none" dataKey="stage" />
                {funnel.map((_, index) => <Cell key={index} fill={funnelColors[index]} />)}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue Breakdown by Asset" subtitle="Channels and stores ranked by revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={breakdown} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" width={128} stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                {breakdown.map((item) => <Cell key={item.name} fill={item.type === "Store" ? "#4edea3" : "#4cd7f6"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <InsightCard title="Top revenue driver" body="Lawn Care Starter Kit leads the portfolio with the highest web store revenue and improving conversion quality." icon={Star} />
        <InsightCard title="Best conversion opportunity" body="GardenFlow Tips has the strongest CTR. Pair its top videos with direct ebook offers to capture more demand." icon={Sparkles} />
        <InsightCard title="Highest traffic channel" body="Homestead Harvest produces the largest audience pool and should receive the next product placement test." icon={Youtube} />
        <InsightCard title="Strongest store conversion" body="Composting Guide converts at 4.5%, making it a useful benchmark for offer-page structure." icon={ArrowUpRight} />
        <InsightCard title="Suggested next action" body="Launch a bundled offer from Homestead Harvest to Raised Bed Gardening Ebook and monitor RPM lift." icon={Lightbulb} />
      </section>

      <section className="glass-card rounded-xl p-5">
        <div className="mb-4 border-b border-white/10 pb-4">
          <h3 className="text-lg font-semibold text-on-surface">Recent Activity</h3>
          <p className="mt-1 text-sm text-on-muted">Signals worth acting on today</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {recentActivity.map((activity) => (
            <div key={activity} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-on-surface">
              {activity}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
