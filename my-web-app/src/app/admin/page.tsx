"use client";

import { useState, useRef, useEffect } from "react";
import { X, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import OrderPdfTemplate from "@/components/OrderPdfTemplate";
import DropDownList from "@/components/DropDownList";
import ViewModal from "@/components/ViewModal";

const initialOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    email: "john@example.com",
    services: "Print and email",
    quantity: 2,
    totalPrice: 658,
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-002",
    customerName: "Sarah Smith",
    email: "sarah.s@example.com",
    services: "Develop only",
    quantity: 1,
    totalPrice: 95,
    status: "Processing",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    email: "mikej@example.com",
    services: "Email in High Resolution",
    quantity: 5,
    totalPrice: 1300,
    status: "Completed",
    date: "Oct 23, 2023",
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // The empty array means this only runs once when the page opens

  if (isLoading)
    return <div className="p-8 text-xl">Loading lab orders...</div>;

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

  const [dropDowns, setDropDowns] = useState({
    newOrder: true,
    pendingOrder: false,
    completedOrder: false,
  });
  const pdfRef = useRef<HTMLDivElement>(null);

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

  const handleAdminFileUpload = async () => {
    if (!selectedFile || !selectedOrder) return;
    
    setIsUploading(true);

    try {
      // Step A: Get the Golden Ticket from your Next.js server
      const urlRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          filename: selectedFile.name,
          contentType: selectedFile.type || "application/zip",
        }),
      });
      const { uploadUrl, finalFileKey } = await urlRes.json();

      // Step B: Send the heavy file directly to Cloudflare R2
      await fetch(uploadUrl, {
        method: "PUT",
        body: selectedFile,
        headers: { "Content-Type": selectedFile.type || "application/zip" },
      });

      // Step C: Tell Supabase to attach this file to the specific order
      const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ fileUrl: finalFileKey }),
      });

      if (updateRes.ok) {
        alert("Scans uploaded and attached to order!");
        setSelectedFile(null); // Clear the file input
        
        // Optional: If you want the UI to update instantly without refreshing, 
        // you can update your local 'orders' state here!
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
    } finally {
      setIsUploading(false);
    }
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
        orders={orders.filter((order) => order.status === "New")}
        type="newOrder"
        name="New Orders"
        btnClick={setSelectedOrder}

      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.pendingOrder}
        orders={orders.filter((order) => order.status === "Pending")}
        type="pendingOrder"
        name="Pending orders"
        btnClick={setSelectedOrder}
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.completedOrder}
        orders={orders.filter((order) => order.status === "Completed")}
        type="completedOrder"
        name="Completed Orders"
        btnClick={setSelectedOrder}
      />
      
      
      {/* --- THE MODAL --- */}
      {selectedOrder && (
        <ViewModal
        order={selectedOrder}
        handleprint={handlePrint}
        setSelectedOrder={setSelectedOrder}
        handleUpload={handleAdminFileUpload}
        isUploading={isUploading}
        setSelectedFile={setSelectedFile}
      />  

      )}

      <div className="hidden">
        <OrderPdfTemplate ref={pdfRef} order={selectedOrder} />
      </div>
    </div>
  );
}
