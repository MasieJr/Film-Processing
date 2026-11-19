"use client";

import { useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { stores } from "@/lib/stores";
import Details from "@/components/order/Details";
import Sections from "@/components/order/Sections";
import FilmOptions from "@/components/order/FilmOptions";
import Services from "@/components/order/Services";
import Review from "@/components/order/Review";
import { OrderFormData } from "@/lib/services";

export default function OrderStorePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(200);
  const [servicesIndex, setServicesIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState(1);
  const router = useRouter();

  const params = useParams<{ store: string }>();
  const store = stores[params.store as keyof typeof stores];
  if (!store) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Store not found</h1>
      </main>
    );
  }
  const [form, setForm] = useState<OrderFormData>({
    customerName: "",
    email: "",
    phone: "",
    quantity: 1,
    salesPerson: "",
    services: "",
    selectedSize: "",
    selectedFinish: "",
    totalPrice: 0,
    keepNegatives: false,
    filmtype: "35mm",
    isHalfFrame: false,
  });

  const updateFields = (fields: Partial<OrderFormData>) => {
    setForm((prev) => ({ ...prev, ...fields }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          store: params.store,
        }),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        router.push(`/${params.store}/thank-you`);
      } else {
        alert("Failed to submit order: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- PRICING LOGIC ---
  const decrement = () => {
    setForm((prev) => {
      const newQuantity = Math.max(1, prev.quantity - 1);
      return {
        ...prev,
        quantity: newQuantity,
        totalPrice: newQuantity * selectedPrice,
      };
    });
  };

  const increment = () => {
    setForm((prev) => {
      const newQuantity = prev.quantity + 1;
      return {
        ...prev,
        quantity: newQuantity,
        totalPrice: newQuantity * selectedPrice,
      };
    });
  };
  const order = {
    name: "Masie Seremu",
    email: "email@example.com",
    phone: "0114769580",
    quantity: 2,
    halfFrame: false,
    negatives: true,
    service: "Print and Email",
    printSize: "10x15cm",
    printFinish: "Glossy",
    filmType: "35mm Film",
    price: 200,
  };
  return (
    <main className="bg-white dark:bg-[#1e1e1e] ">
      <Sections selectedSection={selectedSection} />
      {selectedSection === 1 && (
        <Details
          updateFields={updateFields}
          form={form}
          salesPersons={store.salesPersons}
          currentSection={selectedSection}
          changeSection={setSelectedSection}
        />
      )}
      {selectedSection === 2 && (
        <FilmOptions
          quantity={form.quantity}
          increment={decrement}
          decrement={decrement}
          changeSection={setSelectedSection}
          currentSection={selectedSection}
        />
      )}
      {selectedSection === 3 && (
        <Services
          quantity={1}
          halfFrameQuantity={0}
          handleSubmit={() => handleSubmit}
          isSubmitting={isSubmitting}
          changeSection={setSelectedSection}
          currentSection={selectedSection}
        />
      )}
      {selectedSection === 4 && (
        <Review
          order={order}
          changeSection={setSelectedSection}
          currentSection={selectedSection}
        />
      )}
    </main>
  );
}
