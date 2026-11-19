import { OrderFormData } from "@/lib/services";
import { useId } from "react";

type StringFieldKey = {
  [K in keyof OrderFormData]: OrderFormData[K] extends string ? K : never;
}[keyof OrderFormData];

type TextInputProps = {
  label: string;
  valueType: StringFieldKey;
  autoComplete: string;
  type: string;
  hasError: boolean;
  placeholder: string;
  updateFields: (fields: Partial<OrderFormData>) => void;
  onBlur: (key: string) => void;
  value?: string;
};

export default function TextInput({
  label,
  valueType,
  autoComplete,
  type,
  hasError,
  placeholder,
  updateFields,
  onBlur,
  value,
}: TextInputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="text-lg mb-1 font-medium">
        {label}
      </label>
      {hasError && (
        <p id={errorId} role="alert" className="text-xs text-red-500 mb-1">
          **Please enter a valid {label}**
        </p>
      )}
      <input
        id={inputId}
        type={type}
        required
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        placeholder={placeholder ? `e.g. ${placeholder}` : undefined}
        autoComplete={autoComplete}
        className={`border ${hasError ? "border-red-500" : "border-ffgreen"} rounded-lg h-12 px-3 dark:bg-[#252525] bg-gray-50 text-lg`}
        onChange={(e) => updateFields({ [valueType]: e.target.value })}
        onBlur={() => onBlur(valueType)}
        value={value}
      />
    </div>
  );
}
