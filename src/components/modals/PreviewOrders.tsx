"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Clock,
  CheckSquare,
  Square,
  MinusSquare,
  Search,
  Filter,
  ArrowRight,
  Package,
  Layers,
  AlertCircle,
  Loader2,
} from "lucide-react";

export interface PendingOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  services: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  status: string;
  salesPerson: string;
}
type BatchPendingOrdersModalProps = {
  onClose: () => void;
  orders: PendingOrder[];
  // onBatchAction: (
  //   selectedIds: string[],
  //   action: "process" | "export" | "notify",
  // ) => Promise<void>;
};

export default function PreviewOrders({
  onClose,
  orders,
  // onBatchAction,
}: BatchPendingOrdersModalProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter down to only "Pending" / Waiting orders
  const pendingOrders = useMemo(() => {
    return orders.filter((order) => order.status === "Collected");
  }, [orders]);

  // Apply search query filter
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return pendingOrders;
    const q = searchQuery.toLowerCase();
    return pendingOrders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.services.toLowerCase().includes(q),
    );
  }, [pendingOrders, searchQuery]);

  // Bulk selection helpers
  const isAllSelected =
    filteredOrders.length > 0 && selectedIds.size === filteredOrders.length;
  const isPartiallySelected =
    selectedIds.size > 0 && selectedIds.size < filteredOrders.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  const toggleOrder = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 text-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Orders Awaiting Processing
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {pendingOrders.length} Waiting
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Select orders to batch update statuses or generate processing
                lists
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-3.5 border-b border-neutral-800 bg-neutral-950/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/70 hover:bg-neutral-800 text-xs font-medium text-neutral-300 transition-colors"
            >
              {isAllSelected ? (
                <CheckSquare className="w-4 h-4 text-[#41B544]" />
              ) : isPartiallySelected ? (
                <MinusSquare className="w-4 h-4 text-amber-400" />
              ) : (
                <Square className="w-4 h-4 text-neutral-500" />
              )}
              {isAllSelected ? "Deselect All" : "Select All"}
            </button>
            <span className="text-xs text-neutral-400">
              <strong className="text-white">{selectedIds.size}</strong> of{" "}
              {filteredOrders.length} selected
            </span>
          </div>
        </div>

        {/* Orders List / Table */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/60 p-2 sm:p-4">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center">
              <Layers className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-neutral-300">
                No waiting orders found
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {searchQuery
                  ? "Try refining your search terms."
                  : "All pending orders have been cleared."}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isSelected = selectedIds.has(order.id);
              return (
                <div
                  key={order.id}
                  onClick={() => toggleOrder(order.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#41B544]/10 border border-[#41B544]/30"
                      : "hover:bg-neutral-800/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      tabIndex={-1}
                      className="text-neutral-400 hover:text-white shrink-0"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-[#41B544]" />
                      ) : (
                        <Square className="w-5 h-5 text-neutral-600" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">
                          {order.customerName}
                        </span>
                        <span className="text-xs text-neutral-500">•</span>
                        <span className="text-xs font-semibold text-neutral-200 truncate">
                          {order.services}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                        <span className="truncate">{order.services}</span>
                        <span>•</span>
                        <span>
                          {order.quantity}{" "}
                          {order.quantity === 1 ? "roll" : "rolls"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0">
                    <div>
                      <div className="text-xs font-bold text-white">
                        R{order.totalPrice.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            {selectedIds.size > 0 ? (
              <span>
                Ready to update <strong>{selectedIds.size}</strong> orders
              </span>
            ) : (
              <span>Select orders above to perform batch actions</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedIds.size === 0 || isSubmitting}
              // onClick={() => handleExecuteBatch("process")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#41B544] text-black text-xs font-bold hover:bg-[#389e3b] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#41B544]/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Mark as Processing ({selectedIds.size})
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
