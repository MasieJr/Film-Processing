import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  Scale,
  Clock,
  PackageCheck,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service | Foto First Cresta",
  description:
    "Terms and conditions governing film processing, digital scanning, physical prints, and order pickup at Foto First Cresta.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-[#41B544] selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="border-b border-neutral-800 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#41B544]/10 text-[#41B544] text-xs font-semibold mb-4">
            <FileText className="w-4 h-4" /> Customer Service Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Last Updated: August 2026
          </p>
        </div>

        <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#41B544]" /> 1. Overview &
              Agreement
            </h2>
            <p>
              By submitting film rolls, disposable cameras, memory cards, or
              digital files to Foto First Cresta (whether in store or via online
              order booking), you agree to be bound by the following terms and
              conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> 2. Film
              Handling & Limitation of Liability
            </h2>
            <p>
              Analog film processing involves chemical and mechanical
              procedures. While extreme care and modern lab equipment standards
              are maintained at all times:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>
                In the rare event that film is damaged, lost, or compromised due
                to equipment malfunction or chemical defect, Foto First
                Cresta&apos;s liability is strictly limited to replacing the
                roll with an unexposed roll of fresh film of comparable type.
              </li>
              <li>
                We are not liable for pre-existing film defects, camera light
                leaks, expired emulsion degradation, accidental customer light
                exposure, or blank rolls resulting from camera malfunction.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-[#41B544]" /> 3. Blank Film
              Rolls
            </h2>
            <p>
              If a film roll produces no images during development (completely
              blank or unexposed), a standard chemical processing fee applies to
              cover lab materials. If prints or scanning were prepaid in a
              bundle, the print/scan portion will be adjusted or refunded
              accordingly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#41B544]" /> 4. Uncollected
              Negatives & Prints
            </h2>
            <p>
              Physical film negatives and printed photographs must be collected
              in store within <strong>60 days</strong> of order completion
              notification.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
              <p className="text-neutral-400">
                Negatives or physical prints left uncollected after 60 days may
                be disposed of securely to free up storage facilities, unless
                prior extension arrangements have been confirmed in writing.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">
              5. Digital Scan Downloads
            </h2>
            <p>
              Customers receive email or SMS links to download their
              high-resolution digital scans upon completion. It is the
              customer&apos;s responsibility to download and back up their
              digital image files onto personal devices within the 30-day cloud
              hosting window.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">
              6. Pricing & Payment
            </h2>
            <p>
              All prices quoted on the website and in store are in South African
              Rands (ZAR). Payment is due upon placing the order or at the time
              of physical drop-off/pickup.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              7. Technical Availability & Service Disclaimer
            </h2>
            <p>
              The online ordering portal, digital scan delivery system, and
              tracking platform are provided on an{" "}
              <strong>&quot;as is&quot; and &quot;as available&quot;</strong>{" "}
              basis.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>
                We do not guarantee that the site will be 100% error-free,
                uninterrupted, or immune to third-party cloud hosting outages
                (e.g., AWS, Vercel, or database providers).
              </li>
              <li>
                Under no circumstances shall the platform operators, software
                developers, or hosting providers be liable for indirect,
                incidental, or consequential damages resulting from digital data
                loss, corrupted file downloads, or delayed email notifications.
              </li>
            </ul>
          </section>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Foto First Cresta. All rights reserved.
        </div>
      </div>
    </div>
  );
}
