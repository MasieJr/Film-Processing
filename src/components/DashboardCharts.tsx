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
import { ChartBarLabel } from "./BarChart";
import { ChartPieLegend } from "./PieChart";

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      {/* --- REVENUE AREA CHART --- */}
      <ChartBarLabel />

      <ChartPieLegend />

      <ChartLineMultiple chartData={data} />
    </div>
  );
}
