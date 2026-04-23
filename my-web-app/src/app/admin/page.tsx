"use client";

import { useState } from "react";

import { X } from "lucide-react";
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
  const [dropDowns, setDropDowns] = useState({
    newOrder: true,
    pendingOrder: false,
    completedOrder: false,
  });

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

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

  const openDropdown = (status: string) => {
    setDropDowns((prev) => {
      const current = prev[status as keyof typeof dropDowns];
      return {
        ...prev,
        [status]: !current,
      };
    });
  };

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
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.pendingOrder}
        orders={orders}
        type="pendingOrder"
        name="Pending orders"
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.completedOrder}
        orders={orders}
        type="completedOrder"
        name="Completed Orders"
      />
    </div>
  );
}
