"use client";

import { Pie, PieChart } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";

type ServiceData = {
  name: string;
  value: number;
  fill: string;
};

type ServiceChartProps = {
  data: ServiceData[];
};

export function ServicePie({ data }: ServiceChartProps) {
  const dynamicConfig = useMemo(
    () =>
      data.reduce((config, item) => {
        config[item.name] = {
          label: item.name,
          color: item.fill,
        };
        return config;
      }, {} as ChartConfig),
    [data],
  );

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground">
        <p>No service data</p>
        <p className="text-xs">Orders will appear here once available.</p>
      </div>
    );
  }
  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer config={dynamicConfig} className="mx-auto h-auto">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent nameKey="name" indicator="line" hideLabel />
            }
          />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={65}
            paddingAngle={3}
            cornerRadius={6}
          />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full">
        {data.map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-xs text-gray-300"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            {entry.name} <span className="text-gray-500">({entry.value})</span>
          </div>
        ))}
      </div>
    </CardContent>
  );
}
