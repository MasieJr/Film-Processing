"use client";

import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import OrderPdfTemplate from "@/components/OrderPdfTemplate";
import DropDownList from "@/components/DropDownList";
import ViewModal from "@/components/ViewModal";
import SuccessModal from "@/components/SuccessModal";

const initialOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    email: "john@example.com",
    services: "Print and email",
    quantity: 2,
    totalPrice: 658,
    status: "Pending",
    createdAt: "2026-04-24 14:30:00.000",
  },
  {
    id: "ORD-002",
    customerName: "Sarah Smith",
    email: "sarah.s@example.com",
    services: "Develop only",
    quantity: 1,
    totalPrice: 95,
    status: "Processing",
    createdAt: "2026-04-24 16:45:00.000",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    email: "mikej@example.com",
    services: "Email in High Resolution",
    quantity: 5,
    totalPrice: 1300,
    status: "Completed",
    createdAt: "2026-04-23 09:15:00.000",
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeMonth, setActiveMonth] = useState("All");
  const [dropDowns, setDropDowns] = useState({
    newOrder: true,
    pendingOrder: false,
    completedOrder: false,
  });

  const pdfRef = useRef<HTMLDivElement>(null);

  const handlePrint1 = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `WorkOrder_${selectedOrder?.id}`,
  });

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
  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 border-4 border-gray-300 dark:border-gray-700 border-t-[#41B544] dark:border-t-[#41B544] rounded-full animate-spin"></div>
          <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
            Loading Film orders...
          </p>
        </div>
      </div>
    );
  }

  const openDropdown = (status: string) => {
    setDropDowns((prev) => {
      const current = prev[status as keyof typeof dropDowns];
      return {
        ...prev,
        [status]: !current,
      };
    });
  };

  const changeStatus = async () => {
    try {
      const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Pending" }),
      });

      if (updateRes.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    handlePrint1();
    changeStatus();
    setSelectedOrder(null);
  };

  const handleAdminFileUpload = async () => {
    if (!selectedFile || !selectedOrder) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const urlRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          filename: selectedFile.name,
          contentType: selectedFile.type || "application/zip",
        }),
      });
      const { uploadUrl, finalFileKey } = await urlRes.json();

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader(
          "Content-Type",
          selectedFile.type || "application/zip",
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100,
            );
            setUploadProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
          else reject(new Error(`Upload failed: ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Network Error"));

        xhr.send(selectedFile);
      });

      const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ fileUrl: finalFileKey, status: "Completed" }),
      });

      if (updateRes.ok) {
        setShowSuccessModal(true);
        setSelectedFile(null);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

const uniqueMonths = new Set<string>();
  orders.forEach((order) => {
    const rawDate = order.createdAt;
    if (rawDate) {
      const safeDateString = String(rawDate).replace(" ", "T");
      const dateObj = new Date(safeDateString);
      if (!isNaN(dateObj.getTime())) {
        uniqueMonths.add(dateObj.toLocaleString("en-US", { month: "short" }));
      }
    }
  });
  
  
  const dynamicTabs = ["All", ...Array.from(uniqueMonths)];

  const displayedOrders =
    activeMonth === "All"
      ? orders
      : orders.filter((order) => {
          const safeDateString = order.createdAt ? order.createdAt.replace(" ", "T") : "";
          if (!safeDateString) return false;

          const dateObj = new Date(safeDateString);
          return (
            dateObj.toLocaleString("en-US", { month: "short" }) === activeMonth
          );
        });

  const pendingCount = displayedOrders.filter(
    (o) => o.status === "Pending",
  ).length;
  const totalRevenue = displayedOrders.reduce(
    (sum, order) => sum + (Number(order.totalPrice) || 0),
    0,
  );

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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{displayedOrders.length}</p>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Pending Processing</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-[#41B544]">
            R {totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* --- MONTH TABS --- */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
          {dynamicTabs.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`pb-4 text-lg font-medium transition-colors whitespace-nowrap relative ${
                activeMonth === month
                  ? "text-[#41B544]"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {month === "All" ? "All Time" : `${month} 2026`}

              {/* The active green underline indicator */}
              {activeMonth === month && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#41B544] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- ORDERS TABLES--- */}
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.newOrder}
        orders={displayedOrders.filter((order) => order.status === "New")}
        type="newOrder"
        name="New Orders"
        btnClick={setSelectedOrder}
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.pendingOrder}
        orders={displayedOrders.filter((order) => order.status === "Pending")}
        type="pendingOrder"
        name="Pending orders"
        btnClick={setSelectedOrder}
      />
      <DropDownList
        onClick={openDropdown}
        open={dropDowns.completedOrder}
        orders={displayedOrders.filter((order) => order.status === "Completed")}
        type="completedOrder"
        name="Completed Orders"
        btnClick={setSelectedOrder}
      />

      {/* --- VIEW / UPLOAD MODAL --- */}
      {selectedOrder && (
        <ViewModal
          order={selectedOrder}
          handleprint={handlePrint}
          setSelectedOrder={setSelectedOrder}
          handleUpload={handleAdminFileUpload}
          isUploading={isUploading}
          setSelectedFile={setSelectedFile}
          uploadProgress={uploadProgress}
        />
      )}

      {/* --- SUCCESS MODAL --- */}
      {showSuccessModal && (
        <SuccessModal
          fetchOrders={fetchOrders}
          setSelectedOrder={setSelectedOrder}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {/* --- HIDDEN PDF TEMPLATE --- */}
      <div className="hidden">
        <OrderPdfTemplate ref={pdfRef} order={selectedOrder} />
      </div>
    </div>
  );
}
