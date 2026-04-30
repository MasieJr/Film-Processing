import Link from "next/link";
import ServiceItem from "@/components/ServiceItem";
import ButtonLink from "@/components/ButtonLink";

export default function HomeScreen() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white dark:bg-[#1e1e1e] p-5">
      <div className="flex flex-col items-center w-full max-w-2xl mt-10">
        <h1 className="text-3xl font-bold text-center mb-4 p-2 leading-[40px] text-black dark:text-white">
          Welcome to our Film Developing App!
        </h1>
        <ButtonLink
          btnLabel="Place Order"
          labelText=" Place your Film order with us and get your film emailed and/or printed"
          goto="/order_form"
        />
        <ButtonLink
          btnLabel="View Orders"
          labelText="View Current and previous order statuses."
          goto="/track"
        />

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
