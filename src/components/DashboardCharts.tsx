"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ChartLineMultiple from "./MultiLineCharr";

// This is the data structure your Server Action will pass to this component
export type DailyStat = {
  // date: string; // e.g., "12 Jun"
  // revenue: number;
  // totalOrders: number;
  // completedOrders: number;
  label: string;
  currentRevenue: number;
  previousRevenue: number;
};

type DashboardChartsProps = {
  data: DailyStat[];
  timeframeLabel: string; // e.g., "This Week" or "This Month"
};

// --- SHADCN CHART CONFIGS ---
const revenueConfig = {
  revenue: {
    label: "Revenue (ZAR)",
    color: "#41B544", // Your brand green
  },
} satisfies ChartConfig;

const ordersConfig = {
  totalOrders: {
    label: "Total Orders",
    color: "#3b82f6", // Blue
  },
  completedOrders: {
    label: "Completed",
    color: "#41B544", // Green
  },
} satisfies ChartConfig;

export default function DashboardCharts({
  data,
  timeframeLabel,
}: DashboardChartsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-[350px]">
        <Card className="bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading revenue data...</p>
        </Card>
        <Card className="bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <p className="text-gray-500 animate-pulse">Loading orders data...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* --- REVENUE AREA CHART --- */}
      <Card className="bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Revenue Trend
          </CardTitle>
          <CardDescription className="text-gray-500">
            Daily earnings for {timeframeLabel.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="w-full">
            <AreaChart
              data={data}
              margin={{ left: -20, right: 12, top: 12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-gray-200 dark:stroke-gray-800"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-600 dark:text-gray-400 text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `R${value}`}
                className="text-gray-600 dark:text-gray-400 text-xs"
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => `R ${value}`}
                    indicator="line"
                  />
                }
              />
              <Area
                dataKey="revenue"
                type="monotone"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                strokeWidth={3}
                activeDot={{
                  r: 6,
                  fill: "var(--color-revenue)",
                  stroke: "#1e1e1e",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* --- ORDERS BAR CHART --- */}
      <Card className="bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Order Volume
          </CardTitle>
          <CardDescription className="text-gray-500">
            Total received vs. completed processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ordersConfig} className="h-[250px] w-full">
            <BarChart
              data={data}
              margin={{ left: -20, right: 12, top: 12, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-gray-200 dark:stroke-gray-800"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-600 dark:text-gray-400 text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                className="text-gray-600 dark:text-gray-400 text-xs"
              />
              {/* Shadcn's built-in interactive legend */}
              <ChartLegend content={<ChartLegendContent />} className="pt-2" />
              <ChartTooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              {/* Side-by-side bars (radius gives them nice rounded tops) */}
              <Bar
                dataKey="totalOrders"
                fill="var(--color-totalOrders)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="completedOrders"
                fill="var(--color-completedOrders)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <ChartLineMultiple chartData={data} />
    </div>
  );
}
