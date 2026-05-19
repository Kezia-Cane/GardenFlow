import { useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Clock, Eye, MousePointerClick, PlayCircle, TrendingUp, Users } from "lucide-react";
import { youtubeChannels } from "../data/mockData";
import { ChartCard } from "../components/ChartCard";
import { DataTable } from "../components/DataTable";
import { KpiCard } from "../components/KpiCard";
import { formatCurrency, formatNumber, formatPercent, getYouTubeTotals, mergeYouTubeSeries } from "../utils/calculations";

export function YouTubeMetrics() {
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const channels = useMemo(
    () => selectedChannel === "All Channels" ? youtubeChannels : youtubeChannels.filter((channel) => channel.name === selectedChannel),
    [selectedChannel],
  );
  const totals = getYouTubeTotals(channels);
  const series = channels.length === 1 ? channels[0].series : mergeYouTubeSeries(channels);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-on-muted">Track channel growth, creator revenue, engagement, and RPM across the GardenFlow media portfolio.</p>
        <select
          value={selectedChannel}
          onChange={(event) => setSelectedChannel(event.target.value)}
          className="rounded-lg border border-outline bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
        >
          <option>All Channels</option>
          {youtubeChannels.map((channel) => <option key={channel.name}>{channel.name}</option>)}
        </select>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard title="Total Views" value={formatNumber(totals.views)} change="+14.2%" icon={Eye} tone="cyan" />
        <KpiCard title="YouTube Revenue" value={formatCurrency(totals.revenue)} change="+9.8%" icon={PlayCircle} />
        <KpiCard title="CTR" value={formatPercent(totals.ctr)} change="+1.1 pts" icon={MousePointerClick} tone="violet" />
        <KpiCard title="Watch Time" value={`${formatNumber(totals.watchTime)}h`} change="+7.4%" icon={Clock} tone="cyan" />
        <KpiCard title="Subscribers Gained" value={formatNumber(totals.subscribers)} change="+11.6%" icon={Users} />
        <KpiCard title="RPM" value={formatCurrency(totals.rpm)} change="+3.2%" icon={TrendingUp} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Views Over Time" subtitle="Audience demand across the selected channel set" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#4cd7f6" fill="url(#views)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Revenue By Channel" subtitle="Ad revenue contribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channels}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Bar dataKey="revenue" fill="#4edea3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <ChartCard title="Subscriber Growth and CTR" subtitle="Momentum and click-through quality">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="subscribers" stroke="#4edea3" strokeWidth={3} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#d0bcff" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <DataTable
        title="Channel Performance"
        rows={channels}
        columns={[
          { key: "name", label: "Channel Name" },
          { key: "views", label: "Views", render: (row) => formatNumber(row.views as number) },
          { key: "revenue", label: "Revenue", render: (row) => formatCurrency(row.revenue as number) },
          { key: "ctr", label: "CTR", render: (row) => formatPercent(row.ctr as number) },
          { key: "watchTime", label: "Watch Time", render: (row) => `${formatNumber(row.watchTime as number)}h` },
          { key: "subscribers", label: "Subscribers", render: (row) => formatNumber(row.subscribers as number) },
          { key: "rpm", label: "RPM", render: (row) => formatCurrency(row.rpm as number) },
        ]}
      />
    </div>
  );
}
