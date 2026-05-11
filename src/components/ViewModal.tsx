import { useState } from "react";
import {
  X,
  Printer,
  Upload,
  CloudUpload,
  CircleCheck,
  Image as ImageIcon,
  AlertCircle,
  Send,
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
    fileUrl: string | null;
  };
  isUploading: boolean;
  closeOrder: () => void;
  handleprint: () => void;
  setSelectedFile: (file: File | null) => void;
  handleUpload: () => void;
  uploadProgress: number;
  selectedFile: File | null;
  formatDate: (rawDate: Date | string) => string;
  handlePrintOnlyComplete?: (type: string, status: string) => void;
  handleBlankFilmComplete?: (
    type: string,
    status: string,
    blankCount: number,
  ) => void;
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
  handlePrintOnlyComplete,
  handleBlankFilmComplete,
}: ViewModalProps) {
  const [isReplacing, setIsReplacing] = useState(false);
  // NEW: Tab state for the processing action
  const [actionType, setActionType] = useState<"upload" | "print" | "blank">(
    "upload",
  );
  // NEW: State for blank films
  const [blankCount, setBlankCount] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-6 md:p-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Order Details
          </h2>
          <button
            onClick={closeOrder}
            className="p-2 bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 pt-2 space-y-6">
          {/* Customer & Order Info (Combined for space) */}
          <div className="bg-gray-50 dark:bg-[#252525] p-5 rounded-2xl border border-gray-100 dark:border-gray-800/50">
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {order.customerName}
                </p>
                <p className="text-sm text-gray-500">
                  {order.phone} • {order.email}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-[#41B544]">
                  R{order.totalPrice}
                </p>
                <p className="text-xs font-bold text-gray-400 mt-1">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Service
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {order.services}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Total Rolls
                </span>
                <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-[#1e1e1e] px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                  {order.quantity}
                </span>
              </div>
            </div>
          </div>

          {/* --- PROCESSING TABS --- */}
          {(!order.fileUrl || isReplacing) && (
            <div className="bg-gray-100 dark:bg-[#2a2a2a] p-1 rounded-xl flex gap-1">
              <button
                onClick={() => setActionType("upload")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${actionType === "upload" ? "bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Digital Upload
              </button>
              <button
                onClick={() => setActionType("print")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${actionType === "print" ? "bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Print Only
              </button>
              <button
                onClick={() => setActionType("blank")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${actionType === "blank" ? "bg-white dark:bg-[#1e1e1e] text-red-600 dark:text-red-400 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Blank Film
              </button>
            </div>
          )}

          {/* --- TAB CONTENT: DIGITAL UPLOAD --- */}
          {actionType === "upload" && (
            <div>
              {order.fileUrl && !isReplacing ? (
                <div className="flex items-center justify-between p-4 bg-[#41B544]/10 border border-[#41B544]/20 rounded-2xl gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <CircleCheck className="text-[#41B544] w-6 h-6 shrink-0" />
                    <p className="text-[#41B544] font-bold text-sm truncate">
                      Attached: {order.fileUrl}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsReplacing(true)}
                    className="px-4 py-2 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 transition-all active:scale-95"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
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
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${selectedFile ? "border-[#41B544] bg-[#41B544]/5" : "border-gray-300 bg-gray-50 dark:bg-[#1a1a1a] dark:border-gray-700"} ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {selectedFile ? (
                      <div className="text-center">
                        <CircleCheck className="text-[#41B544] w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {selectedFile.name}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <CloudUpload className="text-gray-500 w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          Browse for files
                        </p>
                      </div>
                    )}
                  </label>

                  {isUploading && (
                    <div className="w-full mt-3 bg-gray-50 dark:bg-[#252525] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#41B544] h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --- TAB CONTENT: PRINT ONLY --- */}
          {actionType === "print" && (
            <div className="bg-gray-50 dark:bg-[#252525] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Prints are Ready
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                No digital files needed. Send a notification that physical
                prints are ready for collection.
              </p>
            </div>
          )}

          {/* --- TAB CONTENT: BLANK FILM --- */}
          {actionType === "blank" && (
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 text-center animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={24} />
              </div>
              <h3 className="font-bold text-red-900 dark:text-red-400 mb-1">
                Report Blank Film
              </h3>
              <p className="text-sm text-red-700/70 dark:text-red-400/70 mb-4">
                How many rolls were completely blank?
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setBlankCount(Math.max(1, blankCount - 1))}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-[#1e1e1e] text-red-600 border border-red-200 dark:border-red-900/50 font-bold hover:bg-red-50 transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-black text-red-600 dark:text-red-400 w-8">
                  {blankCount}
                </span>
                {/* Prevent them from marking more blank rolls than the order actually has! */}
                <button
                  type="button"
                  onClick={() =>
                    setBlankCount(Math.min(order.quantity, blankCount + 1))
                  }
                  className="w-10 h-10 rounded-xl bg-white dark:bg-[#1e1e1e] text-red-600 border border-red-200 dark:border-red-900/50 font-bold hover:bg-red-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 md:p-8 pt-0 flex flex-col-reverse sm:flex-row justify-end gap-3 w-full">
          <button
            onClick={handleprint}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-gray-100 dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Docket</span>
          </button>

          {/* Dynamic Action Button based on Tab */}
          {actionType === "upload" && (
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-[#41B544] text-white rounded-xl disabled:opacity-50 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? "Uploading..." : "Send Files"}</span>
            </button>
          )}

          {actionType === "print" && (
            <button
              onClick={() => handlePrintOnlyComplete?.("Print", "Completed")}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Notify Ready</span>
            </button>
          )}

          {actionType === "blank" && (
            <button
              onClick={() =>
                handleBlankFilmComplete?.("Blank", "Blank", blankCount)
              }
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Notify Customer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
