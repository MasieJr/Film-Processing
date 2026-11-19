import TextInput from "../TextInput";
import SectionButton from "./sections/SectionButtons";
import { useState } from "react";
import { OrderFormData } from "@/lib/services";

type DetailsProps = {
  form: OrderFormData;
  currentSection: number;
  salesPersons: string[];
  changeSection: (section: number) => void;
  updateFields: (fields: Partial<OrderFormData>) => void;
};

export default function Details({
  form,
  currentSection,
  salesPersons,
  changeSection,
  updateFields,
}: DetailsProps) {
  const [formErrors, setFormErrors] = useState({
    customerName: false,
    email: false,
    phone: false,
    salesPerson: false,
    hasGlobalError: false,
  });

  const validateField = (key: string, value: string = "") => {
    if (value.trim() === "") return true;
    if (key === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (key === "phone") return !/^\+?[0-9\s\-()]{10,15}$/.test(value);
    return false;
  };

  const handleFieldChange = (fields: Partial<OrderFormData>) => {
    updateFields(fields);
    setFormErrors((prev) => {
      const next = { ...prev, hasGlobalError: false };
      for (const key of Object.keys(fields)) {
        if (key in next) {
          next[key as keyof typeof next] = false;
        }
      }
      return next;
    });
  };

  const onBlur = (key: string) => {
    const value = (form[key as keyof OrderFormData] as string) ?? "";
    const isError = validateField(key, value);
    setFormErrors((prev) => ({ ...prev, [key]: isError }));
  };

  const handleNext = () => {
    const customerNameError = validateField("customerName", form.customerName);
    const emailError = validateField("email", form.email);
    const phoneError = validateField("phone", form.phone);
    const salesError = validateField("salesPerson", form.salesPerson);

    const hasError =
      customerNameError || emailError || phoneError || salesError;

    setFormErrors({
      customerName: customerNameError,
      email: emailError,
      phone: phoneError,
      salesPerson: salesError,
      hasGlobalError: hasError,
    });

    if (hasError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    changeSection(currentSection + 1);
  };

  return (
    <div className="min-h-screen mt-2 max-w-lg mx-auto p-5 space-y-3">
      <h1 className="text-4xl font-bold">1. Your Details</h1>
      <p className="text-xs text-gray-400">
        Please provide us with your details. These will only be used to send
        your files or communicate with you about your order. Please make sure
        they are correct
      </p>

      <div className="space-y-3">
        <TextInput
          label="Name and Surname"
          placeholder="Foto First"
          valueType="customerName"
          type="text"
          autoComplete="name"
          hasError={formErrors.customerName}
          updateFields={handleFieldChange}
          onBlur={onBlur}
          value={form.customerName}
        />
        <TextInput
          label="Email Address"
          placeholder="fotocresta@gmail.com"
          valueType="email"
          type="email"
          autoComplete="email"
          hasError={formErrors.email}
          updateFields={handleFieldChange}
          onBlur={onBlur}
          value={form.email}
        />
        <TextInput
          label="Phone number"
          placeholder="0114769580"
          valueType="phone"
          type="tel"
          autoComplete="tel"
          hasError={formErrors.phone}
          updateFields={handleFieldChange}
          onBlur={onBlur}
          value={form.phone}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="salesPerson" className="text-xl mb-1 font-medium">
          Sales Person
        </label>
        {formErrors.salesPerson && (
          <p role="alert" className="text-xs font-semibold text-red-500 mb-1">
            Please select a Sales Person
          </p>
        )}
        <select
          id="salesPerson"
          className={`border ${
            formErrors.salesPerson
              ? "border-red-500"
              : "border-ffblue dark:border-ffgreen"
          } rounded-lg h-12 px-3 dark:bg-[#252525] bg-gray-50 text-lg appearance-none outline-none focus:ring-2 focus:ring-[#41B544]/50`}
          value={form.salesPerson ?? ""}
          onChange={(e) => handleFieldChange({ salesPerson: e.target.value })}
          onBlur={() => onBlur("salesPerson")}
        >
          <option value="" disabled>
            Please Select Sales Person
          </option>
          {salesPersons?.map((person, index) => (
            <option key={index} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      <SectionButton
        changeSection={changeSection}
        currentSection={currentSection}
        onNext={handleNext}
      />
    </div>
  );
}
