"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export type Timeframe = "week" | "month";

export async function fetchDashboardAnalytics(timeframe: Timeframe = "week") {
  const now = new Date();

  let currentStart = new Date();
  let previousStart = new Date();
  let previousEnd = new Date();

  if (timeframe === "week") {
    currentStart.setDate(now.getDate() - 6);

    previousStart.setDate(now.getDate() - 13);
    previousEnd = new Date(now);
    previousEnd.setDate(now.getDate() - 7);
  } else {
    currentStart = new Date(now.getFullYear(), now.getMonth(), 1);

    previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    previousEnd = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    if (previousEnd.getMonth() === now.getMonth()) {
      previousEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    }
  }

  currentStart.setHours(0, 0, 0, 0);
  previousStart.setHours(0, 0, 0, 0);
  previousEnd.setHours(23, 59, 59, 999);

  const currentOrdersRaw = await prisma.order.findMany({
    where: { createdAt: { gte: currentStart } },
    select: { createdAt: true, totalPrice: true, status: true, services: true },
  });

  const prevOrdersRaw = await prisma.order.findMany({
    where: { createdAt: { gte: previousStart, lte: previousEnd } },
    select: { createdAt: true, totalPrice: true, status: true },
  });

  const chartData: {
    label: string;
    currentRevenue: number;
    previousRevenue: number;
    totalOrders: number;
    completedOrders: number;
  }[] = [];

  const chartDataIndexMap: Record<string, number> = {};

  if (timeframe === "month") {
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      chartData.push({
        label: String(i),
        currentRevenue: 0,
        previousRevenue: 0,
        totalOrders: 0,
        completedOrders: 0,
      });
      chartDataIndexMap[String(i)] = i - 1;
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-GB", { weekday: "short" });
      chartData.push({
        label,
        currentRevenue: 0,
        previousRevenue: 0,
        totalOrders: 0,
        completedOrders: 0,
      });
      chartDataIndexMap[label] = 6 - i;
    }
  }

  let currRevTotal = 0;
  let currCompletedTotal = 0;
  const servicesMap: Record<string, number> = {};

  currentOrdersRaw.forEach((order) => {
    const key =
      timeframe === "month"
        ? String(order.createdAt.getDate())
        : order.createdAt.toLocaleDateString("en-GB", { weekday: "short" });

    const index = chartDataIndexMap[key];

    if (index !== undefined) {
      const price = order.totalPrice || 0;
      chartData[index].currentRevenue += price;
      chartData[index].totalOrders += 1;

      currRevTotal += price;

      if (order.status === "Completed" || order.status === "Downloaded") {
        chartData[index].completedOrders += 1;
        currCompletedTotal += 1;
      }
    }

    const serviceName = order.services || "Other";
    servicesMap[serviceName] = (servicesMap[serviceName] || 0) + 1;
  });

  let prevRevTotal = 0;

  prevOrdersRaw.forEach((order) => {
    const key =
      timeframe === "month"
        ? String(order.createdAt.getDate())
        : order.createdAt.toLocaleDateString("en-GB", { weekday: "short" });

    const index = chartDataIndexMap[key];

    if (index !== undefined) {
      const price = order.totalPrice || 0;
      chartData[index].previousRevenue += price;
      prevRevTotal += price;
    }
  });

  const currTotalOrders = currentOrdersRaw.length;
  const prevTotalOrders = prevOrdersRaw.length;
  const prevCompletedTotal = prevOrdersRaw.filter(
    (o) => o.status === "Completed" || o.status === "Downloaded",
  ).length;

  const pieColors = [
    "#41B544",
    "#3b82f6",
    "#eab308",
    "#8b5cf6",
    "#f97316",
    "#ef4444",
    "#14b8a6",
  ];
  const servicesDistribution = Object.entries(servicesMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      name,
      value,
      fill: pieColors[index % pieColors.length],
    }));

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    const change = ((current - previous) / previous) * 100;
    return Number(change.toFixed(1));
  };
  return {
    timeframe,
    kpis: {
      current: {
        revenue: currRevTotal,
        totalOrders: currTotalOrders,
        completedOrders: currCompletedTotal,
      },
      previous: {
        revenue: prevRevTotal,
        totalOrders: prevTotalOrders,
        completedOrders: prevCompletedTotal,
      },
      trends: {
        revenuePercent: calculateChange(currRevTotal, prevRevTotal),
        ordersPercent: calculateChange(currTotalOrders, prevTotalOrders),
        completedPercent: calculateChange(
          currCompletedTotal,
          prevCompletedTotal,
        ),
        revenueIsUp: currRevTotal >= prevRevTotal,
        ordersIsUp: currTotalOrders >= prevTotalOrders,
        completedIsUp: currCompletedTotal >= prevCompletedTotal,
      },
    },
    chartData,
    servicesDistribution,
  };
}
