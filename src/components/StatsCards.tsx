import { TrendingDown, TrendingUp } from "lucide-react";

type StatsCardsProps = {
  label: string;
  stat: string | number;
  stat2?: string | number;
  stat2Label?: string;
  colour?: string;
  isHigh?: boolean;
  percentage?: number;
};

export default function StatsCards({
  label,
  stat,
  stat2,
  stat2Label = "Previous",
  colour,
  isHigh,
  percentage,
}: StatsCardsProps) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:border-gray-300 dark:hover:border-gray-700">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">
        {label}
      </h3>

      <p className={`text-3xl font-bold mt-2 tracking-tight text-${colour}`}>
        {stat}
      </p>

      {stat2 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {stat2Label}: {stat2}
        </p>
      )}

      {percentage !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {isHigh ? (
            <span className="flex flex-row text-sm font-semibold text-[#41B544] justify-start items-center">
              <TrendingUp strokeWidth={3} className="w-4 h-4 mr-1" />
              Up by {percentage}%
            </span>
          ) : (
            <span className="flex flex-row text-sm font-semibold text-red-500 justify-start items-center">
              <TrendingDown strokeWidth={3} className="w-4 h-4 mr-1" />
              Down by {percentage}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
