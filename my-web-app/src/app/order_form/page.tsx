"use client"; // Required in Next.js because we are using useState

import { useState, useEffect } from "react";
import RadioGroup from "@/components/RadioGroup";
import TextInput from "@/components/TextInput";
import Image from "next/image";

export default function OrderFormPage() {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(260);
  const [servicesIndex, setservicesIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

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
    hasError: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const isNameEmpty = form.customerName.trim() === "";
    const isEmailEmpty = form.email.trim() === "";
    const isPhoneEmpty = form.phone.trim() === "";
    const isSalesPersonEmpty = form.salesPerson === "";

    if (isNameEmpty || isEmailEmpty || isPhoneEmpty || isSalesPersonEmpty) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else {
      e.preventDefault(); // Stops the page from refreshing
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (data.success) {
          alert("Success! Your order ID is: " + data.order.id);
          // Optional: Redirect them to a Thank You page here!
        } else {
          alert("Failed to submit order: " + data.error);
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Something went wrong connecting to the server.");
      } finally {
        setIsSubmitting(false); // Stop the loading spinner
      }
    }
  };

  const hasError = () => {
    const isNameEmpty = form.customerName.trim() === "";
    const isEmailEmpty = form.email.trim() === "";
    const isPhoneEmpty = form.phone.trim() === "";
    const isSalesPersonEmpty = form.salesPerson === "";

    if (isNameEmpty || isEmailEmpty || isPhoneEmpty || isSalesPersonEmpty) {
      setFormErrors((prev) => ({
        ...prev,
        hasError: true,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        hasError: false,
      }));
    }
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (value === "") {
      setFormErrors((prev) => ({ ...prev, [key]: true }));
      hasError();
    } else {
      setFormErrors((prev) => ({ ...prev, [key]: false }));
      // removeError();
      hasError();
    }
  };

  const checkError = (key: string) => {
    hasError();
    if (form[key as keyof typeof form] === "") {
      setFormErrors((prev) => ({ ...prev, [key]: true }));
    }
  };

  const selectService = (index: number) => {
    setservicesIndex(index);
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
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-6">
      {/* Form Container */}
      <div className="w-full max-w-2xl mx-auto px-4 flex flex-col space-y-6">
        <div className="sticky top-0 bg-white dark:bg-black m-y-4 p-4 rounded-lg shadow-md flex justify-center">
          <Image
            src="/logo.png"
            alt="Company Logo"
            loading="eager"
            width={632}
            height={127}
            className="rounded-full min-w-full"
          />
        </div>
        {formErrors.hasError && (
          <div className="bg-red-100 w-50 text-red-500 w-full">
            {/* <p className="text-lg font-bold">Please Check the following:</p> */}
            {formErrors.customerName && (
              <p className="text-sm font-light">Please enter Name & Surname</p>
            )}
            {formErrors.email && (
              <p className="text-sm font-light">
                Please enter valid email Address
              </p>
            )}
            {formErrors.phone && (
              <p className="text-sm font-light">
                Please enter valid Phone Number
              </p>
            )}
            {formErrors.salesPerson && (
              <p className="text-xs font-light">Please Select Sales Person</p>
            )}
          </div>
        )}
        <TextInput
          label="Name and Surname"
          type="text"
          value="customerName"
          autoComplete="name"
          hasError={formErrors.customerName}
          onChange={handleInputChange}
          onBlur={checkError}
        />
        <TextInput
          label="Email Address"
          type="email"
          value="email"
          autoComplete="email"
          hasError={formErrors.email}
          onChange={handleInputChange}
          onBlur={checkError}
        />
        <TextInput
          label="Phone number"
          type="tel"
          value="phone"
          autoComplete="tel"
          hasError={formErrors.phone}
          onChange={handleInputChange}
          onBlur={checkError}
        />

        {/* --- Quantity Stepper --- */}
        <div className="flex flex-row justify-between items-center">
          <label className="text-xl font-medium">Quantity</label>
          <div className="flex flex-row items-center space-x-4">
            <button
              onClick={decrement}
              className="w-10 h-10 bg-gray-100 dark:bg-[#2c2c2c] rounded-lg flex items-center justify-center text-2xl active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold w-6 text-center">
              {form.quantity}
            </span>
            <button
              onClick={increment}
              className="w-10 h-10 bg-gray-100 dark:bg-[#2c2c2c] rounded-lg flex items-center justify-center text-2xl active:scale-95 touch-manipulation select-none"
            >
              +
            </button>
          </div>
        </div>

        {/* --- Sales Person --- */}
        <div className="flex flex-col">
          <label className="text-xl mb-1 font-medium">Sales Person</label>
          <select
            className={`border ${formErrors.salesPerson ? "border-red-500" : "border-[#41B544]"} rounded-lg h-12 px-3 bg-transparent text-lg appearance-none`}
            value={form.salesPerson}
            onChange={(e) => handleInputChange("salesPerson", e.target.value)}
            onBlur={() => checkError("salePerson")}
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
              onClick={() => handleInputChange("keepNegatives", true)}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.keepNegatives ? "border-[#41B544]" : "border-gray-400"}`}
              >
                {form.keepNegatives && (
                  <div className="w-3 h-3 rounded-full bg-[#41B544]" />
                )}
              </div>
              <span className="text-lg">Yes</span>
            </button>
            <button
              onClick={() => handleInputChange("keepNegatives", false)}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!form.keepNegatives ? "border-[#41B544]" : "border-gray-400"}`}
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

      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a1a] border-t border-gray-300 dark:border-gray-800 p-4 shadow-lg">
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
            className="w-[55%] h-[45px] bg-[#41B544] text-white rounded-[15px] font-bold text-xl active:scale-95 transition-transform"
          >
            {isSubmitting ? "Sending to Lab..." : "Submit Order"}
          </button>
        </div>
      </div>
    </main>
  );
}
