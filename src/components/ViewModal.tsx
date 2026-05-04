import {
  X,
  Printer,
  Upload,
  CloudUpload,
  CircleCheck,
  Film,
} from "lucide-react";

type ViewModalProps = {
  order: {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    services: string;
    quantity: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    fileUrl: string;
  };
  isUploading: boolean;
  closeOrder: () => void;
  handleprint: () => void;
  setSelectedFile: (file: File | null) => void;
  handleUpload: () => void;
  uploadProgress: number;
  selectedFile: File | null;
  formatDate: (rawDate: Date | string) => string;
};

export default function ViewModal({
  order,
  closeOrder,
  handleprint,
  isUploading,
  setSelectedFile,
  handleUpload,
  uploadProgress,
  selectedFile,
  formatDate,
}: ViewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center p-6 md:p-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Order Details
          </h2>
          <button
            onClick={closeOrder}
            className="p-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 pt-2 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Customer Information
            </h3>
            <div className="bg-gray-50 dark:bg-[#252525] p-5 rounded-2xl space-y-3 border border-gray-100 dark:border-gray-800/50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Name</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {order.customerName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {order.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {order.phone}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-500">
                  Date Logged
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Order Request
            </h3>
            <div className="bg-gray-50 dark:bg-[#252525] p-5 rounded-2xl flex justify-between items-center border border-gray-100 dark:border-gray-800/50">
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  {order.services}
                </p>
                <p className="text-sm text-gray-500 font-medium mt-0.5">
                  Quantity:{" "}
                  <span className="text-gray-900 dark:text-white">
                    {order.quantity}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-[#41B544]">
                  R{order.totalPrice}
                </p>
              </div>
            </div>
          </div>

          <div>
            {order.fileUrl ? (
              <div className="flex items-center gap-3 p-4 bg-[#41B544]/10 border border-[#41B544]/20 rounded-2xl">
                <CircleCheck className="text-[#41B544] w-6 h-6 shrink-0" />
                <p className="text-[#41B544] font-bold text-sm truncate">
                  File attached: {order.fileUrl}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".zip,.rar,.tar"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                    disabled={isUploading}
                  />

                  <label
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                      selectedFile
                        ? "border-[#41B544] bg-[#41B544]/5"
                        : "border-gray-300 hover:border-[#41B544]/50 dark:border-gray-700 dark:hover:border-gray-500 bg-gray-50 dark:bg-[#1a1a1a]"
                    } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {selectedFile ? (
                      <div className="flex flex-col items-center text-center space-y-2 p-4">
                        <CircleCheck className="text-[#41B544] w-8 h-8" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[250px]">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-[#41B544] font-bold mt-1">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            • Ready
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-2 p-4">
                        <div className="w-10 h-10 bg-white dark:bg-[#2a2a2a] rounded-full flex items-center justify-center shadow-sm mb-1">
                          <CloudUpload className="text-gray-500 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            Click to browse files
                          </p>
                          <p className="text-xs font-medium text-gray-400 mt-0.5">
                            .ZIP, .RAR files only
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {isUploading && (
                  <div className="w-full mt-1 bg-gray-50 dark:bg-[#252525] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-bold text-[#41B544]">
                        Uploading to Lab Server...
                      </span>
                      <span className="text-xs font-bold text-[#41B544]">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#41B544] h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 pt-0 flex flex-col-reverse sm:flex-row justify-end gap-3 w-full">
          <button
            onClick={handleprint}
            className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto text-sm font-bold bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Docket</span>
          </button>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto text-sm font-bold bg-[#41B544] text-white rounded-xl hover:bg-[#359638] disabled:opacity-50 disabled:active:scale-100 active:scale-95 shadow-lg shadow-[#41B544]/20 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? "Uploading..." : "Send Files"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
