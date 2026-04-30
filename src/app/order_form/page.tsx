"use client";

import { useState } from "react";
import RadioGroup from "@/components/RadioGroup";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(260);
  const [servicesIndex, setServicesIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);
  const router = useRouter();

  const services = [
    "Email in High Resolution",
    "Email in Low Resolution",
    "Print Only",
    "Print and email",
    "Develop only",
  ];

  const salesPersons = [
    "Masie Seremu",
    "Nithian Chetty",
    "Prudence Ndlovu",
    "Yanga Bululu",
    "Hloni Smith",
  ];

  const printsSizes = ["9x13 cm", "10x15 cm", "13x18 cm", "15x20 cm"];
  const finishes = ["Glossy", "Matte"];
  const printPrices = [445, 329, 895, 931];
  const prices = [260, 240, 329, 329, 95];

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    quantity: 1,
    salesPerson: "",
    services: services[0],
    selectedSize: printsSizes[1],
    selectedFinish: finishes[0],
    totalPrice: 260,
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
    e;
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
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        router.push("/thank-you");
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
    <main className="min-h-screen bg-white dark:bg-[#1e1e1e] text-black dark:text-white pt-6">
      {/* Form Container */}
      <div className="w-full max-w-2xl mx-auto px-4 flex flex-col space-y-6">
        <div className="sticky top-0 bg-white dark:bg-[#1e1e1e] m-y-4 p-4 flex justify-center z-10">
          <Image
            src="/logo.png"
            alt="Company Logo"
            loading="eager"
            width={632}
            height={127}
            className="rounded-full min-w-full"
          />
        </div>

        {formErrors.hasGlobalError && (
          <div className="bg-red-100 p-4 rounded-lg text-red-600 w-full border border-red-200">
            <p className="font-bold mb-1">Please fix the following errors:</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {formErrors.customerName && (
                <li>Please enter a valid Name & Surname</li>
              )}
              {formErrors.email && <li>Please enter a valid Email Address</li>}
              {formErrors.phone && <li>Please enter a valid Phone Number</li>}
              {formErrors.salesPerson && <li>Please select a Sales Person</li>}
            </ul>
          </div>
        )}

        <TextInput
          label="Name and Surname"
          value="customerName"
          type="text"
          autoComplete="name"
          hasError={formErrors.customerName}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <TextInput
          label="Email Address"
          value="email"
          type="email"
          autoComplete="email"
          hasError={formErrors.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <TextInput
          label="Phone number"
          value="phone"
          type="tel"
          autoComplete="tel"
          hasError={formErrors.phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        {/* --- Quantity Stepper --- */}
        <div className="flex flex-row justify-between items-center">
          <label className="text-xl font-medium">Quantity</label>
          <div className="flex flex-row items-center space-x-4">
            <button
              type="button"
              onClick={decrement}
              className="w-10 h-10 bg-gray-100 dark:bg-[#252525] rounded-lg flex items-center justify-center text-2xl active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold w-6 text-center">
              {form.quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              className="w-10 h-10 bg-gray-100 dark:bg-[#252525] rounded-lg flex items-center justify-center text-2xl active:scale-95 touch-manipulation select-none"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            How many rolls are we developing?{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center w-full max-w-xs">
            {/* Minus Button */}
            <button
              type="button"
              onClick={() => decrement}
              className="px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-l-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-200 transition"
            >
              <span className="text-xl font-bold text-gray-700 dark:text-white">
                −
              </span>
            </button>

            {/* Number Display */}
            <div className="flex-grow flex items-center justify-center py-3 border-y border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-xl font-bold">
              {form.quantity}
            </div>

            {/* Plus Button */}
            <button
              type="button"
              onClick={() => increment}
              className="px-5 py-3 bg-[#41B544] rounded-r-xl border border-[#41B544] hover:bg-[#359a37] transition"
            >
              <span className="text-xl font-bold text-white">+</span>
            </button>
          </div>
        </div>

        {/* --- Sales Person --- */}
        <div className="flex flex-col">
          <label className="text-xl mb-1 font-medium">Sales Person</label>
          <select
            className={`border ${
              formErrors.salesPerson ? "border-red-500" : "border-[#41B544]"
            } rounded-lg h-12 px-3 dark:bg-[#252525] bg-gray-50 text-lg appearance-none outline-none focus:ring-2 focus:ring-[#41B544]/50`}
            value={form.salesPerson}
            onChange={(e) => handleInputChange("salesPerson", e.target.value)}
            onBlur={() => handleBlur("salesPerson")}
          >
            <option value="" disabled>
              Please Select Sales Person
            </option>
            {salesPersons.map((person, index) => (
              <option key={index} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>

        {/* --- Services (Radio Buttons) --- */}
        <RadioGroup
          label="Select Service"
          options={services}
          selectedIndex={servicesIndex}
          onChange={(index) => selectService(index)}
        />

        {/* Prints Sizes */}
        {(form.services === "Print Only" ||
          form.services === "Print and email") && (
          <RadioGroup
            label="Print Size"
            options={printsSizes}
            selectedIndex={selectedSizeIndex}
            onChange={(index) => selectSize(index)}
          />
        )}

        {/** --- Paper Finish --- **/}
        {(form.services === "Print Only" ||
          form.services === "Print and email") && (
          <RadioGroup
            label="Paper Finish"
            options={finishes}
            selectedIndex={selectedFinishIndex}
            onChange={(index) => selectFinish(index)}
          />
        )}

        <hr className="border-[#41B544]" />

        {/* --- Keep Negatives --- */}
        <div className="flex flex-col mb-5">
          <label className="text-xl mb-1 font-medium">Keep Negatives</label>
          <div className="flex flex-row space-x-8">
            <button
              type="button"
              onClick={() => handleInputChange("keepNegatives", true)}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  form.keepNegatives ? "border-[#41B544]" : "border-gray-400"
                }`}
              >
                {form.keepNegatives && (
                  <div className="w-3 h-3 rounded-full bg-[#41B544]" />
                )}
              </div>
              <span className="text-lg">Yes</span>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange("keepNegatives", false)}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  !form.keepNegatives ? "border-[#41B544]" : "border-gray-400"
                }`}
              >
                {!form.keepNegatives && (
                  <div className="w-3 h-3 rounded-full bg-[#41B544]" />
                )}
              </div>
              <span className="text-lg">No</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a1a] border-t border-gray-300 dark:border-gray-800 p-4 shadow-lg z-20">
        <div className="w-full max-w-2xl mx-auto flex flex-row justify-between items-center px-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-red-500">
              R{form.totalPrice}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-[55%] h-[45px] bg-[#41B544] text-white rounded-[15px] font-bold text-xl active:scale-95 transition-transform disabled:opacity-50"
          >
            {isSubmitting ? "Sending to Lab..." : "Submit Order"}
          </button>
        </div>
      </div>
    </main>
  );
}
