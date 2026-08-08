import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#41B544] bg-[#F3F4F6]/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#41B544] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#41B544]/20">
            <Image
              src={"/logo.webp"}
              alt="Foto First Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col ">
            <span className="font-bold tracking-tight text-black dark:text-white text-lg leading-none">
              Foto First
            </span>
            <span className="text-xs text-[#41B544] font-medium tracking-wide uppercase mt-1">
              Cresta
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a
            href="#services"
            className="dark:hover:text-white hover:text-black transition-colors"
          >
            Services & Pricing
          </a>

          <a
            href="#location"
            className="dark:hover:text-white hover:text-black transition-colors"
          >
            Location & Hours
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="hidden sm:inline-flex text-sm font-semibold text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#41B544] text-black font-semibold text-sm hover:bg-[#389e3b] transition-all hover:scale-[1.02]"
          >
            Start Order <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
