"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type OrderData = {
  label: string;
  totalOrders: number;
};

type BarChartProp = {
  data: OrderData[];
  thisMonth: string;
};

const chartConfig = {
  totalOrders: {
    label: "Orders",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function OrdersBar({ data, thisMonth }: BarChartProp) {
  if (!data.length) {
    return (
      <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
        No orders available
      </div>
    );
  }
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 25,
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
              labelFormatter={(value) => `${value} ${thisMonth}`}
            />
          }
        />
        <Bar
          dataKey="totalOrders"
          fill="var(--color-totalOrders)"
          radius={[8, 8, 0, 0]}
        >
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
