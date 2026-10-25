"use client";

import { useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { stores } from "@/lib/stores";
import Details from "@/components/order/Details";
import Sections from "@/components/order/Sections";

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

  const services = [
    "Email in High Resolution",
    "Email in Low Resolution",
    "Print Only",
    "Print and email",
    "Develop only",
  ];

  const printsSizes = ["9x13 cm", "10x15 cm", "13x18 cm", "15x20 cm"];
  const finishes = ["Glossy", "Matte"];
  const printPrices = [445, 329, 895, 931];
  const prices = [200, 180, 329, 329, 95];

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    quantity: 1,
    salesPerson: "",
    services: services[0],
    selectedSize: printsSizes[1],
    selectedFinish: finishes[0],
    totalPrice: 200,
    keepNegatives: false,
  });

  const [formErrors, setFormErrors] = useState({
    customerName: false,
    email: false,
    phone: false,
    salesPerson: false,
    hasGlobalError: false,
  });

  const validateField = (key: string, value: string) => {
    let hasError = false;

    if (value.trim() === "") {
      hasError = true;
    } else if (key === "email") {
      hasError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (key === "phone") {
      hasError = !/^\+?[0-9\s\-()]{10,15}$/.test(value);
    }

    return hasError;
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (typeof value === "string") {
      setFormErrors((prev) => ({
        ...prev,
        [key]: false,
        hasGlobalError: false,
      }));
    }
  };

  const handleBlur = (key: string) => {
    const value = form[key as keyof typeof form] as string;
    const isError = validateField(key, value);

    setFormErrors((prev) => ({ ...prev, [key]: isError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateField("customerName", form.customerName);
    const emailError = validateField("email", form.email);
    const phoneError = validateField("phone", form.phone);
    const salesError = validateField("salesPerson", form.salesPerson);

    setFormErrors({
      customerName: nameError,
      email: emailError,
      phone: phoneError,
      salesPerson: salesError,
      hasGlobalError: nameError || emailError || phoneError || salesError,
    });

    if (nameError || emailError || phoneError || salesError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
  const selectService = (index: number) => {
    setServicesIndex(index);
    setSelectedSizeIndex(1);
    setSelectedPrice(prices[index]);
    setForm((prev) => ({
      ...prev,
      services: services[index],
      totalPrice: prev.quantity * prices[index],
    }));
  };

  const selectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedPrice(printPrices[index]);
    setForm((prev) => ({
      ...prev,
      selectedSize: printsSizes[index],
      totalPrice: prev.quantity * printPrices[index],
    }));
  };

  const selectFinish = (index: number) => {
    setSelectedFinishIndex(index);
    setForm((prev) => ({
      ...prev,
      selectedFinish: finishes[index],
    }));
  };

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

  return (
    <main className="bg-white dark:bg-[#1e1e1e] ">
      <Sections selectedSection={2} />
      <Details
        form={form}
        onBlur={handleBlur}
        onChange={handleInputChange}
        salesPersons={store.salesPersons}
        currentSection={2}
        changeSection={setSelectedSection}
        customerNameError={formErrors.customerName}
        emailError={from}
      />
    </main>
  );
}
