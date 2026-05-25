"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

type ReusableAreaChartProps = {
  title: string;
  description: string;
  data: any[];
  config: ChartConfig;
  dataKey: string;
  xAxisKey?: string;
  valuePrefix?: string;
};

export function ChartAreaDefault({
  title,
  description,
  data,
  config,
  dataKey,
  xAxisKey = "date",
  valuePrefix = "",
}: ReusableAreaChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground px-0">
          Loading chart data...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ChartContainer config={config} className="h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12, top: 12 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.2}
            />

            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => `${valuePrefix}${value}`}
                />
              }
            />

            <Area
              dataKey={dataKey}
              type="natural"
              fill={`var(--color-${dataKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${dataKey})`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
