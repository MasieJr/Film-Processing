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

  return (
    <div className="space-y-6">
      {/* ROW 1: REVENUE & TOTAL ORDERS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* REVENUE COMBO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-700">
          <div className="lg:col-span-1 flex items-center">
            <div className="w-full">
              <StatsCard
                label="Total Revenue"
                stat={`R ${(analytics.kpis.current.revenue || 0).toLocaleString()}`}
                stat2={`R ${(analytics.kpis.previous.revenue || 0).toLocaleString()}`}
                stat2Label={prevLabel}
                textColorClass="text-[#41B544]"
                isHigh={analytics.kpis.trends.revenueIsUp}
                percentage={analytics.kpis.trends.revenuePercent}
              />
            </div>
          </div>
          <div className="lg:col-span-2 mt-6 lg:mt-0">
            <RevenueLine
              data={analytics.chartData}
              thisMonth={month}
              prevMonth={prevMonth}
            />
          </div>
        </div>

        {/* TOTAL ORDERS COMBO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-700">
          <div className="lg:col-span-1 flex items-center">
            <div className="w-full">
              <StatsCard
                label="Total Orders"
                stat={(
                  analytics.kpis.current.totalOrders || 0
                ).toLocaleString()}
                stat2={(
                  analytics.kpis.previous.totalOrders || 0
                ).toLocaleString()}
                stat2Label={prevLabel}
                textColorClass="text-blue-500"
                isHigh={analytics.kpis.trends.ordersIsUp}
                percentage={analytics.kpis.trends.ordersPercent}
              />
            </div>
          </div>
          <div className="lg:col-span-2 mt-6 lg:mt-0">
            <OrdersBar data={analytics.chartData} />
          </div>
        </div>
      </div>

      {/* ROW 2: COMPLETED ORDERS & SERVICES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* COMPLETED ORDERS & PIE CHART COMBO CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-700 xl:col-span-1">
          <div className="lg:col-span-1 flex items-center">
            <div className="w-full">
              <StatsCard
                label="Completed Orders"
                stat={(
                  analytics.kpis.current.completedOrders || 0
                ).toLocaleString()}
                stat2={(
                  analytics.kpis.previous.completedOrders || 0
                ).toLocaleString()}
                stat2Label={prevLabel}
                textColorClass="text-white"
                isHigh={analytics.kpis.trends.completedIsUp}
                percentage={analytics.kpis.trends.completedPercent}
              />
            </div>
          </div>
          <div className="lg:col-span-2 mt-6 lg:mt-0">
            <ServicePie
              data={analytics.servicesDistribution}
              thisMonth={month}
            />
          </div>
        </div>

        {/* Empty space on the right (or you can add a 4th metric here later!) */}
        <div className="hidden xl:block"></div>
      </div>
    </div>
  );
}
