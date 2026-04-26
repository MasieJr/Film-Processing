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
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
          <div className="w-20 h-20 border-4 border-red-300 dark:border-gray-700 border-t-[#41B544] rounded-full animate-spin"></div>
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

  const handlePrint = () => {
    handlePrint1();
    changeStatus();
    setSelectedOrder(null);
  };

  const changeStatus = async () => {
    try {
      const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Pending" }),
      });

      if (updateRes.ok) {
        fetchOrders(); // Silently move it to the Pending dropdown!
      }
    } catch (error) {
      console.error(error);
    }
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
        {/* <button className="bg-[#41B544] text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-[#359638] transition-colors">
          Export Data
        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-gray-500 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
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
          uploadProgress={uploadProgress}
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <SuccessModal
          fetchOrders={fetchOrders}
          setSelectedOrder={setSelectedOrder}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      <div className="hidden">
        <OrderPdfTemplate ref={pdfRef} order={selectedOrder} />
      </div>
    </div>
  );
}
