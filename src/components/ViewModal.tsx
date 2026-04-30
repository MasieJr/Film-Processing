import { X, Printer, Upload, CloudUpload, CircleCheck } from "lucide-react";

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
}: ViewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Content Box */}
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold">Order Details</h2>
          </div>
          <button
            onClick={closeOrder}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Customer Info */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Customer Information
            </h3>
            <div className="bg-gray-50 dark:bg-[#252525] p-4 rounded-xl space-y-2">
              <p>
                <span className="font-medium">Name:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-medium">Phone Number:</span> {order.phone}
              </p>
              <p>
                <span className="font-medium">Date:</span> {order.createdAt}
              </p>
            </div>
          </div>

          {/* Order Info */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Order Request
            </h3>
            <div className="bg-gray-50 dark:bg-[#252525] p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">{order.services}</p>
                <p className="text-gray-500">Quantity: {order.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#41B544]">
                  R{order.totalPrice}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            {order.fileUrl ? (
              <p className="text-green-600 font-medium">
                ✅ File attached: {order.fileUrl}
              </p>
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
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedFile
                        ? "border-[#41B544] bg-[#41B544]/10 dark:bg-[#41B544]/5"
                        : "border-gray-300 hover:border-[#41B544]/50 dark:border-gray-700 dark:hover:border-gray-500 bg-gray-50 dark:bg-[#1a1a1a]"
                    } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {selectedFile ? (
                      <div className="flex flex-col items-center text-center space-y-2 p-4">
                        <CircleCheck className="text-[#41B544]" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[250px]">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-[#41B544] font-medium mt-1">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            • Ready to upload
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center space-y-2 p-4">
                        <CloudUpload className="text-gray-600 dark:text-gray-300" />
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Click to browse for files
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            .ZIP, .RAR files
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {isUploading && (
                  <div className="w-full mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                        Uploading Files
                      </span>
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="p-6 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div className="flex flex-row space-x-3 align-between ">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex items-center space-x-2 px-4 py-2 text-xl font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? "Uploading" : "Send Files"}</span>
            </button>
            <button
              onClick={handleprint}
              className="flex items-center space-x-2 px-4 py-2 text-lg font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
