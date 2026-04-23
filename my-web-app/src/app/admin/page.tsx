"use client";

import { useState } from "react";

import {ArrowDownToLine} from 'lucide-react'

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
  const [orders, setOrders] = useState(initialOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage incoming film processing orders.</p>
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
      <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-gray-800">
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Order ID</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Customer</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Service</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Total</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Download PDF</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Upload Files</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  <td className="p-4 font-medium text-sm">{order.id}</td>
                  <td className="p-4">
                    <p className="font-medium text-sm">{order.name}</p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{order.service}</p>
                    <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                  </td>
                  <td className="p-4 font-medium text-sm">R{order.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td><ArrowDownToLine /></td>
                  <td className="p-4">
                    <button className="text-[#41B544] font-medium text-sm hover:underline">
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
  );
}