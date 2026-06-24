"use client";

import { Pie, PieChart } from "recharts";

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

type ServicechartProp = {
  data: any[];
  thisMonth: string;
};

export function ServicePie({ data, thisMonth }: ServicechartProp) {
  const dynamicConfig = data.reduce((config, item) => {
    if (item.name) {
      config[item.name] = {
        label: item.name,
        color: item.fill,
      };
    }
    return config;
  }, {} as ChartConfig);

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col bg-[#1e1e1e] border-gray-800">
        <CardContent className="h-[300px] flex items-center justify-center text-gray-500">
          No service data available.
        </CardContent>
      </Card>
    );
  }
  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer config={dynamicConfig} className="mx-auto h-auto">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
          />
          <Pie data={data} dataKey="value" />
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
