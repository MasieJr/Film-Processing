"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import OrderPdfTemplate from "@/components/OrderPdfTemplate";
import DropDownList from "@/components/DropDownList";
import ViewModal from "@/components/ViewModal";
import SuccessModal from "@/components/SuccessModal";
import { Calendar, Plus, Search, X } from "lucide-react";
import AddOrder from "@/components/AddOrder";
import StatsCards from "@/components/StatsCards";
import AutoRefresh from "@/components/AutoRefresh";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const initialOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    services: "Print and email",
    quantity: 2,
    totalPrice: 658,
    status: "Pending",
    createdAt: "2026-04-24 14:30:00.000",
    salesPerson: "Masie Seremu",
  },
  {
    id: "ORD-002",
    customerName: "Sarah Smith",
    email: "sarah.s@example.com",
    phone: "1234567890",
    services: "Develop only",
    quantity: 1,
    totalPrice: 95,
    status: "Processing",
    createdAt: "2026-04-24 16:45:00.000",
    salesPerson: "Masie Seremu",
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    email: "mikej@example.com",
    phone: "1234567890",
    services: "Email in High Resolution",
    quantity: 5,
    totalPrice: 1300,
    status: "Completed",
    createdAt: "2026-04-23 09:15:00.000",
    salesPerson: "Masie Seremu",
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(initialOrders);

  // Modals & Selection State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isaddOrderSendOpen, setIsAddOrderSendOpen] = useState(false);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isaddOrderSending, setIsaddOrderSending] = useState(false);

  // Form State
  const [searchQuery, setSearchQuery] = useState("");
  const [addOrderName, setAddOrderName] = useState("");
  const [addOrderEmail, setAddOrderEmail] = useState("");
  const [addOrderFile, setAddOrderFile] = useState<File | null>(null);

  // UI State
  // const [activeTab, setActiveTab] = useState("All");
  const [dropDowns, setDropDowns] = useState({
    newOrder: true,
    pendingOrder: false,
    completedOrder: false,
    downloadedOrder: false,
    blankOrder: false,
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const displayedOrders = useMemo(() => {
    return orders.filter((order) => {
      if (searchQuery.trim() !== "") {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch =
          order.customerName?.toLowerCase().includes(lowerQuery) ||
          order.email?.toLowerCase().includes(lowerQuery) ||
          order.phone?.toLowerCase().includes(lowerQuery);
        if (!matchesSearch) return false;
      }

      if (!selectedDate) return true;

      const rawDate = order.createdAt;
      if (!rawDate) return false;

      const safeDateString = String(rawDate).replace(" ", "T");
      const dateObj = new Date(safeDateString);
      if (isNaN(dateObj.getTime())) return false;

      return (
        dateObj.getDate() === selectedDate.getDate() &&
        dateObj.getMonth() === selectedDate.getMonth() &&
        dateObj.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [orders, selectedDate, searchQuery]);

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
          <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-800 border-t-[#41B544] dark:border-t-[#41B544] rounded-full animate-spin"></div>
          <p className="text-xl font-bold text-gray-600 dark:text-gray-400 animate-pulse">
            Loading Lab Data...
          </p>
        </div>
      </div>
    );
  }

  const openDropdown = (status: string) => {
    setDropDowns((prev) => ({
      ...prev,
      [status]: !prev[status as keyof typeof dropDowns],
    }));
  };

  const changeStatus = async () => {
    try {
      const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "Pending" }),
      });
      if (updateRes.ok) fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    console.log(selectedOrder);
    handlePrint1();
    changeStatus();
    setSelectedOrder(null);
  };

  const closeAddOrder = () => {
    setIsAddOrderSendOpen(false);
    setAddOrderFile(null);
  };

  const closeView = () => {
    setSelectedFile(null);
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
          customerName: selectedOrder.customerName,
          createdAt: selectedOrder.createdAt,
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
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
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

  const handleAddOrderSendSubmit = async () => {
    if (!addOrderEmail || !addOrderFile) return;
    setIsaddOrderSending(true);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const urlRes = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          filename: addOrderFile.name,
          contentType: addOrderFile.type || "application/zip",
        }),
      });
      const { uploadUrl, finalFileKey } = await urlRes.json();

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader(
          "Content-Type",
          addOrderFile.type || "application/zip",
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
          else reject(new Error(`Upload failed: ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Network Error"));
        xhr.send(addOrderFile);
      });

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: addOrderName || "Walk-in Customer",
          email: addOrderEmail,
          phone: "0123456789",
          services: "addOrder Delivery",
          quantity: 1,
          salesPerson: "Shop Upload",
          totalPrice: 0.0,
          status: "Completed",
          fileUrl: finalFileKey,
        }),
      });

      if (!res.ok) throw new Error("Failed to create addOrder order");

      setAddOrderEmail("");
      setAddOrderName("");
      setAddOrderFile(null);
      setIsAddOrderSendOpen(false);
      setUploadProgress(0);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the file upload.");
    } finally {
      setIsaddOrderSending(false);
    }
  };

  const handleBlankOrPrint = async (
    type: string,
    status: string,
    blankCount?: number,
  ) => {
    const updateRes = await fetch(`/api/orders/${selectedOrder.id}`, {
      method: "POST",
      body: JSON.stringify({
        type: type,
        status: status,
        blankCount: blankCount,
      }),
    });

    if (updateRes.ok) {
      setShowSuccessModal(true);
      setSelectedFile(null);
      setUploadProgress(0);
    }
  };

  const formatDate = (rawDate: Date | string) => {
    if (!rawDate) return "Unknown Date";
    const safeDateString =
      typeof rawDate === "string" ? rawDate.replace(" ", "T") : rawDate;
    const dateObj = new Date(safeDateString);
    if (isNaN(dateObj.getTime())) return "Invalid Date";

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = dateObj.toLocaleString("en-GB", { month: "short" });
    const year = dateObj.getFullYear();

    return `${hours}:${minutes} ${day} ${month} ${year}`;
  };

  const uniqueMonths = new Set<string>();
  orders.forEach((order) => {
    const rawDate = order.createdAt;
    if (rawDate) {
      const safeDateString = String(rawDate).replace(" ", "T");
      const dateObj = new Date(safeDateString);
      if (!isNaN(dateObj.getTime())) {
        uniqueMonths.add(dateObj.toLocaleString("en-GB", { month: "short" }));
      }
    }
  });

  const today = new Date();
  const lastSevenDay = new Set<string>();
  for (let i = 1; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    lastSevenDay.add(
      `${d.getDate()} ${d.toLocaleString("en-GB", { month: "short" })}`,
    );
  }
  orders.forEach((order) => {
    const rawDate = order.createdAt;
    if (rawDate) {
      const safeDateString = String(rawDate).replace(" ", "T");
      const dateObj = new Date(safeDateString);
      if (!isNaN(dateObj.getTime())) {
        uniqueMonths.add(dateObj.toLocaleString("en-GB", { month: "short" }));
      }
    }
  });

  const pendingCount = displayedOrders.filter(
    (o) => o.status === "Pending",
  ).length;
  const totalRevenue = displayedOrders.reduce(
    (sum, order) => sum + (Number(order.totalPrice) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] font-mono pb-20">
      <AutoRefresh interval={15000} />

      <div className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Manage incoming film processing orders.
            </p>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-grow md:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-10 py-3 border-none bg-gray-100 dark:bg-[#2a2a2a] rounded-2xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#41B544] transition-all"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsAddOrderSendOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#41B544] text-white rounded-2xl font-bold hover:bg-[#359638] active:scale-95 transition-all shadow-lg shadow-[#41B544]/20 whitespace-nowrap"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Order</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
          <StatsCards
            label="Filtered Orders"
            stat={displayedOrders.length.toLocaleString()}
            colour="blue-500"
          />
          <StatsCards
            label="Pending Processing"
            stat={pendingCount.toLocaleString()}
            colour="yellow-500"
          />
          <StatsCards
            label="Total Revenue"
            stat={`R ${totalRevenue.toLocaleString()}`}
            colour="[#41B544]"
          />
        </div>

        <div className="mb-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Filter by Date
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="flex items-center gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-medium rounded-xl transition-all h-11 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-white",
                          !selectedDate && "text-gray-500 dark:text-gray-400",
                        )}
                      >
                        <Calendar className="mr-3 h-4 w-4 text-[#41B544]" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl"
                      align="start"
                    >
                      <CustomCalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="text-[#41B544]"
                      />
                    </PopoverContent>
                  </Popover>

                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(undefined)}
                      className="flex items-center justify-center w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                      title="Clear Date Filter"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <div className="ml-auto sm:ml-4 flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl border border-gray-200 dark:border-gray-800">
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                      {displayedOrders.length}{" "}
                      {displayedOrders.length === 1 ? "Order" : "Orders"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto sm:ml-4 flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-[#2a2a2a] rounded-full">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  {displayedOrders.length}{" "}
                  {displayedOrders.length === 1 ? "Order" : "Orders"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <DropDownList
            onClick={openDropdown}
            open={dropDowns.newOrder}
            orders={displayedOrders.filter((order) => order.status === "New")}
            type="newOrder"
            name="New Orders"
            btnClick={setSelectedOrder}
            formatDate={formatDate}
          />
          <DropDownList
            onClick={openDropdown}
            open={dropDowns.pendingOrder}
            orders={displayedOrders.filter(
              (order) => order.status === "Pending",
            )}
            type="pendingOrder"
            name="Pending Processing"
            btnClick={setSelectedOrder}
            formatDate={formatDate}
          />
          <DropDownList
            onClick={openDropdown}
            open={dropDowns.completedOrder}
            orders={displayedOrders.filter(
              (order) => order.status === "Completed",
            )}
            type="completedOrder"
            name="Completed Orders"
            btnClick={setSelectedOrder}
            formatDate={formatDate}
          />
          <DropDownList
            onClick={openDropdown}
            open={dropDowns.downloadedOrder}
            orders={displayedOrders.filter(
              (order) => order.status === "Downloaded",
            )}
            type="downloadedOrder"
            name="Downloaded Orders"
            btnClick={setSelectedOrder}
            formatDate={formatDate}
          />
          <DropDownList
            onClick={openDropdown}
            open={dropDowns.blankOrder}
            orders={displayedOrders.filter((order) => order.status === "Blank")}
            type="blankOrder"
            name="Blank Orders"
            btnClick={setSelectedOrder}
            formatDate={formatDate}
          />
        </div>
      </div>

      {selectedOrder && (
        <ViewModal
          order={selectedOrder}
          handleprint={handlePrint}
          closeOrder={closeView}
          handleUpload={handleAdminFileUpload}
          isUploading={isUploading}
          setSelectedFile={setSelectedFile}
          uploadProgress={uploadProgress}
          selectedFile={selectedFile}
          formatDate={formatDate}
          handleBlankFilmComplete={handleBlankOrPrint}
          handlePrintOnlyComplete={handleBlankOrPrint}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          fetchOrders={fetchOrders}
          setSelectedOrder={setSelectedOrder}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {isaddOrderSendOpen && (
        <AddOrder
          addOrderEmail={addOrderEmail}
          addOrderFile={addOrderFile}
          addOrderName={addOrderName}
          closeAddOrder={closeAddOrder}
          handleAddOrderSendSubmit={handleAddOrderSendSubmit}
          isAddOrderSending={isaddOrderSending}
          setAddOrderEmail={setAddOrderEmail}
          setAddOrderFile={setAddOrderFile}
          setAddOrderName={setAddOrderName}
          uploadProgress={uploadProgress}
        />
      )}

      {/* --- HIDDEN PDF TEMPLATE --- */}
      <div className="hidden">
        <OrderPdfTemplate ref={pdfRef} order={selectedOrder} />
      </div>
    </div>
  );
}
