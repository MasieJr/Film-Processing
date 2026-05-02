type StatsCardsProps = {
  stat: string;
  label: string;
  colour: string;
};

export default function StatsCards({ label, stat, colour }: StatsCardsProps) {
  return (
    <div className="bg-[#F3F4F6] dark:bg-[#2c2c2c] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="text-gray-500 font-medium">{label}</h3>
      <p className={`text-3xl font-bold mt-2 text-${colour}`}>{stat}</p>
    </div>
  );
}
