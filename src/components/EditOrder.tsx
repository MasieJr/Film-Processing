import { X } from "lucide-react";
import TextInput from "./TextInput";
import { useState } from "react";

type EditOrderProp = {
  order: {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    status: string;
  };
  handleEdit: () => void;
  closeEdit: () => void;
};

export default function EditOrder({
  order,
  handleEdit,
  closeEdit,
}: EditOrderProp) {
  const [form, setForm] = useState({
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    status: order.status,
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-6 md:p-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Edit Customer Details
          </h2>
          <button
            onClick={closeEdit}
            className="p-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col p-5">
          <label className="text-lg mb-1 font-medium">Customer Name</label>
          <input
            placeholder={form.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            className="border p-2"
          />
          <label className="text-lg mb-1 font-medium">Customer Name</label>
          <input
            value={form.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            className="border p-2"
          />
          <label className="text-lg mb-1 font-medium">Customer Name</label>
          <input
            placeholder={form.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            className="border p-2"
          />
        </div>
      </div>
    </div>
  );
}
