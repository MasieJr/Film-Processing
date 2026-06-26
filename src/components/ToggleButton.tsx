"use client";

interface ToggleProps {
  label?: string;
  onChange?: (isOn: boolean) => void; // Fixed: Renamed to match the Modal
  state: boolean;
}

export default function ToggleButton({ label, onChange, state }: ToggleProps) {
  const handleToggle = () => {
    if (onChange) {
      onChange(!state); // Tell the parent to flip the boolean
    }
  };

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={state}
        onChange={handleToggle}
        className="sr-only"
        disabled={state ? true : false}
      />

      {/* Track */}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out shadow-inner ${
          state ? "bg-[#41B544]" : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        {/* Thumb */}
        <div
          className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            state ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>

      {label && (
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {label}
        </span>
      )}
    </label>
  );
}
