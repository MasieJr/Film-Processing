import { ArrowDown, ArrowUp } from "lucide-react";

type StatsCardsProps = {
  label: string;
  stat: string | number;
  stat2?: string | number;
  stat2Label?: string;
  textColorClass?: string;
  isHigh?: boolean;
  percentage?: number;
};

export default function StatsCard({
  label,
  stat,
  stat2,
  stat2Label = "Previous",
  textColorClass = "text-white",
  isHigh,
  percentage,
}: StatsCardsProps) {
  return (
    <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-800 transition-all hover:border-gray-700">
      <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">
        {label}
      </h3>
      <p className={`text-3xl font-bold mt-2 tracking-tight ${textColorClass}`}>
        {stat}
      </p>
      {stat2 && (
        <p className="text-sm text-gray-400 mt-1">
          {stat2Label}: {stat2}
        </p>
      )}
      {percentage !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          {isHigh ? (
            <span className="flex flex-row text-sm font-semibold text-[#41B544] justify-start items-center">
              <ArrowUp strokeWidth={3} className="w-4 h-4 mr-1" />
              Up by {percentage}%
            </span>
          ) : (
            <span className="flex flex-row text-sm font-semibold text-red-500 justify-start items-center">
              <ArrowDown strokeWidth={3} className="w-4 h-4 mr-1" />
              Down by {percentage}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
