import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Foto First Cresta",
  description:
    "Learn how Foto First Cresta collects, protects, and handles your personal information and digital scan assets.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4" /> Data Protection & Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Last Updated: August 2026
          </p>
        </div>

        <div className="space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#41B544]" /> 1. Information We
              Collect
            </h2>
            <p>
              When you place an order for film processing, scanning, or printing
              with Foto First Cresta, we collect necessary personal details to
              fulfill your order and notify you upon completion:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>
                <strong>Contact Information:</strong> Full name, email address,
                and phone number.
              </li>
              <li>
                <strong>Order Metadata:</strong> Film types, roll quantities,
                service choices, and order timestamps.
              </li>
              <li>
                <strong>Digital Scans:</strong> Image files digitized from your
                physical film negatives or slides.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#41B544]" /> 2. How We Use Your
              Data
            </h2>
            <p>
              Your personal information is strictly used for operational lab
              purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>
                Processing physical film negatives and delivering
                high-resolution digital scans.
              </li>
              <li>
                Sending automated order status updates and cloud download links
                via email or WhatsApp/SMS.
              </li>
              <li>
                Verifying identity during physical print or negative pickup at
                our Cresta lab.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-[#41B544]" /> 3. Digital Asset
              Retention & Cloud Security
            </h2>
            <p>
              Your privacy regarding personal imagery is paramount. Digital
              scans uploaded to our cloud storage are encrypted and protected by
              secure access controls.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-2">
              <p className="font-semibold text-white">Retention Period:</p>
              <p className="text-neutral-400">
                Digital files are retained on our active cloud servers for{" "}
                <strong>7 Days</strong> from the date of upload to allow
                sufficient time for customer downloading. After 7 days, files
                may be permanently archived or purged to maintain server
                security.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">
              4. Third-Party Sharing
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal data
              or digital photographs to third parties, advertisers, or AI
              training datasets under any circumstances. Data is only processed
              through secure infrastructure providers (such as cloud database
              and storage hosting) required to run our web application.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#41B544]" /> 5. Contact Us
            </h2>
            <p>
              If you have questions regarding your personal data or wish to
              request immediate removal of your digitized assets from our
              servers, please contact our laboratory team in person at Cresta
              Shopping Centre or reach out directly via phone or email.
            </p>
          </section>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Foto First Cresta. All rights reserved.
        </div>
      </div>
    </div>
  );
}
