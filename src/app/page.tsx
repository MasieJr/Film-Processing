import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Services from "@/components/landing/Services";
import Hero from "@/components/landing/Hero";
import Location from "@/components/landing/Location";
import Header from "@/components/landing/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] font-sans">
      <JsonLd />

      <Header />

      <Hero />
      <Services />
      <Location />
      {/* Footer */}
      <footer className="border-t border-[#41B544] py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} Foto First Cresta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="dark:hover:text-white hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="dark:hover:text-white hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
