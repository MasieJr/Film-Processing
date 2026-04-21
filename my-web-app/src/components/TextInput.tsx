type TextInputProps = {
  label: string;
  value: string;
  autoComplete: string;
  type: string;
  hasError: boolean;
  onChange: (key: string, value: string) => void;
  onBlur: (key: string) => void;
};

export default function TextInput({
  label,
  value,
  autoComplete,
  type,
  hasError,
  onChange,
  onBlur,
}: TextInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-lg mb-1 font-medium">{label}</label>
      {hasError && (
        <p className="text-xs text-red-500 mb-1">
          **Please enter a valid {label}**
        </p>
      )}
      <input
        type={type}
        placeholder={`Enter your ${label}`}
        autoComplete={autoComplete}
        className={`border ${hasError ? "border-red-500" : "border-[#41B544]"} rounded-lg h-12 px-3 bg-transparent text-lg`}
        onChange={(e) => onChange(value, e.target.value)}
        onBlur={() => onBlur(value)}
      />
    </div>
  );
}
