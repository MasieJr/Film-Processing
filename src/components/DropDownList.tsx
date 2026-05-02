import { ChevronDown, ChevronUp } from "lucide-react";

type DropDownListProp = {
  name: string;
  onClick: (status: string) => void;
  btnClick: (order: any) => void;
  open: boolean;
  orders: {
    id: string;
    customerName: string;
    email: string;
    services: string;
    quantity: number;
    totalPrice: number;
    status: string;
    createdAt: string;
  }[];
  type: string;
  formatDate: (rawDate: Date | string) => string;
};

export default function DropDownList({
  name,
  onClick,
  btnClick,
  open,
  orders,
  type,
  formatDate,
}: DropDownListProp) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <div>
      <button
        className="sticky top-15 bg-white dark:bg-[#1e1e1e] w-full flex flex-row justify-between p-3 hover:border border-[#41B544] cursor-pointer mb-2 z-5"
        onClick={() => onClick(type)}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        {open ? (
          <ChevronUp strokeWidth={3} className="w-10 h-10 rounded-full p-1" />
        ) : (
          <ChevronDown strokeWidth={3} className="w-10 h-10 rounded-full p-1" />
        )}
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-gray-800">
                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Date
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Service
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                    >
                      <td className="p-4">
                        <p className="font-medium text-xl">
                          {order.customerName}
                        </p>
                        <p className="text-lg text-gray-500">{order.email}</p>
                      </td>
                      <td className="p-4">{formatDate(order.createdAt)}</td>
                      <td className="p-4">
                        <p className="text-xl">{order.services}</p>
                        <p className="text-lg text-gray-500">
                          Qty: {order.quantity}
                        </p>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-lg font-medium border ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          className=" bg-[#41B544] text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-[#359638] transition-colors"
                          onClick={() => btnClick(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
