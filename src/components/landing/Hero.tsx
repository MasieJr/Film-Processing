import { Store } from "@/lib/stores";
import IconText from "./hero/IconText";
import { Certificate, CheckCircle, Hd, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ store }: { store: Store }) {
  return (
    <section id="hero">
      <div className="p-5 space-y-4 max-w-lg mx-auto">
        <div className="space-y-2">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-100">
            Get Your <br />
            Film Developed
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            High-quality processing, scanning, and printing.
            <br />
            Place your order now and we will take care of the rest.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <IconText icon={CheckCircle} text="Professional processing" />
          <IconText icon={Hd} text="High Definition scans & prints" />
          <IconText icon={Timer} text="Quick turnaround" />
          <IconText icon={Certificate} text="Trusted by film lovers" />
        </div>

        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            alt="Film rolls ready for processing"
            src="/images/films.webp"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <Link
          href={`/${store.slug}/order`}
          className="w-full px-8 py-4 flex items-center justify-center gap-2 bg-ffgreen text-2xl font-bold rounded-lg transition-transform active:scale-[0.98] active:opacity-90"
        >
          Place Order
        </Link>
      </div>
    </section>
  );
}
