"use client";

import { useState, useRef } from "react";
import { X, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import OrderPdfTemplate from "@/components/OrderPdfTemplate";
import DropDownList from "@/components/DropDownList";

const initialOrders = [
  {
    id: "ORD-001",
    name: "John Doe",
    email: "john@example.com",
    service: "Print and email",
    quantity: 2,
    price: 658,
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-002",
    name: "Sarah Smith",
    email: "sarah.s@example.com",
    service: "Develop only",
    quantity: 1,
    price: 95,
    status: "Processing",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-003",
    name: "Mike Johnson",
    email: "mikej@example.com",
    service: "Email in High Resolution",
    quantity: 5,
    price: 1300,
    status: "Completed",
    date: "Oct 23, 2023",
  },
];

export default function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const [dropDowns, setDropDowns] = useState({
    newOrder: true,
    pendingOrder: false,
    completedOrder: false,
  });
  const pdfRef = useRef<HTMLDivElement>(null);

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const openDropdown = (status: string) => {
    setDropDowns((prev) => {
      const current = prev[status as keyof typeof dropDowns];
      return {
        ...prev,
        [status]: !current,
      };
    });
  };

  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `WorkOrder_${selectedOrder?.id}`,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage incoming film processing orders.
          </p>
        </div>
        <button className="bg-[#41B544] text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-[#359638] transition-colors">
          Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">124</p>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Pending Processing</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">12</p>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Revenue (Today)</h3>
          <p className="text-3xl font-bold mt-2 text-[#41B544]">R 2,053</p>
        </div>
      </div>

      {/* Orders Table */}
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.newOrder}
        orders={orders}
        type="newOrder"
        name="New Orders"
        btnClick={setSelectedOrder}
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.pendingOrder}
        orders={orders}
        type="pendingOrder"
        name="Pending orders"
        btnClick={setSelectedOrder}
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.completedOrder}
        orders={orders}
        type="completedOrder"
        name="Completed Orders"
        btnClick={setSelectedOrder}
      />

      {/* --- THE MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Content Box */}
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold">Order Details</h2>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Customer Information
                </h3>
                <div className="bg-gray-50 dark:bg-[#252525] p-4 rounded-xl space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedOrder.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.email}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedOrder.date}
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Order Request
                </h3>
                <div className="bg-gray-50 dark:bg-[#252525] p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">
                      {selectedOrder.service}
                    </p>
                    <p className="text-gray-500">
                      Quantity: {selectedOrder.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#41B544]">
                      R{selectedOrder.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (Actions) */}
            <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(selectedOrder.status)}`}
              >
                {selectedOrder.status}
              </span>

              <div className="space-x-3">
                <button
                  onClick={() => alert("Connecting to email system...")}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Contact Customer
                </button>
                <button
                  onClick={() => handlePrint()}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Save PDF</span>
                </button>
                <button
                  onClick={() => alert("Marking as complete...")}
                  className="px-4 py-2 text-sm font-medium bg-[#41B544] text-white rounded-lg hover:bg-[#359638]"
                >
                  Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hidden">
        <OrderPdfTemplate ref={pdfRef} order={selectedOrder} />
      </div>
    </div>
  );
}
