import { CheckCircle } from "lucide-react";

type SuccessModalProp = {
  setShowSuccessModal: (show: boolean) => void;
  fetchOrders: () => void;
  setSelectedOrder: (order: any | null) => void;
};

export default function SuccessModal({
  setShowSuccessModal,
  fetchOrders,
  setSelectedOrder,
}: SuccessModalProp) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full animate-in zoom-in duration-200">
        {/* Green Check Icon */}
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Upload Complete!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6 leading-relaxed">
          The high-res scans have been successfully attached to the order and an
          email has been sent to the customer.
        </p>

        {/* Close Button */}
        <button
          onClick={() => {
            setShowSuccessModal(false);
            setSelectedOrder(null);
            fetchOrders();
          }}
          className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  );
}
