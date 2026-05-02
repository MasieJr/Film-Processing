"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      //   className="p-3 h-10 rounded-full border border-white flex justify-center items-center"
      className="fixed top-6 left-4 p-3 h-10 border border-white sm:left-8 z-50 group relative inline-flex items-center gap-2 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" />
      Back
    </button>
  );
}
