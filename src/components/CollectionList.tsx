import { forwardRef } from "react";

type CollectionOrder = {
  id: string;
  customerName?: string;
  email?: string;
  phone?: string;
  services?: string;
  quantity?: number;
  totalPrice?: number;
  status?: string;
  createdAt?: string | Date;
};

type CollectionListProps = {
  orders: CollectionOrder[];
  shop: string;
};

const CollectionList = forwardRef<HTMLDivElement, CollectionListProps>(
  ({ orders, shop }, ref) => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const formattedTime = today.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const storeName =
      shop.charAt(0).toUpperCase() + shop.slice(1).toLowerCase();

    return (
      <div ref={ref} className="bg-white text-black p-8 w-full min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-5 mb-6">
          <div>
            <h1 className="text-3xl font-bold">FOTO FIRST</h1>
            <p className="text-lg font-semibold mt-1">Driver Collection List</p>
          </div>

          <div className="text-right text-sm">
            <p>
              <strong>Branch:</strong> {storeName}
            </p>
            <p>
              <strong>Date:</strong> {formattedDate}
            </p>
            <p>
              <strong>Time:</strong> {formattedTime}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <p className="text-lg">
            <strong>Total Orders:</strong> {orders.length}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Please verify each order when collecting from the branch.
          </p>
        </div>

        {/* Orders Table */}
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y-2 border-black">
              <th className="text-left py-3 px-2 w-10">#</th>
              <th className="text-left py-3 px-2">Order</th>
              <th className="text-left py-3 px-2">Customer</th>
              <th className="text-left py-3 px-2">Service</th>
              <th className="text-center py-3 px-2">Qty</th>
              <th className="text-center py-3 px-2 w-16">✓</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b border-gray-300">
                <td className="py-4 px-2">{index + 1}</td>

                <td className="py-4 px-2 font-semibold">{order.id}</td>

                <td className="py-4 px-2">
                  {order.customerName || "Walk-in Customer"}
                </td>

                <td className="py-4 px-2">{order.services || "-"}</td>

                <td className="py-4 px-2 text-center">{order.quantity ?? 1}</td>

                <td className="py-4 px-2 text-center">
                  <div className="w-5 h-5 border-2 border-black mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="border border-gray-400 p-8 text-center">
            <p className="font-semibold">No orders waiting for collection.</p>
          </div>
        )}

        {/* Driver Information */}
        <div className="mt-10 pt-6 border-t-2 border-black">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="font-semibold mb-6">Driver</p>
              <div className="border-b border-black h-6" />
            </div>

            <div>
              <p className="font-semibold mb-6">Branch Staff</p>
              <div className="border-b border-black h-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-8">
            <div>
              <p className="font-semibold mb-6">Driver Signature</p>
              <div className="border-b border-black h-6" />
            </div>

            <div>
              <p className="font-semibold mb-6">Collection Time</p>
              <div className="border-b border-black h-6" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-500 text-center">
          Foto First Film Processing — Driver Collection Manifest
        </div>
      </div>
    );
  },
);

CollectionList.displayName = "CollectionList";

export default CollectionList;
