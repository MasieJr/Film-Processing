type ServiceItemProps = {
  service: string;
  price: string;
};

export default function ServiceItem({ service, price }: ServiceItemProps) {
  return (
    <div className="flex flex-row justify-between items-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#1a1a1a]">
      <span className="text-lg font-medium text-black dark:text-white max-w-[70%]">
        {service}
      </span>
      <span className="text-xl font-bold text-[#143A7C] dark:text-[#41B544]">
        {price}
      </span>
    </div>
  );
}
