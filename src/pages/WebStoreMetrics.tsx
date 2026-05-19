import { useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, MousePointer2, PackageCheck, ShoppingCart, TrafficCone, Undo2 } from "lucide-react";
import { webStores } from "../data/mockData";
import { ChartCard } from "../components/ChartCard";
import { DataTable } from "../components/DataTable";
import { KpiCard } from "../components/KpiCard";
import { formatCurrency, formatNumber, formatPercent, getStoreTotals, mergeStoreSeries } from "../utils/calculations";

export function WebStoreMetrics() {
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const stores = useMemo(
    () => selectedStore === "All Stores" ? webStores : webStores.filter((store) => store.name === selectedStore),
    [selectedStore],
  );
  const totals = getStoreTotals(stores);
  const series = stores.length === 1 ? stores[0].series : mergeStoreSeries(stores);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-on-muted">Monitor funnel traffic, conversion quality, units sold, and commerce revenue across GardenFlow digital products.</p>
        <select
          value={selectedStore}
          onChange={(event) => setSelectedStore(event.target.value)}
          className="rounded-lg border border-outline bg-surface-container px-3 py-2 text-sm text-on-surface outline-none focus:border-primary"
        >
          <option>All Stores</option>
          {webStores.map((store) => <option key={store.name}>{store.name}</option>)}
        </select>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard title="Total Revenue" value={formatCurrency(totals.revenue)} change="+17.6%" icon={DollarSign} />
        <KpiCard title="Units Sold" value={formatNumber(totals.unitsSold)} change="+12.8%" icon={PackageCheck} tone="cyan" />
        <KpiCard title="Conversion Rate" value={formatPercent(totals.conversionRate)} change="+0.9 pts" icon={MousePointer2} tone="violet" />
        <KpiCard title="Average Order Value" value={formatCurrency(totals.aov)} change="+5.1%" icon={ShoppingCart} />
        <KpiCard title="Traffic" value={formatNumber(totals.traffic)} change="+10.4%" icon={TrafficCone} tone="cyan" />
        <KpiCard title="Abandoned Carts" value={formatNumber(totals.abandonedCarts)} change="-6.2%" icon={Undo2} tone="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Revenue Trend" subtitle="Store revenue over the selected period" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="storeRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#4edea3" fill="url(#storeRevenue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Abandoned Carts" subtitle="Checkout friction by date">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
              <Bar dataKey="abandonedCarts" fill="#d0bcff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <ChartCard title="Conversion Rate and Traffic" subtitle="Demand volume against purchase efficiency">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "rgba(17,24,39,0.92)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="traffic" stroke="#4cd7f6" strokeWidth={3} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#4edea3" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <DataTable
        title="Store Performance"
        rows={stores}
        columns={[
          { key: "name", label: "Store Name" },
          { key: "traffic", label: "Traffic", render: (row) => formatNumber(row.traffic as number) },
          { key: "unitsSold", label: "Units Sold", render: (row) => formatNumber(row.unitsSold as number) },
          { key: "revenue", label: "Revenue", render: (row) => formatCurrency(row.revenue as number) },
          { key: "conversionRate", label: "Conversion Rate", render: (row) => formatPercent(row.conversionRate as number) },
          { key: "aov", label: "AOV", render: (row) => formatCurrency(row.aov as number) },
          { key: "abandonedCarts", label: "Abandoned Carts", render: (row) => formatNumber(row.abandonedCarts as number) },
        ]}
      />
    </div>
  );
}
