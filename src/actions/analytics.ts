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

  // 1. Calculate Date Boundaries
  let currentStart = new Date();
  let previousStart = new Date();
  let previousEnd = new Date();

  if (timeframe === "week") {
    currentStart.setDate(now.getDate() - 7);
    previousStart.setDate(now.getDate() - 14);
    previousEnd = new Date(currentStart);
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

  // 2. Fetch all orders (Notice we added 'lte: previousEnd' so it doesn't fetch into the future)
  const currentOrdersRaw = await prisma.order.findMany({
    where: { createdAt: { gte: currentStart } },
    select: { createdAt: true, totalPrice: true, status: true },
  });

  const prevOrdersRaw = await prisma.order.findMany({
    where: { createdAt: { gte: previousStart, lte: previousEnd } },
    select: { createdAt: true, totalPrice: true, status: true },
  });

  // 3. Build the Unified Chart Data Array
  const chartDataMap: Record<
    string | number,
    {
      label: string;
      currentRevenue: number;
      previousRevenue: number;
      emailHigh: number;
      emailLow: number;
      printOnly: number;
      emailPrint: number;
      DevOnly: number;
    }
  > = {};

  if (timeframe === "month") {
    // Fill days 1 to 31 (or current day)
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      chartDataMap[i] = {
        label: String(i),
        currentRevenue: 0,
        previousRevenue: 0,
      };
    }
  } else {
    // Fill 7 days for the week
    for (let i = 0; i <= 7; i++) {
      const d = new Date(currentStart);
      d.setDate(d.getDate() + i);
      const label = d.toLocaleDateString("en-GB", { weekday: "short" });
      chartDataMap[i] = { label, currentRevenue: 0, previousRevenue: 0 };
    }
  }

  // Helper function to safely calculate day differences
  const getDayOffset = (orderDate: Date, startDate: Date) => {
    const d1 = new Date(orderDate);
    const d2 = new Date(startDate);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    return Math.round((d1.getTime() - d2.getTime()) / 86400000);
  };

  // 4. Populate Current Period
  let currRevTotal = 0;
  let prevRevTotal = 0;
  let currCompletedTotal = 0;

  currentOrdersRaw.forEach((order) => {
    const key =
      timeframe === "month"
        ? order.createdAt.getDate()
        : getDayOffset(order.createdAt, currentStart);

    if (chartDataMap[key]) {
      const price = order.totalPrice || 0;
      chartDataMap[key].currentRevenue += price;
      currRevTotal += price;

      if (order.status === "Completed" || order.status === "Downloaded") {
        currCompletedTotal += 1;
      }
      if (order.status === "Completed" || order.status === "Downloaded") {
        currCompletedTotal += 1;
      }
    }
  });

  // 5. Populate Previous Period
  prevOrdersRaw.forEach((order) => {
    const key =
      timeframe === "month"
        ? order.createdAt.getDate()
        : getDayOffset(order.createdAt, previousStart);

    if (chartDataMap[key]) {
      const price = order.totalPrice || 0;
      chartDataMap[key].previousRevenue += order.totalPrice || 0;
      prevRevTotal += price;
    }
  });

  const chartData = Object.values(chartDataMap);
  const currTotalOrders = currentOrdersRaw.length;
  const prevTotalOrders = prevOrdersRaw.length;
  // const prevRevTotal = prevOrdersRaw.reduce(
  //   (sum, order) => sum + (order.totalPrice || 0),
  //   0,
  // );
  const prevCompletedTotal = prevOrdersRaw.filter(
    (o) => o.status === "Completed" || o.status === "Downloaded",
  ).length;

  // 6. Calculate Percentage Changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    const change = ((current - previous) / previous) * 100;
    return Number(change.toFixed(1));
  };

  return {
    timeframe,
    kpis: {
      current: {
        currRevenue: currRevTotal,
        prevRevenue: prevRevTotal,
        totalOrders: currTotalOrders,
        completedOrders: currCompletedTotal,
      },
      trends: {
        revenuePercent: calculateChange(currRevTotal, prevRevTotal),
        ordersPercent: calculateChange(currTotalOrders, prevTotalOrders),
        completedPercent: calculateChange(
          currCompletedTotal,
          prevCompletedTotal,
        ),
        revenueIsUp: currRevTotal >= prevRevTotal,
      },
    },
    chartData,
  };
}
