"use client";

import StatsCard from "./StatsCards";
import { RevenueLine } from "./charts/RevenueLine";
import { ServicePie } from "./charts/ServicePie";
import { OrdersBar } from "./charts/OrdersBar";

type DashboardAnalyticsProps = {
  analytics: any;
  timeframe: "week" | "month";
};

const now = new Date();
const month = now.toLocaleDateString("en-GB", { month: "long" });
const prevMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1,
).toLocaleDateString("en-GB", { month: "long" });
export default function DashboardAnalytics({
  analytics,
  timeframe,
}: DashboardAnalyticsProps) {
  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">
        Loading analytics...
      </div>
    );
  }

  const prevLabel = timeframe === "week" ? "Last Week" : "Last Month";
  const timeframeLabel = timeframe === "week" ? "this week" : "this month";

  return (
    <div className="space-y-4">
      <div className="w-full">
        <RevenueLine
          data={analytics.chartData}
          thisMonth={month}
          prevMonth={prevMonth}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrdersBar data={analytics.chartData} thisMonth={month} />
        </div>

        <div className="lg:col-span-1">
          <ServicePie data={analytics.servicesDistribution} thisMonth={month} />
        </div>
      </div>
    </div>
  );
}
