"use client";

import { useActionState } from "react";
import { authenticateAdmin } from "./action";
import Image from "next/image";

// A tiny wrapper for Next.js 15 Server Actions
const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    authenticateAdmin,
    initialState,
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#1e1e1e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#F3F4F6] dark:bg-[#2c2c2c] rounded-3xl shadow-xl border border-[#41B544] overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6 flex flex-col items-center border-b border-[#41B544]">
          <div className="relative w-48 h-16 mb-4">
            <Image
              src="/logo.png"
              alt="Foto First Lab"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Access DashBoard
          </h1>
        </div>

        {/* Form */}
        <form action={formAction} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Staff Passcode
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="dark:bg-[#252525] bg-gray-50 w-full px-4 py-3 text-center text-xl rounded-xl border border-[#41B544] "
            />
            {state?.error && (
              <p className="mt-2 text-sm text-red-500 font-medium text-center animate-pulse">
                {state.error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-[#41B544] text-white font-bold text-lg hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 disabled:opacity-50"
          >
            {isPending ? "Unlocking..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
