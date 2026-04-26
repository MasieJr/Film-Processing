import Link from "next/link";
import ServiceItem from "@/components/ServiceItem";

export default function HomeScreen() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white dark:bg-[#1e1e1e] p-5">
      <div className="flex flex-col items-center w-full max-w-2xl mt-10">
        <h1 className="text-3xl font-bold text-center mb-4 p-2 leading-[40px] text-black dark:text-white">
          Welcome to our Film Developing App!
        </h1>

        <div className="bg-[#F3F4F6] dark:bg-[#2c2c2c] w-full p-6 rounded-xl flex flex-col items-center mb-8 mx-2">
          <p className="text-center text-xl mb-6 text-black dark:text-white">
            Place your order on the app and receive updates as they happen.
          </p>

          <Link href="/order_form" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-[#143A7C] dark:bg-[#41B544] text-white rounded-xl p-4 text-2xl font-semibold transition-transform active:scale-95">
              Place Order
            </button>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 p-2 leading-[40px] text-black dark:text-white">
          Services & Pricing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <ServiceItem service="Email in High Resolution" price="R260" />
          <ServiceItem service="Email in Low Resolution" price="R240" />
          <ServiceItem service="Print and Email" price="R329" />
          <ServiceItem service="Develop Only" price="R95" />
        </div>
      </div>
    </main>
  );
}
