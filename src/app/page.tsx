import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Search,
  MapPin,
  Clock,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Services from "@/components/landing/Services";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] font-sans">
      <JsonLd />

      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[#F3F4F6]/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#41B544] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#41B544]/20">
              F
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-gray-900 dark:text-white text-lg leading-none">
                Foto First
              </span>
              <span className="text-xs text-[#41B544] font-medium tracking-wide uppercase mt-1">
                Cresta • Film Lab
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#services" className="hover:text-white transition-colors">
              Services & Pricing
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a href="#track" className="hover:text-white transition-colors">
              Track Order
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              Location & Hours
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-sm font-semibold text-neutral-300 hover:text-gray-700 dark:hover:text-white transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#41B544] text-black font-semibold text-sm hover:bg-[#389e3b] transition-all hover:scale-[1.02] shadow-lg shadow-[#41B544]/25"
            >
              Start Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}

      {/* Services Section */}
      <Services />

      {/* Quick Track Widget */}
      <section id="track" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Track Your Scans
              </h2>
              <p className="text-neutral-400 text-sm mt-2">
                Enter your order number or phone number below to check your
                developing status in real-time.
              </p>

              <form className="mt-8 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Order ID (e.g., FF-1042) or Phone Number"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-[#41B544] transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#41B544] text-black font-bold text-sm hover:bg-[#389e3b] transition-colors shrink-0"
                >
                  Check Status
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours Section (Crucial for Local SEO) */}
      <section
        id="location"
        className="py-24 border-t border-neutral-800 bg-neutral-900/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#41B544]">
                Drop-Off Location
              </span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-6">
                Visit Foto First Cresta
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed mb-8">
                Drop off your rolls in person or post them directly to our lab
                inside Cresta Shopping Centre. We notify you the moment your
                digital scans are ready for cloud download.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#41B544] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Address</p>
                    <p className="text-sm text-neutral-400">
                      Shop Cresta Shopping Centre, Beyers Naudé Dr, Randburg,
                      2194, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-[#41B544] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Trading Hours
                    </p>
                    <p className="text-sm text-neutral-400">
                      Monday – Saturday: 09:00 – 18:00
                    </p>
                    <p className="text-sm text-neutral-400">
                      Sunday & Public Holidays: 09:00 – 15:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder */}
            <div className="w-full h-80 lg:h-96 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative">
              <iframe
                title="Foto First Cresta Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.652157123984!2d27.9712!3d-26.1265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjYgw0DA3JzA1LjQiUyAyN8KwNTgnMTYuMyJF!5e0!3m2!1sen!2sza!4v1600000000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(0.9) contrast(1.2) invert(0.9)",
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} Foto First Cresta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
