type RadioGroupProps = {
  label: string;
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  price?: number[];
};

export default function RadioGroup({
  label,
  options,
  selectedIndex,
  onChange,
  price,
}: RadioGroupProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xl mb-3 font-medium">
        {label} <span></span>
      </label>

      {/* The Options List */}
      <div className="flex flex-col space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => onChange(index)}
              type="button" // Important so it doesn't accidentally submit forms
              className="flex items-center space-x-3 text-left w-full"
            >
              {/* The Radio Circle */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                ${isSelected ? "border-[#41B544]" : "border-gray-400"}
              `}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-[#41B544]" />
                )}
              </div>

              {/* The Text */}
              <span className="text-lg">
                {option}
                {price && (
                  <span className="text-red-500">
                    {" "}
                    {["Print Only", "Print and email"].includes(option)
                      ? "From "
                      : ""}
                    R{price[index]}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
