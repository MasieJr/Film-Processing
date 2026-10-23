import TextInput from "../TextInput";

export type FormData = {
  customerName: string;
  email: string;
  phone: string;
  salesPerson: string;
};

type DetailsProps = {
  form: FormData;
  customerNameError?: boolean;
  emailError?: boolean;
  phoneError?: boolean;
  salesPersonError?: boolean;
  onChange: (field: keyof FormData, value: string) => void;
  onBlur: (field: keyof FormData) => void;
  salesPersons?: string[];
};

export default function Details({
  form,
  customerNameError,
  emailError,
  phoneError,
  salesPersonError,
  onChange,
  onBlur,
  salesPersons,
}: DetailsProps) {
  return (
    <div className="min-h-screen mt-2  max-w-lg mx-auto p-5 space-y-2">
      <h1 className="text-4xl font-bold">1. Your Details</h1>
      <div className="space-y-3">
        <TextInput
          label="Name and Surname"
          value="customerName"
          type="text"
          autoComplete="name"
          hasError={customerNameError!}
          onChange={() => onChange}
          onBlur={() => onBlur}
        />
        <TextInput
          label="Email Address"
          value="email"
          type="email"
          autoComplete="email"
          hasError={emailError!}
          onChange={() => onChange}
          onBlur={() => onBlur}
        />
        <TextInput
          label="Phone number"
          value="phone"
          type="tel"
          autoComplete="tel"
          hasError={phoneError!}
          onChange={() => onChange}
          onBlur={() => onBlur}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xl mb-1 font-medium">Sales Person</label>
        <select
          className={`border ${
            salesPersonError ? "border-red-500" : "border-[#41B544]"
          } rounded-lg h-12 px-3 dark:bg-[#252525] bg-gray-50 text-lg appearance-none outline-none focus:ring-2 focus:ring-[#41B544]/50`}
          value={form.salesPerson}
          onChange={(e) => onChange("salesPerson", e.target.value)}
          onBlur={() => onBlur("salesPerson")}
        >
          <option value="" disabled>
            Please Select Sales Person
          </option>
          {salesPersons!.map((person, index) => (
            <option key={index} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
