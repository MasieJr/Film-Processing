import { Store } from "@/lib/stores";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ store }: { store: Store }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e3772]">
          {store.name.toUpperCase()}
        </h1>
      </div>
    </header>
  );
}
