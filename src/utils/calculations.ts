import type { WebStore, YouTubeChannel } from "../data/mockData";

export const sum = <T>(items: T[], selector: (item: T) => number) =>
  items.reduce((total, item) => total + selector(item), 0);

export const average = <T>(items: T[], selector: (item: T) => number) =>
  items.length ? sum(items, selector) / items.length : 0;

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export const getYouTubeTotals = (channels: YouTubeChannel[]) => {
  const views = sum(channels, (channel) => channel.views);
  const revenue = sum(channels, (channel) => channel.revenue);

  return {
    views,
    revenue,
    ctr: average(channels, (channel) => channel.ctr),
    watchTime: sum(channels, (channel) => channel.watchTime),
    subscribers: sum(channels, (channel) => channel.subscribers),
    rpm: views ? (revenue / views) * 1000 : 0,
  };
};

export const getStoreTotals = (stores: WebStore[]) => {
  const traffic = sum(stores, (store) => store.traffic);
  const revenue = sum(stores, (store) => store.revenue);
  const unitsSold = sum(stores, (store) => store.unitsSold);

  return {
    traffic,
    unitsSold,
    revenue,
    conversionRate: traffic ? (unitsSold / traffic) * 100 : 0,
    aov: unitsSold ? revenue / unitsSold : 0,
    abandonedCarts: sum(stores, (store) => store.abandonedCarts),
  };
};

export const mergeYouTubeSeries = (channels: YouTubeChannel[]) =>
  channels[0]?.series.map((point, index) => ({
    date: point.date,
    views: sum(channels, (channel) => channel.series[index].views),
    revenue: sum(channels, (channel) => channel.series[index].revenue),
    ctr: average(channels, (channel) => channel.series[index].ctr),
    subscribers: sum(channels, (channel) => channel.series[index].subscribers),
  })) ?? [];

export const mergeStoreSeries = (stores: WebStore[]) =>
  stores[0]?.series.map((point, index) => ({
    date: point.date,
    revenue: sum(stores, (store) => store.series[index].revenue),
    conversionRate: average(stores, (store) => store.series[index].conversionRate),
    traffic: sum(stores, (store) => store.series[index].traffic),
    abandonedCarts: sum(stores, (store) => store.series[index].abandonedCarts),
  })) ?? [];

export const getCombinedRevenueSeries = (channels: YouTubeChannel[], stores: WebStore[]) => {
  const youtube = mergeYouTubeSeries(channels);
  const web = mergeStoreSeries(stores);

  return youtube.map((point, index) => ({
    date: point.date,
    youtubeRevenue: point.revenue,
    webRevenue: web[index]?.revenue ?? 0,
    totalRevenue: point.revenue + (web[index]?.revenue ?? 0),
  }));
};

export const getBestPerformingAsset = (channels: YouTubeChannel[], stores: WebStore[]) => {
  const bestChannel = [...channels].sort((a, b) => b.revenue - a.revenue)[0];
  const bestStore = [...stores].sort((a, b) => b.revenue - a.revenue)[0];

  return bestStore.revenue > bestChannel.revenue ? bestStore.name : bestChannel.name;
};

export const getEstimatedFunnel = (channels: YouTubeChannel[], stores: WebStore[]) => {
  const youtube = getYouTubeTotals(channels);
  const store = getStoreTotals(stores);
  const clicks = Math.round(youtube.views * (youtube.ctr / 100));
  const visits = Math.min(store.traffic, Math.round(clicks * 0.68));

  return [
    { stage: "Views", value: youtube.views },
    { stage: "Clicks", value: clicks },
    { stage: "Store Visits", value: visits },
    { stage: "Purchases", value: store.unitsSold },
    { stage: "Revenue", value: store.revenue },
  ];
};
