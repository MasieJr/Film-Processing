import { ChevronDown, ChevronUp, Inbox } from "lucide-react";

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
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      case "Completed":
        return "bg-[#41B544]/10 text-[#41B544] border-[#41B544]/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10";
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all">
      <button
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors focus:outline-none"
        onClick={() => onClick(type)}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {name}
          </h2>

          <span className="flex items-center justify-center bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-bold">
            {orders.length}
          </span>
        </div>

        <div className="text-gray-400 dark:text-gray-500">
          {open ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 flex flex-col items-center justify-center text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1e1e1e]/50">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Inbox size={32} />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                No Orders Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                There are currently no orders sitting in this status.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border-t border-gray-100 dark:border-gray-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-gray-800">
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Customer
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Date Logged
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Services
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#252525]/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {order.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {order.services}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Quantity:{" "}
                          <span className="font-bold">{order.quantity}</span>
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 group-hover:bg-[#41B544] group-hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm"
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
          )}
        </div>
      </div>
    </div>
  );
}
