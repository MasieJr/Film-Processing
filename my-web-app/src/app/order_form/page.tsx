"use client"; // Required in Next.js because we are using useState

import { useState } from "react";
import RadioGroup from "@/components/RadioGroup";

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

  const [selectedPrice, setSelectedPrice] = useState(260);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    salesPerson: "",
    selectedService: services[0],
    selectedSize: printsSizes[1],
    selectedFinish: finishes[0],
    price: 260,
    keepNegatives: false,
  });

  const handleInputChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const selectService = (index: number) => {
    setSelectedServiceIndex(index);
    setSelectedSizeIndex(1);
    setSelectedPrice(prices[index]);
    setForm((prev) => ({
      ...prev,
      selectedService: services[index],
      price: prev.quantity * prices[index],
    }));
  };

  const selectSize = (index: number) => {
    setSelectedSizeIndex(index);
    setSelectedPrice(printPrices[index]);
    setForm((prev) => ({
      ...prev,
      selectedSize: printsSizes[index],
      price: prev.quantity * printPrices[index],
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
        price: newQuantity * selectedPrice,
      };
    });
  };

  const increment = () => {
    setForm((prev) => {
      const newQuantity = prev.quantity + 1;
      return {
        ...prev,
        quantity: newQuantity,
        price: newQuantity * selectedPrice,
      };
    });
  };

  const handleSubmit = () => {
    console.log("Submitting Order:", form);
    alert("Order Placed Successfully!");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-6">
      {/* Form Container */}
      <div className="w-full max-w-2xl mx-auto px-4 flex flex-col space-y-6">
        {/* --- Text Inputs --- */}
        <div className="flex flex-col">
          <label className="text-lg mb-1 font-medium">Name & Surname</label>
          <input
            type="text"
            placeholder="Enter your name and surname"
            autoComplete="name"
            className="border border-[#41B544] rounded-lg h-12 px-3 bg-transparent text-lg"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg mb-1 font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            className="border border-[#41B544] rounded-lg h-12 px-3 bg-transparent text-lg"
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            autoComplete="tel"
            className="border border-[#41B544] rounded-lg h-12 px-3 bg-transparent text-lg"
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>

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
              className="w-10 h-10 bg-gray-100 dark:bg-[#2c2c2c] rounded-lg flex items-center justify-center text-2xl active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* --- Sales Person --- */}
        <div className="flex flex-col">
          <label className="text-xl mb-1 font-medium">Sales Person</label>
          <select
            className="border border-[#41B544] rounded-lg h-12 px-3 bg-transparent text-lg appearance-none"
            value={form.salesPerson}
            onChange={(e) => handleInputChange("salesPerson", e.target.value)}
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
          selectedIndex={selectedServiceIndex}
          onChange={(index) => selectService(index)}
        />

        {/* Prints Sizes */}
        {(form.selectedService === "Print Only" ||
          form.selectedService === "Print and email") && (
          <RadioGroup
            label="Print Size"
            options={printsSizes}
            selectedIndex={selectedSizeIndex}
            onChange={(index) => selectSize(index)}
          />
        )}

        {/** --- Paper Finish --- **/}
        {(form.selectedService === "Print Only" ||
          form.selectedService === "Print and email") && (
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
              R{form.price}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            className="w-[55%] h-[45px] bg-[#41B544] text-white rounded-[15px] font-bold text-xl active:scale-95 transition-transform"
          >
            SUBMIT ORDER
          </button>
        </div>
      </div>
    </main>
  );
}
