"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function RevenueLine({ data, thisMonth, prevMonth }: RevenuechartProp) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row items-center gap-2 mb-4 text-sm font-semibold tracking-wide uppercase">
        <div className="text-[#41B544]">{thisMonth}</div>
        <div className="text-gray-500 text-xs lowercase">vs</div>
        <div className="text-[#3b82f6]">{prevMonth}</div>
      </div>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => String(value).slice(0, 3)}
          />

          <ChartTooltip
            cursor={{ stroke: "#444", strokeWidth: 1, strokeDasharray: "4 4" }}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `${value} ${thisMonth}`}
              />
            }
          />

          <Line
            dataKey="currentRevenue"
            type="monotone"
            stroke="var(--color-currentRevenue)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "var(--color-currentRevenue)" }}
          />
          <Line
            dataKey="previousRevenue"
            type="monotone"
            stroke="var(--color-previousRevenue)"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
