"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

export const description = "Film orders per day";

const chartData = [
  { month: "1", desktop: 186 },
  { month: "2", desktop: 305 },
  { month: "3", desktop: 237 },
  { month: "4", desktop: 73 },
  { month: "5", desktop: 209 },
  { month: "6", desktop: 214 },
  { month: "7", desktop: 186 },
  { month: "8", desktop: 305 },
  { month: "9", desktop: 237 },
  { month: "10", desktop: 73 },
  { month: "12", desktop: 209 },
  { month: "13", desktop: 214 },
  { month: "14", desktop: 186 },
  { month: "15", desktop: 305 },
  { month: "16", desktop: 237 },
  { month: "17", desktop: 73 },
  { month: "18", desktop: 209 },
  { month: "19", desktop: 214 },
  { month: "20", desktop: 186 },
  { month: "21", desktop: 186 },
  { month: "22", desktop: 305 },
  { month: "23", desktop: 237 },
  { month: "24", desktop: 73 },
  { month: "25", desktop: 209 },
  { month: "26", desktop: 214 },
  { month: "27", desktop: 186 },
  { month: "28", desktop: 305 },
  { month: "29", desktop: 237 },
  { month: "30", desktop: 237 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarLabel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Film orders Per day</CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
