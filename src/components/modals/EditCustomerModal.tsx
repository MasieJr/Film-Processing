"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Save } from "lucide-react";
import ToggleButton from "../ToggleButton";

type EditCustomerModalProps = {
  onClose: () => void;
  order: any | null;
  onSave: (
    orderId: string,
    updatedData: {
      customerName: string;
      email: string;
      phone: string;
      status: boolean;
    },
  ) => void;
};

export default function EditCustomerModal({
  onClose,
  order,
  onSave,
}: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    status: false,
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || "",
        email: order.email || "",
        phone: order.phone || "",
        status: order.status === "Pending" ? false : true,
      });
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(order.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#27272a] bg-gray-50 dark:bg-[#111113]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
            Edit Customer Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-lg transition-colors active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Customer Name */}
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Customer Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400 group-focus-within:text-[#41B544] transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111113] border border-gray-200 dark:border-[#27272a] rounded-xl text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#41B544]/20 focus:border-[#41B544] dark:focus:border-[#41B544] transition-all placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-[#41B544] transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111113] border border-gray-200 dark:border-[#27272a] rounded-xl text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#41B544]/20 focus:border-[#41B544] dark:focus:border-[#41B544] transition-all placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-[#41B544] transition-colors" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111113] border border-gray-200 dark:border-[#27272a] rounded-xl text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#41B544]/20 focus:border-[#41B544] dark:focus:border-[#41B544] transition-all placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="082 123 4567"
                />
              </div>
            </div>

            {/* Toggle Status */}

            <div className="pt-2">
              <ToggleButton
                label="Mark as Completed"
                state={formData.status}
                onChange={(isOn) => setFormData({ ...formData, status: isOn })}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-3 mt-8 pt-5 border-t border-gray-100 dark:border-[#27272a]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-white dark:bg-[#111113] border border-gray-200 dark:border-[#27272a] rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272a] transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#41B544] hover:bg-[#359638] text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-[#41B544]/20"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
