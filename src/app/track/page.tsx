"use client";
import { Check, Download, FlaskConical } from "lucide-react";
import { useState } from "react";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setOrdersList([]);

    try {
      const res = await fetch(`/api/track?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to find orders");

      setOrdersList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
      case "New":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
      case "Completed":
        return "bg-[#41B544]/10 text-[#41B544] border-[#41B544]/20";
      case "Downloaded":
        return "bg-[#00E7FF]/10 text-[#00E7FF] border-[#00E7FF]/20";

      case "Blank":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 ">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white ">
            My Orders 🎞️
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email to see all your past and active film orders.
          </p>
        </div>

        {/* SEARCH FORM */}
        <form
          className="mt-8 bg-[#F3F4F6] dark:bg-[#2c2c2c] p-8 rounded-2xl shadow-sm border border-[#41B544]"
          onSubmit={handleTrackOrder}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label className="sr-only">Email Address</label>
              <input
                type="email"
                required
                placeholder="The email you gave the lab..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-[#41B544] rounded-xl bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-[#41B544] focus:border-[#41B544]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full sm:w-auto flex-shrink-0 flex justify-center py-3 px-8 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#41B544] hover:bg-[#359a37] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#41B544] disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Searching..." : "Find Orders"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
        </form>

        {/* RESULTS LIST */}
        {ordersList.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Found {ordersList.length} Order{ordersList.length > 1 ? "s" : ""}{" "}
              for {ordersList[0].customerName.split(" ")[0]}
            </h3>

            {ordersList.map((orderData) => (
              <div
                key={orderData.id}
                className="bg-[#F3F4F6] dark:bg-[#2c2c2c] p-6 sm:p-8 rounded-2xl shadow-sm border border-[#41B544]"
              >
                <div className="flex justify-between items-start border-b border-[#41B544] pb-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Order Date:{" "}
                      {new Date(orderData.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                      {orderData.services}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(orderData.status)}`}
                  >
                    {orderData.status}
                  </span>
                </div>

                {/* Visual Status Timeline */}
                <div className="relative pl-2 mt-6">
                  <div className="absolute left-[1.35rem] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                  <div className="space-y-6 relative">
                    {(() => {
                      const s = orderData.status;
                      const isPending = s === "Pending" || s === "New";
                      const isCompleted =
                        s === "Completed" || s === "Downloaded";
                      const isDownloaded = s === "Downloaded";
                      const isBlank = s === "Blank";

                      return (
                        <>
                          {/* Step 1: Received (Always Green) */}
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#41B544] flex items-center justify-center border-4 border-[#F3F4F6] dark:border-[#2c2c2c] z-10">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div className="ml-4">
                              <p className="font-bold text-gray-900 dark:text-white">
                                Order Received
                              </p>
                            </div>
                          </div>

                          {/* Step 2: In the Lab */}
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#F3F4F6] dark:border-[#2c2c2c] z-10 
                                ${isCompleted ? "bg-[#41B544]" : isPending ? "bg-blue-500 animate-pulse" : isBlank ? "bg-red-500 " : "bg-gray-300 dark:bg-gray-700"}`}
                            >
                              {isCompleted ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <FlaskConical className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="ml-4">
                              <p
                                className={`font-bold ${isCompleted ? "text-gray-900 dark:text-white" : isPending ? "text-blue-500" : isBlank ? "text-red-500" : "text-gray-400"}`}
                              >
                                {isBlank
                                  ? "One or more rolls Blank"
                                  : "In the Lab"}
                              </p>
                            </div>
                          </div>

                          {/* Step 3: Completed / Sent (Hidden if Blank) */}
                          {!isBlank && (
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#F3F4F6] dark:border-[#2c2c2c] z-10 
                                  ${isCompleted ? "bg-[#41B544]" : "bg-gray-300 dark:bg-gray-700"}`}
                              >
                                {isDownloaded ? (
                                  <Check className="w-4 h-4 text-white" />
                                ) : (
                                  <Download className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className="ml-4">
                                <p
                                  className={`font-bold ${isCompleted ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
                                >
                                  Order Ready
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Step 4: Downloaded (Only show if it's a digital order) */}
                          {!isBlank && orderData.services !== "Print Only" && (
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#F3F4F6] dark:border-[#2c2c2c] z-10 
                                  ${isDownloaded ? "bg-[#00E7FF]" : "bg-gray-300 dark:bg-gray-700"}`}
                              >
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div className="ml-4">
                                <p
                                  className={`font-bold ${isDownloaded ? "text-[#00E7FF]" : "text-gray-400"}`}
                                >
                                  Files Downloaded
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
