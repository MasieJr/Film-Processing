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
    // Current Week: Go back 7 days
    currentStart.setDate(now.getDate() - 7);

    // Previous Week: Go back 14 days, ending 7 days ago
    previousStart.setDate(now.getDate() - 14);
    previousEnd = new Date(currentStart);
  } else {
    // Current Month: 1st of the current month
    currentStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Previous Month Start: 1st of the previous month
    previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // PREVIOUS MONTH END: The crucial fix!
    // Set the end date to exactly one month ago from today's specific date and time.
    // E.g., if today is June 17, previousEnd becomes May 17.
    previousEnd = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );

    // Edge case safety: If today is March 31, "Feb 31" doesn't exist.
    // JS will auto-wrap it into March, which breaks the math.
    // We force it to stick to the last day of the previous month if necessary.
    if (previousEnd.getMonth() === now.getMonth()) {
      previousEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    }
  }

  // Set exact times for accurate query slicing
  currentStart.setHours(0, 0, 0, 0);
  previousStart.setHours(0, 0, 0, 0);
  previousEnd.setHours(23, 59, 59, 999);

  // 2. Fetch all orders for the current period to build the charts
  // (We fetch the raw orders here because SQLite/Postgres handle grouping by day differently,
  // and doing it in memory for 30 days of data is incredibly fast and reliable).
  const currentOrdersRaw = await prisma.order.findMany({
    where: { createdAt: { gte: currentStart } },
    select: { createdAt: true, totalPrice: true, status: true },
  });

  // 3. Build the Daily Chart Data Array
  const dailyStatsMap: Record<
    string,
    {
      date: string;
      revenue: number;
      totalOrders: number;
      completedOrders: number;
    }
  > = {};

  // Pre-fill the array with empty days so the chart lines don't break
  let loopDate = new Date(currentStart);
  while (loopDate <= now) {
    // Format as "12 Jun"
    const dateStr = loopDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    dailyStatsMap[dateStr] = {
      date: dateStr,
      revenue: 0,
      totalOrders: 0,
      completedOrders: 0,
    };
    loopDate.setDate(loopDate.getDate() + 1);
  }

  // 4. Populate the daily buckets
  let currRevTotal = 0;
  let currCompletedTotal = 0;

  currentOrdersRaw.forEach((order) => {
    const orderDateStr = order.createdAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    // Safety check just in case timezone math pushes an order slightly out of bounds
    if (dailyStatsMap[orderDateStr]) {
      dailyStatsMap[orderDateStr].totalOrders += 1;

      const price = order.totalPrice || 0;
      dailyStatsMap[orderDateStr].revenue += price;
      currRevTotal += price;

      if (order.status === "Completed" || order.status === "Downloaded") {
        dailyStatsMap[orderDateStr].completedOrders += 1;
        currCompletedTotal += 1;
      }
    }
  });

  const chartData = Object.values(dailyStatsMap);
  const currTotalOrders = currentOrdersRaw.length;

  // 5. Fetch Previous Period Aggregations for the KPI % changes
  const [prevRevenue, prevOrders, prevCompleted] = await Promise.all([
    prisma.order.aggregate({
      _sum: { totalPrice: true },
      where: { createdAt: { gte: previousStart, lte: previousEnd } },
    }),
    prisma.order.count({
      where: { createdAt: { gte: previousStart, lte: previousEnd } },
    }),
    prisma.order.count({
      where: {
        createdAt: { gte: previousStart, lte: previousEnd },
        status: { in: ["Completed", "Downloaded"] },
      },
    }),
  ]);

  const prevRevTotal = prevRevenue._sum.totalPrice || 0;

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
        revenue: currRevTotal,
        totalOrders: currTotalOrders,
        completedOrders: currCompletedTotal,
      },
      trends: {
        revenuePercent: calculateChange(currRevTotal, prevRevTotal),
        ordersPercent: calculateChange(currTotalOrders, prevOrders),
        completedPercent: calculateChange(currCompletedTotal, prevCompleted),
        revenueIsUp: currRevTotal >= prevRevTotal,
        ordersIsUp: currTotalOrders >= prevOrders,
        completedIsUp: currCompletedTotal >= prevCompleted,
      },
    },
    chartData, // <--- This feeds directly into the shadcn component!
  };
}
