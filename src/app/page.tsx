import Link from "next/link";
import Image from "next/image";
import { Lock, LockKeyhole, MoveRight, Plus, Search } from "lucide-react";
import HomeButton from "@/components/HomeButtons";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 pb-10">
      {/* HEADER SECTION */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 border border-blue-500 rounded-full bg-[#41B544]/10 mb-6">
          <Image
            src="/icon.png"
            alt="Company Logo"
            loading="eager"
            width={632}
            height={127}
            className="rounded-full min-w-full"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Foto First <span className="text-[#41B544]">Cresta</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
          Welcome to the Bigger Picture. What would you like to do?
        </p>
      </div>

      {/* ACTION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <HomeButton
          link="order_form"
          icon={Plus}
          heading=" Drop Off Film"
          text="Start a new order for film process."
          action="Place Order"
        />
        <HomeButton
          link="track"
          icon={Search}
          heading="Track orders"
          text="Check the status of your current and previous orders"
          action="View Orders"
        />
      </div>
    </div>
  );
}
