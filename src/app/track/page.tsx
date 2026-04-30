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
          className="mt-8 bg-[#F3F4F6] dark:bg-[#2c2c2c] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-blue-500"
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
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white focus:ring-[#41B544] focus:border-[#41B544]"
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
                className="bg-[#F3F4F6] dark:bg-[#2c2c2c] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-blue-500"
              >
                <div className="flex justify-between items-start border-b border-gray-200 dark:border-blue-500 pb-4 mb-6">
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
                    className={`px-3 py-1 rounded-full text-xs font-bold ${orderData.status === "Completed" ? "bg-[#41B544]/10 text-[#41B544]" : "bg-blue-500/10 text-blue-500"}`}
                  >
                    {orderData.status}
                  </span>
                </div>

                {/* Visual Status Timeline */}
                <div className="relative pl-2">
                  <div className="absolute left-[1.35rem] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                  <div className="space-y-6 relative">
                    {/* Step 1: Received */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#41B544] flex items-center justify-center border-4 border-white dark:border-[#1e1e1e] z-10">
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1e1e1e] z-10 ${orderData.status === "Completed" ? "bg-[#41B544]" : orderData.status === "Pending" ? "bg-blue-500 animate-pulse" : "bg-gray-300 dark:bg-gray-700"}`}
                      >
                        {orderData.status === "Completed" ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <FlaskConical className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="ml-4">
                        <p
                          className={`font-bold ${orderData.status === "Pending" ? "text-blue-500" : "text-gray-900 dark:text-white"}`}
                        >
                          In the Lab
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Completed */}
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1e1e1e] z-10 ${orderData.status === "Completed" ? "bg-[#41B544]" : "bg-gray-300 dark:bg-gray-700"}`}
                      >
                        <Download className="w-4 h-4 text-white" />
                      </div>
                      <div className="ml-4">
                        <p
                          className={`font-bold ${orderData.status === "Completed" ? "text-[#41B544]" : "text-gray-400"}`}
                        >
                          Order Sent
                        </p>
                      </div>
                    </div>
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
