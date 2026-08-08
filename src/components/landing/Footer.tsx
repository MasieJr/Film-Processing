import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
