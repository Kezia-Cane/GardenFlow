export type YouTubeChannel = {
  name: string;
  views: number;
  revenue: number;
  ctr: number;
  watchTime: number;
  subscribers: number;
  rpm: number;
  series: Array<{ date: string; views: number; revenue: number; ctr: number; subscribers: number }>;
};

export type WebStore = {
  name: string;
  traffic: number;
  unitsSold: number;
  revenue: number;
  conversionRate: number;
  aov: number;
  abandonedCarts: number;
  series: Array<{ date: string; revenue: number; conversionRate: number; traffic: number; abandonedCarts: number }>;
};

const dates = ["May 1", "May 5", "May 9", "May 13", "May 17", "May 20"];

export const youtubeChannels: YouTubeChannel[] = [
  {
    name: "Backyard Bloom",
    views: 428000,
    revenue: 6280,
    ctr: 6.8,
    watchTime: 38600,
    subscribers: 3820,
    rpm: 14.67,
    series: dates.map((date, index) => ({
      date,
      views: [52000, 61000, 70000, 76000, 82000, 87000][index],
      revenue: [780, 890, 1020, 1120, 1210, 1260][index],
      ctr: [5.9, 6.1, 6.5, 6.7, 6.9, 7.1][index],
      subscribers: [410, 510, 580, 660, 790, 870][index],
    })),
  },
  {
    name: "Homestead Harvest",
    views: 512000,
    revenue: 8510,
    ctr: 7.4,
    watchTime: 47500,
    subscribers: 4560,
    rpm: 16.62,
    series: dates.map((date, index) => ({
      date,
      views: [65000, 72000, 84000, 89000, 97000, 105000][index],
      revenue: [1040, 1180, 1370, 1490, 1640, 1790][index],
      ctr: [6.4, 6.8, 7.0, 7.3, 7.6, 7.8][index],
      subscribers: [520, 610, 710, 800, 910, 1010][index],
    })),
  },
  {
    name: "LawnFix Daily",
    views: 306000,
    revenue: 3910,
    ctr: 5.7,
    watchTime: 24100,
    subscribers: 2140,
    rpm: 12.78,
    series: dates.map((date, index) => ({
      date,
      views: [39000, 44000, 48000, 52000, 59000, 64000][index],
      revenue: [480, 560, 620, 680, 760, 810][index],
      ctr: [5.2, 5.3, 5.4, 5.8, 6.0, 6.1][index],
      subscribers: [210, 270, 330, 390, 450, 490][index],
    })),
  },
  {
    name: "GardenFlow Tips",
    views: 374000,
    revenue: 5480,
    ctr: 8.1,
    watchTime: 31900,
    subscribers: 3380,
    rpm: 14.65,
    series: dates.map((date, index) => ({
      date,
      views: [43000, 52000, 61000, 69000, 73000, 76000][index],
      revenue: [620, 760, 890, 1010, 1080, 1120][index],
      ctr: [7.1, 7.5, 7.8, 8.0, 8.4, 8.6][index],
      subscribers: [340, 430, 540, 620, 700, 750][index],
    })),
  },
];

export const webStores: WebStore[] = [
  {
    name: "Raised Bed Gardening Ebook",
    traffic: 38400,
    unitsSold: 1460,
    revenue: 42340,
    conversionRate: 3.8,
    aov: 29,
    abandonedCarts: 520,
    series: dates.map((date, index) => ({
      date,
      revenue: [5120, 6010, 6890, 7410, 8110, 8800][index],
      conversionRate: [3.1, 3.3, 3.5, 3.7, 4.0, 4.2][index],
      traffic: [5400, 5900, 6300, 6700, 7000, 7100][index],
      abandonedCarts: [96, 88, 91, 84, 80, 81][index],
    })),
  },
  {
    name: "Lawn Care Starter Kit",
    traffic: 29100,
    unitsSold: 780,
    revenue: 60840,
    conversionRate: 2.7,
    aov: 78,
    abandonedCarts: 610,
    series: dates.map((date, index) => ({
      date,
      revenue: [7450, 8220, 9140, 10120, 12310, 13600][index],
      conversionRate: [2.1, 2.3, 2.5, 2.8, 3.1, 3.3][index],
      traffic: [4200, 4500, 4900, 5100, 5200, 5200][index],
      abandonedCarts: [114, 109, 103, 101, 94, 89][index],
    })),
  },
  {
    name: "Composting Guide",
    traffic: 21400,
    unitsSold: 970,
    revenue: 24250,
    conversionRate: 4.5,
    aov: 25,
    abandonedCarts: 330,
    series: dates.map((date, index) => ({
      date,
      revenue: [3210, 3520, 3780, 4050, 4610, 5080][index],
      conversionRate: [3.8, 4.0, 4.2, 4.5, 4.9, 5.1][index],
      traffic: [3100, 3300, 3500, 3700, 3900, 3900][index],
      abandonedCarts: [61, 58, 55, 54, 51, 51][index],
    })),
  },
  {
    name: "Homestead Planner",
    traffic: 26800,
    unitsSold: 900,
    revenue: 33300,
    conversionRate: 3.4,
    aov: 37,
    abandonedCarts: 460,
    series: dates.map((date, index) => ({
      date,
      revenue: [4120, 4630, 5150, 5660, 6410, 7330][index],
      conversionRate: [2.8, 3.0, 3.2, 3.5, 3.7, 3.9][index],
      traffic: [3800, 4100, 4400, 4600, 4900, 5000][index],
      abandonedCarts: [88, 81, 77, 72, 71, 71][index],
    })),
  },
];

export const recentActivity = [
  "Homestead Harvest CTR increased +12%",
  "Raised Bed Gardening Ebook revenue up 18%",
  "GardenFlow Tips generated highest conversions today",
  "Lawn Care Starter Kit crossed $60K monthly revenue",
  "Composting Guide has the strongest store conversion rate",
];
