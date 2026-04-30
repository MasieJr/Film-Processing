import { CircleCheck, CloudUpload } from "lucide-react";

type AddOrderProp = {
  closeAddOrder: () => void;
  addOrderName: string;
  setAddOrderName: (name: string) => void;
  addOrderEmail: string;
  setAddOrderEmail: (email: string) => void;
  setAddOrderFile: (file: File | null) => void;
  addOrderFile: File | null;
  isAddOrderSending: boolean;
  handleAddOrderSendSubmit: () => void;
  uploadProgress: number;
};

export default function AddOrder({
  closeAddOrder,
  addOrderName,
  setAddOrderName,
  addOrderEmail,
  setAddOrderEmail,
  setAddOrderFile,
  addOrderFile,
  isAddOrderSending,
  handleAddOrderSendSubmit,
  uploadProgress,
}: AddOrderProp) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#121212] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#1a1a1a]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Add Order
          </h2>
          <button
            onClick={closeAddOrder}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={addOrderName}
              onChange={(e) => setAddOrderName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1e1e1e] focus:ring-2 focus:ring-[#41B544] focus:border-[#41B544]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={addOrderEmail}
              onChange={(e) => setAddOrderEmail(e.target.value)}
              placeholder="client@email.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1e1e1e] focus:ring-2 focus:ring-[#41B544] focus:border-[#41B544]"
            />
          </div>

          <div className="pt-2">
            <input
              type="file"
              id="addOrder-file-upload"
              className="hidden"
              accept=".zip,.rar,.tar"
              onChange={(e) => setAddOrderFile(e.target.files?.[0] || null)}
              disabled={isAddOrderSending}
            />
            <label
              htmlFor="addOrder-file-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                addOrderFile
                  ? "border-[#41B544] bg-[#41B544]/10"
                  : "border-gray-300 hover:border-[#41B544]/50 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a]"
              } ${isAddOrderSending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {addOrderFile ? (
                <div className="flex flex-col items-center text-center space-y-2 p-4">
                  <CircleCheck className="text-[#41B544]" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[250px]">
                      {addOrderFile.name}
                    </p>
                    <p className="text-xs text-[#41B544] font-medium mt-1">
                      {(addOrderFile.size / (1024 * 1024)).toFixed(2)} MB •
                      Ready to upload
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

          {isAddOrderSending && (
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

          <button
            onClick={handleAddOrderSendSubmit}
            // disabled={!addOrderEmail || !addOrderFile || isAddOrderSending}
            disabled={true}
            className="w-full py-4 mt-4 bg-[#41B544] text-white font-bold rounded-xl hover:bg-[#359a37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isAddOrderSending
              ? "Uploading & Sending..."
              : "Send Files Instantly"}
          </button>
        </div>
      </div>
    </div>
  );
}
