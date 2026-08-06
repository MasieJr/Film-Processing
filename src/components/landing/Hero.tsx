import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    label: "24-72hr",
    description: "Average Turnaround",
  },
  {
    label: "Scans",
    description: "Pro High-Res Quality",
  },
  {
    label: "35mm, 120...",
    description: " All Formats Supported",
  },
  {
    label: "Sharing",
    description: "Long lasting File Email links",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-20 pb-28 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#41B544]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white max-w-4xl mx-auto leading-[1.1]">
          35mm & 120{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41B544] to-emerald-300">
            Film Processing
          </span>{" "}
          at Foto First Cresta
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Fast C-41 color developing in Johannesburg, and ultra-high resolution
          digital scans delivered straight to your email.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/order"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#41B544] text-black font-bold text-base hover:bg-[#389e3b] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Start Order
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="/track"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 bg-neutral-900 text-neutral-200 font-semibold text-base hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            Track Orders
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#41B544] max-w-4xl mx-auto">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-black dark:text-white">
                {highlight.label}
              </span>
              <span className="text-xs text-neutral-500 mt-1">
                {highlight.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
