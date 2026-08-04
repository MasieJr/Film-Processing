import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

<section className="relative pt-20 pb-28 overflow-hidden">
  {/* Decorative Gradients */}
  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#41B544]/15 rounded-full blur-[120px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs font-semibold text-[#41B544] mb-8">
      <Sparkles className="w-3.5 h-3.5" /> Johannesburg&apos;s Premier Analog
      Photo Lab
    </div>

    {/* Primary H1 Tag optimized for Local SEO Keywords */}
    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
      Professional 35mm & 120{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#41B544] to-emerald-300">
        Film Processing
      </span>{" "}
      in Foto First Cresta
    </h1>

    <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
      Fast C-41 color developing, crisp black & white film processing, and
      ultra-high resolution digital scans delivered straight to your email.
    </p>

    {/* CTAs */}
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/order"
        className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#41B544] text-black font-bold text-base hover:bg-[#389e3b] transition-all hover:scale-[1.02] shadow-xl shadow-[#41B544]/20 flex items-center justify-center gap-2"
      >
        Order Film Developing Online <ArrowRight className="w-5 h-5" />
      </Link>
      <a
        href="#track"
        className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-200 font-semibold text-base hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
      >
        Track Existing Order
      </a>
    </div>

    {/* Trust Highlights */}
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-neutral-800/80 max-w-4xl mx-auto">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">24-48 hr</span>
        <span className="text-xs text-neutral-500 mt-1">
          Average Turnaround
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">Noritsu Scans</span>
        <span className="text-xs text-neutral-500 mt-1">
          Pro High-Res Quality
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">35mm & 120</span>
        <span className="text-xs text-neutral-500 mt-1">
          All Formats Supported
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">Direct Drive</span>
        <span className="text-xs text-neutral-500 mt-1">
          Cloud Asset Delivery
        </span>
      </div>
    </div>
  </div>
</section>;
