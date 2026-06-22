"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type RevenuechartProp = {
  data: any[];
  thisMonth: string;
  prevMonth: string;
};

const chartConfig = {
  currentRevenue: {
    label: "Current",
    color: "#41B544",
  },
  previousRevenue: {
    label: "Previous",
    color: "blue-500",
  },
} satisfies ChartConfig;

export function RevenueLine({ data, thisMonth, prevMonth }: RevenuechartProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>
          {thisMonth} vs {prevMonth}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="currentRevenue"
              type="monotone"
              stroke="#41B544"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="previousRevenue"
              type="monotone"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
