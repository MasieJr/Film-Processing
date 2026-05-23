import { useMemo } from "react";
import {
  ShoppingCart,
  Clock,
  DollarSign,
  Hourglass,
  CheckCircle,
} from "lucide-react";
import { ChartLineLinear } from "./ChartLineLinear";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

// 1. Define the props so this component can receive your database orders
type AnalyticsProps = {
  orders: any[];
};

export default function Analytics({ orders }: AnalyticsProps) {
  // 2. Calculate the KPIs and Chart Data dynamically
  const { kpis, chartData } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      ordersToday: 0,
      revenueThisMonth: 0,
      waitingOver48h: 0,
      completedToday: 0,
    };

    // Chart Data Setup
    const dailyStats: Record<
      string,
      { date: string; orders: number; revenue: number }
    > = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      dailyStats[dateStr] = { date: dateStr, orders: 0, revenue: 0 };
    }

    const statusStats: Record<string, number> = {
      New: 0,
      Pending: 0,
      Completed: 0,
      Downloaded: 0,
      Blank: 0,
    };

    orders.forEach((order) => {
      if (!order.createdAt) return;
      const orderDate = new Date(order.createdAt);

      // --- KPI Calculations ---
      if (orderDate >= today) {
        stats.ordersToday += 1;
        if (order.status === "Completed" || order.status === "Downloaded") {
          stats.completedToday += 1;
        }
      }

      if (
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      ) {
        stats.revenueThisMonth += order.totalPrice || 0;
      }

      const isPending = order.status === "New" || order.status === "Pending";
      const hoursSinceCreated =
        (new Date().getTime() - orderDate.getTime()) / (1000 * 60 * 60);
      if (isPending && hoursSinceCreated > 48) {
        stats.waitingOver48h += 1;
      }

      // --- Chart Data Calculations ---
      const dateStr = orderDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].orders += 1;
        dailyStats[dateStr].revenue += order.totalPrice || 0;
      }

      const status = order.status || "Unknown";
      if (statusStats[status] !== undefined) {
        statusStats[status] += 1;
      }
    });

    const COLORS: Record<string, string> = {
      New: "#3b82f6",
      Pending: "#eab308",
      Completed: "#41B544",
      Downloaded: "#00E7FF",
      Blank: "#ff0000",
    };

    const statusDataArray = Object.keys(statusStats)
      .map((key) => ({
        name: key,
        value: statusStats[key],
        color: COLORS[key],
      }))
      .filter((item) => item.value > 0);

    return {
      kpis: stats,
      chartData: { daily: Object.values(dailyStats), status: statusDataArray },
    };
  }, [orders]);

  return (
    <div>
      {/* --- KPI STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {/* Orders Today */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Orders Today
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpis.ordersToday}
            </h3>
          </div>
        </div>

        {/* Turnaround Time (Placeholder for now) */}
        {/* <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Turnaround Time
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              2.4{" "}
              <span className="text-lg font-normal text-gray-400">days</span>
            </h3>
          </div>
        </div> */}

        {/* Revenue This Month */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Revenue This Month
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              R {kpis.revenueThisMonth.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Waiting > 48h */}
        {/* <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500 flex items-center justify-center">
              <Hourglass className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Waiting &gt; 48h
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpis.waitingOver48h}
            </h3>
            {kpis.waitingOver48h > 0 && (
              <p className="text-xs text-orange-500 mt-1 flex items-center font-medium">
                Needs attention
              </p>
            )}
          </div>
        </div> */}

        {/* Completed Today */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Completed Today
            </p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {kpis.completedToday}
            </h3>
          </div>
        </div>
      </div>

      {/* --- CHARTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Orders per Day */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 min-h-[300px] flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Orders per Day{" "}
              <span className="text-gray-500 font-normal">(Last 14 Days)</span>
            </h3>
          </div>
          <div className="flex-grow w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData.daily}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#888"
                  vertical={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="date"
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={15}
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    borderColor: "#333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#41B544" }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Total Orders"
                  stroke="#41B544"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 min-h-[300px] flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
          </div>
          <div className="flex-grow w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData.daily}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onContextMenu={(_, e) => e.preventDefault()}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#41B544" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#41B544" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                  opacity={0.5}
                />

                <XAxis
                  dataKey="date"
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={15}
                />

                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R${value}`}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    borderColor: "#333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#41B544" }}
                  formatter={(value) => [`R ${value}`, "Revenue"]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#41B544"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl p-5 min-h-[300px] flex flex-col shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            Orders by Status
          </h3>
          <div className="flex-grow w-full h-[250px] flex items-center justify-center relative">
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {orders.length}
              </span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1e1e",
                    borderColor: "#333",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Pie
                  data={chartData.status}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.status.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
