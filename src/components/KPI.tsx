import { OrdersBar } from "./charts/OrdersBar";
import StatsCard from "./StatsCards";

type KPIProps = {
  kpis: any;
  prevLabel: string;
};

export default function KPI({ kpis, prevLabel }: KPIProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <StatsCard
          label="Total Revenue"
          stat={`R ${(kpis.current.revenue || 0).toLocaleString()}`}
          stat2={`R ${(kpis.previous.revenue || 0).toLocaleString()}`}
          stat2Label={prevLabel}
          textColorClass="text-[#41B544]"
          isHigh={kpis.trends.revenueIsUp}
          percentage={kpis.trends.revenuePercent}
        />
      </div>
      <div>
        <StatsCard
          label="Total Orders"
          stat={(kpis.current.totalOrders || 0).toLocaleString()}
          stat2={(kpis.previous.totalOrders || 0).toLocaleString()}
          stat2Label={prevLabel}
          textColorClass="text-blue-500"
          isHigh={kpis.trends.ordersIsUp}
          percentage={kpis.trends.ordersPercent}
        />
      </div>
      {/* <StatsCard
        label="Completed Orders"
        stat={(kpis.current.completedOrders || 0).toLocaleString()}
        stat2={(kpis.previous.completedOrders || 0).toLocaleString()}
        stat2Label={prevLabel}
        textColorClass="text-white"
        isHigh={kpis.trends.completedIsUp}
        percentage={kpis.trends.completedPercent}
      /> */}
    </div>
  );
}
