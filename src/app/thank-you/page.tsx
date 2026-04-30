import Link from "next/link";
import { CheckCircle, Mail, MapPin, ArrowRight, Clock } from "lucide-react";

export default async function ThankYouPage({}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] flex items-center justify-center p-5">
      <div className="max-w-xl w-full bg-[#F3F4F6] dark:bg-[#2c2c2c] border border-gray-300 dark:border-blue-500 rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-[#41B544] h-5 w-full"></div>

        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-[#41B544] rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Order Received!
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
            Thank you! Your order has been successfully placed.
          </p>

          <div className="w-full bg-gray-50 dark:bg-[#252525] rounded-2xl p-4 text-left mb-4 space-y-3">
            <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider">
              What happens next?
            </h3>

            <div className="flex gap-4">
              <div className="mt-1">
                <Mail className="w-5 h-5 text-[#41B544]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Check your email
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  We have sent a confirmation email with your full order
                  details. (Don't forget to check your spam folder!)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-[#41B544]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  Turnaround Time
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Please note it takes{" "}
                  <span className="text-red-500">7 Days</span> to process the
                  film unless stated otherwise. Please ask the sales Person for
                  an <span className="text-red-500">ESTIMATE TURNAROUND</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
