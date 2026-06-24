"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type BarChartProp = {
  data: any[];
};

const chartConfig = {
  totalOrders: {
    label: "Orders",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function OrdersBar({ data }: BarChartProp) {
  const month = new Date().toLocaleDateString("en-GB", { month: "long" });
  return (
    <ChartContainer config={chartConfig} className="h-auto w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => `${value} ${month}`}
            />
          }
        />
        <Bar dataKey="totalOrders" fill="#3b82f6" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
