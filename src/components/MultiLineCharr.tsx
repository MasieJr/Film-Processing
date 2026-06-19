"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// 1. The keys here MUST match the dataKeys from your server action
const chartConfig = {
  currentRevenue: {
    label: "This month (ZAR)",
    color: "#41B544", // Your bright green
  },
  previousRevenue: {
    label: "Last Month (ZAR)",
    color: "#00d5ff", // Subtle gray for comparison
  },
} satisfies ChartConfig;

export type DailyStat = {
  label: string | number;
  currentRevenue: number;
  previousRevenue: number;
};

type chartProp = {
  chartData: DailyStat[];
};

export default function ChartLineMultiple({ chartData }: chartProp) {
  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardContent className="h-auto flex items-center justify-center text-muted-foreground">
          Loading comparison data...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1e1e1e] border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Revenue Comparison</CardTitle>
        <CardDescription className="text-gray-400">
          This Month vs. Last Month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className=" w-full max-h-[300px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -10,
              right: 12,
              top: 10,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.2}
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // Safely convert to string before returning, fixes the .slice() crash
              tickFormatter={(value) => String(value)}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R${value}`}
              className="text-xs"
            />

            <ChartTooltip
              cursor={{
                stroke: "#444",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              content={
                <ChartTooltipContent formatter={(value) => `R ${value}`} />
              }
            />

            {/* 2. Map the dataKey directly to the config keys */}
            <Line
              dataKey="previousRevenue"
              type="monotone"
              stroke="var(--color-previousRevenue)"
              strokeWidth={2}
              // strokeDasharray="5 5" // Makes the previous period a dashed line!
              dot={false}
            />

            <Line
              dataKey="currentRevenue"
              type="monotone"
              stroke="var(--color-currentRevenue)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: "var(--color-currentRevenue)",
                stroke: "#1e1e1e",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
